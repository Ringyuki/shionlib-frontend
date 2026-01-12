import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shionui/Tooltip'
import { HelpCircle } from 'lucide-react'
import { cn } from '@/utils/cn'

interface QuestionProps {
  content: string | React.ReactNode
  icon?: React.ElementType
  iconClassName?: string
  tooltipClassName?: string
}

export const Question = ({
  content,
  icon = HelpCircle,
  iconClassName,
  tooltipClassName,
}: QuestionProps) => {
  const IconComponent = icon
  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <IconComponent className={cn('size-4 text-muted-foreground', iconClassName)} />
      </TooltipTrigger>
      <TooltipContent className={tooltipClassName}>{content}</TooltipContent>
    </Tooltip>
  )
}
