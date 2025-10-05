import { Cover } from '@/components/game/edit/Cover'
import { shionlibRequest } from '@/utils/shionlib-request'

export default async function CoverPage({ params }: { params: { id: string } }) {
  const { id } = await params
  const data = await shionlibRequest().get(`/edit/game/${id}/cover`)

  return <Cover />
}
