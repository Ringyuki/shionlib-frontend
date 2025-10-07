'use client'

import { RenderedComment, useCommentListStore } from '@/store/commentListStore'
import { CommentItem } from './CommentItem'

export function CommentListClient({ initial }: { initial: RenderedComment[] }) {
  const { comments, setComments } = useCommentListStore()

  if (comments.length === 0 && initial.length > 0) {
    setComments(initial)
  }

  return (
    <div className="flex flex-col gap-4">
      {useCommentListStore.getState().comments.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
