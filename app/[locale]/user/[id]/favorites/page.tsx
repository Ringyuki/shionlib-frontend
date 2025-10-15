import { FavoriteContent } from '@/components/user/home/favorites/FavoriteContent'
import { Empty } from '@/components/common/content/Empty'
import { shionlibRequest } from '@/utils/shionlib-request'
import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { FavoriteItem } from '@/interfaces/user/favorites.interface'
import { ContentLimit } from '@/interfaces/user/user.interface'
import { Pagination } from '@/components/common/content/Pagination'

interface UserFavoritesPageProps {
  params: { id: string }
  searchParams: { page: string }
}

const getData = async (id: string, searchParams: { page: string }) => {
  const data = await shionlibRequest().get<
    PaginatedResponse<FavoriteItem, { content_limit: ContentLimit }>
  >(`/user/datas/${id}/favorites`, {
    params: {
      page: searchParams.page ?? '1',
    },
  })
  return data
}

export default async function UserFavoritesPage({ params, searchParams }: UserFavoritesPageProps) {
  const { id } = await params
  const { page } = await searchParams
  const data = await getData(id, { page })
  return (data.data?.items?.length ?? 0 > 0) ? (
    <div>
      <FavoriteContent
        favorites={data.data?.items ?? []}
        content_limit={data.data?.meta.content_limit}
      />
      <Pagination
        className="mt-4"
        currentPage={data.data?.meta.currentPage!}
        totalPages={data.data?.meta.totalPages!}
      />
    </div>
  ) : (
    <Empty />
  )
}
