import { EditRecordItem as EditRecordItemInterface } from '@/interfaces/user/edits.interface'
import { EditChanges } from '@/components/user/home/edits/EditChanges'
import { Card, CardContent } from '@/components/shionui/Card'
import { Badge } from '@/components/shionui/Badge'
import { Separator } from '@/components/shionui/Separator'
import { useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import { Avatar } from '@/components/common/user/Avatar'
import { timeFromNow } from '@/utils/time-format'
import { useLocale } from 'next-intl'
import { Calendar } from 'lucide-react'

interface HistoryItemProps {
  history: EditRecordItemInterface
  className?: string
}

export const HistoryItem = ({ history, className }: HistoryItemProps) => {
  const t = useTranslations('Components.Game.EditHistory')
  const locale = useLocale()
  return (
    <Card className={cn('py-0 overflow-hidden', className)}>
      <CardContent className="p-4 flex flex-col gap-3">
        {history.field_changes && history.field_changes.length > 0 && (
          <div className="flex items-center justify-between">
            <div className="flex gap-1 items-center">
              <div className="flex items-center gap-2">
                <Avatar user={history.actor!} />
                <span className="text-sm font-medium">{history.actor!.name}</span>
              </div>
              <span className="text-sm text-muted-foreground">{t('fieldChanges')}</span>
              <div className="flex flex-wrap gap-2">
                {history.field_changes.map((field, index) => (
                  <Badge key={index} variant="neutral" className="font-mono! text-xs">
                    {field}
                  </Badge>
                ))}
              </div>
            </div>
            <Badge variant="neutral" className="flex items-center gap-1">
              <Calendar className="size-3" />
              {timeFromNow(history.created, locale)}
            </Badge>
          </div>
        )}
        <Separator />
        <EditChanges changes={history.changes} />
      </CardContent>
    </Card>
  )
}
