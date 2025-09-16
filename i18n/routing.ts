import { defineRouting } from 'next-intl/routing'
import { supportedLocales } from '@/config/i18n/supported'
import { supportedLocalesEnum } from '@/config/i18n/supported'

export const routing = defineRouting({
  locales: supportedLocales,

  defaultLocale: supportedLocalesEnum.EN,
})
