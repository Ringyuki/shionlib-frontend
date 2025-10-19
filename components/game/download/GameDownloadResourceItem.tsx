import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { MdWindow, MdWeb } from 'react-icons/md'
import { FaApple, FaAndroid, FaLinux } from 'react-icons/fa'
import {
  SiPlaystationvita,
  SiNintendoswitch,
  SiPlaystationportable,
  SiPlaystation4,
  SiPlaystation3,
  SiMacos,
  SiPlaystation2,
  SiNintendo3Ds,
} from 'react-icons/si'
import { FcDvdLogo } from 'react-icons/fc'
import { Badge } from '@/components/shionui/Badge'
import { Avatar } from '@/components/common/user/Avatar'
import { platformTokenMap, Platform } from '@/interfaces/game/game.interface'
import { platformNameMap } from '@/interfaces/game/game.interface'
import { LanguageNameMap } from '@/interfaces/game/game.interface'
import { GameDownloadFileItem } from './GameDownloadFileItem'
import { timeFromNow } from '@/utils/time-format'
import { useLocale } from 'next-intl'
import { useTranslations } from 'next-intl'

interface GameDownloadResourceItemProps {
  resource: GameDownloadResource
}

const PlatformIconMap: Record<Platform, React.ElementType> = {
  win: MdWindow,
  ios: FaApple,
  and: FaAndroid,
  lin: FaLinux,
  ps2: SiPlaystation2,
  ps3: SiPlaystation3,
  ps4: SiPlaystation4,
  psp: SiPlaystationportable,
  psv: SiPlaystationvita,
  swi: SiNintendoswitch,
  dvd: FcDvdLogo,
  mac: SiMacos,
  mob: MdWeb,
  web: MdWeb,
  vnd: MdWeb,
  drc: MdWeb,
  gba: SiNintendo3Ds,
  nds: SiNintendo3Ds,
}

export const GameDownloadResourceItem = ({ resource }: GameDownloadResourceItemProps) => {
  const locale = useLocale()
  const t = useTranslations('Components.Game.Download.GameDownloadResourceItem')
  return (
    <div
      key={resource.id}
      className="flex flex-col gap-2 rounded-lg border border-accent p-4 break-words break-all"
    >
      <div className="flex flex-col gap-2 w-full">
        <div className="flex justify-between items-center">
          <div className="flex flex-wrap gap-2 shrink-0">
            {resource.platform?.map(p => {
              const IconComponent = PlatformIconMap[p]
              return (
                <Badge
                  key={p}
                  style={{
                    backgroundColor: platformTokenMap[p].bg,
                    color: platformTokenMap[p].fg,
                    userSelect: 'none',
                  }}
                >
                  <IconComponent className="size-4" />
                  {platformNameMap[p]}
                </Badge>
              )
            })}
            {resource.language?.map(l => {
              return (
                <Badge key={l} variant="neutral">
                  {LanguageNameMap[l]}
                </Badge>
              )
            })}
          </div>
          <div className="flex gap-2 items-center">
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
        {resource.note && (
          <div className="text-xs text-muted-foreground font-light font-mono pl-2">
            {resource.note}
          </div>
        )}
      </div>
    </div>
  )
}
