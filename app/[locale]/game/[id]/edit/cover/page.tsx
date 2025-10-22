import { Cover } from '@/components/game/edit/Cover'
import { shionlibRequest } from '@/utils/shionlib-request'

interface CoverPageProps {
  params: { id: string }
}

export default async function CoverPage({ params }: CoverPageProps) {
  const { id } = await params
  const data = await shionlibRequest().get(`/edit/game/${id}/cover`)

  return <Cover />
}
