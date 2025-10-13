'use client'

import { useMemo } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/shionui/animated/Tabs'
import Link from 'next/link'
import { useTranslations } from 'next-intl'

const tabs = [
  { name: 'personal', href: 'personal' },
  { name: 'site', href: 'site' },
]

export const UserSettingsTabsNav = () => {
  const t = useTranslations('Components.User.Settings.TabsNav')
  const segment = useSelectedLayoutSegment()
  const active = useMemo(
    () => (segment && tabs.some(t => t.href === segment) ? segment : 'personal'),
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
