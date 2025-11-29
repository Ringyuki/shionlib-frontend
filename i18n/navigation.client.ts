'use client'

import { createNavigation } from 'next-intl/navigation'
import { routing } from './routing'
import { useRouter as useBPRouter } from '@bprogress/next'
import { useCallback, useMemo } from 'react'

type BPRouterInstance = ReturnType<typeof useBPRouter>
type RouterHref = Parameters<BPRouterInstance['push']>[0]
type RouterPushOptions = Parameters<BPRouterInstance['push']>[1]
type RouterReplaceOptions = Parameters<BPRouterInstance['replace']>[1]

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

  const stripLeadingLocale = useCallback(
    (url: URL) => {
      const parts = url.pathname.split('/')
      if (parts.length > 1 && parts[1] && locales.includes(parts[1] as any)) {
        parts.splice(1, 1)
        url.pathname = parts.join('/') || '/'
      }
      return url
    },
    [locales],
  )

  const isSameIgnoringLocale = useCallback(
    (href: RouterHref) => {
      const current = new URL(location.href)
      const target = new URL(typeof href === 'string' ? href : String(href), location.href)
      const a = stripLeadingLocale(current)
      const b = stripLeadingLocale(target)
      return a.pathname === b.pathname && a.search === b.search
    },
    [stripLeadingLocale],
  )

  const push = useCallback(
    (href: RouterHref, options?: RouterPushOptions) => {
      const same = isSameIgnoringLocale(href)
      return router.push(href, same ? { ...options, showProgress: false } : options)
    },
    [router, isSameIgnoringLocale],
  )

  const replace = useCallback(
    (href: RouterHref, options?: RouterReplaceOptions) => {
      const same = isSameIgnoringLocale(href)
      return router.replace(href, same ? { ...options, showProgress: false } : options)
    },
    [router, isSameIgnoringLocale],
  )

  return useMemo(
    () => ({
      ...router,
      push,
      replace,
    }),
    [router, push, replace],
  )
}
