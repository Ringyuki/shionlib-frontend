import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'

interface ShionlibUserInfo {
  id: number
  name: string
  avatar: string
  cover: string
  bio: string
  role: number
}

const initialUser: ShionlibUserInfo = {
  id: 0,
  name: '',
  avatar: '',
  cover: '',
  bio: '',
  role: 1,
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
