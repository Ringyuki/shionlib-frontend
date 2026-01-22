'use client'

import { Favorite } from '@/interfaces/favorite/favorite.interface'
import { FavoriteListItem } from './FavoriteListItem'
import { FavoriteCreate } from '@/components/favorite/create/Create'
import { useState } from 'react'
import { useShionlibUserStore } from '@/store/userStore'

interface FavoriteListProps {
  favorites: Favorite[]
  selectedId?: number
  userId: string
}

export const FavoriteList = ({ favorites, selectedId, userId }: FavoriteListProps) => {
  const { user } = useShionlibUserStore()
  const [favoritesList, setFavoritesList] = useState(favorites)
  const handleSuccess = (favorite: Favorite) => {
    setFavoritesList(prev => [...prev, favorite])
  }
  return (
    <div className="flex flex-col gap-2 md:sticky top-40">
      {favoritesList.map(favorite => (
        <FavoriteListItem
          key={favorite.id}
          favorite={favorite}
          selected={favorite.id === selectedId}
          userId={userId}
        />
      ))}
      {user.id === Number(userId) && <FavoriteCreate onSuccess={handleSuccess} />}
    </div>
  )
}
