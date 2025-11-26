import { Button } from '@/components/shionui/Button'
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/shionui/Tooltip'
import { MessageSquareMore } from 'lucide-react'
import { useTranslations } from 'next-intl'
import { useScrollToElem } from '@/hooks/useScrollToElem'

export const Comment = () => {
  const t = useTranslations('Components.Game.Actions')
  const scrollToElem = useScrollToElem()
  const handleComment = () => {
    const commentContent = document.getElementById('comment-content')
    if (commentContent) {
      scrollToElem(commentContent)
    }
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          size="icon"
          intent="success"
          appearance="ghost"
          loginRequired
          renderIcon={<MessageSquareMore />}
          onClick={handleComment}
        />
      </TooltipTrigger>
      <TooltipContent>
        <span>{t('goToDiscussion')}</span>
      </TooltipContent>
    </Tooltip>
  )
}
