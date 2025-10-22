import { notFound } from 'next/navigation'
import { shionlibRequest } from '@/utils/shionlib-request'
import { GameData } from '@/interfaces/game/game.interface'
import { GameHeader } from '@/components/game/description/GameHeader'
import { GameContent } from '@/components/game/description/GameContent'
import { CommentContent } from '@/components/common/comment/CommentContent'
import { Comment } from '@/interfaces/comment/comment.interface'
import { PaginatedResponse } from '@/interfaces/api/shionlib-api-res.interface'

const getGameData = async (id: string) => {
  const data = await shionlibRequest().get<GameData>(`/game/${id}`)
  if (!data.data) {
    notFound()
  }
  return data.data
}

const getComments = async (game_id: string) => {
  const data = await shionlibRequest().get<PaginatedResponse<Comment>>(`/comment/game/${game_id}`, {
    params: {
      page: 1,
      pageSize: 50,
    },
  })
  return data.data?.items as Comment[]
}

interface GamePageProps {
  params: { id: string }
}

export default async function GamePage({ params }: GamePageProps) {
  const { id } = await params
  if (!id || isNaN(Number(id))) {
    notFound()
  }
  const game = await getGameData(id)
  const comments = await getComments(id)

  return (
    <div className="flex flex-col gap-8">
      <GameHeader game={game} />
      <GameContent game={game} />
      <CommentContent game_id={id} comments={comments} />
    </div>
  )
}
