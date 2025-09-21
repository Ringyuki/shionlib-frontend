import { Button } from '@/components/shionui/Button'
import { Pencil, Download, Heart, MessageSquareMore } from 'lucide-react'
import { getTranslations } from 'next-intl/server'
import { GameData } from '@/interfaces/game/game.interface'
import { Separator } from '@/components/shionui/Separator'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/shionui/Tooltip'

interface GameActionsProps {
  game: GameData
}

export const GameActions = async ({ game }: GameActionsProps) => {
  const t = await getTranslations('Components.Game.GameActions')
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
      <Tooltip>
        <TooltipTrigger asChild>
          <Button size="icon" intent="destructive" appearance="ghost" loginRequired>
            <Heart />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <span>{t('addToFavorites')}</span>
        </TooltipContent>
      </Tooltip>
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
