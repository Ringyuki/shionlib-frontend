'use client'

import { GameData } from '@/interfaces/game/game.interface'
import { GameDescription } from './GameDescription'
import { GameImages } from './GameImages'
import { GameTags } from './GameTags'
import { GameStaff } from './GameStaff'

interface GameDetailProps {
  game: GameData
}

export const GameDetail = ({ game }: GameDetailProps) => {
  return (
    <div className="mt-6">
      <div className="flex flex-col gap-8">
        <GameTags tags={game.tags} />
        <GameDescription game={game} />
        <GameImages images={game.images} />
        <GameStaff staffs={game.staffs} />
      </div>
    </div>
  )
}
