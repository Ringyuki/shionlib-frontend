'use client'

import { Message, MessageType } from '@/interfaces/message/message.interface'
import { Avatar } from '@/components/common/user/Avatar'
import { Card, CardContent } from '@/components/shionui/Card'
import { Button } from '@/components/shionui/Button'
import { timeFromNow, timeFormat, TimeFormatEnum } from '@/utils/time-format'
import { useLocale, useTranslations } from 'next-intl'
import { cn } from '@/utils/cn'
import { typeConfig } from '../constants/message-item'
import { ExternalLink, Gamepad2 } from 'lucide-react'
import { Link } from '@/i18n/navigation'
import { getPreferredContent } from '@/components/game/description/helpers/getPreferredContent'
import { GameData } from '@/interfaces/game/game.interface'

interface DetailProps {
  message: Message
}

export const Detail = ({ message }: DetailProps) => {
  const t = useTranslations()
  const locale = useLocale()
  const config = typeConfig[message.type]

  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
  const { title } = getPreferredContent(message.game as GameData, 'title', lang)

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      <div className="flex items-center gap-3">
        {message.sender ? (
          <Avatar user={message.sender} className="size-12" />
        ) : (
          <span className={cn(config.color, 'scale-125')}>{config.icon}</span>
        )}
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            {message.sender && <span className="font-medium truncate">{message.sender.name}</span>}
            {message.type === MessageType.SYSTEM && (
              <span className="font-medium text-sm truncate">
                {t('Components.Message.Message.Item.system')}
              </span>
            )}
            <span className={cn('shrink-0', config.color)}>{config.icon}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <span>{timeFromNow(message.created, locale)}</span>
            <span>·</span>
            <span>{timeFormat(message.created, locale, TimeFormatEnum.YYYY_MM_DD_HH_MM_SS)}</span>
          </div>
        </div>
      </div>

      <h2 className="text-xl font-semibold">{t(message.title)}</h2>

      <p className="text-muted-foreground leading-relaxed whitespace-pre-wrap">
        {t(message.content, message.meta as Record<string, string | number | Date>)}
      </p>

      {message.game && (
        <Card className="py-0 border-dashed shadow-none">
          <CardContent className="p-2">
            <Link
              href={`/game/${message.game.id}`}
              className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
            >
              <Gamepad2 className="size-4 text-muted-foreground" />
              <span className="text-muted-foreground">
                {t('Components.Message.Detail.Detail.relatedGame')}
              </span>
              <span className="font-medium">{title}</span>
            </Link>
          </CardContent>
        </Card>
      )}

      {message.comment && (
        <Link href={`/game/${message.game?.id}#data-comment-id-${message.comment.id}`}>
          <Card className="py-0 bg-card-soft shadow-none hover:bg-primary/10 hover:border-primary/30 transition-colors duration-200">
            <CardContent className="p-2">
              <div
                className="text-sm prose prose-sm dark:prose-invert max-w-none"
                dangerouslySetInnerHTML={{ __html: message.comment.html }}
              />
            </CardContent>
          </Card>
        </Link>
      )}

      {message.link_url && message.link_text && (
        <div>
          {message.external_link ? (
            <Button asChild intent="primary" appearance="outline">
              <a href={message.link_url} target="_blank" rel="noopener noreferrer">
                {message.link_text}
                <ExternalLink className="size-4 ml-1" />
              </a>
            </Button>
          ) : (
            <Button asChild intent="primary" appearance="outline">
              <Link href={message.link_url}>{message.link_text}</Link>
            </Button>
          )}
        </div>
      )}
    </div>
  )
}
