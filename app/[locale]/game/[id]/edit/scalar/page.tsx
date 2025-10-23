import { Scalar } from '@/components/game/edit/Scalar'
import { shionlibRequest } from '@/utils/shionlib-request'
import { GameScalar } from '@/interfaces/edit/game-scalar.interface'

interface ScalarPageProps {
  params: Promise<{ id: string }>
}

export default async function ScalarPage({ params }: ScalarPageProps) {
  const { id } = await params
  const data = await shionlibRequest().get<GameScalar>(`/edit/game/${id}/scalar`)

  return <Scalar data={data.data!} />
}
