'use client'

import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'
import { useRouter as useBPRouter } from '@bprogress/next'

const {
  Link,
  redirect,
  usePathname,
  getPathname,
  useRouter: useIntlRouter,
} = createNavigation(routing)

export { Link, redirect, usePathname, getPathname }

export const useRouter = () => {
  const intlRouter = useIntlRouter()
  const router = useBPRouter({
    customRouter: () => intlRouter,
  })
  const locales = routing.locales

  const stripLeadingLocale = (url: URL) => {
    const parts = url.pathname.split('/')
    if (parts.length > 1 && parts[1] && locales.includes(parts[1] as any)) {
      parts.splice(1, 1)
      url.pathname = parts.join('/') || '/'
    }
    return url
  }

  const isSameIgnoringLocale = (href: string) => {
    const current = new URL(location.href)
    const target = new URL(href, location.href)
    const a = stripLeadingLocale(current)
    const b = stripLeadingLocale(target)
    return a.pathname === b.pathname && a.search === b.search
  }

  return {
    ...router,
    push: (href: string, options?: Parameters<typeof router.push>[1]) => {
      const same = isSameIgnoringLocale(href)
      return router.push(href, same ? { ...options, showProgress: false } : options)
    },
    replace: (href: string, options?: Parameters<typeof router.replace>[1]) => {
      const same = isSameIgnoringLocale(href)
      return router.replace(href, same ? { ...options, showProgress: false } : options)
    },
  }
}
