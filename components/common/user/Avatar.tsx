import * as React from 'react'
import { Avatar as ShionlibAvatar, AvatarImage, AvatarFallback } from '@/components/shionui/Avatar'
import { User, UserAvatar } from '@/interfaces/user/user.interface'
import { cn } from '@/utils/cn'

type UserAvatarProps = {
  user: User | UserAvatar
} & React.ComponentPropsWithoutRef<typeof ShionlibAvatar>

export const Avatar = React.forwardRef<React.ComponentRef<typeof ShionlibAvatar>, UserAvatarProps>(
  ({ user, className, ...props }, ref) => {
    return (
      <ShionlibAvatar ref={ref} className={cn('rounded-full select-none', className)} {...props}>
        <AvatarImage
          src={
            user.avatar
              ? user.avatar.startsWith('http')
                ? user.avatar
                : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + user.avatar
              : ''
          }
        />
        {!user.avatar && (
          <AvatarFallback className="bg-primary/20">
            {user.name.slice(0, 2).toUpperCase()}
          </AvatarFallback>
        )}
      </ShionlibAvatar>
    )
  },
)

Avatar.displayName = 'UserAvatar'
