import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { shionlibRequest } from '@/utils/shionlib-request'

interface GameCover {
  language: string
  url: string
  type: string
  dims: number[]
}

interface GameItem {
  id: number
  title_jp: string
  title_zh: string
  title_en: string
  covers: GameCover[]
  views: number
}

export async function getTestData() {
  const data = await shionlibRequest().get<PaginatedResponse<GameItem>>('/game/list')
  return (
    <div>
      {data.data?.items.map(item => (
        <div key={item.id}>{item.title_jp}</div>
      ))}
    </div>
  )
}

export default function Shion() {
  return <div className="container mx-auto my-4 space-y-6">{getTestData()}</div>
}
