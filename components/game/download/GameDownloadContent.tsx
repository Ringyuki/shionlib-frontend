import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { cn } from '@/utils/cn'
import { GameDownloadResourceItem } from './GameDownloadResourceItem'
import { Alert, AlertDescription, AlertTitle } from '@/components/shionui/Alert'
import { useTranslations } from 'next-intl'
import { AlertCircle } from 'lucide-react'
import { BBCodeContent } from '@/components/common/content/BBCode'
import { Ad } from '@/components/common/site/Ad'

interface GameDownloadContentProps {
  className?: string
  downloadResources: GameDownloadResource[]
  onUpdate: (id: number, data: Partial<GameDownloadResource>) => void
  onDelete: (id: number) => void
}

export const GameDownloadContent = ({
  downloadResources,
  className,
  onUpdate,
  onDelete,
}: GameDownloadContentProps) => {
  const t = useTranslations('Components.Game.Download.GameDownloadContent')
  return (
    <div
      className={cn(
        'flex flex-col gap-2 max-w-7xl px-3 mx-auto overflow-y-auto pb-4 lg:min-w-2xl',
        className,
      )}
    >
      <Alert intent="warning" appearance="solid" className="max-w-full">
        <AlertCircle />
        <AlertTitle>{t('alertTitle')}</AlertTitle>
        <AlertDescription>
          <BBCodeContent content={t('alertDescription', { duration: 120 })} />
        </AlertDescription>
      </Alert>
      {downloadResources
        .sort((a, b) => b.downloads - a.downloads)
        .map(resource => (
          <GameDownloadResourceItem
            key={resource.id}
            resource={resource}
            onUpdate={onUpdate}
            onDelete={onDelete}
          />
        ))}
      <Ad id={2} />
    </div>
  )
}
