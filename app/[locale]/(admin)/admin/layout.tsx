import { shionlibRequest } from '@/utils/shionlib-request'
import { User } from '@/interfaces/user/user.interface'
import { redirect } from 'next/navigation'
import { AdminSidebar } from '@/components/admin/layout/AdminSidebar'
import { SidebarInset, SidebarProvider, SidebarTrigger } from '@/components/shionui/Sidebar'

interface AdminLayoutProps {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

async function getUser() {
  const res = await shionlibRequest({ forceNotThrowError: true }).get<User>('/user/me')
  return res.data
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params
  const user = await getUser()

  if (!user || user.role < 2) {
    redirect(`/${locale}`)
  }

  return (
    <SidebarProvider>
      <div className="flex h-screen w-full bg-gray-50 dark:bg-gray-950">
        <AdminSidebar />
        <SidebarInset className="flex flex-col">
          <header className="flex h-12 shrink-0 items-center gap-2 border-b border-gray-200 dark:border-gray-800 bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm px-4">
            <SidebarTrigger className="-ml-1" />
          </header>
          <main className="flex-1 overflow-auto p-6">{children}</main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  )
}
