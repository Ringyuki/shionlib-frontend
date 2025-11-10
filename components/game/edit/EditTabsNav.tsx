'use client'

import { useMemo } from 'react'
import { useSelectedLayoutSegment } from 'next/navigation'
import { Tabs, TabsList, TabsTrigger } from '@/components/shionui/animated/Tabs'
import { useEditPermissionStore } from '@/store/editPermissionStore'
import { useParams, redirect } from 'next/navigation'
import { Link } from '@/i18n/navigation.client'
import { useTranslations } from 'next-intl'

const tabs = [
  { name: 'scalar', href: 'scalar' },
  { name: 'link', href: 'link', disabled: true },
  { name: 'cover', href: 'cover' },
  { name: 'image', href: 'image', disabled: true },
  { name: 'developer', href: 'developer', disabled: true },
  { name: 'character', href: 'character', disabled: true },
]

export const EditTabsNav = () => {
  const t = useTranslations('Components.Game.Edit.EditTabsNav')
  const { id } = useParams()
  const segment = useSelectedLayoutSegment()
  const active = useMemo(
    () => (segment && tabs.some(t => t.href === segment) ? segment : 'scalar'),
    [segment],
  )

  const { permissions } = useEditPermissionStore()
  if (!permissions) {
    redirect(`/game/${id}`)
  }
  return (
    <Tabs value={active} className="w-full!">
      <TabsList className="w-full!">
        {tabs.map(
          tab =>
            !tab.disabled && (
              <TabsTrigger key={tab.href} value={tab.href} asChild>
                <Link href={tab.href}>{t(tab.name)}</Link>
              </TabsTrigger>
            ),
        )}
      </TabsList>
    </Tabs>
  )
}
