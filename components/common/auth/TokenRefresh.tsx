'use client'

import { shionlibRequest } from '@/utils/shionlib-request'
import { useShionlibUserStore } from '@/store/userStore'
import { useEffect } from 'react'

const getMe = async () => {
  return await shionlibRequest()
    .get('/user/me')
    .catch(() => {})
}

export const TokenRefresh = () => {
  const isBrowser = typeof window !== 'undefined'
  const isLogin = useShionlibUserStore(state => !!state.user?.id)
  useEffect(() => {
    if (!isBrowser) return
    if (isLogin) {
      getMe()
    }
    setInterval(
      () => {
        if (isLogin && isBrowser) {
          getMe()
        }
      },
      1000 * 60 * 1, // 1 minutes
    )
  }, [isLogin, isBrowser])

  return null
}
