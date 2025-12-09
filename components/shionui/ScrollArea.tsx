'use client'

import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'

import { cn } from '@/utils/cn'

function ScrollArea({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={cn('relative isolate rounded-[inherit] bg-transparent overflow-hidden', className)}
      onWheelCapture={e => {
        e.stopPropagation()
      }}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport
        data-slot="scroll-area-viewport"
        className="focus-visible:ring-ring/50 h-full w-full max-h-[inherit] overflow-auto overscroll-contain rounded-[inherit] bg-transparent transition-[color,box-shadow,background-color] outline-none focus-visible:ring-[3px] focus-visible:outline-1 [scrollbar-width:none] [-ms-overflow-style:none] [&::-webkit-scrollbar]:hidden"
      >
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}

function ScrollBar({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      forceMount
      orientation={orientation}
      className={cn(
        'group/scrollbar flex touch-none select-none p-[2px] transition-opacity duration-200 ease-out data-[state=visible]:opacity-100 data-[state=hidden]:opacity-0 data-[state=hidden]:pointer-events-none',
        orientation === 'vertical' && 'h-full w-3 border-l border-l-transparent pl-1',
        orientation === 'horizontal' && 'h-3 flex-col border-t border-t-transparent pt-1',
        className,
      )}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb
        data-slot="scroll-area-thumb"
        className="relative flex-1 rounded-full bg-[rgba(0,0,0,0.44)] transition-[background-color,opacity,height,width] before:absolute before:inset-[-6px] before:rounded-full before:bg-transparent group-hover/scrollbar:bg-[rgba(0,0,0,0.55)] group-active/scrollbar:bg-[rgba(0,0,0,0.66)]"
      />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}

export { ScrollArea, ScrollBar }
