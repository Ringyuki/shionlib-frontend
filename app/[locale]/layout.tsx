import ShionlibProvider from './provider'
import { Toaster } from 'react-hot-toast'
import { NextIntlClientProvider, hasLocale } from 'next-intl'
import { Props } from '@/i18n/types/props'
import { notFound } from 'next/navigation'
import { routing } from '@/i18n/routing'
import { langMap } from './metadata'
import { SupportedLocales } from '@/config/i18n/supported'
export { generateMetadata } from './metadata'
import '@/public/assets/styles/globals.css'
import { toastOptions } from './toastOption'
import ShionlibTopBar from '@/components/common/top-bar/TopBar'
import { GlobalDialogs } from '@/components/common/user/GlobalDialogs'
import { TokenRefresh } from '@/components/common/auth/TokenRefresh'

export default async function ShionlibLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html lang={langMap[locale as SupportedLocales]} suppressHydrationWarning>
      <body>
        <TokenRefresh />
        <NextIntlClientProvider>
          <div className="relative flex flex-col items-center justify-center min-h-screen bg-radial">
            <ShionlibProvider>
              <ShionlibTopBar />
              <div className="flex min-h-[calc(100dvh-24rem)] w-full max-w-7xl grow px-3 pt-16 md:pt-20">
                {children}
              </div>
              <GlobalDialogs />
              <Toaster toastOptions={toastOptions} />
            </ShionlibProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
