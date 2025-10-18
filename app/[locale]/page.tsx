import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { GameItem } from '@/interfaces/game/game.interface'
import { GameCard } from '@/components/game/GameCard'
import { Masonry } from '@/components/common/shared/Masonry'
import { ContentLimit } from '@/interfaces/user/user.interface'

const getData = async () => {
  const data = await shionlibRequest().get<
    PaginatedResponse<GameItem, { content_limit: ContentLimit }>
  >('/game/list', {
    params: {
      pageSize: 50,
    },
  })
  return data
}

export default async function HomePage() {
  const data = await getData()
  return (
    <div className="container mx-auto my-4 space-y-6">
      <div className="flex flex-col gap-8 w-full">
        <Masonry>
          {data.data?.items.map(item => (
            <div key={item.id} className="break-inside-avoid">
              <GameCard game={item} content_limit={data.data?.meta.content_limit} />
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  )
}
