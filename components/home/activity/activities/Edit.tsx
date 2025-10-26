import { Activity, ActivityType } from '@/interfaces/activity/activity.interface'
import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/shionui/Badge'
import {
  getPreferredContent,
  getPreferredCharacterContent,
} from '@/components/game/description/helpers/getPreferredContent'
import { GameData, GameCharacter } from '@/interfaces/game/game.interface'
import { Developer } from '@/interfaces/developer/developer.interface'
import { getLocale } from 'next-intl/server'
import { Link } from '@/i18n/navigation'

interface EditProps {
  activity: Activity
}

const editTypeMap: Partial<Record<ActivityType, 'game' | 'developer' | 'character'>> = {
  [ActivityType.GAME_EDIT]: 'game',
  [ActivityType.DEVELOPER_EDIT]: 'developer',
  [ActivityType.CHARACTER_EDIT]: 'character',
}
const EditTypeBadge = async ({ type }: { type: keyof typeof editTypeMap }) => {
  const t = await getTranslations('Components.Home.Activity.Activities.Edit')
  const entity = editTypeMap[type]
  return <Badge variant="default">{t(`${entity}`)}</Badge>
}

const getEntityTitle = async (
  entity: 'game' | 'developer' | 'character',
  entityInfo: Activity['game'] | Activity['developer'] | Activity['character'],
) => {
  const locale = await getLocale()
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
  if (entity === 'game') return getPreferredContent(entityInfo as GameData, 'title', lang).title
  if (entity === 'character')
    return getPreferredCharacterContent(entityInfo as GameCharacter, 'name', lang).name
  if (entity === 'developer')
    return (entityInfo as Developer).name || (entityInfo as Developer).aliases?.[0] || 'Unknown'
}

const getEntityLink = (
  entity: 'game' | 'developer' | 'character',
  entityInfo: Activity['game'] | Activity['developer'] | Activity['character'],
) => {
  if (entity === 'game') return `/game/${entityInfo?.id}`
  if (entity === 'character') return `/character/${entityInfo?.id}`
  if (entity === 'developer') return `/developer/${entityInfo?.id}`
  return '#'
}

export const Edit = async ({ activity }: EditProps) => {
  const t = await getTranslations('Components.Home.Activity.Activities.Edit')
  const entityTitle = await getEntityTitle(
    editTypeMap[activity.type]!,
    (activity.game ?? activity.developer ?? activity.character)!,
  )
  const entity = editTypeMap[activity.type]
  return (
    <div className="flex gap-2 items-center flex-wrap">
      <span>{t('editedPrefix')}</span>
      <EditTypeBadge type={activity.type} />
      <Link
        href={getEntityLink(entity!, activity.game ?? activity.developer ?? activity.character)}
        className="font-medium hover:opacity-85 transition-all duration-200"
      >
        {entityTitle}
      </Link>
    </div>
  )
}
