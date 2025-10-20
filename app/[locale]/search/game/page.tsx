import { PaginatedResponse, PaginatedMeta } from '@/interfaces/api/shionlib-api-res.interface'
import { GameSearchItem } from '@/interfaces/game/game.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Results } from '@/components/common/search/game/Results'

interface SearchGamePageProps {
  searchParams: {
    page: string
    q: string
  }
}

const getData = async (page: string, q: string) => {
  const data = await shionlibRequest().get<PaginatedResponse<GameSearchItem>>(`/search/games`, {
    params: {
      page: page ?? '1',
      pageSize: 15,
      q,
    },
  })
  return data
}

export default async function SearchGamePage({ searchParams }: SearchGamePageProps) {
  const { page, q } = await searchParams
  const data = await getData(page, q)
  return (
    <div className="container mx-auto my-4 space-y-6">
      <Results games={data.data?.items ?? []} pagination={data.data?.meta as PaginatedMeta} q={q} />
    </div>
  )
}
