import ShionlibProvider from './provider'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Props } from '@/i18n/types/props'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { langMap } from './metadata'
import { SupportedLocales } from '@/config/i18n/supported'
export { generateMetadata } from './metadata'
import '../globals.css'

export default async function ShionlibLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={langMap[locale as SupportedLocales]}>
      <head>
        <link id="theme-link" rel="stylesheet" href="/themes/shionlib/theme.css" />
      </head>
      <body>
        <NextIntlClientProvider>
          <ShionlibProvider>{children}</ShionlibProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
