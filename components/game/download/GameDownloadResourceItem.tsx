import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { Badge } from '@/components/shionui/Badge'
import { Avatar } from '@/components/common/user/Avatar'
import { GamePlatform } from '@/components/game/description/GamePlatform'
import { LanguageNameMap } from '@/interfaces/game/game.interface'
import { GameDownloadFileItem } from './GameDownloadFileItem'
import { timeFromNow } from '@/utils/time-format'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'
import { Edit } from './edit/Edit'
import { Delete } from './delete/Delete'
import { useShionlibUserStore } from '@/store/userStore'

interface GameDownloadResourceItemProps {
  resource: GameDownloadResource
  onUpdate: (id: number, data: Partial<GameDownloadResource>) => void
  onDelete: (id: number) => void
}

export const GameDownloadResourceItem = ({
  resource,
  onUpdate,
  onDelete,
}: GameDownloadResourceItemProps) => {
  const locale = useLocale()
  const t = useTranslations('Components.Game.Download.GameDownloadResourceItem')

  const { user } = useShionlibUserStore()
  const showEdit = user.id === resource.creator.id || user.role !== 1
  const showDelete = user.role !== 1
  return (
    <div
      key={resource.id}
      className="flex flex-col gap-2 rounded-lg border border-accent p-4 break-words break-all"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2">
            <GamePlatform platform={resource.platform} />
            {resource.language?.map(l => {
              return (
                <Badge key={l} variant="neutral">
                  {LanguageNameMap[l]}
                </Badge>
              )
            })}
          </div>
          <div className="flex gap-2 items-center shrink-0">
            <Avatar user={resource.creator} className="size-6 text-xs" />
            <span className="text-muted-foreground text-xs font-light flex items-center gap-1">
              <span>{t('created')}</span>
              {timeFromNow(resource.created, locale)}
            </span>
          </div>
        </div>
      </div>
      <div className="flex flex-col gap-2 rounded-lg w-full">
        {resource.files.map(file => (
          <GameDownloadFileItem key={file.id} file={file} />
        ))}
        {resource.note && <div className="text-xs font-light font-mono! pl-2">{resource.note}</div>}
      </div>
      <div className="flex gap-2 items-center justify-end">
        {showEdit && <Edit downloadResource={resource} onSuccess={onUpdate} />}
        {showDelete && <Delete id={resource.id} onSuccess={onDelete} />}
      </div>
    </div>
  )
}
