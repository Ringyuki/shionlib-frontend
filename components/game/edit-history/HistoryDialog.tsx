import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shionui/Dialog'
import { useTranslations } from 'next-intl'
import { History } from './History'
import { EditRecordItem as EditRecordItemInterface } from '@/interfaces/user/edits.interface'
import { PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'

interface HistoryDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  histories: EditRecordItemInterface[]
  pagination: PaginatedMeta
  onPageChange: (page: number) => void
}

export const HistoryDialog = ({
  open,
  onOpenChange,
  histories,
  pagination,
  onPageChange,
}: HistoryDialogProps) => {
  const t = useTranslations('Components.Game.EditHistory')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent fitContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <History histories={histories} pagination={pagination} onPageChange={onPageChange} />
      </DialogContent>
    </Dialog>
  )
}
