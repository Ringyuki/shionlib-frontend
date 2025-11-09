import { Button } from '@/components/shionui/Button'
import { useTranslations } from 'next-intl'
import { UndoIcon } from 'lucide-react'
import { shionlibRequest } from '@/utils/shionlib-request'
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogDescription,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
  AlertDialogTrigger,
} from '@/components/shionui/AlertDialog'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { Switch } from '@/components/shionui/animated/Switch'

interface UndoProps {
  edit_id: number
}

export const Undo = ({ edit_id }: UndoProps) => {
  const t = useTranslations('Components.Game.EditHistory')
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [forceUndo, setForceUndo] = useState(false)

  const undoEdit = async (edit_id: number) => {
    try {
      setLoading(true)
      await shionlibRequest().post(`/edit/${edit_id}/undo`, {
        data: {
          force: forceUndo,
        },
      })
      setOpen(false)
      toast.success(t('success'))
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogTrigger asChild>
        <Button
          intent="destructive"
          appearance="soft"
          size="sm"
          renderIcon={<UndoIcon className="size-4" />}
          onClick={() => setOpen(true)}
          disabled={loading}
        >
          {t('undo')}
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent fitContent tone="destructive">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('undo')}</AlertDialogTitle>
          <AlertDialogDescription>{t('undoDescription')}</AlertDialogDescription>
          <AlertDialogDescription className="flex items-center gap-2">
            {t('forceUndo')}
            <Switch checked={forceUndo} onCheckedChange={setForceUndo} />
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel tone="destructive" onClick={() => setOpen(false)} disabled={loading}>
            {t('cancel')}
          </AlertDialogCancel>
          <AlertDialogAction
            tone="destructive"
            onClick={() => undoEdit(edit_id)}
            disabled={loading}
          >
            {t('confirm')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
