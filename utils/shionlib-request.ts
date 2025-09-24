import { BasicResponse, ErrorResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { resolvePreferredLocale } from './language-preference'
import { ShionlibBizError } from '@/libs/errors'

export const shionlibRequest = () => {
  const isBrowser = typeof window !== 'undefined'
  const baseUrl = isBrowser
    ? process.env.NEXT_PUBLIC_PROD_API_PATH
    : `http://localhost:${process.env.INTERNAL_API_PORT}`

  const basicFetch = async <T>(
    path: string,
    options: RequestInit,
    params?: Record<string, any>,
  ): Promise<BasicResponse<T>> => {
    const headers = new Headers(await buildHeaders(options))
    if (!isBrowser) {
      const { cookies } = await import('next/headers')
      const cookieString = (await cookies()).toString()
      if (cookieString) headers.set('Cookie', cookieString)
    }
    const token =
      headers.get('Cookie') &&
      headers
        .get('Cookie')
        ?.split('; ')
        .find(cookie => cookie.startsWith('shionlib_access_token='))
        ?.split('=')[1]
    const response = await fetch(
      `${baseUrl}${path}${params ? `?${new URLSearchParams(params).toString()}` : ''}`,
      {
        ...options,
        headers: {
          ...headers,
          ...(await buildHeaders(options)),
          Authorization: `${token ? `Bearer ${token}` : ''}`,
        },
        credentials: 'include',
      },
    )
    const data = (await response.json()) as BasicResponse<T>

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

  return {
    get,
    post,
    put,
    delete: _delete,
    patch,
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
