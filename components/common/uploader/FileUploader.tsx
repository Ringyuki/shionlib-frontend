'use client'

import * as React from 'react'
import { Card, CardContent, CardFooter } from '@/components/shionui/Card'
import {
  FileUpload as ShionFileUpload,
  Dropzone as FileUploadDropzone,
  List as FileUploadList,
} from '@/components/shionui/FileUpload'
import { UploadController } from './UploadController'
import { UploadProgress } from './UploadProgress'
import { ShionlibLargeFileUploader, UploaderEvents, Phase } from '@/libs/uploader/uploader'
import { cn } from '@/utils/cn'
import { FileList } from './FileList'
import { UploadStatus } from './UploadStatus'
import { useTranslations } from 'next-intl'

interface FileUploaderProps {
  className?: string
  title?: string
  description?: string
  accept?: string
  concurrency?: number
  desiredChunkSize?: number
  smallFileThreshold?: number
  onPhaseChange?: (phase: Phase) => void
  onUploadComplete?: (sessionId: number) => void
}

export function FileUploader({
  className,
  accept,
  concurrency,
  desiredChunkSize,
  smallFileThreshold,
  onPhaseChange,
  onUploadComplete,
}: FileUploaderProps) {
  const t = useTranslations('Components.Common.Uploader.FileUploader')
  const [file, setFile] = React.useState<File | null>(null)
  const [phase, setPhase] = React.useState<Phase>('idle')
  React.useEffect(() => {
    onPhaseChange?.(phase)
  }, [phase])
  const [bytesHashed, setBytesHashed] = React.useState(0)
  const [bytesUploaded, setBytesUploaded] = React.useState(0)
  const [totalBytes, setTotalBytes] = React.useState(0)
  const [speedBps, setSpeedBps] = React.useState(0)
  const [etaSec, setEtaSec] = React.useState<number | null>(null)
  const uploaderRef = React.useRef<ShionlibLargeFileUploader | null>(null)

  const resetProgress = (f: File | null) => {
    setBytesUploaded(0)
    setBytesHashed(0)
    setTotalBytes(f?.size ?? 0)
    setSpeedBps(0)
    setEtaSec(null)
  }

  const attachListeners = React.useCallback((uploader: ShionlibLargeFileUploader) => {
    const unsubs: Array<() => void> = []
    const unsub = uploader.on((e: UploaderEvents) => {
      if (e.type === 'status') setPhase(e.phase)
      if (e.type === 'hash-progress') {
        setBytesHashed(e.bytesHashed)
        setTotalBytes(e.totalBytes)
      }
      if (e.type === 'progress') {
        setBytesUploaded(e.bytesUploaded)
        setTotalBytes(e.totalBytes)
        setSpeedBps(e.speedBps)
        setEtaSec(e.etaSec)
      }
      if (e.type === 'done') handleComplete()
    })
    unsubs.push(unsub)
    return () => unsubs.forEach(fn => fn())
  }, [])

  const createUploader = React.useCallback(() => {
    if (!file) return null
    const uploader = new ShionlibLargeFileUploader(file, {
      concurrency,
      desiredChunkSize,
      smallFileThreshold,
    })
    attachListeners(uploader)
    uploaderRef.current = uploader
    return uploader
  }, [file, concurrency, desiredChunkSize, smallFileThreshold, attachListeners])

  const handleFilesAccepted = (files: File[]) => {
    const f = files?.[0] ?? null
    setFile(f)
    setPhase('idle')
    resetProgress(f)
  }
  const handleFilesValueChange = (files: File[]) => {
    const f = files?.[0] ?? null
    setFile(f)
    if (!f) {
      setPhase('idle')
      resetProgress(null)
    }
  }
  React.useEffect(() => {
    if (file) {
      setTotalBytes(file.size)
    }
  }, [file])

  const handleStart = async () => {
    if (!file) return
    const uploader = uploaderRef.current ?? createUploader()
    if (!uploader) return
    console.log('start', phase)
    await uploader.start()
  }
  const handlePause = () => {
    uploaderRef.current?.pause()
  }
  const handleResume = () => {
    uploaderRef.current?.resume()
  }
  const handleCancel = async () => {
    await uploaderRef.current?.cancel()
  }
  const handleComplete = async () => {
    setPhase('completed')
    const sessionId = await uploaderRef.current?.getSessionId()
    if (sessionId) {
      onUploadComplete?.(sessionId)
    }
    uploaderRef.current = null
  }

  const disabled = !file || phase === 'uploading' || phase === 'completed'
  const shionFileUploadDisabled = phase !== 'idle' || !!file

  return (
    <Card className={cn('w-full max-w-2xl bg-transparent border-none rounded-md p-0', className)}>
      <CardContent className="flex flex-col gap-4 p-0">
        <ShionFileUpload
          accept={accept}
          maxFiles={1}
          disabled={shionFileUploadDisabled}
          multiple={false}
          onAccept={handleFilesAccepted}
          onValueChange={handleFilesValueChange}
        >
          <FileUploadDropzone className="min-h-28 w-full cursor-pointer">
            <div className="text-muted-foreground text-sm">{t('dropzone')}</div>
          </FileUploadDropzone>
          <FileUploadList className="mt-2">
            <FileList phase={phase} />
          </FileUploadList>
        </ShionFileUpload>
        <UploadProgress
          bytesUploaded={bytesUploaded}
          totalBytes={totalBytes}
          speedBps={speedBps}
          etaSec={etaSec}
        />
      </CardContent>
      <CardFooter className="justify-between flex-wrap flex-col sm:flex-row gap-2 p-0">
        <UploadStatus phase={phase} bytesHashed={bytesHashed} totalBytes={totalBytes} />
        <UploadController
          phase={phase}
          onStart={handleStart}
          onPause={handlePause}
          onResume={handleResume}
          onCancel={handleCancel}
          disabled={disabled}
        />
      </CardFooter>
    </Card>
  )
}

export default FileUploader
