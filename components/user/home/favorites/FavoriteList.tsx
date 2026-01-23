'use client'

import { Favorite } from '@/interfaces/favorite/favorite.interface'
import { FavoriteListItem } from './FavoriteListItem'
import { FavoriteCreate } from '@/components/favorite/create/Create'
import { useState } from 'react'
import { ScrollArea } from '@/components/shionui/ScrollArea'
import { UserProfile } from '@/interfaces/user/user.interface'

interface FavoriteListProps {
  favorites: Favorite[]
  selectedId?: number
  userId: string
  currentUser: UserProfile | null
}

export const FavoriteList = ({ favorites, selectedId, userId, currentUser }: FavoriteListProps) => {
  const [favoritesList, setFavoritesList] = useState(favorites)
  const handleSuccess = (favorite: Favorite) => {
    setFavoritesList(prev => [...prev, favorite])
  }
  return (
    <div className="flex flex-col gap-4">
      <ScrollArea className="h-64 md:min-h-12 md:max-h-[calc(100vh-32rem)] md:h-auto">
        <div className="flex flex-col gap-4">
          {favoritesList.map(favorite => (
            <FavoriteListItem
              key={favorite.id}
              favorite={favorite}
              selected={favorite.id === selectedId}
              userId={userId}
            />
          ))}
        </div>
      </ScrollArea>
      {currentUser?.id === Number(userId) && <FavoriteCreate onSuccess={handleSuccess} />}
    </div>
  )
}
