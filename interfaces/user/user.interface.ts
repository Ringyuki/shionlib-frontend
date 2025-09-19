import { SupportedLocales } from '@/config/i18n/supported'

export interface User {
  id: number
  name: string
  avatar: string
  cover: string
  bio: string
  role: number
  lang: SupportedLocales
}
