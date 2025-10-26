import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { GameItem } from '@/interfaces/game/game.interface'
import { Container } from '@/components/home/Container'
import { ContentLimit } from '@/interfaces/user/user.interface'

const getData = async () => {
  const [activities, games] = await Promise.all([
    shionlibRequest().get<PaginatedResponse<ActivityInterface>>(`/activity/list`, {
      params: {
        page: 1,
        pageSize: 30,
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
  ])
  return {
    activities: activities.data?.items ?? [],
    games: games.data?.items ?? [],
    content_limit: games.data?.meta.content_limit ?? 0,
  }
}

export default async function HomePage() {
  const { activities, games, content_limit } = await getData()
  return (
    <div className="container mx-auto my-4">
      <Container activities={activities} games={games} content_limit={content_limit} />
    </div>
  )
}
