interface ShionlibApiRes<T> {
  code: number
  message: string
  data: T | PaginatedRes<T> | null
  requestId: string
  timestamp: string
}

export interface PaginatedMeta {
  totalItems: number
  itemCount: number
  itemsPerPage: number
  totalPages: number
  currentPage: number
}

type MetaBase = PaginatedMeta

interface PaginatedRes<
  T,
  E extends Record<string, unknown> = Record<string, string | number | boolean | undefined>,
> {
  items: T[]
  meta: MetaBase & E
}

export interface FieldError {
  field: string
  messages: string[]
}

export interface BasicResponse<T> extends ShionlibApiRes<T> {
  data: T | null
}

export type PaginatedResponse<
  T,
  E extends Record<string, unknown> = Record<string, string | number | boolean | undefined>,
> = PaginatedRes<T, E>

export interface ErrorResponse
  extends ShionlibApiRes<{
    errors: FieldError[]
  }> {
  data: {
    errors: FieldError[]
  }
}
