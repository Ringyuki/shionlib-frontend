import {
  BasicResponse,
  ErrorResponse,
  FieldError,
} from '@/interfaces/api/shionlib-api-res.interface'
import { resolvePreferredLocale } from './language-preference'
import { ShionlibBizError } from '@/libs/errors'
import { SHOULD_REFRESH_CODES, IS_FATAL_AUTH_BY_CODES } from '@/constants/auth/auth-status-codes'
import { NOT_FOUND_CODES } from '@/constants/not-found-codes'
import { useShionlibUserStore } from '@/store/userStore'

let refreshPromise: Promise<void> | null = null
const shouldRefresh = (code: number) => {
  return SHOULD_REFRESH_CODES.includes(code)
}
const isFatalAuthByCode = (code: number) => {
  return IS_FATAL_AUTH_BY_CODES.includes(code)
}

const isBrowser = typeof window !== 'undefined'
const baseUrl = isBrowser
  ? process.env.NEXT_PUBLIC_PROD_API_PATH
  : `http://localhost:${process.env.INTERNAL_API_PORT}`

export const shionlibRequest = ({
  forceThrowError = false,
  forceNotThrowError = false,
}: { forceThrowError?: boolean; forceNotThrowError?: boolean } = {}) => {
  const basicFetch = async <T>(
    path: string,
    options: RequestInit,
    params?: Record<string, any>,
  ): Promise<BasicResponse<T>> => {
    const init = async (): Promise<RequestInit> => {
      const headers = new Headers(await buildHeaders(options))
      if (!isBrowser) {
        const { cookies, headers: nextHeaders } = await import('next/headers')
        const cookieString = (await cookies()).toString()
        if (cookieString) headers.set('Cookie', cookieString)
        try {
          const incoming = await nextHeaders()
          const realIp =
            incoming.get('cf-connecting-ip') ||
            incoming.get('x-forwarded-for')?.split(',')[0]?.trim()
          if (realIp) headers.set('x-real-ip', realIp)
        } catch {}
      }
      // if body is FormData, we will not manually set Content-Type so browser can set boundary.
      const opt: RequestInit = { ...options, headers, credentials: 'include' }
      const maybeBody: any = (opt as any).body
      if (maybeBody instanceof FormData) {
        headers.delete('Content-Type')
      }
      return opt
    }
    const reqUrl = () =>
      `${baseUrl}${path}${params ? `?${new URLSearchParams(params).toString()}` : ''}`

    const requestOnce = async (): Promise<{ data: BasicResponse<T>; headers: Headers }> => {
      const opt = await init()
      const res = await fetch(reqUrl(), opt)
      const data = (await res.json().catch(() => ({}))) as BasicResponse<T>
      const headers = res.headers
      return { data, headers }
    }

    let rht
    let sileo
    if (isBrowser) {
      // rht = await import('react-hot-toast')
      rht = { toast: { error: (message: string) => {} } }
      sileo = await import('sileo')
    }

    const { data, headers } = await requestOnce()
    if (data && data.code === 0) return data

    if (isFatalAuthByCode(data.code)) {
      if (rht) rht.toast.error(data.message)
      if (sileo) sileo.sileo.error({ title: data.message })
      await doLogout(baseUrl!)
      throw new ShionlibBizError(data.code, data.message)
    }
    if (shouldRefresh(data.code)) {
      try {
        await doRefresh(baseUrl!)
        const { data: retried } = await requestOnce()
        if (retried.code === 0) return retried
      } catch {
        if (forceNotThrowError) return data
        throw new ShionlibBizError(data.code, data.message)
      }
    }

    if (data.code !== 0) {
      if (forceNotThrowError) return data
      if (data.code <= 1000) {
        if (data.code === 429) {
          const retryAfter = headers.get('retry-after-download') || headers.get('retry-after')
          rht && rht.toast.error(formatErrors(data as ErrorResponse, retryAfter || undefined))
          sileo &&
            sileo.sileo.error({
              title: formatErrors(data as ErrorResponse, retryAfter || undefined),
            })
        } else {
          rht && rht.toast.error(formatErrors(data as ErrorResponse))
          sileo && sileo.sileo.error({ title: formatErrors(data as ErrorResponse) })
        }

        throw new Error(data.message)
      }
      rht && rht.toast.error(formatErrors(data as ErrorResponse))
      sileo && sileo.sileo.error({ title: formatErrors(data as ErrorResponse) })
      if (!NOT_FOUND_CODES.includes(data.code) || forceThrowError) {
        throw new ShionlibBizError(data.code, data.message)
      }
    }

    return data
  }

  const get = async <T>(
    path: string,
    config?: { params?: Record<string, any>; options?: RequestInit },
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(
      path,
      {
        method: 'GET',
        ...config?.options,
      },
      config?.params,
    )
  }
  const post = async <T>(
    path: string,
    config?: { data?: Record<string, any>; params?: Record<string, any>; options?: RequestInit },
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(
      path,
      {
        method: 'POST',
        body: config?.data ? JSON.stringify(config.data) : undefined,
        ...config?.options,
      },
      config?.params,
    )
  }
  const put = async <T>(
    path: string,
    config?: { data?: Record<string, any>; params?: Record<string, any>; options?: RequestInit },
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(
      path,
      {
        method: 'PUT',
        body: config?.data ? JSON.stringify(config.data) : undefined,
        ...config?.options,
      },
      config?.params,
    )
  }
  const _delete = async <T>(
    path: string,
    config?: { data?: Record<string, any>; params?: Record<string, any>; options?: RequestInit },
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(
      path,
      {
        method: 'DELETE',
        body: config?.data ? JSON.stringify(config.data) : undefined,
        ...config?.options,
      },
      config?.params,
    )
  }
  const patch = async <T>(
    path: string,
    config?: { data?: Record<string, any>; params?: Record<string, any>; options?: RequestInit },
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(
      path,
      {
        method: 'PATCH',
        body: config?.data ? JSON.stringify(config.data) : undefined,
        ...config?.options,
      },
      config?.params,
    )
  }

  const _fetch = async <T>(
    path: string,
    config?: {
      method: string
      data?: any
      params?: Record<string, any>
      options?: RequestInit
    },
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(
      path,
      {
        method: config?.method,
        body: config?.data,
        ...config?.options,
      },
      config?.params,
    )
  }

  return {
    get,
    post,
    put,
    delete: _delete,
    patch,
    fetch: _fetch,
  }
}

