import { Comment } from '@/interfaces/comment/comment.interface'
import { CommentListClient } from './CommentListClient'
import { renderLexicalHTML } from '@/components/editor/server/render'

interface CommentListProps {
  comments: Comment[]
}

export const CommentList = ({ comments }: CommentListProps) => {
  const initial = comments.map(c => ({ ...c, html: renderLexicalHTML(c.content) }))
  return <CommentListClient initial={initial} />
}
