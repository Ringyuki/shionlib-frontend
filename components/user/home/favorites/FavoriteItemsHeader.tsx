import { Favorite } from '@/interfaces/favorite/favorite.interface'
import { Badge } from '@/components/shionui/Badge'
import { Lock } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { FavoriteAction } from './action/Action'

interface FavoriteItemsHeaderProps {
  favorite: Favorite
}

export const FavoriteItemsHeader = ({ favorite }: FavoriteItemsHeaderProps) => {
  const t = useTranslations('Components.User.Home.Favorites.FavoriteItemsHeader')
  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-col gap-2">
        <div className="flex flex-wrap items-center gap-2">
          <h2 className="text-lg font-semibold">
            {favorite.default ? t('default') : favorite.name}
          </h2>
          {favorite.is_private && (
            <Badge variant="neutral" size="sm" className="gap-1">
              <Lock className="size-3" />
              {t('private')}
            </Badge>
          )}
          <Badge variant="default" size="sm">
            {favorite.game_count}
          </Badge>
        </div>
        {favorite.description ? (
          <p className="text-sm text-muted-foreground">{favorite.description}</p>
        ) : null}
      </div>
      <FavoriteAction favorite={favorite} />
    </div>
  )
}
