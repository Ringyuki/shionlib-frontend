'use client'

import useMasonry from '@/hooks/useMasonry'

interface MasonryProps {
  children: React.ReactNode
}

export function Masonry({ children }: MasonryProps) {
  const masonryContainer = useMasonry()
  return (
    <div
      ref={masonryContainer}
      className="grid items-start gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6"
    >
      {children}
    </div>
  )
}
