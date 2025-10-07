'use client'

import { create } from 'zustand'
import { Comment } from '@/interfaces/comment/comment.interface'

export interface RenderedComment extends Comment {
  html?: string
}

interface CommentListStore {
  comments: RenderedComment[]
  setComments: (comments: RenderedComment[]) => void
  addComment: (comment: RenderedComment) => void
  removeComment: (comment: RenderedComment) => void
  updateComment: (comment: RenderedComment) => void
}

export const useCommentListStore = create<CommentListStore>()(set => ({
  comments: [],
  setComments: (comments: RenderedComment[]) => set({ comments }),
  addComment: (comment: RenderedComment) =>
    set(state => ({ comments: [...state.comments, comment] })),
  removeComment: (comment: RenderedComment) =>
    set(state => ({ comments: state.comments.filter(c => c.id !== comment.id) })),
  updateComment: (comment: RenderedComment) =>
    set(state => ({ comments: state.comments.map(c => (c.id === comment.id ? comment : c)) })),
}))
