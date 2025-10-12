import { create } from 'zustand'
import { Aria2Settings } from '@/interfaces/aria2/aria2.interface'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Aria2Store {
  settings: Aria2Settings
  getSettings: () => Aria2Settings
  setSettings: (settings: Aria2Settings) => void
}

const initialSettings: Aria2Settings = {
  port: 16800,
  auth_secret: '',
}

export const useAria2Store = create<Aria2Store>()(
  persist(
    (set, get) => ({
      settings: initialSettings,
      getSettings: () => get().settings,
      setSettings: (settings: Aria2Settings) => set({ settings }),
    }),
    {
      name: 'shionlib-aria2-settings-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)
