import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Activity as ActivityInterface } from '@/interfaces/activity/activity.interface'
import { Container } from '@/components/home/Container'

const getData = async () => {
  const [activities] = await Promise.all([
    shionlibRequest().get<PaginatedResponse<ActivityInterface>>(`/activity/list`, {
      params: {
        page: 1,
        pageSize: 30,
      },
    }),
  ])
  return { activities: activities.data?.items ?? [] }
}

export default async function HomePage() {
  const { activities } = await getData()
  return (
    <div className="container mx-auto my-4">
      <Container activities={activities} />
    </div>
  )
}
