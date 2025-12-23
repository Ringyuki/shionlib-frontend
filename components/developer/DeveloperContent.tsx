import { Developer } from '@/interfaces/developer/developer.interface'
import { DeveloperIntro } from './intros/DeveloperIntro'
import { GameItem } from '@/interfaces/game/game.interface'
// import { GameCard } from '../game/GameCard'
import { GameCard } from '@/components/home/games/GameCard'
// import { Masonry } from '../common/shared/Masonry'
import { PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { Pagination } from '../common/content/Pagination'
import { Empty } from '../common/content/Empty'
import { ContentLimit } from '@/interfaces/user/user.interface'

interface DeveloperContentProps {
  developer: Developer
  games: GameItem[]
  meta: PaginatedMeta
  works_count: number
  content_limit: ContentLimit
}

export const DeveloperContent = ({
  developer,
  games,
  meta,
  works_count,
  content_limit,
}: DeveloperContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <DeveloperIntro developer={developer} works_count={works_count} />
      {games.length > 0 ? (
        <>
          {/* <Masonry>
            {games.map(game => (
              <div key={game.id} className="break-inside-avoid">
                <GameCard key={game.id} game={game} />
              </div>
            ))}
          </Masonry> */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {games.map(game => (
              <GameCard key={game.id} game={game} content_limit={content_limit} />
            ))}
          </div>
          <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} />
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}
