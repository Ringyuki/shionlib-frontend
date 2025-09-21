import { cn } from '@/utils/cn'

interface MasonryProps {
  children: React.ReactNode
  className?: string
}

export function Masonry({ children, className }: MasonryProps) {
  return (
    <div
      className={cn(
        'w-full columns-2 sm:columns-3 md:columns-3 lg:columns-4 xl:columns-4 2xl:columns-5 gap-x-8',
        className,
      )}
    >
      {children}
    </div>
  )
}
