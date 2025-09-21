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

export type Platform = 'win' | 'ios' | 'and' | 'ps3' | 'ps4' | 'psv' | 'psp' | 'swi' | 'dvd'
export const platformNameMap: Record<Platform, string> = {
  win: 'Windows',
  ios: 'iOS',
  and: 'Android',
  ps3: 'PlayStation 3',
  ps4: 'PlayStation 4',
  psv: 'PlayStation Vita',
  psp: 'PlayStation Portable',
  swi: 'Nintendo Switch',
  dvd: 'DVD',
}
export const platformTokenMap: Record<Platform, { bg: string; fg: string }> = {
  win: { bg: 'var(--platform-win)', fg: 'var(--platform-win-fg)' },
  ios: { bg: 'var(--platform-ios)', fg: 'var(--platform-ios-fg)' },
  and: { bg: 'var(--platform-and)', fg: 'var(--platform-and-fg)' },
  ps3: { bg: 'var(--platform-ps3)', fg: 'var(--platform-ps3-fg)' },
  ps4: { bg: 'var(--platform-ps4)', fg: 'var(--platform-ps4-fg)' },
  psv: { bg: 'var(--platform-psv)', fg: 'var(--platform-psv-fg)' },
  psp: { bg: 'var(--platform-psp)', fg: 'var(--platform-psp-fg)' },
  swi: { bg: 'var(--platform-swi)', fg: 'var(--platform-swi-fg)' },
  dvd: { bg: 'var(--platform-dvd)', fg: 'var(--platform-dvd-fg)' },
}

export interface GameData {
  creator_id: number

  b_id?: string
  v_id?: string

  id: number
  title_jp: string
  title_zh: string
  title_en: string
  aliases: string[]
  intro_jp: string
  intro_zh: string
  intro_en: string
  covers?: GameCover[]
  images: string[]
  release_date: Date
  extra_info: Record<string, string>[]

  tags: string[]
  staffs: GameStaff[]
  developers: DeveloperRelation[]

  nsfw: boolean
  type?: string
  platform: Platform[]
}

export interface GameStaff {
  name: string
  role: string
}

export interface Developer {
  id: number
  name: string
  aliases?: string[]
}

export interface DeveloperRelation {
  role: string
  developer: Developer
}

export interface GameCharacter {
  b_id?: string
  v_id?: string
  image?: string
  actor?: string
  role?: string

  name_jp?: string
  name_zh?: string
  name_en?: string
  aliases?: string[]
  intro_jp?: string
  intro_zh?: string
  intro_en?: string
  gender?: string

  extra_info?: Record<string, string>[]
}

export interface GameCharacterRelation {
  image?: string
  actor?: string
  role?: string
  extra_info?: Record<string, string>[]

  game_id: number
  character_id: number
}

export interface GameCover {
  language: string
  url: string
  type: string
  dims: number[]
}

export interface GameCoverRelation {
  game_id: number
  cover_id: number
}
