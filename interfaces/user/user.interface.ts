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
  content_limit?: ContentLimit
}

export interface UserAvatar {
  id: number
  name: string
  avatar: string
}

export enum ContentLimit {
  NEVER_SHOW_NSFW_CONTENT = 1,
  SHOW_WITH_SPOILER = 2,
  JUST_SHOW = 3,
}
