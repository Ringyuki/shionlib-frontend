import { notFound } from 'next/navigation'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Developer } from '@/interfaces/developer/developer.interface'
import { GameItem } from '@/interfaces/game/game.interface'
import { DeveloperContent } from '@/components/developer/DeveloperContent'
import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { Pagination } from '@/components/common/content/Pagination'

interface DeveloperPageProps {
  params: Promise<{
    id: string
  }>
  searchParams: Promise<{
    page: string
  }>
}

const getData = async (id: string, page: string) => {
  const [developer, games] = await Promise.all([
    shionlibRequest().get<Developer>(`/developer/${id}`),
    shionlibRequest().get<PaginatedResponse<GameItem>>(`/game/list`, {
      params: {
        page: page,
        pageSize: 15,
        developer_id: id,
      },
    }),
  ])
  return { developer: developer.data, games: games.data?.items ?? [], meta: games.data?.meta }
}

export default async function DeveloperPage({ params, searchParams }: DeveloperPageProps) {
  const { id } = await params
  if (!id || isNaN(Number(id))) {
    notFound()
  }
  const { page } = await searchParams
  const { developer, games, meta } = await getData(id, page ?? '1')
  if (!developer) {
    notFound()
  }
  return (
    <div className="my-4 w-full flex flex-col gap-4">
      <DeveloperContent developer={developer} games={games} works_count={meta?.totalItems ?? 0} />
      <Pagination
        className="mt-4"
        currentPage={meta?.currentPage ?? 1}
        totalPages={meta?.totalPages ?? 1}
      />
    </div>
  )
}
