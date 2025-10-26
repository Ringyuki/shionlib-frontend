import { Card, CardContent } from '@/components/shionui/Card'
import { GameData, GameItem } from '@/interfaces/game/game.interface'
import { Link } from '@/i18n/navigation'
import { getPreferredContent } from '@/components/game/description/helpers/getPreferredContent'
import { getLocale } from 'next-intl/server'
import { GameCover } from '@/components/game/cover/GameCover'
import { GameTitle } from '@/components/game/description/GameTitle'
import { GameDeveloper } from '@/components/game/description/GameDeveloper'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface GameCardProps {
  game: GameItem
  content_limit: ContentLimit
}

export const GameCard = async ({ game, content_limit }: GameCardProps) => {
  const locale = await getLocale()
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
  const { title } = getPreferredContent(game as unknown as GameData, 'title', lang)
  const all_titles = [game.title_jp, game.title_zh, game.title_en]
  const excess_titles = all_titles.filter(t => t !== title).filter(t => !!t)

  const { cover, vertical, aspect } = getPreferredContent(
    game as unknown as GameData,
    'cover',
    lang,
  )
  return (
    <Link href={`/game/${game.id}`}>
      <Card className="py-0 overflow-hidden hover:bg-card-hover transition-colors duration-200">
        <CardContent className="p-0 flex gap-2"></CardContent>
      </Card>
    </Link>
  )
}
