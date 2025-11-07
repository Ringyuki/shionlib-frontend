import { create } from 'zustand'
import { Aria2Settings } from '@/interfaces/aria2/aria2.interface'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Aria2Store {
  settings: Aria2Settings
  getSettings: () => Aria2Settings
  setSettings: (settings: Aria2Settings) => void
}

const initialSettings: Aria2Settings = {
  protocol: 'http',
  host: 'localhost',
  port: 16800,
  path: '/jsonrpc',
  auth_secret: '',
  downloadPath: '',
}

export const useAria2Store = create<Aria2Store>()(
  persist(
    (set, get) => ({
      settings: initialSettings,
      getSettings: () => {
        const settings = get().settings
        // 确保所有字段都有默认值，防止旧数据缺少新字段
        return {
          protocol: settings.protocol ?? initialSettings.protocol,
          host: settings.host ?? initialSettings.host,
          port: settings.port ?? initialSettings.port,
          path: settings.path ?? initialSettings.path,
          auth_secret: settings.auth_secret ?? initialSettings.auth_secret,
          downloadPath: settings.downloadPath ?? initialSettings.downloadPath,
        }
      },
      setSettings: (settings: Aria2Settings) => set({ settings }),
    }),
    {
      name: 'shionlib-aria2-settings-store',
      storage: createJSONStorage(() => localStorage),
      version: 1,
      migrate: (persistedState: any, version: number) => {
        // 迁移旧版本数据，补充缺失的字段
        if (version === 0 || !persistedState) {
          return {
            settings: initialSettings,
          }
        }

        const oldSettings = persistedState.settings || {}
        return {
          settings: {
            protocol: oldSettings.protocol ?? initialSettings.protocol,
            host: oldSettings.host ?? initialSettings.host,
            port: oldSettings.port ?? initialSettings.port,
            path: oldSettings.path ?? initialSettings.path,
            auth_secret: oldSettings.auth_secret ?? initialSettings.auth_secret,
            downloadPath: oldSettings.downloadPath ?? initialSettings.downloadPath,
          },
        }
      },
    },
  ),
)
