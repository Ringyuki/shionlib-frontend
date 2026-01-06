import { Platform } from '@/interfaces/game/game.interface'

export interface GameScalar {
  id: number
  b_id: string
  v_id: string
  title_jp: string
  title_zh: string
  title_en: string
  platform: Platform[]
  aliases: string[]
  intro_jp: string
  intro_zh: string
  intro_en: string
  release_date: string
  release_date_tba: boolean
  extra_info: ExtraInfo[]
  tags: string[]
  staffs: Staff[]
  status: number
  nsfw: boolean
  views: number
  type: string
}

export interface ExtraInfo {
  key: string
  value: string
}

export interface Staff {
  name: string
  role: string
}
