import { Image } from '@/components/game/edit/Image'
import { shionlibRequest } from '@/utils/shionlib-request'

interface ImagePageProps {
  params: Promise<{ id: string }>
}

export default async function ImagePage({ params }: ImagePageProps) {
  const { id } = await params
  const data = await shionlibRequest().get(`/edit/game/${id}/image`)

  return <Image />
}
