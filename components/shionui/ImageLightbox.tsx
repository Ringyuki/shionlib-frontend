'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { createPortal } from 'react-dom'
import { FadeImage } from '@/components/common/shared/FadeImage'

interface ImageLightboxProps {
  src: string
  alt?: string
  className?: string
  aspectRatio?: string
  children?: React.ReactNode
  lightboxMaxSize?: number
  wrapElement?: 'span' | 'div'
}

const isBrowser = typeof window !== 'undefined'
const isMobile = () => {
  if (!isBrowser) return false
  return window.innerWidth < 1024
}

const ImageLightbox = React.forwardRef<HTMLElement, ImageLightboxProps>(
  (
    {
      src,
      alt = '',
      className,
      aspectRatio,
      children,
      lightboxMaxSize = isMobile() ? 0.9 : 0.6,
      wrapElement = 'div',
    },
    ref,
  ) => {
    const [isOpen, setIsOpen] = React.useState(false)
    const [isAnimating, setIsAnimating] = React.useState(false)
    const [userScale, setUserScale] = React.useState(1)
    const [mounted, setMounted] = React.useState(false)
    const containerRef = React.useRef<HTMLElement>(null)
    const [imageBounds, setImageBounds] = React.useState<DOMRect | null>(null)
    const [imageNaturalSize, setImageNaturalSize] = React.useState<{
      width: number
      height: number
    } | null>(null)
    const [displaySrc, setDisplaySrc] = React.useState<string>('')
    const [targetSize, setTargetSize] = React.useState<{
      width: number
      height: number
    } | null>(null)

    React.useImperativeHandle(ref, () => containerRef.current as HTMLElement)

    React.useEffect(() => {
      setMounted(true)
    }, [])

    const handleOpen = () => {
      if (containerRef.current) {
        const imgElement = containerRef.current.querySelector('img')
        if (imgElement) {
          setImageBounds(imgElement.getBoundingClientRect())

          const currentWidth = imgElement.naturalWidth || imgElement.width
          const currentHeight = imgElement.naturalHeight || imgElement.height

          setImageNaturalSize({
            width: currentWidth,
            height: currentHeight,
          })

          const imageRatio = currentWidth / currentHeight
          const maxWidth = window.innerWidth * lightboxMaxSize
          const maxHeight = window.innerHeight * lightboxMaxSize

          let finalWidth = maxWidth
          let finalHeight = finalWidth / imageRatio

          if (finalHeight > maxHeight) {
            finalHeight = maxHeight
            finalWidth = finalHeight * imageRatio
          }

          setTargetSize({
            width: finalWidth,
            height: finalHeight,
          })

          const optimizedSrc = imgElement.src
          setDisplaySrc(optimizedSrc)

          setIsOpen(true)
          setIsAnimating(true)

          const originalSrc =
            src.startsWith('http') || src.includes('blob:')
              ? src
              : process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_URL + src

          if (originalSrc !== optimizedSrc) {
            const originalImg = new Image()
            originalImg.onload = () => {
              setImageNaturalSize({
                width: originalImg.naturalWidth,
                height: originalImg.naturalHeight,
              })
              setDisplaySrc(originalSrc)
            }
            originalImg.src = originalSrc
          }
        } else {
          setImageBounds(containerRef.current.getBoundingClientRect())
          setIsOpen(true)
          setIsAnimating(true)
        }
      }
      setUserScale(1)
    }

    const handleClose = () => {
      setIsOpen(false)
      setUserScale(1)
    }

    const handleExitComplete = () => {
      setIsAnimating(false)
    }

    const handleWheel = React.useCallback((e: WheelEvent) => {
      e.preventDefault()
      setUserScale(prev => {
        const delta = e.deltaY * -0.001
        const newScale = prev + delta
        return Math.min(Math.max(0.5, newScale), 5)
      })
    }, [])

    React.useEffect(() => {
      if (isOpen) {
        const handleKeyDown = (e: KeyboardEvent) => {
          if (e.key === 'Escape') {
            handleClose()
          }
        }

        window.addEventListener('keydown', handleKeyDown)
        return () => window.removeEventListener('keydown', handleKeyDown)
      }
    }, [isOpen])

    React.useEffect(() => {
      if (isOpen) {
        document.body.style.overflow = 'hidden'
        return () => {
          document.body.style.overflow = ''
        }
      }
    }, [isOpen])

    const WrapElement = wrapElement

    return (
      <>
        {children ? (
          <WrapElement
            ref={containerRef as any}
            onClick={handleOpen}
            className={className}
            style={{
              visibility: isAnimating ? 'hidden' : 'visible',
            }}
          >
            {children}
          </WrapElement>
        ) : (
          <WrapElement
            ref={containerRef as any}
            onClick={handleOpen}
            className={className}
            style={{
              cursor: 'zoom-in',
              visibility: isAnimating ? 'hidden' : 'visible',
            }}
          >
            <FadeImage src={src} alt={alt} aspectRatio={aspectRatio} wrapElement={wrapElement} />
          </WrapElement>
        )}

        {mounted &&
          createPortal(
            <AnimatePresence onExitComplete={handleExitComplete}>
              {isOpen &&
                imageBounds &&
                imageNaturalSize &&
                displaySrc &&
                targetSize &&
                (() => {
                  const targetWidth = targetSize.width
                  const targetHeight = targetSize.height
                  const scaleFromOriginal = targetWidth / imageBounds.width

                  return (
                    <>
                      <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.25, ease: 'easeOut' }}
                        className="fixed inset-0 z-[9999] bg-black/90"
                        onClick={handleClose}
                        style={{ cursor: 'zoom-out' }}
                      />
                      <div className="fixed inset-0 z-[10000] flex items-center justify-center pointer-events-none">
                        <motion.img
                          src={displaySrc}
                          alt={alt}
                          initial={{
                            x: imageBounds.left + imageBounds.width / 2 - window.innerWidth / 2,
                            y: imageBounds.top + imageBounds.height / 2 - window.innerHeight / 2,
                            scale: 1 / scaleFromOriginal,
                          }}
                          animate={{
                            x: 0,
                            y: 0,
                            scale: userScale,
                            transition: {
                              duration: 0.4,
                              ease: [0.25, 0.1, 0.25, 1],
                            },
                          }}
                          exit={{
                            x: imageBounds.left + imageBounds.width / 2 - window.innerWidth / 2,
                            y: imageBounds.top + imageBounds.height / 2 - window.innerHeight / 2,
                            scale: 1 / scaleFromOriginal,
                            transition: {
                              duration: 0.35,
                              ease: [0.25, 0.1, 0.25, 1],
                            },
                          }}
                          style={{
                            width: targetWidth,
                            height: targetHeight,
                            cursor: 'default',
                            pointerEvents: 'auto',
                          }}
                          onClick={e => e.stopPropagation()}
                          onWheel={handleWheel as any}
                        />
                      </div>
                    </>
                  )
                })()}
            </AnimatePresence>,
            document.body,
          )}
      </>
    )
  },
)

ImageLightbox.displayName = 'ImageLightbox'

export { ImageLightbox }
