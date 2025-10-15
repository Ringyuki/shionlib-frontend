'use client'

import { useMemo } from 'react'
import { UserProfile as UserProfileType } from '@/interfaces/user/user.interface'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/shionui/animated/Tabs'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

interface HomeTabsNavProps {
  user: UserProfileType
}

export const HomeTabsNav = ({ user }: HomeTabsNavProps) => {
  const t = useTranslations('Components.User.Home.HomeTabsNav')

  const tabs = [
    { name: 'upload', href: 'uploads' },
    { name: 'comment', href: 'comments' },
    { name: 'favorite', href: 'favorites' },
    { name: 'edit', href: 'edits' },
  ]

  const segment = useSelectedLayoutSegment()
  const active = useMemo(
    () => (segment && tabs.some(t => t.href === segment) ? segment : 'uploads'),
    [segment],
  )
  return (
    <Tabs value={active} className="w-full!">
      <TabsList className="w-full!">
        {tabs.map(tab => (
          <TabsTrigger key={tab.href} value={tab.href} asChild>
            <Link href={tab.href}>{t(tab.name)}</Link>
          </TabsTrigger>
        ))}
      </TabsList>
    </Tabs>
  )
}
