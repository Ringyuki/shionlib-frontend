import { Activity } from '@/interfaces/activity/activity.interface'
import { getTranslations } from 'next-intl/server'
import { getPreferredContent } from '@/components/game/description/helpers/getPreferredContent'
import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'
import { GameData } from '@/interfaces/game/game.interface'
import { Badge } from '@/components/shionui/Badge'
import { ScrollArea } from '@/components/shionui/ScrollArea'

interface CommentProps {
  activity: Activity
}

export const Comment = async ({ activity }: CommentProps) => {
  const locale = await getLocale()
  const t = await getTranslations('Components.Home.Activity.Activities.Comment')
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
  const { title } = getPreferredContent(activity.game as unknown as GameData, 'title', lang)

  return (
    <>
      <div className="flex gap-2 items-center">
        <span>{t('commentedPrefix')}</span>
        <Badge variant="default">{t('game')}</Badge>
        <Link
          href={`/game/${activity.game?.id}`}
          className="font-medium hover:opacity-85 transition-all duration-200"
        >
          {title}
        </Link>
        {t('commentedSuffix') && <span>{t('commentedSuffix')}</span>}
      </div>
      <Link href={`/game/${activity.game?.id}#data-comment-id-${activity.comment?.id}`}>
        <ScrollArea className="max-h-24">
          <div
            dangerouslySetInnerHTML={{ __html: activity.comment?.html || '' }}
            className="p-2 bg-card hover:bg-card-hover transition-colors rounded-lg border"
          />
        </ScrollArea>
      </Link>
    </>
  )
}
