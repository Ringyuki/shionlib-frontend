import { Scalar } from '@/components/game/edit/Scalar'
import { shionlibRequest } from '@/utils/shionlib-request'
import { GameScalar } from '@/interfaces/edit/game-scalar.interface'

export default async function ScalarPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const data = await shionlibRequest().get<GameScalar>(`/edit/game/${id}/scalar`)

  return <Scalar data={data.data!} />
}
