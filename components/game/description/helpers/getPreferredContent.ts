import { GameData, GameCover } from '@/interfaces/game/game.interface'

export type ContentType = 'cover' | 'title' | 'intro'
type Lang = 'en' | 'jp' | 'zh'

export interface PreferredCover {
  cover: GameCover
  vertical: boolean
  aspect: string
}

export interface PreferredIntro {
  intro: string
  language: string
  disable_languages: string[]
}

export interface PreferredTitle {
  title: string
  language: string
  disable_languages: string[]
}

export function getPreferredContent(
  game: GameData,
  contentType: 'cover',
  lang: Lang,
): PreferredCover
export function getPreferredContent(
  game: GameData,
  contentType: 'title',
  lang: Lang,
): PreferredTitle
export function getPreferredContent(
  game: GameData,
  contentType: 'intro',
  lang: Lang,
): PreferredIntro
export function getPreferredContent(
  game: GameData,
  contentType: ContentType,
  lang: Lang,
): PreferredCover | PreferredTitle | PreferredIntro {
  switch (contentType) {
    case 'cover':
      const cover = game.covers?.find(c => c.language === lang) ?? (game.covers?.[0]! as GameCover)
      const [w, h] = cover.dims
      const vertical = w / h < 1
      const aspect = vertical ? '1 / 1.5' : '1.5 / 1'
      return {
        cover,
        vertical,
        aspect,
      }
    case 'title':
      const title =
        (game[`title_${lang}` as keyof GameData] as string) || game.title_jp || game.title_en
      return {
        title: title,
        language: game[`title_${lang}`] === title ? lang : title === game.title_en ? 'en' : 'jp',
        disable_languages: Object.keys(game)
          .filter(k => k.startsWith('title_') && !game[k as keyof GameData])
          .map(k => k.replace('title_', '')),
      }
    case 'intro':
      const intro =
        (game[`intro_${lang}` as keyof GameData] as string) || game.intro_jp || game.intro_en
      return {
        intro: intro,
        language: game[`intro_${lang}`] === intro ? lang : intro === game.intro_en ? 'en' : 'jp',
        disable_languages: Object.keys(game)
          .filter(k => k.startsWith('intro_') && !game[k as keyof GameData])
          .map(k => k.replace('intro_', '')),
      }
  }
}
