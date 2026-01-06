import { GameCover } from '@/interfaces/game/game.interface'
import { FadeImage } from '@/components/common/shared/FadeImage'

interface CoverItemProps {
  cover: GameCover
  onClick?: () => void
}

export const CoverItem = ({ cover, onClick }: CoverItemProps) => {
  const [w, h] = cover.dims ?? [0, 0]
  const ratio = w && h ? w / h : 0
  const aspect =
    !w || !h ? '1.5 / 1' : Math.abs(ratio - 1) < 0.1 ? '1 / 1' : ratio < 1 ? '1 / 1.5' : '1.5 / 1'
  const url = cover.url.startsWith('http')
    ? cover.url
    : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + cover.url

  return (
    <div
      className="relative rounded-md overflow-hidden w-full flex flex-col gap-2 cursor-pointer hover:opacity-80 transition-all duration-200"
      style={{ aspectRatio: aspect }}
      onClick={onClick}
    >
      <FadeImage src={url} alt={cover.language} />
    </div>
  )
}
