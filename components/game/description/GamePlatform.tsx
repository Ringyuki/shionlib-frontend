import { Badge } from '@/components/shionui/Badge'
import { MdWindow, MdPhoneIphone, MdWeb } from 'react-icons/md'
import { FaAndroid, FaLinux } from 'react-icons/fa'
import {
  SiPlaystationvita,
  SiNintendoswitch,
  SiPlaystationportable,
  SiPlaystation4,
  SiPlaystation3,
  SiPlaystation2,
  SiMacos,
  SiIos,
} from 'react-icons/si'
import { FcDvdLogo } from 'react-icons/fc'
import { Platform } from '@/interfaces/game/game.interface'
import { platformNameMap, platformTokenMap } from '@/interfaces/game/game.interface'
import { cn } from '@/utils/cn'

const PlatformIconMap: Record<Platform, React.ElementType> = {
  win: MdWindow,
  ios: SiIos,
  and: FaAndroid,
  lin: FaLinux,
  mac: SiMacos,
  ps2: SiPlaystation2,
  ps3: SiPlaystation3,
  ps4: SiPlaystation4,
  psp: SiPlaystationportable,
  psv: SiPlaystationvita,
  swi: SiNintendoswitch,
  dvd: FcDvdLogo,
  mob: MdPhoneIphone,
  web: MdWeb,
  vnd: MdPhoneIphone,
  drc: MdPhoneIphone,
}
interface GamePlatformProps {
  platform: Platform[]
  className?: string
}

export const GamePlatform = ({ platform, className }: GamePlatformProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2 items-center', className)}>
      {platform
        .filter(p => Object.keys(PlatformIconMap).includes(p))
        ?.map(p => {
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
    </div>
  )
}
