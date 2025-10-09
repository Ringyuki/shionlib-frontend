import { MoreActions } from './MoreActions'
import { Like } from './Like'
import { Reply } from './Reply'

interface CommentActionsProps {
  comment_id: number
  creator_id: number
  like_count: number
  is_liked: boolean
  onReplyClick: () => void
}

export const CommentActions = ({
  comment_id,
  creator_id,
  like_count,
  is_liked,
  onReplyClick,
}: CommentActionsProps) => {
  return (
    <div className="flex justify-between">
      <div className="flex gap-2">
        <Like is_liked={is_liked} like_count={like_count} comment_id={comment_id} />
        <Reply onReplyClick={onReplyClick} />
      </div>
      <MoreActions creator_id={creator_id} comment_id={comment_id} />
    </div>
  )
}
