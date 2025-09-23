import { Badge } from '@/components/shionui/Badge'
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
import { Platform } from '@/interfaces/game/game.interface'
import { cn } from '@/utils/cn'

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

interface GamePlatformProps {
  platform: Platform[]
  className?: string
}

const platformNameMap: Record<Platform, string> = {
  win: 'Windows',
  ios: 'iOS',
  and: 'Android',
  lin: 'Linux',
  ps3: 'PlayStation 3',
  ps4: 'PlayStation 4',
  psv: 'PlayStation Vita',
  psp: 'PlayStation Portable',
  swi: 'Nintendo Switch',
  dvd: 'DVD',
}
const platformTokenMap: Record<Platform, { bg: string; fg: string }> = {
  win: { bg: 'var(--platform-win)', fg: 'var(--platform-win-fg)' },
  ios: { bg: 'var(--platform-ios)', fg: 'var(--platform-ios-fg)' },
  and: { bg: 'var(--platform-and)', fg: 'var(--platform-and-fg)' },
  lin: { bg: 'var(--platform-lin)', fg: 'var(--platform-lin-fg)' },
  ps3: { bg: 'var(--platform-ps3)', fg: 'var(--platform-ps3-fg)' },
  ps4: { bg: 'var(--platform-ps4)', fg: 'var(--platform-ps4-fg)' },
  psv: { bg: 'var(--platform-psv)', fg: 'var(--platform-psv-fg)' },
  psp: { bg: 'var(--platform-psp)', fg: 'var(--platform-psp-fg)' },
  swi: { bg: 'var(--platform-swi)', fg: 'var(--platform-swi-fg)' },
  dvd: { bg: 'var(--platform-dvd)', fg: 'var(--platform-dvd-fg)' },
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
