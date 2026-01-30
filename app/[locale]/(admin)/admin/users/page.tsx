import { shionlibRequest } from '@/utils/shionlib-request'
import { User } from '@/interfaces/user/user.interface'
import { AdminUsersClient } from '@/components/admin/users/AdminUsersClient'

async function getMe() {
  const res = await shionlibRequest({ forceNotThrowError: true }).get<User>('/user/me')
  return res.data
}

export default async function AdminUsersPage() {
  const me = await getMe()
  return <AdminUsersClient currentRole={me?.role ?? 1} currentUserId={me?.id ?? 0} />
}
