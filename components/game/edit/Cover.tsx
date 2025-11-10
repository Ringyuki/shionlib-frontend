import { GameCover } from '@/interfaces/game/game.interface'
import { CoverItem } from './cover/Item'

interface CoverProps {
  covers: GameCover[]
}

export const Cover = ({ covers }: CoverProps) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {covers.map(cover => (
        <CoverItem key={cover.url} cover={cover} />
      ))}
    </div>
  )
}
