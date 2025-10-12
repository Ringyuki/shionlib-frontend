'use client'

import * as React from 'react'
import { motion, AnimatePresence } from 'motion/react'
import { cn } from '@/utils/cn'
import { useTranslations } from 'next-intl'

type SpoilerProps = React.ComponentProps<'div'> & {
  defaultOpen?: boolean
  open?: boolean
  onOpenChange?: (open: boolean) => void
  blur?: number
  overlayColor?: string
  showHint?: boolean
  hintText?: string
  showStroke?: boolean
}

function Spoiler({
  children,
  className,
  defaultOpen = false,
  open,
  onOpenChange,
  blur = 10,
  overlayColor = 'rgba(0,0,0,0.25)',
  showHint = false,
  hintText,
  showStroke = false,
  ...props
}: SpoilerProps) {
  const t = useTranslations('Components.ShionUI.Spoiler')
  const isControlled = open !== undefined
  const [internalOpen, setInternalOpen] = React.useState<boolean>(defaultOpen)
  const actualOpen = isControlled ? (open as boolean) : internalOpen

  const containerRef = React.useRef<HTMLDivElement>(null)
  const canvasRef = React.useRef<HTMLCanvasElement>(null)
  const resizeObserverRef = React.useRef<ResizeObserver | null>(null)

  const setOpen = React.useCallback(
    (next: boolean) => {
      if (!isControlled) setInternalOpen(next)
      onOpenChange?.(next)
    },
    [isControlled, onOpenChange],
  )

  const drawOverlay = React.useCallback(() => {
    const canvas = canvasRef.current
    const container = containerRef.current
    if (!canvas || !container) return

    const { width, height } = container.getBoundingClientRect()
    const dpr = Math.max(1, Math.floor(window.devicePixelRatio || 1))
    const w = Math.max(1, Math.floor(width))
    const h = Math.max(1, Math.floor(height))

    canvas.width = w * dpr
    canvas.height = h * dpr
    canvas.style.width = `${w}px`
    canvas.style.height = `${h}px`

    const ctx = canvas.getContext('2d')
    if (!ctx) return

    ctx.setTransform(1, 0, 0, 1, 0, 0)
    ctx.scale(dpr, dpr)

    ctx.fillStyle = overlayColor
    ctx.fillRect(0, 0, w, h)

    ctx.strokeStyle = showStroke ? 'rgba(255,255,255,0.06)' : 'transparent'
    ctx.lineWidth = 1
    for (let i = -h; i < w; i += 16) {
      ctx.beginPath()
      ctx.moveTo(i, 0)
      ctx.lineTo(i + h, h)
      ctx.stroke()
    }
  }, [overlayColor])

  React.useEffect(() => {
    if (!actualOpen) {
      drawOverlay()
    }

    const container = containerRef.current
    if (!container) return

    if (!resizeObserverRef.current) {
      resizeObserverRef.current = new ResizeObserver(() => {
        if (!actualOpen) drawOverlay()
      })
    }

    resizeObserverRef.current.observe(container)
    return () => resizeObserverRef.current?.unobserve(container)
  }, [actualOpen, drawOverlay])

  const handleReveal = () => setOpen(true)

  return (
    <div
      ref={containerRef}
      className={cn('relative overflow-hidden h-full rounded-md', className)}
      {...props}
    >
      <motion.div
        className={cn('h-full', className)}
        data-slot="spoiler-content"
        initial={false}
        animate={{ filter: actualOpen ? 'blur(0px)' : `blur(${blur}px)` }}
        transition={{ type: 'spring', stiffness: 300, damping: 26 }}
      >
        {children}
      </motion.div>

      <AnimatePresence>
        {!actualOpen && (
          <motion.div
            role="button"
            aria-label={t('hintText')}
            tabIndex={0}
            onClick={handleReveal}
            onKeyDown={e => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                handleReveal()
              }
            }}
            className="absolute inset-0 cursor-pointer outline-none"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ type: 'spring', stiffness: 260, damping: 24 }}
          >
            <canvas ref={canvasRef} className="absolute inset-0 block w-full h-full" />

            {showHint && (
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <motion.div
                  className="rounded-md bg-background/70 px-3 py-1 text-sm text-foreground shadow"
                  initial={{ scale: 0.96, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.96, opacity: 0 }}
                  transition={{ type: 'spring', stiffness: 300, damping: 18 }}
                >
                  {hintText || t('hintText')}
                </motion.div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export { Spoiler, type SpoilerProps }
