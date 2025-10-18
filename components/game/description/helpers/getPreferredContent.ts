import { GameData, GameCover, GameCharacter } from '@/interfaces/game/game.interface'
import { Developer } from '@/interfaces/developer/developer.interface'

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
        (game[`title_${lang}` as keyof GameData] as string) ||
        game.title_jp ||
        game.title_en ||
        game.title_zh
      return {
        title: title,
        language:
          game[`title_${lang}`] === title
            ? lang
            : title === game.title_en
              ? 'en'
              : title === game.title_zh
                ? 'zh'
                : 'jp',
        disable_languages: Object.keys(game)
          .filter(k => k.startsWith('title_') && !game[k as keyof GameData])
          .map(k => k.replace('title_', '')),
      }
    case 'intro':
      const intro =
        (game[`intro_${lang}` as keyof GameData] as string) ||
        game.intro_jp ||
        game.intro_en ||
        game.intro_zh
      return {
        intro: intro,
        language:
          game[`intro_${lang}`] === intro
            ? lang
            : intro === game.intro_en
              ? 'en'
              : intro === game.intro_zh
                ? 'zh'
                : 'jp',
        disable_languages: Object.keys(game)
          .filter(k => k.startsWith('intro_') && !game[k as keyof GameData])
          .map(k => k.replace('intro_', '')),
      }
  }
}

export type CharacterContentType = 'name' | 'intro'

export interface PreferredName {
  name: string
  language: string
  disable_languages: string[]
}

export interface PreferredIntro {
  intro: string
  language: string
  disable_languages: string[]
}

export function getPreferredCharacterContent(
  character: GameCharacter,
  contentType: 'name',
  lang: Lang,
): PreferredName
export function getPreferredCharacterContent(
  character: GameCharacter,
  contentType: 'intro',
  lang: Lang,
): PreferredIntro
export function getPreferredCharacterContent(
  character: GameCharacter,
  contentType: CharacterContentType,
  lang: Lang,
): PreferredName | PreferredIntro {
  switch (contentType) {
    case 'name':
      const name =
        (character[`name_${lang}`] as string) ||
        character.name_jp ||
        character.name_en ||
        character.name_zh ||
        ''
      return {
        name: name,
        language:
          character[`name_${lang}`] === name
            ? lang
            : name === character.name_en
              ? 'en'
              : name === character.name_zh
                ? 'zh'
                : 'jp',
        disable_languages: Object.keys(character)
          .filter(k => k.startsWith('name_') && !character[k as keyof GameCharacter])
          .map(k => k.replace('name_', '')),
      }
    case 'intro':
      const intro =
        (character[`intro_${lang}`] as string) ||
        character.intro_jp ||
        character.intro_en ||
        character.intro_zh ||
        ''
      return {
        intro: intro,
        language:
          character[`intro_${lang}`] === intro
            ? lang
            : intro === character.intro_en
              ? 'en'
              : intro === character.intro_zh
                ? 'zh'
                : 'jp',
        disable_languages: Object.keys(character)
          .filter(k => k.startsWith('intro_') && !character[k as keyof GameCharacter])
          .map(k => k.replace('intro_', '')),
      }
  }
}

export function getPreferredDeveloperContent(developer: Developer, lang: Lang): PreferredIntro {
  const intro =
    (developer[`intro_${lang}`] as string) ||
    developer.intro_jp ||
    developer.intro_en ||
    developer.intro_zh ||
    ''
  return {
    intro: intro,
    language:
      developer[`intro_${lang}`] === intro
        ? lang
        : intro === developer.intro_en
          ? 'en'
          : intro === developer.intro_zh
            ? 'zh'
            : 'jp',
    disable_languages: Object.keys(developer)
      .filter(k => k.startsWith('intro_') && !developer[k as keyof Developer])
      .map(k => k.replace('intro_', '')),
  }
}
