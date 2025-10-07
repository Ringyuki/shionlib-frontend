import { create } from 'zustand'
import { Comment } from '@/interfaces/comment/comment.interface'

interface CommentListStore {
  comments: Comment[]
  setComments: (comments: Comment[]) => void
  addComment: (comment: Comment) => void
  removeComment: (comment: Comment) => void
  updateComment: (comment: Comment) => void
}

export const useCommentListStore = create<CommentListStore>()(set => ({
  comments: [],
  setComments: (comments: Comment[]) => set({ comments }),
  addComment: (comment: Comment) => set(state => ({ comments: [...state.comments, comment] })),
  removeComment: (comment: Comment) =>
    set(state => ({ comments: state.comments.filter(c => c.id !== comment.id) })),
  updateComment: (comment: Comment) =>
    set(state => ({ comments: state.comments.map(c => (c.id === comment.id ? comment : c)) })),
}))
