interface ShionlibApiRes<T> {
  code: number
  message: string
  data: T | PaginatedRes<T> | null
  requestId: string
  timestamp: string
}

interface PaginatedRes<T> {
  items: T[]
  meta: {
    totalItems: number
    itemCount: number
    itemsPerPage: number
    totalPages: number
    currentPage: number
  }
}

export interface FieldError {
  field: string
  messages: string[]
}

export interface BasicResponse<T> extends ShionlibApiRes<T> {
  data: T | null
}

export type PaginatedResponse<T> = PaginatedRes<T>

export interface ErrorResponse
  extends ShionlibApiRes<{
    errors: FieldError[]
  }> {
  data: {
    errors: FieldError[]
  }
}
