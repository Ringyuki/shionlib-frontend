import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from '@/components/shionui/Drawer'
import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { GameDownloadContent } from './GameDownloadContent'
import { useTranslations } from 'next-intl'

interface GameDownloadDrawerProps {
  downloadResources: GameDownloadResource[]
  open: boolean
  onOpenChange: (open: boolean) => void
  onUpdate: (id: number, data: Partial<GameDownloadResource>) => void
}

export const GameDownloadDrawer = ({
  downloadResources,
  open,
  onOpenChange,
  onUpdate,
}: GameDownloadDrawerProps) => {
  const t = useTranslations('Components.Game.Download.GameDownloadDrawer')
  return (
    <Drawer open={open} onOpenChange={onOpenChange}>
      <DrawerContent className="min-h-[50vh]">
        <DrawerHeader>
          <DrawerTitle>{t('title')}</DrawerTitle>
        </DrawerHeader>
        <DrawerDescription></DrawerDescription>
        <GameDownloadContent downloadResources={downloadResources} onUpdate={onUpdate} />
      </DrawerContent>
    </Drawer>
  )
}
