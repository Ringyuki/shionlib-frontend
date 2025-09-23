export interface GameCover {
  language: string
  url: string
  type: string
  dims: number[]
  sexual: number
  violence: number
}

export interface GameImage {
  url: string
  dims: number[]
  sexual: number
  violence: number
}

export interface GameItem {
  id: number
  title_jp: string
  title_zh: string
  title_en: string
  covers: GameCover[]
  views: number
}

export interface ExtraInfo {
  key: string
  value: string
}

export type Platform = 'win' | 'ios' | 'and' | 'lin' | 'ps3' | 'ps4' | 'psv' | 'psp' | 'swi' | 'dvd'

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
  images: GameImage[]
  release_date: Date
  extra_info: ExtraInfo[]
  link: GameLink[]

  tags: string[]
  staffs: GameStaff[]
  developers: DeveloperRelation[]
  characters: GameCharacterRelation[]

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
  id: number
  image?: string

  name_jp?: string
  name_zh?: string
  name_en?: string
  aliases?: string[]
  intro_jp?: string
  intro_zh?: string
  intro_en?: string
  gender?: GameCharacterGender[]
  blood_type?: GameCharacterBloodType
  height?: number
  weight?: number
  bust?: number
  waist?: number
  hips?: number
  cup?: string
  age?: number
  birthday: number[] // [month, day]
}

export type GameCharacterBloodType = 'a' | 'b' | 'ab' | 'o'
export type GameCharacterGender = 'm' | 'f' | 'o' | 'a'
export const GameCharacterGenderMap: { [key in GameCharacterGender]: string } = {
  m: 'male',
  f: 'female',
  o: 'non_binary',
  a: 'ambiguous',
}
export type GameCharacterRole = 'main' | 'primary' | 'side' | 'appears'

export interface GameCharacterRelation {
  image?: string
  actor?: string
  role?: GameCharacterRole
  character: GameCharacter
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

export interface GameLink {
  id: number
  url: string
  label: string
  name: string
}
