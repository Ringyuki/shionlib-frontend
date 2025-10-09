export interface Comment {
  id: number
  html: string
  parent_id: number | null
  parent: {
    id: number
    html: string
    creator: {
      id: number
      name: string
      avatar: string
    }
  }
  root_id: number | null
  reply_count: number
  like_count: number
  is_liked: boolean
  creator: {
    id: number
    name: string
    avatar: string
  }
  edited: boolean
  created: string
  updated: string
}
