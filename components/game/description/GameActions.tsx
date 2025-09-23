'use client'

import { Button } from '@/components/shionui/Button'
import { Pencil, Download, MessageSquareMore } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { GameData } from '@/interfaces/game/game.interface'
import { Separator } from '@/components/shionui/Separator'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/shionui/Tooltip'
import { Favorite } from './game-actions/Favorite'

interface GameActionsProps {
  game: GameData
}

export const GameActions = ({ game }: GameActionsProps) => {
  const t = useTranslations('Components.Game.GameActions')

  return (
    <div className="flex gap-2 items-center">
      <Button intent="primary">
        <span className="flex items-center gap-2">
          <Download />
          <span>{t('download')}</span>
        </span>
      </Button>
      <Button intent="primary" appearance="ghost" loginRequired>
        <span className="flex items-center gap-2">
          <Pencil />
          <span>{t('edit')}</span>
        </span>
      </Button>
      <Separator orientation="vertical" />
      <Favorite isFavorite={game.is_favorite} gameId={game.id} />
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" intent="success" appearance="ghost" loginRequired>
            <MessageSquareMore />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>{t('goToDiscussion')}</span>
        </TooltipContent>
      </Tooltip>
    </div>
  )
}
