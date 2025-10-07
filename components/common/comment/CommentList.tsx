import { Comment } from '@/interfaces/comment/comment.interface'
import { CommentItem } from './CommentItem'

interface CommentListProps {
  comments: Comment[]
}

export const CommentList = ({ comments }: CommentListProps) => {
  return (
    <div className="flex flex-col gap-4">
      {comments.length > 0 &&
        comments.map(comment => <CommentItem key={comment.id} comment={comment} />)}
    </div>
  )
}
