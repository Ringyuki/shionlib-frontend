'use client'

import { Card, CardContent } from '@/components/shionui/Card'
import { Comment } from '@/interfaces/comment/comment.interface'
import { Avatar } from '@/components/common/user/Avatar'
import { timeFromNow } from '@/utils/time-format'
import { useLocale } from 'next-intl'
import { CommentActions } from './actions/CommentActions'
import { useTranslations } from 'next-intl'
import { useEffect, useState } from 'react'
import { ReplyBox } from './actions/ReplyBox'
import { useParams } from 'next/navigation'
import { CommentParent } from './CommentParent'

interface CommentItemProps {
  comment: Comment
  likeable?: boolean
  showReplyBtn?: boolean
  showDeleteBtn?: boolean
  canScrollToParent?: boolean
  showEditBtn?: boolean
  onEdited?: () => void
  showSource?: boolean
  sourceTitle?: string
}

export const CommentItem = ({
  comment,
  likeable = true,
  showReplyBtn = true,
  showDeleteBtn = true,
  canScrollToParent = true,
  showEditBtn = true,
  onEdited,
  showSource = false,
  sourceTitle,
}: CommentItemProps) => {
  const locale = useLocale()
  const t = useTranslations('Components.Common.Comment.CommentItem')
  const [isReply, setIsReply] = useState(false)
  const { id: game_id } = useParams()

  const handleHighlight = () => {
    const isBrowser = typeof window !== 'undefined'
    const hash = window.location.hash
    if (isBrowser && hash.includes(`#data-comment-id-${comment.id}`)) {
      const commentElement = document.getElementById(`data-comment-id-${comment.id}`)
      if (commentElement) {
        commentElement.classList.add('bg-primary/15')
        setTimeout(() => {
          commentElement.classList.remove('bg-primary/15')
        }, 1000)
      }
    }
  }
  useEffect(() => {
    handleHighlight()
  }, [])

  return (
    <Card className="py-0 overflow-hidden">
      <CardContent
        className="flex flex-col gap-4 p-4 transition-colors duration-200 scroll-mt-20"
        id={`data-comment-id-${comment.id}`}
      >
        <div className="flex items-center gap-2">
          <Avatar user={comment.creator} className="size-8" />
          <div className="flex flex-col">
            <span className="text-sm font-medium flex items-center gap-2">
              {comment.creator.name}
              {showSource && (
                <span className="text-xs font-light">
                  {t('source')} {sourceTitle}
                </span>
              )}
            </span>
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
        {comment.parent?.id && (
          <CommentParent parent={comment.parent} canScrollToParent={canScrollToParent} />
        )}
        <div dangerouslySetInnerHTML={{ __html: comment.html || '' }} />
        <CommentActions
          comment_id={comment.id}
          creator_id={comment.creator.id}
          like_count={comment.like_count}
          is_liked={comment.is_liked}
          onReplyClick={() => setIsReply(!isReply)}
          likeable={likeable}
          showReplyBtn={showReplyBtn}
          showDeleteBtn={showDeleteBtn}
          showEditBtn={showEditBtn}
          onEdited={onEdited}
        />
        <ReplyBox
          isReply={isReply}
          game_id={game_id as string}
          parent_id={comment.id}
          onSubmitSuccess={() => setIsReply(false)}
        />
      </CardContent>
    </Card>
  )
}
