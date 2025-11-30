import { SupportedLocales } from '@/config/i18n/supported'

export interface Ad {
  id: number
  image_zh: string
  image_jp?: string
  image_en?: string
  aspect: string
  link: string
  excludeLocales?: SupportedLocales[]
}
