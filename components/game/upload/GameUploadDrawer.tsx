import { Drawer, DrawerContent, DrawerHeader, DrawerTitle } from '@/components/shionui/Drawer'
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
import { cn } from '@/utils/cn'
import { BBCodeContent } from '@/components/common/content/BBCode'

interface GameUploadDrawerProps {
  className?: string
  game_id: number
  open: boolean
  onOpenChange: (open: boolean) => void
  onUploadComplete: () => void
}

export const GameUploadDrawer = ({
  className,
  game_id,
  open,
  onOpenChange,
  onUploadComplete,
}: GameUploadDrawerProps) => {
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
    <Drawer open={open} onOpenChange={onOpenChange} dismissible={closable}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('title')}</DrawerTitle>
        </DrawerHeader>
        <div
          className={cn(className, 'flex flex-col gap-4 max-w-7xl px-3 mx-auto overflow-y-auto')}
        >
          <Alert intent="info" appearance="solid">
            <Info />
            <AlertTitle>{t('alert1Title')}</AlertTitle>
            <AlertDescription>
              <BBCodeContent content={t('alert1Description')} />
            </AlertDescription>
          </Alert>
          <Alert intent="warning" appearance="solid">
            <AlertCircle />
            <AlertTitle>{t('alert2Title')}</AlertTitle>
            <AlertDescription>
              <BBCodeContent content={t('alert2Description')} />
            </AlertDescription>
          </Alert>
          <UploadQuota fileSize={fileSize} />
          <FileUploader
            onPhaseChange={setPhase}
            onUploadComplete={setUploadSessionId}
            onFileSelected={handleFileSelected}
          />
          <GameDownloadSourceInfoForm onSubmit={handleSubmit} loading={loading} className="mb-4" />
        </div>
      </DrawerContent>
    </Drawer>
  )
}
