import { BasicResponse, ErrorResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { resolvePreferredLocale } from './language-preference'
import { ShionlibBizError } from '@/libs/errors'
import { ShouldRefreshCodes, IsFatalAuthByCodes } from '@/enums/auth/auth-status.enum'
import { useShionlibUserStore } from '@/store/userStore'

let refreshPromise: Promise<void> | null = null
const shouldRefresh = (code: number) => {
  return ShouldRefreshCodes.includes(code)
}
const isFatalAuthByCode = (code: number) => {
  return IsFatalAuthByCodes.includes(code)
}

const isBrowser = typeof window !== 'undefined'

export const shionlibRequest = () => {
  const basicFetch = async <T>(
    path: string,
    options: RequestInit,
    params?: Record<string, any>,
  ): Promise<BasicResponse<T>> => {
    const baseUrl = isBrowser
      ? process.env.NEXT_PUBLIC_PROD_API_PATH
      : `http://localhost:${process.env.INTERNAL_API_PORT}`

    const init = async (): Promise<RequestInit> => {
      const headers = new Headers(await buildHeaders(options))
      if (!isBrowser) {
        const { cookies } = await import('next/headers')
        const cookieString = (await cookies()).toString()
        if (cookieString) headers.set('Cookie', cookieString)
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

    const requestOnce = async (): Promise<BasicResponse<T>> => {
      const opt = await init()
      const res = await fetch(reqUrl(), opt)
      const data = (await res.json().catch(() => ({}))) as BasicResponse<T>
      return data
    }

    const data = await requestOnce()
    if (data && data.code === 0) return data

    if (isFatalAuthByCode(data.code)) {
      await doLogout(baseUrl!)
      throw new ShionlibBizError(data.code, data.message)
    }
    if (shouldRefresh(data.code)) {
      try {
        await doRefresh(baseUrl!)
        const retried = await requestOnce()
        if (retried.code === 0) return retried
      } catch {
        throw new ShionlibBizError(data.code, data.message)
      }
    }

    let mod
    if (isBrowser) {
      mod = await import('react-hot-toast')
    }
    if (data.code !== 0) {
      if (data.code <= 1000) {
        if (isBrowser && mod) {
          mod.toast.error(
            `${data.message}${
              (data as ErrorResponse).data?.errors
                ? `: ${(data as ErrorResponse).data.errors
                    .map(error => error.messages.map(message => `${message}`))
                    .join('\n')}`
                : ''
            } (${data.code})`,
          )
        }
        console.error(data)
        throw new Error(data.message)
      }
      if (isBrowser && mod) {
        mod?.toast.error(
          `${data.message}${
            (data as ErrorResponse).data?.errors
              ? `: ${(data as ErrorResponse).data.errors
                  .map(error => error.messages.map(message => `${message}`))
                  .join('\n')}`
              : ''
          } (${data.code})`,
        )
      }
      console.error(data)
      throw new ShionlibBizError(data.code, data.message)
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
