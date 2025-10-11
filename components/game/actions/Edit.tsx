import { Button } from '@/components/shionui/Button'
import { Pencil } from 'lucide-react'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Permission } from '@/interfaces/edit/permisson.interface'
import { useEditPermissionStore } from '@/store/editPermissionStore'
import { useRouter } from '@/i18n/navigation.client'

interface EditProps {
  game_id: number
}

export const Edit = ({ game_id }: EditProps) => {
  const [editLoading, setEditLoading] = useState(false)
  const t = useTranslations('Components.Game.Actions')
  const { setPermissions } = useEditPermissionStore()
  const router = useRouter()

  const getPermissions = async () => {
    try {
      setEditLoading(true)
      const data = await shionlibRequest().post<Permission>(`/permissions`, {
        data: {
          entity: 'game',
        },
      })
      setPermissions(data.data as Permission)
      router.push(`/game/${game_id}/edit/scalar`, { scroll: true })
      return data.data
    } catch {
    } finally {
      setEditLoading(false)
    }
  }

  return (
    <Button
      intent="primary"
      appearance="ghost"
      loginRequired
      loading={editLoading}
      onClick={getPermissions}
      renderIcon={<Pencil />}
    >
      <span className="hidden md:block">{t('edit')}</span>
    </Button>
  )
}
