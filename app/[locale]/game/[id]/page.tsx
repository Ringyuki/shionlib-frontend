import { notFound } from 'next/navigation'
import { shionlibRequest } from '@/utils/shionlib-request'
import { GameData } from '@/interfaces/game/game.interface'
import { GameHeader } from '@/components/game/description/GameHeader'
import { GameContent } from '@/components/game/description/GameContent'

const getGameData = async (id: string) => {
  const data = await shionlibRequest().get<GameData>(`/game/${id}`)
  if (!data.data) {
    notFound()
  }
  return data.data
}

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id } = await params
  if (!id || isNaN(Number(id))) {
    notFound()
  }
  const game = await getGameData(id)

  return (
    <div className="flex flex-col gap-8">
      <GameHeader game={game} />
      <GameContent game={game} />
    </div>
  )
}
