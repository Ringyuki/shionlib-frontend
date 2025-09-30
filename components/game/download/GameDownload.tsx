import { useState, useEffect } from 'react'
import { shionlibRequest } from '@/utils/shionlib-request'
import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { GameDownloadDrawer } from './GameDownloadDrawer'
import { GameDownloadDialog } from './GameDownloadDialog'
import { useMedia } from 'react-use'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'

interface GameDownloadDrawerProps {
  game_id: number
  open: boolean
  onLoadingChange: (loading: boolean) => void
  onOpenChange: (open: boolean) => void
}

export const GameDownload = ({
  game_id,
  open,
  onLoadingChange,
  onOpenChange,
}: GameDownloadDrawerProps) => {
  const isMobile = useMedia('(max-width: 1536px)', false)
  const t = useTranslations('Components.Game.Download.GameDownload')

  const [downloadResources, setDownloadResources] = useState<GameDownloadResource[]>([])
  const [isReady, setIsReady] = useState(false)
  useEffect(() => {
    if (!open) {
      setIsReady(false)
      return
    }
    let isCancelled = false
    setIsReady(false)
    onLoadingChange(true)
    const fetchDownload = async () => {
      try {
        const res = await shionlibRequest().get<GameDownloadResource[]>(
          `/game/${game_id}/download-source`,
        )
        if (res.data?.length === 0) {
          setIsReady(false)
          onLoadingChange(false)
          onOpenChange(false)
          toast.error(t('noDownloadSource'))
          return
        }
        if (!isCancelled) {
          setDownloadResources(res.data ?? [])
          setIsReady(true)
        }
      } catch {
      } finally {
        if (!isCancelled) {
          onLoadingChange(false)
        }
      }
    }
    fetchDownload()
    return () => {
      isCancelled = true
      onLoadingChange(false)
    }
  }, [open, game_id])

  return (
    <div className="hidden">
      {isMobile ? (
        <GameDownloadDrawer
          downloadResources={downloadResources}
          open={open && isReady}
          onOpenChange={onOpenChange}
        />
      ) : (
        <GameDownloadDialog
          downloadResources={downloadResources}
          open={open && isReady}
          onOpenChange={onOpenChange}
        />
      )}
    </div>
  )
}
