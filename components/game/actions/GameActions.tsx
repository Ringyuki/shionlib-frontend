'use client'

import { useTranslations } from 'next-intl'
import { GameData } from '@/interfaces/game/game.interface'
import { Separator } from '@/components/shionui/Separator'
import { Download } from './Download'
import { Upload } from './Upload'
import { Comment } from './Comment'
import { Favorite } from './Favorite'
import { Edit } from './Edit'

interface GameActionsProps {
  game: GameData
}

export const GameActions = ({ game }: GameActionsProps) => {
  const t = useTranslations('Components.Game.Actions')
  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex gap-2 md:items-center flex-col md:flex-row items-start">
          <div className="flex gap-2 items-center">
            <Download game_id={game.id} />
            <Upload game_id={game.id} />
            <Edit game_id={game.id} />
          </div>
          <Separator orientation="vertical" className="h-4! hidden md:block" />
          <div className="flex gap-2 items-center">
            <Favorite isFavorite={game.is_favorite} gameId={game.id} />
            <Comment />
          </div>
        </div>
      </div>
    </>
  )
}
