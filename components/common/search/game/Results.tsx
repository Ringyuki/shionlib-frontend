import { GameSearchItem } from '@/interfaces/game/game.interface'
import { Pagination } from '@/components/common/content/Pagination'
import { GameCard } from '@/components/game/GameCard'
import { Masonry } from '@/components/common/shared/Masonry'
import { Empty } from '@/components/common/content/Empty'
import { PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { SearchIcon } from 'lucide-react'
import { getTranslations } from 'next-intl/server'

interface ResultsProps {
  games: GameSearchItem[]
  pagination: PaginatedMeta
  q: string
}

export const Results = async ({ games, pagination, q }: ResultsProps) => {
  const t = await getTranslations('Components.Common.Search.Game.Results')
  return games.length > 0 ? (
    <div className="space-y-4">
      <h1 className="text-xl font-normal text-muted-foreground flex flex-wrap items-center gap-2">
        <span>{t('result_prefix')}</span>
        <span className="text-primary font-bold flex items-center gap-1">
          <SearchIcon className="size-4 shrink-0" />
          <span className="text-primary">{q}</span>
        </span>
        <span>{t('result_suffix', { total: pagination.totalItems })}</span>
      </h1>
      <Masonry>
        {games.map(item => (
          <div key={item.id} className="break-inside-avoid">
            <GameCard game={item} />
          </div>
        ))}
      </Masonry>
      <Pagination
        currentPage={pagination.currentPage}
        totalPages={pagination.totalPages}
        extraQuery={{ q }}
      />
    </div>
  ) : (
    <Empty />
  )
}
