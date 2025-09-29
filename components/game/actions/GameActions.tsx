'use client'

import { Button } from '@/components/shionui/Button'
import { Pencil, Download, Upload, MessageSquareMore } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { GameData } from '@/interfaces/game/game.interface'
import { Separator } from '@/components/shionui/Separator'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/shionui/Tooltip'
import { Favorite } from './Favorite'
import { GameUpload } from '../upload/GameUpload'
import { GameDownload } from '../download/GameDownload'
import { useState } from 'react'

interface GameActionsProps {
  game: GameData
}

export const GameActions = ({ game }: GameActionsProps) => {
  const t = useTranslations('Components.Game.Actions')

  const [uploadOpen, setUploadOpen] = useState(false)
  const [downloadOpen, setDownloadOpen] = useState(false)
  const [downloadBtnLoading, setDownloadBtnLoading] = useState(false)

  return (
    <>
      <div className="flex gap-2 items-center flex-wrap">
        <div className="flex gap-2 md:items-center flex-col md:flex-row items-start">
          <div className="flex gap-2 items-center">
            <Button
              intent="primary"
              onClick={() => setDownloadOpen(true)}
              loading={downloadBtnLoading}
              renderIcon={<Download />}
            >
              {t('download')}
            </Button>
            <Button
              intent="neutral"
              appearance="outline"
              loginRequired
              onClick={() => setUploadOpen(true)}
              renderIcon={<Upload />}
            >
              {t('upload')}
            </Button>
            <Button intent="primary" appearance="ghost" loginRequired renderIcon={<Pencil />}>
              {t('edit')}
            </Button>
          </div>
          <Separator orientation="vertical" className="h-4! hidden md:block" />
          <div className="flex gap-2 items-center">
            <Favorite isFavorite={game.is_favorite} gameId={game.id} />
            <Tooltip>
              <TooltipTrigger asChild>
                <Button
                  size="icon"
                  intent="success"
                  appearance="ghost"
                  loginRequired
                  renderIcon={<MessageSquareMore />}
                />
              </TooltipTrigger>
              <TooltipContent>
                <span>{t('goToDiscussion')}</span>
              </TooltipContent>
            </Tooltip>
          </div>
        </div>
      </div>
      <GameUpload
        game_id={game.id}
        open={uploadOpen}
        onOpenChange={setUploadOpen}
        onUploadComplete={() => setUploadOpen(false)}
      />
      <GameDownload
        game_id={game.id}
        open={downloadOpen}
        onOpenChange={setDownloadOpen}
        onLoadingChange={setDownloadBtnLoading}
      />
    </>
  )
}
