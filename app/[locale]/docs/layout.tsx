import { getDirectoryTree } from '@/libs/docs/directoryTree'
import { DocsSideBar } from '@/components/docs/sidebar/SideBar'
import { getLocale } from 'next-intl/server'

export default async function DocsLayout({ children }: { children: React.ReactNode }) {
  const locale = await getLocale()
  const tree = getDirectoryTree(locale)
  return (
    <div className="w-full my-4 flex">
      <div className="hidden lg:block w-64">
        <DocsSideBar tree={tree} />
      </div>
      <div className="flex-1">{children}</div>
    </div>
  )
}
