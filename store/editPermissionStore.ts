import { create } from 'zustand'
import { Permission } from '@/interfaces/edit/permisson.interface'

interface EditPermissionStore {
  permissions: Permission | null
  setPermissions: (permissions: Permission) => void
}

export const useEditPermissionStore = create<EditPermissionStore>()(set => ({
  permissions: null,
  setPermissions: (permissions: Permission) => set({ permissions }),
}))
