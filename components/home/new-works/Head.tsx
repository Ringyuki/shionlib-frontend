import {
  PageHeader,
  PageHeaderTitle,
  PageHeaderDescription,
} from '@/components/common/content/PageHeader'
import { getTranslations, getLocale } from 'next-intl/server'

export const Head = async () => {
  const t = await getTranslations('Components.Home.NewWorks.Head')
  const locale = await getLocale()
  const month = new Date().getMonth() + 1
  const year = new Date().getFullYear()
  const monthName = new Intl.DateTimeFormat(locale, { month: 'long' }).format(
    new Date(year, month - 1),
  )
  const yearName = new Intl.DateTimeFormat(locale, { year: 'numeric' }).format(
    new Date(year, month - 1),
  )
  return (
    <PageHeader showSeparator={false}>
      <PageHeaderTitle title={t('title')} className="text-xl" />
      <PageHeaderDescription description={t('description', { monthName, yearName })} />
    </PageHeader>
  )
}
