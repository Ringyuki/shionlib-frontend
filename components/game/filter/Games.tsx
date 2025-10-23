import { GameItem } from '@/interfaces/game/game.interface'
import { Masonry } from '@/components/common/shared/Masonry'
import { PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { Pagination } from '@/components/common/content/Pagination'
import { GameCard } from '../GameCard'
import { ExtraQuery } from '@/components/common/content/Pagination'

interface GamesProps {
  games: GameItem[]
  pagination: PaginatedMeta
  extraQuery: ExtraQuery
}

export const Games = ({ games, pagination, extraQuery }: GamesProps) => {
  return (
    <div className="space-y-4">
      <Masonry>
        {games.map(game => (
          <div key={game.id} className="break-inside-avoid">
            <GameCard game={game} />
          </div>
        ))}
      </Masonry>
      <Pagination
        className="mt-4"
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        extraQuery={{ filter: extraQuery } as unknown as ExtraQuery}
        needQsParse
      />
    </div>
  )
}
