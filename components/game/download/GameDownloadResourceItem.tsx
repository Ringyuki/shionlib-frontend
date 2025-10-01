import { GameDownloadResource } from '@/interfaces/game/game-download-resource'
import { MdWindow } from 'react-icons/md'
import { FaApple, FaAndroid, FaLinux } from 'react-icons/fa'
import {
  SiPlaystationvita,
  SiNintendoswitch,
  SiPlaystationportable,
  SiPlaystation4,
  SiPlaystation3,
} from 'react-icons/si'
import { FcDvdLogo } from 'react-icons/fc'
import { Badge } from '@/components/shionui/Badge'
import { Avatar } from '@/components/common/user/Avatar'
import { platformTokenMap } from '@/interfaces/game/game.interface'
import { platformNameMap } from '@/interfaces/game/game.interface'
import { LanguageNameMap } from '@/interfaces/game/game.interface'
import { GameDownloadFileItem } from './GameDownloadFileItem'

interface GameDownloadResourceItemProps {
  resource: GameDownloadResource
}

const PlatformIconMap = {
  win: MdWindow,
  ios: FaApple,
  and: FaAndroid,
  lin: FaLinux,
  ps3: SiPlaystation3,
  ps4: SiPlaystation4,
  psp: SiPlaystationportable,
  psv: SiPlaystationvita,
  swi: SiNintendoswitch,
  dvd: FcDvdLogo,
}

export const GameDownloadResourceItem = ({ resource }: GameDownloadResourceItemProps) => {
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
          <Avatar user={resource.creator} className="size-6 text-xs" />
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
