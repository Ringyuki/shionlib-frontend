import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { SupportedLocales, supportedLocalesEnum } from '@/config/i18n/supported'

interface ShionlibUserInfo {
  id: number
  name: string
  avatar: string
  cover: string
  bio: string
  role: number
  lang: SupportedLocales
}

const initialUser: ShionlibUserInfo = {
  id: 0,
  name: '',
  avatar: '',
  cover: '',
  bio: '',
  role: 1,
  lang: supportedLocalesEnum.EN,
}

export interface ShionlibUserStore {
  user: ShionlibUserInfo
  setUser: (user: ShionlibUserInfo) => void
  logout: () => void
}

export const useShionlibUserStore = create<ShionlibUserStore>()(
  persist(
    set => ({
      user: initialUser,
      setUser: (user: ShionlibUserInfo) =>
        set(() => ({
          user,
        })),
      logout: () =>
        set(() => ({
          user: initialUser,
        })),
    }),
    {
      name: 'shionlib-user-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
