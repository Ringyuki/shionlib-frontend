import { GameCover, GameItem } from '@/interfaces/game/game.interface'
import { cn } from '@/libs/cn'
import { getLocale } from 'next-intl/server'
import { FadeImage } from '../common/shared/FadeImage'

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

  const smallW = vertical ? 100 : 150
  const largeW = vertical ? 200 : 300

  const sizes = `(min-width: 768px) ${largeW}px, ${smallW}px`

  return (
    <div
      className={cn(
        'flex flex-col gap-2 w-full',
        vertical ? 'w-[100px] md:w-[200px]' : 'w-[150px] md:w-[300px]',
      )}
      style={{ aspectRatio: aspect }}
    >
      <div className="relative w-full overflow-hidden rounded-md" style={{ aspectRatio: aspect }}>
        <FadeImage src={cover.url} alt={title} aspectRatio={aspect} sizes={sizes} />
      </div>

      <div className="flex flex-col gap-2">
        <h3 className="text-sm font-medium">{title}</h3>
      </div>
    </div>
  )
}
