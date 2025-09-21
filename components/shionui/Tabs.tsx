'use client'

import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { AnimatePresence, motion } from 'motion/react'

import { cn } from '@/utils/cn'

type TabsAnimationContextValue = {
  activeValue?: string
}

const TabsAnimationContext = React.createContext<TabsAnimationContextValue | null>(null)

const useTabsAnimationContext = () => {
  const context = React.useContext(TabsAnimationContext)
  if (!context) {
    throw new Error('Tabs components must be used within <Tabs>')
  }
  return context
}

const Tabs = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Root>
>(({ className, value, defaultValue, onValueChange, ...props }, ref) => {
  const [activeValue, setActiveValue] = React.useState<string | undefined>(value ?? defaultValue)

  React.useEffect(() => {
    if (value !== undefined) {
      setActiveValue(value)
    }
  }, [value])

  const handleValueChange = React.useCallback(
    (nextValue: string) => {
      onValueChange?.(nextValue)
      setActiveValue(nextValue)
    },
    [onValueChange],
  )

  const providerValue = React.useMemo(() => ({ activeValue }), [activeValue])

  return (
    <TabsAnimationContext.Provider value={providerValue}>
      <TabsPrimitive.Root
        ref={ref}
        data-slot="tabs"
        className={cn('flex flex-col gap-3', className)}
        value={value}
        defaultValue={defaultValue}
        onValueChange={handleValueChange}
        {...props}
      />
    </TabsAnimationContext.Provider>
  )
})
Tabs.displayName = TabsPrimitive.Root.displayName

const TabsList = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.List>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.List
      ref={ref}
      data-slot="tabs-list"
      className={cn(
        'inline-flex h-13 w-fit items-center gap-1 rounded-xl border border-border bg-card-soft px-1.5 py-1 text-sm text-muted-foreground shadow-xs backdrop-blur-sm supports-[backdrop-filter]:backdrop-blur-md dark:bg-input/30 dark:text-foreground/80',
        className,
      )}
      {...props}
    />
  )
})
TabsList.displayName = TabsPrimitive.List.displayName

const TabsTrigger = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Trigger>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Trigger>
>(({ className, children, value, ...props }, ref) => {
  const { activeValue } = useTabsAnimationContext()
  const isActive = value === activeValue

  return (
    <TabsPrimitive.Trigger
      ref={ref}
      data-slot="tabs-trigger"
      value={value}
      className={cn(
        'group relative inline-flex h-10 flex-1 items-center justify-center gap-1.5 whitespace-nowrap rounded-lg border border-transparent font-medium text-muted-foreground outline-none transition-[color,transform,colors,background-color] focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 cursor-pointer duration-200',
        'data-[state=active]:text-foreground data-[state=active]:cursor-default',
        className,
      )}
      {...props}
    >
      <span className="relative flex h-full w-full items-center justify-center">
        <AnimatePresence>
          {isActive ? (
            <motion.span
              layoutId="tabs-trigger-indicator"
              className="absolute inset-0 rounded-lg border border-border bg-card shadow-sm dark:bg-input/30"
              transition={{ type: 'spring', stiffness: 200, damping: 24 }}
            />
          ) : null}
        </AnimatePresence>
        <span
          className={cn(
            'relative z-10 flex items-center gap-1.5 text-muted-foreground transition-colors duration-200',
            'group-data-[state=active]:text-foreground',
            "[&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
          )}
        >
          {children}
        </span>
      </span>
    </TabsPrimitive.Trigger>
  )
})
TabsTrigger.displayName = TabsPrimitive.Trigger.displayName

const TabsContent = React.forwardRef<
  React.ComponentRef<typeof TabsPrimitive.Content>,
  React.ComponentPropsWithoutRef<typeof TabsPrimitive.Content>
>(({ className, ...props }, ref) => {
  return (
    <TabsPrimitive.Content
      ref={ref}
      data-slot="tabs-content"
      className={cn('flex-1 outline-none', className)}
      {...props}
    />
  )
})
TabsContent.displayName = TabsPrimitive.Content.displayName

export { Tabs, TabsList, TabsTrigger, TabsContent }
