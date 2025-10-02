import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/shionui/Drawer'
import { GameCover } from '@/interfaces/game/game.interface'
import { GameCoverContent } from './GameCoverContent'
import { useTranslations } from 'next-intl'

interface GameCoverDrawerProps {
  covers: GameCover[]
  title: string
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const GameCoverDrawer = ({ covers, title, open, onOpenChange }: GameCoverDrawerProps) => {
  const t = useTranslations('Components.Game.Cover.GameCoverDrawer')
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>{t('title')}</DrawerTitle>
          <DrawerDescription>{title}</DrawerDescription>
        </DrawerHeader>
        <GameCoverContent covers={covers} title={title} className="overflow-auto px-4 pb-4" />
      </DrawerContent>
    </Drawer>
  )
}
