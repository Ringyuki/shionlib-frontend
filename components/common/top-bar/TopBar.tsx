'use client'

import ThemeSwitcher from '@/components/common/top-bar/ThemeSwitcher'
import { TopBarAvatar } from '@/components/common/top-bar/Avatar'
import { useShionlibUserStore } from '@/store/userStore'
import { useAuthDialogStore } from '@/store/authDialogStore'
import { useState, useEffect } from 'react'
import { Button } from '@/components/shionui/Button'
import { useTranslations } from 'next-intl'
import { Skeleton } from '@/components/shionui/Skeleton'

const startContent = () => {
  return (
    <div className="flex items-center h-full p-5.5 pl-0">
      <img className="h-full" src="/assets/images/shionlib-logo.png" alt="Shionlib Logo" />
    </div>
  )
}

const endContent = () => {
  const { user } = useShionlibUserStore()
  const isLoggedIn = !!user.id
  const t = useTranslations('Components.Common.User.LoginOrRegisteDialog')
  const { openAuthDialog } = useAuthDialogStore()

  const [isLoading, setIsLoading] = useState(true)
  useEffect(() => {
    setIsLoading(false)
  }, [user])

  return (
    <div className="max-h-full flex items-center gap-2">
      <ThemeSwitcher />
      {isLoading ? (
        <Skeleton className="w-[60px] h-[28px] rounded-md" />
      ) : isLoggedIn ? (
        <TopBarAvatar user={user} className="cursor-pointer" />
      ) : (
        <Button size="sm" onClick={() => openAuthDialog('login')}>
          {t('button')}
        </Button>
      )}
    </div>
  )
}

const ShionlibTopBar = () => {
  return (
    <div className="fixed top-4 left-1/2 rounded-xl -translate-x-1/2 z-50 w-full max-w-7xl px-3 h-16 flex items-center justify-between dark:bg-[rgba(255,255,255,0.05)] bg-[rgba(0,0,0,0.05)] backdrop-blur-lg">
      {startContent()}
      {endContent()}
    </div>
  )
}
export default ShionlibTopBar
