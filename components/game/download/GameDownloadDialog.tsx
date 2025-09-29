import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/shionui/Dialog'
import { GameDownloadContent } from './GameDownloadContent'
import { useTranslations } from 'next-intl'

interface GameDownloadDialogProps {
  downloadResources: GameDownloadResource[]
  open: boolean
  onOpenChange: (open: boolean) => void
}

export const GameDownloadDialog = ({
  downloadResources,
  open,
  onOpenChange,
}: GameDownloadDialogProps) => {
  const t = useTranslations('Components.Game.Download.GameDownloadDialog')
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent fitContent>
        <DialogHeader>
          <DialogTitle>{t('title')}</DialogTitle>
        </DialogHeader>
        <GameDownloadContent className="px-0 pb-0" downloadResources={downloadResources} />
      </DialogContent>
    </Dialog>
  )
}
