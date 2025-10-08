'use client'

import { RenderedComment } from '@/store/commentListStore'
import { Avatar } from '@/components/common/user/Avatar'
import { timeFromNow } from '@/utils/time-format'
import { useLocale } from 'next-intl'

interface CommentItemProps {
  comment: RenderedComment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const locale = useLocale()
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border">
      <div className="flex items-center gap-2">
        <Avatar user={comment.creator} className="size-8" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{comment.creator.name}</span>
          <span className="text-xs text-secondary-foreground font-light">
            {timeFromNow(comment.created, locale)}
          </span>
        </div>
      </div>
      <div dangerouslySetInnerHTML={{ __html: comment.html || '' }} />
    </div>
  )
}
