import { ContentLimit } from '@/components/user/settings/ContentLimit'
import { LanguageSettings } from '@/components/user/settings/Language'
import { Aria2 } from '@/components/user/settings/Aria2'
import { User } from '@/interfaces/user/user.interface'

interface SiteSettingsProps {
  user: User
}

export const SiteSettings = ({ user }: SiteSettingsProps) => {
  return (
    <div className="w-full flex flex-col gap-4">
      <ContentLimit initialContentLimit={user.content_limit!} />
      <LanguageSettings initialLanguage={user.lang} />
      <Aria2 />
    </div>
  )
}
