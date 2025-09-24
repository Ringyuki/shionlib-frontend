import { shionlibRequest } from '@/utils/shionlib-request'

export interface InitResp {
  upload_session_id: number
  chunk_size: number
  total_chunks: number
  expires_at: string
}

export interface StatusResp {
  status: 'UPLOADING' | 'COMPLETED' | 'ABORTED'
  uploaded_chunks: number[]
  file_sha256: string
  total_size: number
  chunk_size: number
  total_chunks: number
  expires_at: string
}

export interface LargeFileUploadApi {
  init(params: {
    file_name: string
    total_size: number
    file_sha256: string
    chunk_size?: number
  }): Promise<InitResp>

  status(id: number): Promise<StatusResp>

  putChunk(
    id: number,
    index: number,
    blob: Blob,
    chunkSha256: string,
  ): Promise<{
    ok: true
    chunk_index: number
  }>

  complete(id: number): Promise<{
    ok: true
    path?: string
  }>

  abort(id: number): Promise<void>
}

export function createShionlibLargeFileUploadApi(prefix = '/uploads/large'): LargeFileUploadApi {
  const req = shionlibRequest()

  return {
    async init(params) {
      const res = await req.post<InitResp>(`${prefix}/init`, {
        data: params,
      })
      return res.data!
    },

    async status(id) {
      const res = await req.get<StatusResp>(`${prefix}/${id}/status`)
      return res.data!
    },

    async putChunk(id, index, blob, chunkSha256) {
      const res = await req.put<{ ok: true; chunk_index: number }>(
        `${prefix}/${id}/chunks/${index}`,
        {
          options: {
            body: blob,
            headers: {
              'Content-Type': 'application/octet-stream',
              'chunk-sha256': chunkSha256,
            },
          },
        },
      )
      return res.data!
    },

    async complete(id) {
      const res = await req.patch<{ ok: true; path?: string }>(`${prefix}/${id}/complete`)
      return res.data!
    },

    async abort(id) {
      await req.delete(`${prefix}/${id}`)
    },
  }
}
