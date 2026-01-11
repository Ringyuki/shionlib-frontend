'use client'

import { useState, useCallback } from 'react'
import { useTranslations } from 'next-intl'
import { shionlibRequest } from '@/utils/shionlib-request'
import { toast } from 'react-hot-toast'
import { DeveloperRelation } from '@/interfaces/game/game.interface'
import { SearchDeveloper } from './developer/Search'
import { DeveloperItem } from './developer/Item'
import { useEditPermissionStore } from '@/store/editPermissionStore'
import { Empty } from '@/components/common/content/Empty'

interface DeveloperEditProps {
  initRelations: DeveloperRelation[]
  id: number
}

export const Developer = ({ initRelations, id }: DeveloperEditProps) => {
  const t = useTranslations('Components.Game.Edit.Developer')
  const [relations, setRelations] = useState(initRelations)
  const fetchRelations = useCallback(async () => {
    try {
      const res = await shionlibRequest().get<DeveloperRelation[]>(`/edit/game/${id}/developers`)
      setRelations(res.data || [])
    } catch {}
  }, [id])

  const { permissions } = useEditPermissionStore()
  if (!permissions?.relationFields.includes('MANAGE_DEVELOPERS')) {
    return <Empty title={t('noPermission')} />
  }

  const handleAdd = async () => {
    toast.success(t('added'))
    await fetchRelations()
  }
  const handleRemove = async (id: number) => {
    setRelations(relations.filter(relation => relation.id !== id))
    toast.success(t('removed'))
    await fetchRelations()
  }
  const handleEditSave = async (id: number, role: string) => {
    setRelations(relations.map(relation => (relation.id === id ? { ...relation, role } : relation)))
    toast.success(t('updated'))
    await fetchRelations()
  }

  return (
    <div className="space-y-6">
      <DeveloperItem
        relations={relations}
        game_id={id}
        onRemove={handleRemove}
        onEdit={handleEditSave}
      />

      <SearchDeveloper relations={relations} onAdd={handleAdd} game_id={id} />
    </div>
  )
}
