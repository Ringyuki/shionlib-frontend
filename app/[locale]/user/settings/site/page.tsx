import { shionlibRequest } from '@/utils/shionlib-request'
import { User } from '@/interfaces/user/user.interface'
import { SiteSettings } from '@/components/user/settings/SiteSettings'
import { LoginRequired } from '@/components/user/settings/LoginRequired'

export default async function UserSiteSettingsPage() {
  const data = await shionlibRequest().get<User>('/user/me')
  if (!data.data) {
    return <LoginRequired />
  }
  return <SiteSettings user={data.data} />
}
