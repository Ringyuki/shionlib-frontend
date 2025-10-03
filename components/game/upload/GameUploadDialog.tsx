import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shionui/Dialog'
import { useTranslations } from 'next-intl'
import { FileUploader } from '@/components/common/uploader/FileUploader'
import { Alert, AlertDescription, AlertTitle } from '@/components/shionui/Alert'
import { AlertCircle, Info } from 'lucide-react'
import { Phase } from '@/libs/uploader/uploader'
import { useState } from 'react'
import { GameDownloadSourceInfoForm } from './GameDownloadSourceInfoForm'
import { gameDownloadSourceSchemaType } from './GameDownloadSourceInfoForm'
import { z } from 'zod'
import { toast } from 'react-hot-toast'
import { shionlibRequest } from '@/utils/shionlib-request'
import { UploadQuota } from './UploadQuota'
import bbcodeToHtml from '@/utils/bbcode-format'

interface GameUploadDialogProps {
  game_id: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete: () => void
}

export const GameUploadDialog = ({
  game_id,
  open,
  onOpenChange,
  onUploadComplete,
}: GameUploadDialogProps) => {
  const t = useTranslations('Components.Game.Upload.GameUploadDialog')
  const [phase, setPhase] = useState<Phase>('idle')
  const closable = phase === 'idle' || phase === 'error' || phase === 'aborted'
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
    <Dialog open={open} onOpenChange={onOpenChange} maskClosable={closable}>
      <DialogContent className="max-w-3xl!" aria-describedby={undefined}>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <Alert intent="info" appearance="solid">
          <Info />
          <AlertTitle>{t('alert1Title')}</AlertTitle>
          <AlertDescription>
            <span
              dangerouslySetInnerHTML={{
                __html: bbcodeToHtml(t('alert1Description')),
              }}
            />
          </AlertDescription>
        </Alert>
        <Alert intent="warning" appearance="solid">
          <AlertCircle />
          <AlertTitle>{t('alert2Title')}</AlertTitle>
          <AlertDescription>
            <span
              dangerouslySetInnerHTML={{
                __html: bbcodeToHtml(t('alert2Description')),
              }}
            />
          </AlertDescription>
        </Alert>
        <UploadQuota fileSize={fileSize} />
        <FileUploader
          className="max-w-3xl"
          onPhaseChange={setPhase}
          onUploadComplete={setUploadSessionId}
          onFileSelected={handleFileSelected}
        />
        <GameDownloadSourceInfoForm onSubmit={handleSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  )
}
