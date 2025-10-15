import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { UserProfile } from '@/components/user/home/profile/UserProfile'
import { UserProfile as UserProfileType } from '@/interfaces/user/user.interface'
import { shionlibRequest } from '@/utils/shionlib-request'
import { HomeTabsNav } from '@/components/user/home/HomeTabsNav'

export async function getUser(id: string) {
  const data = await shionlibRequest().get<UserProfileType>(`/user/${id}`)
  return data.data
}

interface UserLayoutProps {
  children: React.ReactNode
  params: Promise<{
    locale: string
    id: string
  }>
}

export default async function UserLayout({ children, params }: Readonly<UserLayoutProps>) {
  const { locale, id } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }
  const user = await getUser(id)
  if (!user) {
    notFound()
  }
  return (
    <div className="my-4 w-full">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-1">
          <UserProfile user={user} />
        </div>
        <div className="space-y-6 lg:col-span-2">
          <HomeTabsNav user={user} />
          {children}
        </div>
      </div>
    </div>
  )
}
