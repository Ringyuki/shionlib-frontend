import { cn } from '@/utils/cn'

interface MasonryProps {
  children: React.ReactNode
  className?: string
}

export function Masonry({ children, className }: MasonryProps) {
  return (
    <div
      className={cn(
        'w-full columns-2 sm:columns-3 md:columns-4 lg:columns-5 xl:columns-6 gap-x-8',
        className,
      )}
    >
      {children}
    </div>
  )
}
