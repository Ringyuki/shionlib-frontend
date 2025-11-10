import { GameCover } from '@/interfaces/game/game.interface'
import { FadeImage } from '@/components/common/shared/FadeImage'

interface CoverItemProps {
  cover: GameCover
}

export const CoverItem = ({ cover }: CoverItemProps) => {
  const vertical = cover.dims[0] / cover.dims[1] < 1
  const aspect = vertical ? '1 / 1.5' : '1.5 / 1'
  const url = cover.url.startsWith('http')
    ? cover.url
    : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + cover.url

  return (
    <div
      className="relative w-full flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-all duration-200"
      style={{ aspectRatio: aspect }}
    >
      <FadeImage src={url} alt={cover.language} />
    </div>
  )
}
