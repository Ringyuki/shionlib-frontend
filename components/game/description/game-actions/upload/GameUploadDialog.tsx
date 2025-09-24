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
  const t = useTranslations('Components.Game.GameActions.GameUploadDialog')
  const [phase, setPhase] = useState<Phase>('idle')
  const closable = phase === 'idle'
  const [uploadSessionId, setUploadSessionId] = useState<number | null>(null)

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
      <DialogContent className="max-w-2xl!">
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <Alert intent="info" appearance="solid">
          <Info />
          <AlertTitle>{t('alert1Title')}</AlertTitle>
          <AlertDescription>
            <span
              dangerouslySetInnerHTML={{
                __html: t('alert1Description').replace(/\n/g, '<br />'),
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
                __html: t('alert2Description')
                  .replace(/\n/g, '<br />')
                  .replace(/\[b\]/g, '<span class="font-bold">')
                  .replace(/\[\/b\]/g, '</span>'),
              }}
            />
          </AlertDescription>
        </Alert>
        <FileUploader onPhaseChange={setPhase} onUploadComplete={setUploadSessionId} />
        <GameDownloadSourceInfoForm onSubmit={handleSubmit} loading={loading} />
      </DialogContent>
    </Dialog>
  )
}
