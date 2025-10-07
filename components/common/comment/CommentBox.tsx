'use client'

import { useState, useRef } from 'react'
import { Avatar } from '@/components/common/user/Avatar'
import { useShionlibUserStore } from '@/store/userStore'
import { CommentEditor } from './CommentEditor'
import { shionlibRequest } from '@/utils/shionlib-request'
import { SerializedEditorState, createEditor } from 'lexical'
import { useTranslations } from 'next-intl'
import { toast } from 'react-hot-toast'
import { Comment } from '@/interfaces/comment/comment.interface'
import { RenderedComment, useCommentListStore } from '@/store/commentListStore'
import { $generateHtmlFromNodes } from '@lexical/html'
import { nodes } from '@/components/editor/nodes'
import { editorTheme } from '@/components/editor/libs/themes/editor-theme'

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

  const toHtml = (serialized: SerializedEditorState) => {
    const editor = createEditor({ namespace: 'ClientRender', nodes, theme: editorTheme })
    const state = editor.parseEditorState(serialized as any)
    let html = ''
    editor.setEditorState(state)
    editor.update(() => {
      html = $generateHtmlFromNodes(editor)
    })
    return html
  }

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
      const html = toHtml(serialized)
      addComment({ ...(data.data as Comment), html } as RenderedComment)
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
