import { create } from 'zustand'
import { Aria2Settings, TestStatus } from '@/interfaces/aria2/aria2.interface'
import { persist, createJSONStorage } from 'zustand/middleware'

interface Aria2Store {
  settings: Aria2Settings
  getSettings: () => Aria2Settings
  setSettings: (settings: Partial<Aria2Settings>) => void
}

export const initialSettings: Aria2Settings = {
  protocol: 'http',
  host: 'localhost',
  port: 16800,
  path: '/jsonrpc',
  auth_secret: '',
  downloadPath: '',
}

const ensureAllFields = (settings: Partial<Aria2Settings>): Aria2Settings => ({
  protocol: settings.protocol ?? initialSettings.protocol,
  host: settings.host ?? initialSettings.host,
  port: settings.port ?? initialSettings.port,
  path: settings.path ?? initialSettings.path,
  auth_secret: settings.auth_secret ?? initialSettings.auth_secret,
  downloadPath: settings.downloadPath ?? initialSettings.downloadPath,
})

export const useAria2Store = create<Aria2Store>()(
  persist(
    (set, get) => ({
      settings: initialSettings,
      getSettings: () => ensureAllFields(get().settings),
      setSettings: (settings: Partial<Aria2Settings>) =>
        set({ settings: ensureAllFields(settings) }),
    }),
    {
      name: 'shionlib-aria2-settings-store',
      storage: createJSONStorage(() => localStorage),
    },
  ),
)

export interface Aria2TestStore {
  testStatus: TestStatus
  testMessage: string
  setTestStatus: (status: TestStatus) => void
  setTestMessage: (message: string) => void
}

const initialTestStatus: TestStatus = 'idle'
const initialTestMessage: string = ''
export const useAria2TestStore = create<Aria2TestStore>(set => ({
  testStatus: initialTestStatus,
  testMessage: initialTestMessage,
  setTestStatus: (status: TestStatus) => set({ testStatus: status }),
  setTestMessage: (message: string) => set({ testMessage: message }),
}))
