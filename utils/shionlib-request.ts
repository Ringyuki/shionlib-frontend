import { BasicResponse, ErrorResponse } from '@/interfaces/api/shionlib-api-res.interface'

export const shionlibRequest = () => {
  const isBrowser = typeof window !== 'undefined'
  const baseUrl = isBrowser
    ? process.env.NEXT_PUBLIC_PROD_API_PATH
    : `http://localhost:${process.env.INTERNAL_API_URL}`

  const basicFetch = async <T>(path: string, options: RequestInit): Promise<BasicResponse<T>> => {
    const response = await fetch(`${baseUrl}${path}`, options)
    const data = (await response.json()) as BasicResponse<T>

    if (data.code !== 0) {
      if (isBrowser) {
        try {
          const mod = await import('react-hot-toast')
          mod.toast.error(data.message)
        } catch {}
      }
      console.error((data as ErrorResponse).data.errors)
    }

    return data
  }

  const get = async <T>(path: string, options?: RequestInit): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(path, {
      method: 'GET',
      ...options,
    })
  }
  const post = async <T>(
    path: string,
    data?: Record<string, any>,
    options?: RequestInit,
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(path, {
      method: 'POST',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }
  const put = async <T>(
    path: string,
    data?: Record<string, any>,
    options?: RequestInit,
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(path, {
      method: 'PUT',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }
  const _delete = async <T>(
    path: string,
    data?: Record<string, any>,
    options?: RequestInit,
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(path, {
      method: 'DELETE',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }
  const patch = async <T>(
    path: string,
    data?: Record<string, any>,
    options?: RequestInit,
  ): Promise<BasicResponse<T>> => {
    return await basicFetch<T>(path, {
      method: 'PATCH',
      body: data ? JSON.stringify(data) : undefined,
      ...options,
    })
  }

  return {
    get,
    post,
    put,
    delete: _delete,
    patch,
  }
}
