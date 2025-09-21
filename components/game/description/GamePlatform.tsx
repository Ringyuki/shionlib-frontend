import { Badge } from '@/components/shionui/Badge'
import { MdWindow } from 'react-icons/md'
import { FaApple, FaAndroid } from 'react-icons/fa'
import {
  SiPlaystationvita,
  SiNintendoswitch,
  SiPlaystationportable,
  SiPlaystation4,
  SiPlaystation3,
} from 'react-icons/si'
import { FcDvdLogo } from 'react-icons/fc'
import { Platform, platformTokenMap, platformNameMap } from '@/interfaces/game/game.interface'
import { cn } from '@/utils/cn'

const PlatformIconMap = {
  win: MdWindow,
  ios: FaApple,
  and: FaAndroid,
  ps3: SiPlaystation3,
  ps4: SiPlaystation4,
  psp: SiPlaystationportable,
  psv: SiPlaystationvita,
  swi: SiNintendoswitch,
  dvd: FcDvdLogo,
}

interface GamePlatformProps {
  platform: Platform[]
  className?: string
}

export const GamePlatform = ({ platform, className }: GamePlatformProps) => {
  return (
    <div className={cn('flex flex-wrap gap-2 items-center', className)}>
      {platform?.map(p => {
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
