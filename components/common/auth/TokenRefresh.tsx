'use client'

import { shionlibRequest } from '@/utils/shionlib-request'
import { useShionlibUserStore } from '@/store/userStore'
import { useEffect } from 'react'

export const TokenRefresh = () => {
  const isBrowser = typeof window !== 'undefined'
  const isLogin = useShionlibUserStore(state => state.user.id !== 0)
  useEffect(() => {
    if (!isBrowser) return
    setInterval(
      () => {
        if (isLogin && isBrowser) {
          console.log('token refresh')
          shionlibRequest()
            .get('/user/me')
            .catch(() => {})
        }
      },
      1000 * 60 * 10, // 10 minutes
    )
  }, [isLogin, isBrowser])

  return null
}
