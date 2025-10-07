import { Comment } from '@/interfaces/comment/comment.interface'
import { Avatar } from '@/components/common/user/Avatar'
import { timeFormat, TimeFormatEnum } from '@/utils/time-format'
import { renderLexicalHTML } from '@/components/editor/server/render'
import { getLocale } from 'next-intl/server'
import '@/components/editor/libs/themes/editor-theme.css'

interface CommentItemProps {
  comment: Comment
}

export const CommentItem = async ({ comment }: CommentItemProps) => {
  const locale = await getLocale()
  const html = renderLexicalHTML(comment.content)
  return (
    <div className="flex flex-col gap-2 p-4 rounded-lg border">
      <div className="flex items-center gap-2">
        <Avatar user={comment.creator} className="size-10" />
        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium">{comment.creator.name}</span>
          <span className="text-sm text-secondary-foreground font-light">
            {timeFormat(comment.created, locale, TimeFormatEnum.YYYY_MM_DD_HH_MM_SS)}
          </span>
        </div>
      </div>
      <div className="lexical-content" dangerouslySetInnerHTML={{ __html: html }} />
    </div>
  )
}
