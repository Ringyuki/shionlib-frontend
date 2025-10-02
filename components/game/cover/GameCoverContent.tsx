import { GameCover } from '@/interfaces/game/game.interface'
import { FadeImage } from '@/components/common/shared/FadeImage'
import { cn } from '@/utils/cn'
import { JP, CN, US } from 'country-flag-icons/string/3x2'
import { Languages, Proportions } from 'lucide-react'
import { Language, LanguageNameMap } from '@/interfaces/game/game.interface'

interface GameCoverContentProps {
  className?: string
  covers: GameCover[]
  title: string
}

const flagMap: Record<Language, string> = {
  jp: JP,
  zh: CN,
  en: US,
}

export const GameCoverContent = ({ covers, title, className }: GameCoverContentProps) => {
  return (
    <div className={cn('grid grid-cols-1 md:grid-cols-2 gap-3', 'w-full', className)}>
      {covers.map(cover => {
        const vertical = cover.dims[0] / cover.dims[1] < 1
        const aspect = vertical ? '1 / 1.5' : '1.5 / 1'
        const sizes = '(max-width: 768px) 100vw, 50vw'
        const url = cover.url.startsWith('http')
          ? cover.url
          : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + cover.url
        return (
          <div
            key={cover.url}
            className="relative w-full flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-all duration-200"
            style={{ aspectRatio: aspect }}
          >
            <FadeImage
              src={url}
              alt={title}
              className="w-full h-full object-cover"
              sizes={sizes}
              fill
              onClick={() => {
                window.open(url, '_blank')
              }}
            />
            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Languages className="size-3" />
                <svg
                  className="size-3"
                  dangerouslySetInnerHTML={{ __html: flagMap[cover.language] }}
                />
                <span className="text-xs font-light">{LanguageNameMap[cover.language]}</span>
              </div>
              <div className="flex items-center gap-1">
                <Proportions className="size-3" />
                <span className="text-xs font-light">{cover.dims.join('x')}</span>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
