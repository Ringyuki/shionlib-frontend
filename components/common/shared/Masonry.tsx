'use client'

import useMasonry from '@/hooks/useMasonry'
import { cn } from '@/utils/cn'

interface MasonryProps {
  children: React.ReactNode
}

export function Masonry({ children }: MasonryProps) {
  const [masonryContainer, isInitialized] = useMasonry()

  return (
    <div
      ref={masonryContainer}
      data-initialized={isInitialized ? 'true' : 'false'}
      className={cn(
        'grid items-start gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 opacity-0 transition-opacity duration-200',
        isInitialized && 'opacity-100',
      )}
    >
      {children}
    </div>
  )
}
