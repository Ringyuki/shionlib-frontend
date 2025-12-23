import { GameItem } from '@/interfaces/game/game.interface'
// import { GameCard } from '@/components/game/GameCard'
// import { Masonry } from '@/components/common/shared/Masonry'

import { GameCard } from '@/components/home/games/GameCard'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface GamesProps {
  games: GameItem[]
  content_limit: ContentLimit
}

export const Games = ({ games, content_limit }: GamesProps) => {
  return (
    // <Masonry>
    //   {games.map(game => (
    //     <div key={game.id} className="break-inside-avoid">
    //       <GameCard game={game} content_limit={content_limit} />
    //     </div>
    //   ))}
    // </Masonry>

    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 2xl:grid-cols-6 gap-4">
      {games.map(game => (
        <GameCard key={game.id} game={game} content_limit={content_limit} />
      ))}
    </div>
  )
}
