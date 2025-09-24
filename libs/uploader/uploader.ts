import { sha256 } from '@noble/hashes/sha2.js'
import { createShionlibLargeFileUploadApi, LargeFileUploadApi } from './large-file-upload.api'

type Phase =
  | 'idle'
  | 'hashing'
  | 'initializing'
  | 'uploading'
  | 'paused'
  | 'completing'
  | 'completed'
  | 'aborted'
  | 'error'

export type UploaderEvents =
  | { type: 'status'; phase: Phase }
  | { type: 'hash-progress'; bytesHashed: number; totalBytes: number }
  | {
      type: 'progress'
      bytesUploaded: number
      totalBytes: number
      speedBps: number
      etaSec: number | null
    }
  | { type: 'chunk'; index: number }
  | { type: 'retry'; index: number; attempt: number; delayMs: number }
  | { type: 'error'; error: unknown }
  | { type: 'done'; sessionId: number }

export type UploaderOptions = {
  api?: LargeFileUploadApi
  desiredChunkSize?: number
  concurrency?: number
  retry?: {
    retries: number
    baseDelayMs: number
    maxDelayMs: number
  }
  smallFileThreshold?: number
}

export class ShionlibLargeFileUploader {
  readonly file: File
  private api: LargeFileUploadApi
  private phase: Phase = 'idle'
  private startedAt = 0
  private bytesUploaded = 0
  private uploaded = new Set<number>()
  private sessionId?: number
  private chunkSize?: number
  private totalChunks?: number
  private fileSha256?: string
  private listeners = new Set<(e: UploaderEvents) => void>()
  private opts: Required<
    Omit<UploaderOptions, 'api' | 'desiredChunkSize' | 'smallFileThreshold'>
  > & {
    desiredChunkSize?: number
    smallFileThreshold: number
  }

  constructor(file: File, options: UploaderOptions = {}) {
    this.file = file
    this.api = options.api ?? createShionlibLargeFileUploadApi()
    this.opts = {
      concurrency: options.concurrency ?? 4,
      retry: options.retry ?? {
        retries: 3,
        baseDelayMs: 1000,
        maxDelayMs: 10000,
      },
      desiredChunkSize: options.desiredChunkSize,
      smallFileThreshold: options.smallFileThreshold ?? 1024 * 1024 * 512,
    }
  }

  on(fn: (e: UploaderEvents) => void) {
    this.listeners.add(fn)
    return () => this.listeners.delete(fn)
  }
  private emit(e: UploaderEvents) {
    this.listeners.forEach(f => f(e))
  }
  private setPhase(p: Phase) {
    this.phase = p
    this.emit({ type: 'status', phase: p })
  }

  async start() {
    if (this.phase === 'idle') {
      try {
        this.setPhase('hashing')
        this.fileSha256 = await this.hashFile(this.file)

        this.setPhase('initializing')
        const init = await this.api.init({
          file_name: this.file.name,
          total_size: this.file.size,
          file_sha256: this.fileSha256,
          chunk_size: this.opts.desiredChunkSize,
        })
        this.sessionId = init.upload_session_id
        this.chunkSize = init.chunk_size
        this.totalChunks = init.total_chunks

        const st = await this.api.status(this.sessionId)
        st.uploaded_chunks.forEach(i => this.uploaded.add(i))
        this.bytesUploaded = this.uploadedSize()
      } catch (e) {
        this.setPhase('error')
        this.emit({ type: 'error', error: e })
      }
    }

    const canUpload = this.phase === 'idle' || this.phase === 'paused'
    if (canUpload) {
      try {
        this.setPhase('uploading')
        this.startedAt = performance.now()
        await this.uploadAll()

        this.setPhase('completing')
        await this.api.complete(this.sessionId!)
        this.setPhase('completed')
        this.emit({ type: 'done', sessionId: this.sessionId! })
      } catch (e) {
        if (this.phase === 'paused') return
        if (this.phase !== 'aborted') {
          this.setPhase('error')
          this.emit({ type: 'error', error: e })
        }
      }
    }
  }