const buildHeaders = async (options?: RequestInit): Promise<HeadersInit> => {
  const preferred = await resolvePreferredLocale()
  const existing = options?.headers

  if (existing instanceof Headers) {
    const h = new Headers(existing)
    if (!h.has('Content-Type')) h.set('Content-Type', 'application/json')
    if (!h.has('Accept-Language')) h.set('Accept-Language', preferred)
    return h
  }

  if (Array.isArray(existing)) {
    const h = new Headers(existing)
    if (!h.has('Content-Type')) h.set('Content-Type', 'application/json')
    if (!h.has('Accept-Language')) h.set('Accept-Language', preferred)
    return h
  }

  const record: Record<string, string> = {
    'Content-Type': 'application/json',
    'Accept-Language': preferred,
    ...(existing as Record<string, string> | undefined),
  }
  return record
}

const doRefresh = async (baseUrl: string) => {
  if (!refreshPromise) {
    refreshPromise = fetch(`${baseUrl}/auth/token/refresh`, {
      method: 'POST',
      credentials: 'include',
      headers: { 'Content-Type': 'application/json' },
    })
      .then(async res => {
        const data = await res.json().catch(() => ({}))
        if (!(res.ok && data && data.code === 0)) {
          if (isFatalAuthByCode(data.code)) {
            await doLogout(baseUrl)
            throw new ShionlibBizError(data.code, data.message)
          }
          throw new Error((data && data.message) || 'Token refresh failed')
        }
      })
      .finally(() => {
        refreshPromise = null
      })
  }
  return refreshPromise
}

const doLogout = async (baseUrl: string) => {
  return fetch(`${baseUrl}/auth/logout`, {
    method: 'POST',
    credentials: 'include',
    headers: { 'Content-Type': 'application/json' },
  }).finally(async () => {
    refreshPromise = null
    if (isBrowser) {
      useShionlibUserStore.getState().logout()
    }
  })
}

const formatErrors = (data: ErrorResponse, retryAfter?: string) => {
  if (!data.message) return 'Network error'
  const msg = `${data.message}${retryAfter ? ` Retry after ${retryAfter} seconds` : ''}${
    (data as ErrorResponse).data?.errors
      ? Array.isArray((data as ErrorResponse).data.errors)
        ? `: ${((data as ErrorResponse).data.errors as FieldError[])
            .flatMap(error => error.messages)
            .map(message => `${message}`)
            .join('\n')}`
        : `: ${Object.entries((data as ErrorResponse).data.errors)
            .flatMap(([key, value]) => `${key}: ${value}`)
            .map(message => `${message}`)
            .join('\n')}`
      : ''
  }`
  const code = `${data.code}`
  return `${msg} ${code ? `(${code})` : ''}`
}
