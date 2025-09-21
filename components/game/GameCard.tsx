import { GameItem, GameData } from '@/interfaces/game/game.interface'
import { cn } from '@/utils/cn'
import { FadeImage } from '../common/shared/FadeImage'
import { Link } from '@/i18n/navigation'
import { getPreferredContent } from './description/helpers/getPreferredContent'
import { getLocale } from 'next-intl/server'

interface GameCardProps {
  game: GameItem
}

export const GameCard = async ({ game }: GameCardProps) => {
  const locale = await getLocale()
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'

  const { title } = getPreferredContent(game as unknown as GameData, 'title', lang)

  const { cover, aspect } = getPreferredContent(game as unknown as GameData, 'cover', lang)

  const sizes =
    '((min-width: 1280px) 280px), ((min-width: 1024px) 240px), ((min-width: 768px) 200px), ((min-width: 640px) 180px), 160px'

  return (
    <Link
      href={`/game/${game.id}`}
      className={cn(
        'flex flex-col gap-2 w-full break-inside-avoid select-none cursor-pointer hover:opacity-85 transition-all duration-200',
      )}
      style={{ aspectRatio: aspect, marginBottom: '1rem' }}
    >
      <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: aspect }}>
        <FadeImage src={cover.url} alt={title} aspectRatio={aspect} sizes={sizes} />
      </div>
      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
    </Link>
  )
}
