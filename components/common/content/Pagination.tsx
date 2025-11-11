'use client'

import {
  Pagination as UIPagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
} from '@/components/shionui/Pagination'
import { usePathname } from '@/i18n/navigation.client'
import qs from 'qs'

export type ExtraQuery = Record<
  string,
  string | string[] | number | number[] | boolean | boolean[] | undefined
>

export type ContentPaginationProps = {
  currentPage: number
  totalPages: number
  pageParam?: string
  pageSizeParam?: string
  pageSize?: number
  extraQuery?: ExtraQuery | Record<string, any>
  needQsParse?: boolean
  siblingCount?: number
  boundaryCount?: number
  showPrevNext?: boolean
  hideIfSinglePage?: boolean
  size?: 'icon' | 'default'
  className?: string
  onPageChange?: (page: number) => void
  noRouteChange?: boolean
  loading?: boolean
}

function buildHref(
  basePath: string,
  page: number,
  options: {
    pageParam: string
    pageSizeParam: string
    pageSize?: number
    extraQuery?: ExtraQuery
    needQsParse?: boolean
  },
): string {
  const { pageParam, pageSizeParam, pageSize, extraQuery } = options
  const qObj: Record<string, any> = {
    [pageParam]: page,
  }
  if (typeof pageSize === 'number' && !Number.isNaN(pageSize)) {
    qObj[pageSizeParam] = pageSize
  }
  if (extraQuery && Object.keys(extraQuery).length) {
    Object.assign(qObj, extraQuery)
  }

  const queryString = qs.stringify(qObj, { arrayFormat: 'brackets' })
  return queryString ? `${basePath}?${queryString}` : basePath
}

function computePageItems(
  currentPage: number,
  totalPages: number,
  siblingCount: number,
  boundaryCount: number,
): Array<number | 'ellipsis'> {
  const pages = new Set<number>()

  for (let i = 1; i <= Math.min(boundaryCount, totalPages); i++) {
    pages.add(i)
  }

  for (let i = Math.max(totalPages - boundaryCount + 1, 1); i <= totalPages; i++) {
    pages.add(i)
  }

  const startSibling = Math.max(currentPage - siblingCount, 1)
  const endSibling = Math.min(currentPage + siblingCount, totalPages)
  for (let i = startSibling; i <= endSibling; i++) {
    pages.add(i)
  }

  const sorted = Array.from(pages).sort((a, b) => a - b)

  const withEllipsis: Array<number | 'ellipsis'> = []
  for (let i = 0; i < sorted.length; i++) {
    const page = sorted[i]
    withEllipsis.push(page)
    const next = sorted[i + 1]
    if (next && next - page > 1) {
      withEllipsis.push('ellipsis')
    }
  }
  return withEllipsis
}

export const Pagination = (props: ContentPaginationProps) => {
  const {
    currentPage,
    totalPages,
    pageParam = 'page',
    pageSizeParam = 'pageSize',
    pageSize,
    extraQuery,
    needQsParse = false,
    siblingCount = 1,
    boundaryCount = 1,
    showPrevNext = true,
    hideIfSinglePage = true,
    size = 'icon',
    className,
    onPageChange,
    noRouteChange = false,
    loading = false,
  } = props

  const basePath = usePathname()

  if (!totalPages || totalPages < 1) {
    if (hideIfSinglePage) return null
  }

  const safeTotalPages = Math.max(1, totalPages)
  const safeCurrentPage = Math.max(1, Math.min(currentPage, safeTotalPages))

  const items = computePageItems(safeCurrentPage, safeTotalPages, siblingCount, boundaryCount)

  const makeHref = (page: number) =>
    buildHref(basePath, page, { pageParam, pageSizeParam, pageSize, extraQuery, needQsParse })

  return (
    <UIPagination className={className}>
      <PaginationContent>
        {showPrevNext && (
          <PaginationItem>
            <PaginationPrevious
              href={makeHref(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1 || loading}
              noRouteChange={noRouteChange}
              onClick={() => {
                if (safeCurrentPage === 1) return
                onPageChange?.(safeCurrentPage - 1)
              }}
            />
          </PaginationItem>
        )}

        {items.map((it, index) =>
          it === 'ellipsis' ? (
            <PaginationItem key={`ellipsis-${index}`}>
              <PaginationEllipsis />
            </PaginationItem>
          ) : (
            <PaginationItem key={it}>
              <PaginationLink
                href={makeHref(it)}
                isActive={it === safeCurrentPage}
                disabled={loading}
                size={size}
                noRouteChange={noRouteChange}
                onClick={() => {
                  if (it === safeCurrentPage) return
                  onPageChange?.(it)
                }}
              >
                {it}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {showPrevNext && (
          <PaginationItem>
            <PaginationNext
              href={makeHref(safeCurrentPage + 1)}
              disabled={safeCurrentPage === safeTotalPages || loading}
              noRouteChange={noRouteChange}
              onClick={() => {
                if (safeCurrentPage === safeTotalPages) return
                onPageChange?.(safeCurrentPage + 1)
              }}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  )
}
