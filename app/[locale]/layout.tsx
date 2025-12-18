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
import { toastProps } from './toastOption'
import ShionlibTopBar from '@/components/common/top-bar/TopBar'
import { GlobalDialogs } from '@/components/common/user/GlobalDialogs'
import { TokenRefresh } from '@/components/common/auth/TokenRefresh'
import { Noto_Sans, Noto_Sans_SC, Noto_Sans_JP, Noto_Sans_Mono } from 'next/font/google'
import { ShionlibFooter } from '@/components/common/footer/Footer'
import { Cinzel } from 'next/font/google'
import { UmamiProvider } from '@/components/common/site/UmamiProvider'
import { OpenPanelProvider } from '@/components/common/site/OpenPanelProvider'
import { RybbitProvider } from '@/components/common/site/RybbitProvider'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800', '900'],
  display: 'swap',
  variable: '--font-cinzel',
})
const notoSans_Latin = Noto_Sans({
  display: 'swap',
  variable: '--font-latin',
  subsets: ['latin'],
})
const notoSans_SC = Noto_Sans_SC({
  display: 'swap',
  variable: '--font-sc',
  subsets: ['latin'],
})
const notoSans_JP = Noto_Sans_JP({
  display: 'swap',
  variable: '--font-jp',
  subsets: ['latin'],
})
const notoSans_Mono = Noto_Sans_Mono({
  display: 'swap',
  variable: '--font-mono',
  subsets: ['latin'],
})

export default async function ShionlibLayout({ children, params }: Readonly<Props>) {
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <html
      lang={langMap[locale as SupportedLocales]}
      className={`${notoSans_Latin.variable} ${notoSans_SC.variable} ${notoSans_JP.variable} ${notoSans_Mono.variable} ${cinzel.variable}`}
      suppressHydrationWarning
    >
      <head>
        <UmamiProvider />
        <OpenPanelProvider />
        <RybbitProvider />
      </head>
      <body>
        <TokenRefresh />
        <NextIntlClientProvider>
          <div className="relative flex flex-col items-center justify-center min-h-screen bg-radial">
            <ShionlibProvider>
              <ShionlibTopBar />
              <div
                data-vaul-drawer-wrapper
                className="flex min-h-[calc(100dvh-24rem)] w-full max-w-7xl grow px-3 pt-16 topbar:pt-20"
              >
                {children}
              </div>
              <ShionlibFooter />
              <GlobalDialogs />
              <Toaster {...toastProps} />
            </ShionlibProvider>
          </div>
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
