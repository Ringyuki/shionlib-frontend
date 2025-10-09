import { Comment } from '@/interfaces/comment/comment.interface'
import { Avatar } from '@/components/common/user/Avatar'
import { useTranslations } from 'next-intl'
import { ScrollArea } from '@/components/shionui/ScrollArea'

interface CommentParentProps {
  parent: Comment['parent']
}

export const CommentParent = ({ parent }: CommentParentProps) => {
  const t = useTranslations('Components.Common.Comment.CommentParent')
  const handleClick = () => {
    const commentContent = document.getElementById(`data-comment-id-${parent.id}`)
    if (commentContent) {
      commentContent.scrollIntoView({ behavior: 'smooth', block: 'start', inline: 'nearest' })
      commentContent.classList.add('bg-card-hover')
      setTimeout(() => {
        commentContent.classList.remove('bg-card-hover')
      }, 1000)
    }
  }

  return (
    <div
      className="flex flex-col gap-2 rounded-md border p-4 hover:bg-card-hover cursor-pointer transition-colors duration-200"
      onClick={handleClick}
    >
      <div className="flex items-center gap-2">
        <span className="text-sm font-medium">{t('parent')}</span>
        <Avatar user={parent.creator} className="size-6 text-xs" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">{parent.creator.name}</span>
        </div>
      </div>
      <ScrollArea className="h-12 max-h-24">
        <div dangerouslySetInnerHTML={{ __html: parent.html || '' }} />
      </ScrollArea>
    </div>
  )
}
