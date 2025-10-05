import { Props } from '@/i18n/types/props'
import { hasLocale } from 'next-intl'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import { EditTabsNav } from '@/components/game/edit/EditTabsNav'
import { getTranslations } from 'next-intl/server'

export default async function EditLayout({ children, params }: Readonly<Props>) {
  const t = await getTranslations('Components.Game.Edit.EditLayout')
  const { locale } = await params
  if (!hasLocale(routing.locales, locale)) {
    notFound()
  }

  return (
    <div className="w-full">
      <div className="w-full flex flex-col gap-4 shadow-xl bg-card-soft rounded-md p-4">
        <div className="w-full flex flex-col gap-4">
          <h2 className="text-xl font-bold">{t('edit')}</h2>
          <p className="text-sm text-muted-foreground">{t('description')}</p>
        </div>
        <EditTabsNav />
        {children}
      </div>
    </div>
  )
}
