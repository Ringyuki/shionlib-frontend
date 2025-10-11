import { shionlibRequest } from '@/utils/shionlib-request'
import { User } from '@/interfaces/user/user.interface'
import { UserSettings } from '@/components/user/settings/Settings'
import { notFound } from 'next/navigation'

export default async function UserPersonalSettingsPage() {
  const data = await shionlibRequest().get<User>('/user/me')
  if (!data.data) {
    notFound()
  }
  return <UserSettings user={data.data} />
}
