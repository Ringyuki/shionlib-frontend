import { Image } from '@/components/game/edit/Image'
import { shionlibRequest } from '@/utils/shionlib-request'

export default async function ImagePage({ params }: { params: { id: string } }) {
  const { id } = await params
  const data = await shionlibRequest().get(`/edit/game/${id}/image`)

  return <Image />
}
