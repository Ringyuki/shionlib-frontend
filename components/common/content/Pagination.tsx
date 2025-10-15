'use client'

import * as React from 'react'

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

type ExtraQuery = Record<string, string | number | boolean | undefined>

export type ContentPaginationProps = {
  currentPage: number
  totalPages: number
  pageParam?: string
  pageSizeParam?: string
  pageSize?: number
  extraQuery?: ExtraQuery
  siblingCount?: number
  boundaryCount?: number
  showPrevNext?: boolean
  hideIfSinglePage?: boolean
  size?: 'icon' | 'default'
  className?: string
}

function buildHref(
  basePath: string,
  page: number,
  options: {
    pageParam: string
    pageSizeParam: string
    pageSize?: number
    extraQuery?: ExtraQuery
  },
): string {
  const { pageParam, pageSizeParam, pageSize, extraQuery } = options
  const params = new URLSearchParams()

  params.set(pageParam, String(page))
  if (typeof pageSize === 'number' && !Number.isNaN(pageSize)) {
    params.set(pageSizeParam, String(pageSize))
  }

  if (extraQuery) {
    for (const [key, value] of Object.entries(extraQuery)) {
      if (value === undefined) continue
      params.set(key, String(value))
    }
  }

  const queryString = params.toString()
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
    siblingCount = 1,
    boundaryCount = 1,
    showPrevNext = true,
    hideIfSinglePage = true,
    size = 'icon',
    className,
  } = props

  const basePath = usePathname()

  if (!totalPages || totalPages < 1) {
    if (hideIfSinglePage) return null
  }

  const safeTotalPages = Math.max(1, totalPages)
  const safeCurrentPage = Math.max(1, Math.min(currentPage, safeTotalPages))

  const items = computePageItems(safeCurrentPage, safeTotalPages, siblingCount, boundaryCount)

  const makeHref = (page: number) =>
    buildHref(basePath, page, { pageParam, pageSizeParam, pageSize, extraQuery })

  return (
    <UIPagination className={className}>
      <PaginationContent>
        {showPrevNext && (
          <PaginationItem>
            <PaginationPrevious
              href={makeHref(safeCurrentPage - 1)}
              disabled={safeCurrentPage === 1}
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
              <PaginationLink href={makeHref(it)} isActive={it === safeCurrentPage} size={size}>
                {it}
              </PaginationLink>
            </PaginationItem>
          ),
        )}

        {showPrevNext && (
          <PaginationItem>
            <PaginationNext
              href={makeHref(safeCurrentPage + 1)}
              disabled={safeCurrentPage === safeTotalPages}
            />
          </PaginationItem>
        )}
      </PaginationContent>
    </UIPagination>
  )
}
