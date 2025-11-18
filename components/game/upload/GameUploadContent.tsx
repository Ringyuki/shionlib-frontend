import { UploadQuota } from '@/components/game/upload/UploadQuota'
import { FileUploader } from '@/components/common/uploader/FileUploader'
import { GameDownloadSourceInfoForm } from './GameDownloadSourceInfoForm'
import { Phase } from '@/libs/uploader/uploader'
import { z } from 'zod'
import { gameDownloadSourceSchemaType } from '@/components/game/upload/GameDownloadSourceInfoForm'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { shionlibRequest } from '@/utils/shionlib-request'
import toast from 'react-hot-toast'
import { cn } from '@/utils/cn'

interface GameUploadContentProps {
  game_id: number
  onClosableChange: (closable: boolean) => void
  onUploadComplete: () => void
  className?: string
}

export const GameUploadContent = ({
  game_id,
  onClosableChange,
  onUploadComplete,
  className,
}: GameUploadContentProps) => {
  const t = useTranslations('Components.Game.Upload.GameUploadDialog')
  const [phase, setPhase] = useState<Phase>('idle')
  const [closable, setClosable] = useState(false)
  const [autoSubmitTrigger, setAutoSubmitTrigger] = useState(0)
  useEffect(() => {
    setClosable(phase === 'idle' || phase === 'error' || phase === 'aborted')
    onClosableChange(closable)
  }, [phase, onClosableChange, closable])

  useEffect(() => {
    if (phase === 'completed') {
      setAutoSubmitTrigger(prev => prev + 1)
    }
  }, [phase])

  const [uploadSessionId, setUploadSessionId] = useState<number | null>(null)
  const [fileSize, setFileSize] = useState<number>(0)
  const handleFileSelected = (file: File) => {
    if (!file) {
      setFileSize(0)
      return
    }
    setFileSize(file.size)
  }

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data: z.infer<typeof gameDownloadSourceSchemaType>) => {
    if (phase !== 'completed') {
      toast.error(t('waitForUploadCompleted'))
      return
    }
    try {
      setLoading(true)
      await shionlibRequest().post(`/game/${game_id}/download-source`, {
        data: {
          ...data,
          upload_session_id: uploadSessionId,
        },
      })
      onUploadComplete()
      toast.success(t('success'))
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className={cn(className, 'flex flex-col gap-4')}>
      <UploadQuota fileSize={fileSize} />
      <FileUploader
        className="max-w-3xl"
        onPhaseChange={setPhase}
        onUploadComplete={setUploadSessionId}
        onFileSelected={handleFileSelected}
        desiredChunkSize={1024 * 1024 * 5}
      />
      <GameDownloadSourceInfoForm
        onSubmit={handleSubmit}
        loading={loading}
        autoSubmitTrigger={autoSubmitTrigger}
      />
    </div>
  )
}
