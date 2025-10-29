import createMiddleware from 'next-intl/middleware'
import { routing } from './i18n/routing'
import { NextRequest } from 'next/server'

const intl = createMiddleware(routing)

export default async function middleware(req: NextRequest) {
  const token = req.cookies.get('shionlib_access_token')?.value
  const refresh_token = req.cookies.get('shionlib_refresh_token')?.value
  let refreshedSetCookies: string[] = []
  if (!token && refresh_token) {
    try {
      const refreshUrl = new URL('/api/auth/token/refresh', req.url)
      const refreshResp = await fetch(refreshUrl.toString(), {
        method: 'POST',
        headers: { cookie: req.headers.get('cookie') || '' },
      })
      const headerAny = refreshResp.headers
      refreshedSetCookies = headerAny.getSetCookie() || []
    } catch {}
  }

  const handled = intl(req)
  if (refreshedSetCookies.length > 0) {
    for (const cookie of refreshedSetCookies) {
      handled.headers.append('Set-Cookie', cookie)
    }
  }
  return handled
}

export const config = {
  // Match all pathnames except for
  // - … if they start with `/api`, `/trpc`, `/_next` or `/_vercel`
  // - … the ones containing a dot (e.g. `favicon.ico`)
  matcher: '/((?!api|trpc|_next|_vercel|og|.*\\..*).*)',
}
