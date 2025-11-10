import { Button } from '@/components/shionui/Button'
import { Trash } from 'lucide-react'
import { useState } from 'react'
import { shionlibRequest } from '@/utils/shionlib-request'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogAction,
  AlertDialogCancel,
} from '@/components/shionui/AlertDialog'
import { useTranslations } from 'next-intl'
import toast from 'react-hot-toast'

interface DeleteProps {
  id: number
  onSuccess: (id: number) => void
}

export const Delete = ({ id, onSuccess }: DeleteProps) => {
  const t = useTranslations('Components.Game.Download.Delete')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await shionlibRequest().delete(`/game/download-source/${id}`)
      toast.success(t('success'))
      setOpen(false)
      await new Promise(resolve => setTimeout(resolve, 500)) // wait for the animation to complete
      onSuccess(id)
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Button
        intent="destructive"
        onClick={() => setOpen(true)}
        renderIcon={<Trash />}
        loading={loading}
        size="sm"
      >
        {t('delete')}
      </Button>
      <AlertDialog open={open} onOpenChange={setOpen}>
        <AlertDialogContent tone="destructive">
          <AlertDialogHeader>
            <AlertDialogTitle>{t('title')}</AlertDialogTitle>
            <AlertDialogDescription>{t('description')}</AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel tone="destructive" onClick={() => setOpen(false)}>
              {t('cancel')}
            </AlertDialogCancel>
            <AlertDialogAction
              tone="destructive"
              loading={loading}
              onClick={e => {
                handleDelete()
                e.preventDefault()
              }}
            >
              {t('delete')}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
}
