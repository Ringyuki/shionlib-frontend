'use client'

import { Message as MessageInterface, MessageType } from '@/interfaces/message/message.interface'
import { Card, CardContent } from '@/components/shionui/Card'
import { Avatar } from '@/components/common/user/Avatar'
import { timeFromNow } from '@/utils/time-format'
import { useLocale } from 'next-intl'
import { cn } from '@/utils/cn'
import { typeConfig } from '../constants/message-item'
import { useTranslations } from 'next-intl'

interface ItemProps {
  message: MessageInterface
  onClick?: (id: number) => void
}

export const Item = ({ message, onClick }: ItemProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const config = typeConfig[message.type]

  return (
    <Card
      className={cn(
        'py-0 transition-colors duration-200 cursor-pointer group',
        'hover:bg-primary/10 active:bg-primary/20',
        !message.read && 'bg-primary/5',
      )}
      onClick={() => onClick?.(message.id)}
    >
      <CardContent className="p-4">
        <div className="flex gap-3">
          <div className="shrink-0">
            {message.sender ? (
              <Avatar user={message.sender} className="size-10" clickable={false} />
            ) : (
              <div
                className={cn(
                  'size-10 rounded-full flex items-center justify-center bg-gradient-to-br',
                  message.type === MessageType.SYSTEM && 'from-blue-500/20 to-blue-600/20',
                  message.type === MessageType.COMMENT_REPLY &&
                    'from-emerald-500/20 to-emerald-600/20',
                  message.type === MessageType.COMMENT_LIKE && 'from-rose-500/20 to-rose-600/20',
                )}
              >
                <span className={config.color}>{config.icon}</span>
              </div>
            )}
          </div>

          <div className="flex-1 min-w-0 space-y-1.5">
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                {message.sender && (
                  <span className="font-medium text-sm truncate">{message.sender.name}</span>
                )}
                <span className={cn('shrink-0', config.color)}>{config.icon}</span>
              </div>
              <div className="flex items-center gap-2 shrink-0">
                {!message.read && <span className="size-2 rounded-full bg-primary animate-pulse" />}
                <span className="text-xs text-muted-foreground">
                  {timeFromNow(message.created, locale)}
                </span>
              </div>
            </div>
            <h3 className="font-medium text-sm line-clamp-1">{t(message.title)}</h3>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
