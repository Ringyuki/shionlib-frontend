'use client'

import { RenderedComment } from '@/store/commentListStore'
import { Avatar } from '@/components/common/user/Avatar'
import { timeFormat, TimeFormatEnum } from '@/utils/time-format'
import { useLocale } from 'next-intl'
import '@/components/editor/libs/themes/editor-theme.css'

interface CommentItemProps {
  comment: RenderedComment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const locale = useLocale()
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border">
      <div className="flex items-center gap-2">
        <Avatar user={comment.creator} className="size-10" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{comment.creator.name}</span>
          <span className="text-sm text-secondary-foreground font-light">
            {timeFormat(comment.created, locale, TimeFormatEnum.EEEE_MMM_DD_YYYY)}
          </span>
        </div>
      </div>
      <div className="lexical-content" dangerouslySetInnerHTML={{ __html: comment.html || '' }} />
    </div>
  )
}
