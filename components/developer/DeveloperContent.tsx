import { Developer } from '@/interfaces/developer/developer.interface'
import { DeveloperIntro } from './intros/DeveloperIntro'
import { GameItem } from '@/interfaces/game/game.interface'
import { GameCard } from '../game/GameCard'
import { Masonry } from '../common/shared/Masonry'
import { PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { Pagination } from '../common/content/Pagination'
import { Empty } from '../common/content/Empty'

interface DeveloperContentProps {
  developer: Developer
  games: GameItem[]
  meta: PaginatedMeta
  works_count: number
}

export const DeveloperContent = ({
  developer,
  games,
  meta,
  works_count,
}: DeveloperContentProps) => {
  return (
    <div className="flex flex-col gap-8">
      <DeveloperIntro developer={developer} works_count={works_count} />
      {games.length > 0 ? (
        <>
          <Masonry>
            {games.map(game => (
              <div key={game.id} className="break-inside-avoid">
                <GameCard key={game.id} game={game} />
              </div>
            ))}
          </Masonry>
          <Pagination currentPage={meta.currentPage} totalPages={meta.totalPages} />
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}
