import { SupportedLocales } from '@/config/i18n/supported'

export interface User {
  id: number
  name: string
  avatar: string
  cover: string
  bio: string
  role: number
  email?: string
  lang: SupportedLocales
}

export interface UserAvatar {
  id: number
  name: string
  avatar: string
}
