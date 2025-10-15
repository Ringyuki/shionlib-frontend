import { Avatar } from '@/components/common/user/Avatar'
import { User } from '@/interfaces/user/user.interface'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuLabel,
  DropdownMenuSeparator,
} from '@/components/shionui/DropdownMenu'
import { Logout } from '@/components/common/top-bar/Logout'
import { Settings } from '@/components/common/top-bar/Settings'
import { Profile } from '@/components/common/top-bar/Profile'

interface AvatarProps {
  user: User
  className?: string
}

export const TopBarAvatar = ({ user, className }: AvatarProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild className={className}>
        <Avatar user={user} />
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-48" side="bottom" align="end">
        <DropdownMenuLabel>
          <div className="flex items-center gap-2">
            <Avatar user={user} />
            <span>{user.name}</span>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <Profile />
        <Settings />
        <Logout />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
