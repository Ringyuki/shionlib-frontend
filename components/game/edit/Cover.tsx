'use client'

import { GameCover } from '@/interfaces/game/game.interface'
import { Edit } from './cover/Edit'
import { useEditPermissionStore } from '@/store/editPermissionStore'
import { Empty } from '@/components/common/content/Empty'
import { useTranslations } from 'next-intl'
import { useState } from 'react'

interface CoverProps {
  covers: GameCover[]
}

export const Cover = ({ covers: initialCovers }: CoverProps) => {
  const [covers, setCovers] = useState(initialCovers)
  const { permissions } = useEditPermissionStore()
  const t = useTranslations('Components.Game.Edit.Cover')
  if (!permissions?.relationFields.includes('MANAGE_COVERS')) {
    return <Empty title={t('noPermission')} />
  }

  const handleSuccess = (data: GameCover, id: number) => {
    setCovers(prev => prev.map(prev => (prev.id === id ? { ...data, id } : prev)))
  }
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {covers.map(cover => (
        <Edit key={cover.url} cover={cover} onSuccess={handleSuccess} />
      ))}
    </div>
  )
}
