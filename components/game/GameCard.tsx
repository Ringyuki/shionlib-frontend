import { GameItem, GameSearchItem, GameData } from '@/interfaces/game/game.interface'
import { cn } from '@/utils/cn'
import { FadeImage } from '../common/shared/FadeImage'
import { Link } from '@/i18n/navigation'
import { getPreferredContent } from './description/helpers/getPreferredContent'
import { getLocale } from 'next-intl/server'
import { Spoiler } from '../shionui/Spoiler'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface GameCardProps {
  game: GameItem | GameSearchItem
  content_limit?: ContentLimit
}

const _GameCover = ({
  cover,
  title,
  sizes,
  aspect,
}: {
  cover: string
  title: string
  sizes: string
  aspect: string
}) => {
  return (
    <FadeImage
      src={
        cover.startsWith('http') ? cover : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + cover
      }
      alt={title}
      aspectRatio={aspect}
      sizes={sizes}
      className="hover:opacity-85 transition-all duration-200"
    />
  )
}

export const GameCard = async ({ game, content_limit }: GameCardProps) => {
  const locale = await getLocale()
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
  const { title, language } = getPreferredContent(game as unknown as GameData, 'title', lang)
  const { cover, aspect } = getPreferredContent(game as unknown as GameData, 'cover', lang)
  const sizes =
    '((min-width: 1280px) 280px), ((min-width: 1024px) 240px), ((min-width: 768px) 200px), ((min-width: 640px) 180px), 160px'

  return (
    <Link
      href={`/game/${game.id}`}
      className={cn('flex flex-col gap-2 w-full break-inside-avoid select-none cursor-pointer')}
      style={{ aspectRatio: aspect }}
    >
      <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: aspect }}>
        {(() => {
          if (cover.sexual >= 1) {
            if (
              content_limit === ContentLimit.SHOW_WITH_SPOILER ||
              content_limit === ContentLimit.NEVER_SHOW_NSFW_CONTENT ||
              !content_limit
            )
              return (
                <Spoiler showHint={false} open={false} blur={32} className="!rounded-none !h-full">
                  <_GameCover cover={cover.url} title={title} sizes={sizes} aspect={aspect} />
                </Spoiler>
              )
            if (content_limit === ContentLimit.JUST_SHOW)
              return <_GameCover cover={cover.url} title={title} sizes={sizes} aspect={aspect} />
          }
          return <_GameCover cover={cover.url} title={title} sizes={sizes} aspect={aspect} />
        })()}
      </div>
      <div className="flex flex-col gap-2">
        {typeof game === 'object' && '_formatted' in game ? (
          <h3
            className="text-sm font-medium"
            dangerouslySetInnerHTML={{
              __html:
                (game as GameSearchItem)._formatted?.[
                  `title_${language}` as keyof GameSearchItem['_formatted']
                ] || title,
            }}
          />
        ) : (
          <h3 className="text-sm font-medium">{title}</h3>
        )}
      </div>
    </Link>
  )
}
