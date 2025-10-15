import { redirect } from 'next/navigation'

export default async function UserPage({ params }: { params: { id: string } }) {
  const { id } = await params
  redirect(`/user/${id}/uploads`)
}
