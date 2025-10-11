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
    i18nPath: true,
  })
  return router
}
