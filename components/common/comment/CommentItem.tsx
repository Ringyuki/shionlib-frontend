'use client'

import { Comment } from '@/interfaces/comment/comment.interface'
import { Avatar } from '@/components/common/user/Avatar'
import { timeFromNow } from '@/utils/time-format'
import { useLocale } from 'next-intl'
import { CommentActions } from './actions/CommentActions'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { ReplyBox } from './actions/ReplyBox'
import { useParams } from 'next/navigation'
import { CommentParent } from './CommentParent'

interface CommentItemProps {
  comment: Comment
}

export const CommentItem = ({ comment }: CommentItemProps) => {
  const locale = useLocale()
  const t = useTranslations('Components.Common.Comment.CommentItem')
  const [isReply, setIsReply] = useState(false)
  const { id: game_id } = useParams()

  return (
    <div
      className="flex flex-col gap-4 p-4 rounded-lg border transition-colors duration-200 scroll-mt-20"
      id={`data-comment-id-${comment.id}`}
    >
      <div className="flex items-center gap-2">
        <Avatar user={comment.creator} className="size-8" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{comment.creator.name}</span>
          <span className="flex items-center gap-2">
            <span className="text-xs text-secondary-foreground font-light">
              {timeFromNow(comment.created, locale)}
            </span>
            {comment.edited && (
              <span className="text-xs text-secondary-foreground/50 font-light">
                {t('edited')} {timeFromNow(comment.updated, locale)}
              </span>
            )}
          </span>
        </div>
      </div>
      {comment.parent.id && <CommentParent parent={comment.parent} />}
      <div dangerouslySetInnerHTML={{ __html: comment.html || '' }} />
      <CommentActions
        comment_id={comment.id}
        creator_id={comment.creator.id}
        like_count={comment.like_count}
        is_liked={comment.is_liked}
        onReplyClick={() => setIsReply(!isReply)}
      />
      <ReplyBox
        isReply={isReply}
        game_id={game_id as string}
        parent_id={comment.id}
        onSubmitSuccess={() => setIsReply(false)}
      />
    </div>
  )
}
