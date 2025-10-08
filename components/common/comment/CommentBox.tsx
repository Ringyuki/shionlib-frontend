'use client'

import { useState, useRef } from 'react'
import { Avatar } from '@/components/common/user/Avatar'
import { useShionlibUserStore } from '@/store/userStore'
import { CommentEditor } from './CommentEditor'
import { shionlibRequest } from '@/utils/shionlib-request'
import { SerializedEditorState } from 'lexical'
import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { Comment } from '@/interfaces/comment/comment.interface'
import { RenderedComment, useCommentListStore } from '@/store/commentListStore'

interface CommentBoxProps {
  game_id: string
  parent_id?: string
}

export const CommentBox = ({ game_id, parent_id }: CommentBoxProps) => {
  const t = useTranslations('Components.Common.Comment.CommentBox')
  const [isLoading, setIsLoading] = useState(false)
  const editorRef = useRef<{ clearEditor: () => void } | null>(null)
  const { user } = useShionlibUserStore()
  const { addComment } = useCommentListStore()

  const handleSubmit = async (serialized: SerializedEditorState) => {
    setIsLoading(true)
    try {
      const data = await shionlibRequest().post<Comment>(`/comment/game/${game_id}`, {
        data: {
          content: serialized,
          parent_id,
        },
      })
      toast.success(t('success'))
      addComment(data.data as RenderedComment)
      editorRef.current?.clearEditor()
    } catch {
    } finally {
      setIsLoading(false)
    }
  }
  return (
    <div className="flex flex-col w-full gap-2">
      <div className="flex items-center gap-2">
        <Avatar user={user} />
        <span className="text-sm font-medium">{user.name}</span>
      </div>
      <CommentEditor onSubmit={handleSubmit} isSubmitting={isLoading} ref={editorRef} />
    </div>
  )
}
