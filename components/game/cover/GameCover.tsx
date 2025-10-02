'use client'

import { GameCover as GameCoverInterface } from '@/interfaces/game/game.interface'
import { FadeImage } from '@/components/common/shared/FadeImage'
import { useMedia } from 'react-use'
import { Button } from '@/components/shionui/Button'
import { useTranslations } from 'next-intl'
import { GameCoverDialog } from './GameCoverDialog'
import { GameCoverDrawer } from './GameCoverDrawer'
import { useState } from 'react'

interface GameCoverProps {
  covers: GameCoverInterface[]
  preferredCoverInfo: {
    cover: GameCoverInterface
    vertical: boolean
    aspect: string
  }
  title: string
}

export const GameCover = ({ covers, preferredCoverInfo, title }: GameCoverProps) => {
  const t = useTranslations('Components.Game.Cover.GameCover')
  const { cover: preferredCover, vertical, aspect } = preferredCoverInfo
  const width = vertical ? 200 : 450
  const isMobile = useMedia('(max-width: 768px)')
  const [open, setOpen] = useState(false)
  return (
    <>
      <div
        className="w-full md:w-fit overflow-hidden h-[200px] md:h-[300px] relative group/cover"
        style={{ aspectRatio: aspect }}
      >
        <FadeImage
          src={
            preferredCover.url.startsWith('http')
              ? preferredCover.url
              : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + preferredCover.url
          }
          alt={title}
          height={300}
          fill={false}
          width={width}
          className="w-full! h-full"
        />
        {covers.length > 1 && (
          <div className="absolute bottom-2 right-2 md:right-auto md:left-1/2 md:-translate-x-1/2 opacity-100 md:opacity-0 group-hover/cover:opacity-100 transition-all duration-200">
            <Button
              intent="secondary"
              className="text-xs hover:bg-neutral-content active:bg-neutral-content dark:hover:bg-neutral/85 dark:active:bg-neutral/95"
              size="xs"
              onClick={() => setOpen(true)}
            >
              {t('viewAllCovers')}
            </Button>
          </div>
        )}
      </div>
      {isMobile ? (
        <GameCoverDrawer covers={covers} title={title} open={open} onOpenChange={setOpen} />
      ) : (
        <GameCoverDialog covers={covers} title={title} open={open} onOpenChange={setOpen} />
      )}
    </>
  )
}
