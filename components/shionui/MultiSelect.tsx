'use client'

import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { CheckIcon, ChevronDownIcon } from 'lucide-react'

import { cn } from '@/utils/cn'

type Size = 'sm' | 'default'

type MultiSelectContextValue = {
  selectedValues: string[]
  setSelectedValues: (next: string[]) => void
  isSelected: (value: string) => boolean
  toggleValue: (value: string) => void
  registerItem: (value: string, label: React.ReactNode) => void
  getLabel: (value: string) => React.ReactNode
  disabled?: boolean
}

const MultiSelectContext = React.createContext<MultiSelectContextValue | null>(null)

function useMultiSelectContext(): MultiSelectContextValue {
  const ctx = React.useContext(MultiSelectContext)
  if (!ctx) throw new Error('MultiSelect components must be used within <MultiSelect>')
  return ctx
}

type MultiSelectProps = Omit<
  React.ComponentProps<typeof PopoverPrimitive.Root>,
  'onOpenChange' | 'open'
> & {
  value?: string[]
  defaultValue?: string[]
  onValueChange?: (values: string[]) => void
  disabled?: boolean
}

function MultiSelect({
  value,
  defaultValue,
  onValueChange,
  disabled,
  children,
  ...props
}: MultiSelectProps) {
  const isControlled = value !== undefined
  const [internalValues, setInternalValues] = React.useState<string[]>(defaultValue ?? [])
  const current = isControlled ? (value as string[]) : internalValues

  const setSelectedValues = (next: string[]) => {
    if (!isControlled) setInternalValues(next)
    onValueChange?.(next)
  }

  const isSelected = (val: string) => current.includes(val)
  const toggleValue = (val: string) => {
    const next = isSelected(val) ? current.filter(v => v !== val) : [...current, val]
    setSelectedValues(next)
  }

  const labelsRef = React.useRef<Map<string, React.ReactNode>>(new Map())
  const registerItem = (val: string, label: React.ReactNode) => labelsRef.current.set(val, label)
  const getLabel = (val: string) => labelsRef.current.get(val) ?? val

  return (
    <PopoverPrimitive.Root {...props}>
      <MultiSelectContext.Provider
        value={{
          selectedValues: current,
          setSelectedValues,
          isSelected,
          toggleValue,
          registerItem,
          getLabel,
          disabled,
        }}
      >
        {children}
      </MultiSelectContext.Provider>
    </PopoverPrimitive.Root>
  )
}

function MultiSelectTrigger({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Trigger> & { size?: Size }) {
  return (
    <PopoverPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={cn(
        "border-input data-[placeholder]:text-muted-foreground [&_svg:not([class*='text-'])]:text-muted-foreground focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive dark:bg-input/30 dark:hover:bg-input/50 flex w-fit items-center justify-between gap-2 rounded-md border bg-transparent px-3 py-2 text-sm whitespace-nowrap shadow-xs transition-[color,box-shadow] outline-none focus-visible:ring-[3px] disabled:cursor-not-allowed disabled:opacity-50 data-[size=default]:h-9 data-[size=sm]:h-8 *:data-[slot=select-value]:line-clamp-1 *:data-[slot=select-value]:flex *:data-[slot=select-value]:items-center *:data-[slot=select-value]:gap-2 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
        className,
      )}
      {...props}
    >
      {children}
      <ChevronDownIcon className="size-4 opacity-50" />
    </PopoverPrimitive.Trigger>
  )
}

function MultiSelectContent({
  className,
  children,
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        sideOffset={sideOffset}
        data-slot="select-content"
        className={cn(
          'bg-popover text-popover-foreground data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:fade-out-0 data-[state=open]:fade-in-0 data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-95 data-[side=bottom]:slide-in-from-top-2 data-[side=left]:slide-in-from-right-2 data-[side=right]:slide-in-from-left-2 data-[side=top]:slide-in-from-bottom-2 relative z-50 max-h-(--radix-popover-content-available-height) min-w-[8rem] origin-(--radix-popover-content-transform-origin) overflow-x-hidden overflow-y-auto rounded-md border shadow-md w-[var(--radix-popper-anchor-width)]',
          className,
        )}
        {...props}
      >
        <div className="p-1">{children}</div>
      </PopoverPrimitive.Content>
    </PopoverPrimitive.Portal>
  )
}

function MultiSelectValue({
  placeholder,
  separator = ', ',
  className,
  resolveLabel,
}: {
  placeholder?: React.ReactNode
  separator?: string
  className?: string
  resolveLabel?: (value: string) => React.ReactNode
}) {
  const { selectedValues, getLabel } = useMultiSelectContext()
  const labels = selectedValues.map(v => resolveLabel?.(v) ?? getLabel(v))
  const hasValue = labels.length > 0
  return (
    <span data-slot="select-value" className={cn('truncate', className)}>
      {hasValue ? (
        <span className="inline-flex items-center gap-1">
          {labels.map((l, idx) => (
            <React.Fragment key={String(idx)}>
              {idx > 0 && <span className="text-muted-foreground/70">{separator}</span>}
              <span>{l}</span>
            </React.Fragment>
          ))}
        </span>
      ) : (
        <span className="text-muted-foreground">{placeholder}</span>
      )}
    </span>
  )
}

function MultiSelectItem({
  className,
  children,
  value,
  disabled,
  ...props
}: Omit<React.ComponentProps<'div'>, 'onSelect'> & { value: string; disabled?: boolean }) {
  const { isSelected, toggleValue, registerItem } = useMultiSelectContext()

  React.useEffect(() => {
    registerItem(value, children)
  }, [value, children, registerItem])

  const selected = isSelected(value)

  return (
    <div
      role="option"
      aria-selected={selected}
      aria-disabled={disabled}
      tabIndex={disabled ? -1 : 0}
      data-slot="select-item"
      className={cn(
        "focus:bg-accent transition-all duration-200 focus:text-accent-foreground [&_svg:not([class*='text-'])]:text-muted-foreground relative flex w-full cursor-default items-center gap-2 rounded-sm py-1.5 pr-8 pl-2 text-sm outline-hidden select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 *:[span]:last:flex *:[span]:last:items-center *:[span]:last:gap-2",
        className,
      )}
      onClick={e => {
        e.preventDefault()
        if (disabled) return
        toggleValue(value)
      }}
      onKeyDown={e => {
        if (disabled) return
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          toggleValue(value)
        }
      }}
      {...props}
    >
      <span className="absolute right-2 flex size-3.5 items-center justify-center">
        {selected && <CheckIcon className="size-4" />}
      </span>
      <span>{children}</span>
    </div>
  )
}

function MultiSelectSeparator({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="select-separator"
      className={cn('bg-border pointer-events-none -mx-1 my-1 h-px', className)}
      {...props}
    />
  )
}

function MultiSelectGroup({ ...props }: React.ComponentProps<'div'>) {
  return <div data-slot="select-group" {...props} />
}

function MultiSelectLabel({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="select-label"
      className={cn('text-muted-foreground px-2 py-1.5 text-xs', className)}
      {...props}
    />
  )
}

export {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectValue,
  MultiSelectSeparator,
  MultiSelectGroup,
  MultiSelectLabel,
}
