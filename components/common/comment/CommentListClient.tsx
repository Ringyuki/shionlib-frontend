'use client'

import { RenderedComment, useCommentListStore } from '@/store/commentListStore'
import { CommentItem } from './CommentItem'
import { useEffect, useMemo } from 'react'

export function CommentListClient({ initial }: { initial: RenderedComment[] }) {
  const { comments, setComments } = useCommentListStore()
  useEffect(() => {
    setComments(initial)
  }, [initial, setComments])

  const list = comments.length > 0 ? comments : initial
  const sorted = useMemo(
    () => [...list].sort((a, b) => new Date(a.created).getTime() - new Date(b.created).getTime()),
    [list],
  )

  return (
    <div className="flex flex-col gap-4">
      {sorted.map(comment => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  )
}
