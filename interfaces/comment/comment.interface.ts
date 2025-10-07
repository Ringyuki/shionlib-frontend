import { SerializedEditorState } from 'lexical'

export interface Comment {
  id: number
  content: SerializedEditorState
  parent_id: number | null
  root_id: number | null
  reply_count: number
  is_liked: boolean
  creator: {
    id: number
    name: string
    avatar: string
  }
  created: Date
  updated: Date
}
