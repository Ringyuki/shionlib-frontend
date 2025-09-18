'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/libs/cn'

type Props = ImageProps & {
  aspectRatio?: string
}

export function FadeImage({ className, aspectRatio, priority, ...props }: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className="relative w-full overflow-hidden"
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        {...props}
        priority={priority}
        fill
        onLoad={() => setLoaded(true)}
        className={cn(
          'object-cover transition-opacity duration-300 ease-out',
          loaded ? 'opacity-100' : 'opacity-0',
          className,
        )}
      />
    </div>
  )
}
