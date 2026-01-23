'use client'

import { useMemo } from 'react'
import { useSearchParams, useSelectedLayoutSegment } from 'next/navigation'
import { Favorite } from '@/interfaces/favorite/favorite.interface'
import { FavoriteList } from './FavoriteList'
import { UserProfile } from '@/interfaces/user/user.interface'

interface FavoriteSidebarProps {
  userId: string
  favorites: Favorite[]
  currentUser: UserProfile | null
}

export const FavoriteSidebar = ({ userId, currentUser, favorites }: FavoriteSidebarProps) => {
  const segment = useSelectedLayoutSegment()
  const searchParams = useSearchParams()

  const selectedId = useMemo(() => {
    if (!favorites?.length) return undefined
    const folder = searchParams.get('folder')
    const parsedFolderId = folder ? Number(folder) : NaN
    return (
      favorites.find(favorite => favorite.id === parsedFolderId)?.id ||
      favorites.find(favorite => favorite.default)?.id ||
      favorites[0]?.id
    )
  }, [favorites, searchParams])

  const sortedFavorites = useMemo(() => {
    return [...favorites].sort((a, b) => Number(b.default) - Number(a.default))
  }, [favorites])

  if (segment !== 'favorites') return null

  return (
    <FavoriteList
      favorites={sortedFavorites}
      selectedId={selectedId}
      userId={userId}
      currentUser={currentUser}
    />
  )
}
