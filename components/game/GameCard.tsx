import { GameCover, GameItem } from '@/interfaces/game/game.interface'
import { cn } from '@/utils/cn'
import { getLocale } from 'next-intl/server'
import { FadeImage } from '../common/shared/FadeImage'
import Link from 'next/link'

interface GameCardProps {
  game: GameItem
}

export const GameCard = async ({ game }: GameCardProps) => {
  const locale = await getLocale()

  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'

  const title = (game[`title_${lang}` as keyof GameItem] as string) || game.title_jp

  const cover: GameCover = game.covers.find(c => c.language === lang) ?? game.covers[0]

  const [w, h] = cover.dims
  const vertical = w / h < 1
  const aspect = vertical ? '1 / 1.5' : '1.5 / 1'

  const sizes =
    '((min-width: 1280px) 280px), ((min-width: 1024px) 240px), ((min-width: 768px) 200px), ((min-width: 640px) 180px), 160px'

  return (
    <Link
      href={`/${locale}/game/${game.id}`}
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
