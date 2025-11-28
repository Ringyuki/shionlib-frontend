import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { GameItem } from '@/interfaces/game/game.interface'
import { Container } from '@/components/home/Container'
import { ContentLimit } from '@/interfaces/user/user.interface'

const getData = async () => {
  const [activities, hotGames, newWorks] = await Promise.all([
    shionlibRequest().get<PaginatedResponse<ActivityInterface>>(`/activity/list`, {
      params: {
        page: 1,
        pageSize: 50,
      },
    }),
    shionlibRequest().get<PaginatedResponse<GameItem, { content_limit: ContentLimit }>>(
      `/game/list`,
      {
        params: {
          'filter[sort_by]': 'hot_score',
          page: 1,
          pageSize: 40,
        },
      },
    ),
    shionlibRequest().get<PaginatedResponse<GameItem, { content_limit: ContentLimit }>>(
      `/game/list`,
      {
        params: {
          'filter[years][]': new Date().getFullYear(),
          'filter[months][]': new Date().getMonth() + 1,
          'filter[sort_by]': 'release_date',
          'filter[sort_order]': 'desc',
          page: 1,
          pageSize: 40,
        },
      },
    ),
  ])
  return {
    activities: activities.data?.items ?? [],
    hotGames: hotGames.data?.items ?? [],
    content_limit: hotGames.data?.meta.content_limit ?? 0,
    newWorks: newWorks.data?.items ?? [],
  }
}

export default async function HomePage() {
  const { activities, hotGames, content_limit, newWorks } = await getData()
  return (
    <div className="container mx-auto my-4">
      <Container
        activities={activities}
        games={hotGames}
        content_limit={content_limit}
        newWorks={newWorks}
      />
    </div>
  )
}
