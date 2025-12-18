import { Heart } from 'lucide-react'
import { cn } from '@/utils/cn'

import { Button } from '@/components/shionui/Button'
import { Tooltip, TooltipTrigger, TooltipContent } from '@/components/shionui/Tooltip'
import { shionlibRequest } from '@/utils/shionlib-request'
import { useState } from 'react'
import { toast } from 'react-hot-toast'
import { useTranslations } from 'next-intl'

interface FavoriteProps {
  isFavorite: boolean
  gameId: number
  className?: string
}

export const Favorite = ({ isFavorite, gameId, className }: FavoriteProps) => {
  const t = useTranslations('Components.Game.Actions')
  const [isFavorite_, setIsFavorite_] = useState(isFavorite)

  const [loading, setLoading] = useState(false)
  const handleFavorite = async () => {
    setLoading(true)
    try {
      await shionlibRequest().post(`/game/${gameId}/favorite`)
      setIsFavorite_(!isFavorite_)
      if (!isFavorite_) {
        toast.success(t('favorited'))
      } else {
        toast.success(t('removeFromFavorites'))
      }
    } catch {
    } finally {
      setLoading(false)
    }
  }
  return (
    <Tooltip>
      <TooltipTrigger asChild className={className}>
        <Button
          size="icon"
          intent="destructive"
          appearance="ghost"
          onClick={handleFavorite}
          loading={loading}
          loginRequired
          renderIcon={() => <Heart className={cn(isFavorite_ && 'fill-destructive')} />}
        />
      </TooltipTrigger>
      <TooltipContent>
        <span>{isFavorite_ ? t('removeFromFavorites') : t('addToFavorites')}</span>
      </TooltipContent>
    </Tooltip>
  )
}
