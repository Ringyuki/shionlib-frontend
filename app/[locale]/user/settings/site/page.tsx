import { shionlibRequest } from '@/utils/shionlib-request'
import { User } from '@/interfaces/user/user.interface'
import { SiteSettings } from '@/components/user/settings/SiteSettings'
import { notFound } from 'next/navigation'

export default async function UserSiteSettingsPage() {
  const data = await shionlibRequest().get<User>('/user/me')
  if (!data.data) {
    notFound()
  }
  return <SiteSettings user={data.data} />
}
