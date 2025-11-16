'use client'

import Image, { ImageProps } from 'next/image'
import { useEffect, useState } from 'react'
import type { SyntheticEvent } from 'react'
import { Skeleton } from '@/components/shionui/Skeleton'
import { cn } from '@/utils/cn'

type Props = ImageProps & {
  aspectRatio?: string
  localFile?: boolean
  wrapElement?: 'span' | 'div'
}

export function FadeImage({
  className,
  aspectRatio,
  priority,
  fill = true,
  localFile = false,
  wrapElement = 'div',
  ...props
}: Props) {
  const [loaded, setLoaded] = useState(false)
  const imageSrc = props.src
  const ContainerElement = wrapElement === 'span' ? 'span' : 'div'
  useEffect(() => {
    if (!imageSrc) return
    setLoaded(false)
  }, [imageSrc])
  const srcAsString = typeof imageSrc === 'string' ? imageSrc : imageSrc ? `${imageSrc}` : ''
  const shouldBypass =
    !srcAsString ||
    typeof imageSrc !== 'string' ||
    srcAsString.startsWith('http') ||
    localFile ||
    srcAsString.includes('assets') ||
    srcAsString.includes('blob:') ||
    srcAsString.includes('data:image')
  const resolvedSrc = !imageSrc
    ? undefined
    : shouldBypass
      ? imageSrc
      : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL! + srcAsString

  const handleLoad = (event: SyntheticEvent<HTMLImageElement>) => {
    setLoaded(true)
    props.onLoad?.(event)
  }
  const shouldShowSkeleton = Boolean(imageSrc)
  return (
    <ContainerElement
      className={cn(
        'relative w-full h-full overflow-hidden',
        wrapElement === 'span' ? 'inline-block' : '',
        className,
      )}
      style={aspectRatio ? { aspectRatio } : {}}
    >
      {shouldShowSkeleton && (
        <Skeleton
          as={wrapElement}
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
          }}
          className={cn(
            'pointer-events-none transition-opacity duration-300',
            loaded ? 'opacity-0' : 'opacity-100',
          )}
        />
      )}
      {imageSrc && (
        <Image
          {...props}
          width={props.width}
          height={props.height}
          src={resolvedSrc || imageSrc}
          alt={props.alt ?? ''}
          priority={priority}
          fill={fill}
          onLoad={handleLoad}
          className={cn(
            'object-cover transition-opacity duration-300 ease-out',
            loaded ? 'opacity-100' : 'opacity-0',
            className,
          )}
        />
      )}
    </ContainerElement>
  )
}
