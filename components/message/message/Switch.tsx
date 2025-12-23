'use client'

import { useTranslations } from 'next-intl'
import { Tabs, TabsList, TabsTrigger } from '@/components/shionui/animated/Tabs'
import { useSearchParams } from 'next/navigation'
import { useRouter, usePathname } from '@/i18n/navigation.client'
import { Card, CardContent } from '@/components/shionui/Card'

export const Switch = () => {
  const t = useTranslations('Components.Message.Message.Switch')
  const pathname = usePathname()
  const searchParams = useSearchParams()
  const unread = searchParams.get('unread')
  const router = useRouter()
  const handleChange = (value: string) => {
    if (value === 'all') router.push(`${pathname}?page=1`)
    else router.push(`${pathname}?unread=${value === 'unread'}&page=1`)
  }

  return (
    <Card className="rounded-md sticky md:top-24 top-18 z-20 py-0 dark:bg-[rgba(0,0,0,0.5)] bg-[rgba(255,255,255,0.7)] backdrop-blur-xl backdrop-saturate-[3.5]">
      <CardContent className="p-0">
        <Tabs
          value={unread === null ? 'all' : unread === 'true' ? 'unread' : 'read'}
          onValueChange={handleChange}
          className="w-full!"
        >
          <TabsList className="w-full! bg-transparent!" highlightClassName="bg-secondary">
            <TabsTrigger value="all">{t('all')}</TabsTrigger>
            <TabsTrigger value="read">{t('read')}</TabsTrigger>
            <TabsTrigger value="unread">{t('unread')}</TabsTrigger>
          </TabsList>
        </Tabs>
      </CardContent>
    </Card>
  )
}
