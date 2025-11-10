import { Ad } from '@/interfaces/site/ad.interface'
import { SupportedLocales } from '@/config/i18n/supported'

export const getLocalImageUrl = (locale: SupportedLocales, ad: Ad): string => {
  switch (locale) {
    case 'en':
      return ad.image_en ?? ad.image_jp ?? ad.image_zh
    case 'zh':
      return ad.image_zh
    case 'ja':
      return ad.image_jp ?? ad.image_en ?? ad.image_zh
  }
}
