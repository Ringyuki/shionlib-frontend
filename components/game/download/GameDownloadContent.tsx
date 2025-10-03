import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { cn } from '@/utils/cn'
import { GameDownloadResourceItem } from './GameDownloadResourceItem'
import { Alert, AlertDescription, AlertTitle } from '@/components/shionui/Alert'
import { useTranslations } from 'next-intl'
import { AlertCircle } from 'lucide-react'
import bbcodeToHtml from '@/utils/bbcode-format'

interface GameDownloadContentProps {
  className?: string
  downloadResources: GameDownloadResource[]
}

export const GameDownloadContent = ({ downloadResources, className }: GameDownloadContentProps) => {
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
          <span
            dangerouslySetInnerHTML={{
              __html: bbcodeToHtml(t('alertDescription')),
            }}
          />
        </AlertDescription>
      </Alert>
      {downloadResources.map(resource => (
        <GameDownloadResourceItem key={resource.id} resource={resource} />
      ))}
    </div>
  )
}
