import { DeveloperRelation } from '@/interfaces/game/game.interface'
import { Button } from '@/components/shionui/Button'
import { Input } from '@/components/shionui/Input'
import { Link } from '@/i18n/navigation.client'
import { Pencil, Save, Trash2 } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { shionlibRequest } from '@/utils/shionlib-request'

interface DeveloperItemProps {
  relations: DeveloperRelation[]
  game_id: number
  onRemove: (id: number) => void
  onEdit: (id: number, role: string) => void
}

export const DeveloperItem = ({ relations, game_id, onRemove, onEdit }: DeveloperItemProps) => {
  const t = useTranslations('Components.Game.Edit.Developer.Item')
  const [editingId, setEditingId] = useState<number | null>(null)
  const [editRole, setEditRole] = useState('')
  const [removeLoading, setRemoveLoading] = useState(false)
  const [editLoading, setEditLoading] = useState(false)

  const handleRemove = async (relationId: number) => {
    try {
      setRemoveLoading(true)
      await shionlibRequest().delete(`/game/${game_id}/edit/developers`, {
        data: { ids: [relationId] },
      })
      onRemove(relationId)
    } catch {
    } finally {
      setRemoveLoading(false)
    }
  }

  const handleEditStart = (relation: DeveloperRelation) => {
    setEditingId(relation.id)
    setEditRole(relation.role || '')
  }

  const handleEditSave = async (relationId: number, developerId: number) => {
    try {
      setEditLoading(true)
      await shionlibRequest().patch(`/game/${game_id}/edit/developers`, {
        data: {
          developers: [{ id: relationId, developer_id: developerId, role: editRole || null }],
        },
      })
      setEditingId(null)
      onEdit(relationId, editRole)
    } catch {
    } finally {
      setEditLoading(false)
    }
  }
  return (
    <div className="space-y-2">
      <h3 className="text-lg font-semibold">{t('current_developers')}</h3>
      {relations.length === 0 ? (
        <p className="text-muted-foreground">{t('no_developers')}</p>
      ) : (
        <div className="space-y-2">
          {relations.map(relation => (
            <div
              key={relation.id}
              className="flex items-center gap-4 bg-background-soft rounded-md"
            >
              <Link href={`/developer/${relation.developer.id}`}>
                <Button appearance="outline">{relation.developer.name}</Button>
              </Link>
              {editingId === relation.id ? (
                <>
                  <Input
                    value={editRole}
                    onChange={e => setEditRole(e.target.value)}
                    placeholder={t('role_placeholder')}
                    className="w-32"
                  />
                  <Button
                    size="icon"
                    appearance="ghost"
                    renderIcon={<Save className="size-4" />}
                    loading={editLoading}
                    onClick={() => handleEditSave(relation.id, relation.developer_id)}
                  />
                </>
              ) : (
                <>
                  <span className="text-muted-foreground text-sm">
                    {relation.role || t('no_role')}
                  </span>
                  <Button
                    size="icon"
                    appearance="ghost"
                    renderIcon={<Pencil className="size-4" />}
                    onClick={() => handleEditStart(relation)}
                  />
                </>
              )}
              <Button
                size="icon"
                appearance="ghost"
                intent="destructive"
                renderIcon={<Trash2 className="size-4" />}
                loading={removeLoading}
                onClick={() => handleRemove(relation.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
