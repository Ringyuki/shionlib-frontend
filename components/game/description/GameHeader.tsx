import { GameData } from '@/interfaces/game/game.interface'
import { Separator } from '@/components/shionui/Separator'
import { GameTitle } from './GameTitle'
import { GameDeveloper } from './GameDeveloper'
import { GamePlatform } from './GamePlatform'
import { GameReleaseTime } from './GameReleaseTime'
import { GameActions } from '../actions/GameActions'
import { getPreferredContent } from './helpers/getPreferredContent'
import { GameCover } from '../cover/GameCover'
import { getLocale } from 'next-intl/server'

export const GameHeader = async ({ game }: { game: GameData }) => {
  const locale = await getLocale()
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'

  const { title } = getPreferredContent(game, 'title', lang)
  const all_titles = [game.title_jp, game.title_zh, game.title_en]
  const excess_titles = all_titles.filter(t => t !== title).filter(t => !!t)

  const { cover, vertical, aspect } = getPreferredContent(game, 'cover', lang)
  return (
    <div className="flex flex-col md:flex-row overflow-hidden md:gap-4 gap-2 shadow-xl bg-card-soft w-full rounded-md">
      <GameCover
        covers={game.covers}
        preferredCoverInfo={{ cover, vertical, aspect }}
        title={title}
      />
      <div className="p-4 pt-2 md:p-6 md:pl-2 flex flex-1 h-auto justify-between gap-2 flex-col">
        <div className="flex flex-col gap-2">
          <GameTitle title={title} excess_titles={excess_titles} aliases={game.aliases} />
          <div className="flex gap-8 mt-2 flex-wrap items-center">
            <GameDeveloper developers={game.developers} />
            <GameReleaseTime release_date={game.release_date} />
          </div>
          <GamePlatform platform={game.platform} className="mt-2" />
        </div>
        <Separator />
        <GameActions game={game} />
      </div>
    </div>
  )
}
