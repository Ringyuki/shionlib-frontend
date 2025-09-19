import { cn } from '@/utils/cn'

type SkeletonProps = React.ComponentProps<'div'> & {
  durationMs?: number
  angleDeg?: number
  tone?: 'neutral' | 'primary'
}

function Skeleton({
  className,
  style,
  durationMs = 1400,
  angleDeg = 100,
  tone = 'neutral',
  ...props
}: SkeletonProps) {
  return (
    <div
      data-slot="skeleton"
      className={cn(
        'skeleton rounded-md',
        tone === 'primary' ? 'skeleton-primary' : 'skeleton-neutral',
        className,
      )}
      style={{
        ['--skeleton-duration' as any]: `${durationMs}ms`,
        ['--skeleton-angle' as any]: `${angleDeg}deg`,
        ...style,
      }}
      {...props}
    />
  )
}

export { Skeleton }
