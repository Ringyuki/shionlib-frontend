'use client'

import { useEffect } from 'react'
import { PrimeReactProvider } from 'primereact/api'
import { locale, addLocale } from 'primereact/api'
import { all as locales } from 'primelocale'
import { useLocale } from 'next-intl'
import { SupportedLocales } from '@/config/i18n/supported'

export default function ShionlibProvider({ children }: { children: React.ReactNode }) {
  const localeString = useLocale() as SupportedLocales
  const localeStringMap: Record<SupportedLocales, string> = {
    en: 'en',
    zh: 'zh-CN',
    ja: 'ja',
  }
  const currentLocaleKey = (localeStringMap[localeString] ?? 'en') as keyof typeof locales

  useEffect(() => {
    const newLocale = locales[currentLocaleKey] ?? locales['en']
    addLocale(currentLocaleKey, newLocale)
    locale(currentLocaleKey)
  }, [currentLocaleKey])

  return <PrimeReactProvider value={{ ripple: true }}>{children}</PrimeReactProvider>
}
