import { Header } from '@/components/game/filter/Header'
import { GameFilter } from '@/components/game/filter/GameFilter'
import { shionlibRequest } from '@/utils/shionlib-request'
import { SortBy, SortOrder } from '@/components/game/filter/enums/Sort.enum'
import { Games } from '@/components/game/filter/Games'
import { PaginatedResponse, PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { GameItem } from '@/interfaces/game/game.interface'
import { ExtraQuery } from '@/components/common/content/Pagination'
import qs from 'qs'
import { parseGameSearchParams } from '@/libs/game/useGameList'

interface GamePageProps {
  searchParams: ExtraQuery
}

const getData = async (
  tags: string[],
  years: number[],
  months: number[],
  sortBy: SortBy,
  sortOrder: SortOrder,
  page: number,
) => {
  const query = {
    filter: {
      tags,
      years,
      months,
      sort_by: sortBy,
      sort_order: sortOrder,
    },
    page,
  }
  const data = await shionlibRequest().get<PaginatedResponse<GameItem>>(
    `/game/list?${qs.stringify(query, { arrayFormat: 'brackets' })}&pageSize=20`,
  )
  return data
}

export default async function GamePage({ searchParams }: GamePageProps) {
  const { filter, page } = parseGameSearchParams(await searchParams)
  const { tags, years, months, sort_by, sort_order } = filter
  const data = await getData(tags, years, months, sort_by, sort_order, page)

  return (
    <div className="container mx-auto my-4">
      <Header />
      <div className="flex flex-col gap-6">
        <GameFilter
          initialTags={tags}
          initialYear={years}
          initialMonth={months}
          initialSortBy={sort_by}
          initialSortOrder={sort_order}
          initialPage={page}
        />
        <Games
          games={data.data?.items ?? []}
          pagination={data.data?.meta as PaginatedMeta}
          extraQuery={filter as ExtraQuery}
        />
      </div>
    </div>
  )
}
