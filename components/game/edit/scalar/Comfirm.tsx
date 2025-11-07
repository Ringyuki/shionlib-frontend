import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from '@/components/shionui/AlertDialog'
import { ChangesResult } from '@/utils/pick-changes'
import { useTranslations } from 'next-intl'
import { ScrollArea } from '@/components/shionui/ScrollArea'
import { Changes } from './Changes'

interface ConfirmProps {
  open: boolean
  setOpen: (open: boolean) => void
  handleSubmit: () => void
  changes: ChangesResult | null
}

export const Confirm = ({ open, setOpen, handleSubmit, changes }: ConfirmProps) => {
  const t = useTranslations('Components.Game.Edit.Scalar.Comfirm')
  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent fitContent tone="info">
        <AlertDialogHeader>
          <AlertDialogTitle>{t('title')}</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogDescription className="lg:w-4xl">
          <ScrollArea className="max-h-[calc(100dvh-20rem)]">
            <Changes changes={changes} />
          </ScrollArea>
        </AlertDialogDescription>
        <AlertDialogFooter>
          <AlertDialogCancel onClick={() => setOpen(false)}>{t('cancel')}</AlertDialogCancel>
          <AlertDialogAction tone="info" onClick={handleSubmit}>
            {t('submit')}
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
