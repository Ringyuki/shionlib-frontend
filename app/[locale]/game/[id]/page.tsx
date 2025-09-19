import { notFound } from 'next/navigation'

export default async function GamePage({ params }: { params: { id: string } }) {
  const { id } = await params
  if (!id) {
    notFound()
  }
  return <div>GamePage {id}</div>
}
