export interface GameCover {
  language: string
  url: string
  type: string
  dims: number[]
}

export interface GameItem {
  id: number
  title_jp: string
  title_zh: string
  title_en: string
  covers: GameCover[]
  views: number
}
