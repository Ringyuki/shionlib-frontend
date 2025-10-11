import { getTranslations } from 'next-intl/server'

export default async function UserSiteSettingsPage() {
  const t = await getTranslations('Pages.User.Settings')
  return <div>{t('title')}</div>
}