  pause() {
    if (this.phase === 'uploading') this.setPhase('paused')
  }
  resume() {
    if (this.phase === 'paused') this.start()
  }
  async cancel() {
    if (!this.sessionId) return
    try {
      await this.api.abort(this.sessionId)
    } finally {
      this.setPhase('aborted')
    }
  }

  private async uploadAll() {
    const total = this.totalChunks!
    const chunkSize = this.chunkSize!
    const pending: number[] = []
    for (let i = 0; i < total; i++) if (!this.uploaded.has(i)) pending.push(i)

    let cursor = 0
    const worker = async () => {
      while (this.phase === 'uploading' && cursor < pending.length) {
        const idx = pending[cursor++]
        await this.uploadOne(idx, chunkSize)
      }
    }

    const n = Math.min(this.opts.concurrency, Math.max(1, pending.length))
    await Promise.all(Array.from({ length: n }, () => worker()))
    if (this.phase !== 'uploading') throw new Error(`Stopped: ${this.phase}`)
  }

  private async uploadOne(index: number, chunkSize: number) {
    const start = index * chunkSize
    const end = Math.min(start + chunkSize, this.file.size)
    const blob = this.file.slice(start, end)
    const chunkSha = await this.hashChunk(blob)

    await this.withRetry(index, () => this.api.putChunk(this.sessionId!, index, blob, chunkSha))

    this.uploaded.add(index)
    this.bytesUploaded += blob.size
    const elapsed = (performance.now() - this.startedAt) / 1000
    const speed = elapsed > 0 ? this.bytesUploaded / elapsed : 0
    const remain = this.file.size - this.bytesUploaded
    const eta = speed > 0 ? Math.round(remain / speed) : null
    this.emit({
      type: 'progress',
      bytesUploaded: this.bytesUploaded,
      totalBytes: this.file.size,
      speedBps: speed,
      etaSec: eta,
    })
    this.emit({ type: 'chunk', index })
  }

  private async withRetry(index: number, fn: () => Promise<any>) {
    const { retries, baseDelayMs, maxDelayMs } = this.opts.retry
    for (let attempt = 1; ; attempt++) {
      try {
        return await fn()
      } catch (e) {
        if (attempt > retries || this.phase !== 'uploading') throw e
        const delay = Math.min(maxDelayMs, baseDelayMs * 2 ** (attempt - 1))
        this.emit({ type: 'retry', index, attempt, delayMs: delay })
        await new Promise(r => setTimeout(r, delay))
      }
    }
  }

  private uploadedSize() {
    if (!this.chunkSize || !this.totalChunks) return 0
    const last = this.totalChunks - 1
    let bytes = 0
    for (const i of this.uploaded) {
      bytes +=
        i === last ? this.file.size - (this.totalChunks - 1) * this.chunkSize : this.chunkSize
    }

    return bytes
  }

  private async hashFile(file: File) {
    const total = file.size
    if (total <= this.opts.smallFileThreshold) {
      return this.hashChunk(file)
    }
    const step = 1024 * 1024 * 4
    const hasher = sha256.create()
    let off = 0
    while (off < total) {
      const end = Math.min(off + step, total)
      hasher.update(new Uint8Array(await file.slice(off, end).arrayBuffer()))
      off = end
      this.emit({ type: 'hash-progress', bytesHashed: off, totalBytes: total })
      if (off % (1024 * 1024 * 64) === 0) await new Promise(r => setTimeout(r))
    }
    return this.toHex(hasher.digest())
  }

  private async hashChunk(blob: Blob) {
    const ab = await blob.arrayBuffer()
    const digest = await crypto.subtle.digest('SHA-256', ab)
    return this.toHex(new Uint8Array(digest))
  }

  private toHex(arr: Uint8Array) {
    let s = ''
    for (let i = 0; i < arr.length; i++) s += arr[i].toString(16).padStart(2, '0')
    return s
  }
}
