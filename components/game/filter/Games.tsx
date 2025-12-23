import { GameItem } from '@/interfaces/game/game.interface'
// import { Masonry } from '@/components/common/shared/Masonry'
import { PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { Pagination } from '@/components/common/content/Pagination'
// import { GameCard } from '../GameCard'
import { GameCard } from '@/components/home/games/GameCard'
import { ExtraQuery } from '@/components/common/content/Pagination'
import { Empty } from '@/components/common/content/Empty'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface GamesProps {
  games: GameItem[]
  pagination: PaginatedMeta
  extraQuery: ExtraQuery
  content_limit: ContentLimit
}

export const Games = ({ games, pagination, extraQuery, content_limit }: GamesProps) => {
  return games.length > 0 ? (
    <>
      {/* <Masonry>
        {games.map(game => (
          <div key={game.id} className="break-inside-avoid">
            <GameCard game={game} content_limit={content_limit} />
          </div>
        ))}
      </Masonry> */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {games.map(game => (
          <GameCard key={game.id} game={game} content_limit={content_limit} />
        ))}
      </div>
      <Pagination
        className="mt-4"
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        extraQuery={{ filter: extraQuery }}
        needQsParse
      />
    </>
  ) : (
    <Empty />
  )
}
