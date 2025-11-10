import { EditDialog } from './EditDialog'
import { EditDrawer } from './EditDrawer'
import { useMedia } from 'react-use'
import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { gameDownloadSourceSchemaType } from '@/components/game/upload/GameDownloadSourceInfoForm'
import { z } from 'zod'
import { useState } from 'react'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Button } from '@/components/shionui/Button'
import { Pencil } from 'lucide-react'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'

interface EditProps {
  downloadResource: GameDownloadResource
  onSuccess: (id: number, data: Partial<GameDownloadResource>) => void
}

export const Edit = ({ downloadResource, onSuccess }: EditProps) => {
  const isMobile = useMedia('(max-width: 1024px)', false)
  const [open, setOpen] = useState(false)
  const t = useTranslations('Components.Game.Download.Edit')

  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (data: z.infer<typeof gameDownloadSourceSchemaType>) => {
    setIsSubmitting(true)
    try {
      await shionlibRequest().patch(`/game/download-source/${downloadResource.id}`, {
        data: data,
      })
      setOpen(false)
      toast.success(t('success'))
      onSuccess(downloadResource.id, data as Partial<GameDownloadResource>)
    } catch {
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <>
      <Button
        intent="neutral"
        appearance="outline"
        loginRequired
        onClick={() => setOpen(true)}
        renderIcon={<Pencil />}
        loading={isSubmitting}
        size="sm"
      >
        {t('title')}
      </Button>
      {isMobile ? (
        <EditDrawer
          downloadResource={downloadResource}
          open={open}
          onOpenChange={setOpen}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <EditDialog
          downloadResource={downloadResource}
          open={open}
          onOpenChange={setOpen}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
