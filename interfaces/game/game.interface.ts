export interface GameCover {
  language: Language
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
export enum PlatformEnum {
  win = 'Windows',
  ios = 'iOS',
  and = 'Android',
  lin = 'Linux',
  ps3 = 'PlayStation 3',
  ps4 = 'PlayStation 4',
  psv = 'PlayStation Vita',
  psp = 'PlayStation Portable',
  swi = 'Nintendo Switch',
  dvd = 'DVD',
}
export const PlatformOptions: Array<{ label: string; value: Platform }> = [
  { value: 'win', label: 'Windows' },
  { value: 'ios', label: 'iOS' },
  { value: 'and', label: 'Android' },
  { value: 'lin', label: 'Linux' },
  { value: 'ps3', label: 'PlayStation 3' },
  { value: 'ps4', label: 'PlayStation 4' },
  { value: 'psv', label: 'PlayStation Vita' },
  { value: 'psp', label: 'PlayStation Portable' },
  { value: 'swi', label: 'Nintendo Switch' },
  { value: 'dvd', label: 'DVD' },
]

export const platformNameMap: Record<Platform, string> = {
  win: 'Windows',
  ios: 'iOS',
  and: 'Android',
  lin: 'Linux',
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
  lin: { bg: 'var(--platform-lin)', fg: 'var(--platform-lin-fg)' },
  ps3: { bg: 'var(--platform-ps3)', fg: 'var(--platform-ps3-fg)' },
  ps4: { bg: 'var(--platform-ps4)', fg: 'var(--platform-ps4-fg)' },
  psv: { bg: 'var(--platform-psv)', fg: 'var(--platform-psv-fg)' },
  psp: { bg: 'var(--platform-psp)', fg: 'var(--platform-psp-fg)' },
  swi: { bg: 'var(--platform-swi)', fg: 'var(--platform-swi-fg)' },
  dvd: { bg: 'var(--platform-dvd)', fg: 'var(--platform-dvd-fg)' },
}

export type Language = 'jp' | 'zh' | 'en'
export enum LanguageEnum {
  jp = 'Japanese',
  zh = 'Chinese',
  en = 'English',
}
export const LanguageOptions: Array<{ label: string; value: Language }> = [
  { value: 'jp', label: 'Japanese' },
  { value: 'zh', label: 'Chinese' },
  { value: 'en', label: 'English' },
]
export const LanguageNameMap: Record<Language, string> = {
  jp: '日本語',
  zh: '简体中文',
  en: 'English',
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
  covers: GameCover[]
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

  is_favorite: boolean
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
