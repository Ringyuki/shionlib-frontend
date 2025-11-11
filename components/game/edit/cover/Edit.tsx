import { GameCover } from '@/interfaces/game/game.interface'
import { useState } from 'react'
import { useMedia } from 'react-use'
import { EditDialog } from './EditDialog'
import { EditDrawer } from './EditDrawer'
import { CoverItem } from './Item'
import { z } from 'zod'
import { gameCoverSchemaType } from './Form'
import { shionlibRequest } from '@/utils/shionlib-request'
import toast from 'react-hot-toast'
import { useTranslations } from 'next-intl'
import { useParams } from 'next/navigation'

interface EditProps {
  cover: GameCover
  onSuccess: (data: z.infer<typeof gameCoverSchemaType>, id: number) => void
}

export const Edit = ({ cover, onSuccess }: EditProps) => {
  const isMobile = useMedia('(max-width: 1024px)', false)
  const [open, setOpen] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const t = useTranslations('Components.Game.Edit.Cover')
  const { id: game_id } = useParams()

  const handleSubmit = async (data: z.infer<typeof gameCoverSchemaType>) => {
    try {
      setIsSubmitting(true)
      await shionlibRequest().patch(`/game/${game_id}/edit/cover`, {
        data: {
          id: cover.id,
          ...data,
        },
      })
      toast.success(t('success'))
      onSuccess(data, cover.id!)
      setOpen(false)
    } catch {
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <>
      <CoverItem cover={cover} onClick={() => setOpen(true)} />
      {isMobile ? (
        <EditDrawer
          cover={cover}
          open={open}
          onOpenChange={setOpen}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      ) : (
        <EditDialog
          cover={cover}
          open={open}
          onOpenChange={setOpen}
          onSubmit={handleSubmit}
          isSubmitting={isSubmitting}
        />
      )}
    </>
  )
}
