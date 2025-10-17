'use client'

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'
import { cn } from '@/utils/cn'

type Props = ImageProps & {
  aspectRatio?: string
  localFile?: boolean
}

export function FadeImage({
  className,
  aspectRatio,
  priority,
  fill = true,
  localFile = false,
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false)

  return (
    <div
      className={cn('relative w-full h-full overflow-hidden', className)}
      style={aspectRatio ? { aspectRatio } : undefined}
    >
      <Image
        {...props}
        width={props.width}
        height={props.height}
        src={
          props.src.toString().startsWith('http') || localFile
            ? props.src
            : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL! + props.src
        }
        alt={props.alt ?? ''}
        priority={priority}
        fill={fill}
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
