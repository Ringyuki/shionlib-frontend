import { GameItem } from '@/interfaces/game/game.interface'
import { GameCard } from '@/components/game/GameCard'
import { Masonry } from '@/components/common/shared/Masonry'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface GamesProps {
  games: GameItem[]
  content_limit: ContentLimit
}

export const Games = ({ games, content_limit }: GamesProps) => {
  return (
    <Masonry>
      {games.map(game => (
        <div key={game.id} className="break-inside-avoid">
          <GameCard game={game} content_limit={content_limit} />
        </div>
      ))}
    </Masonry>
  )
}
