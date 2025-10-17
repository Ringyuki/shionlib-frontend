import { Developer } from '@/interfaces/developer/developer.interface'
import { getTranslations, getLocale } from 'next-intl/server'
import { getPreferredDeveloperContent } from '@/components/game/description/helpers/getPreferredContent'
import { BBCodeContent } from '@/components/common/content/BBCode'

interface DetailsProps {
  developer: Developer
}

export const Details = async ({ developer }: DetailsProps) => {
  const t = await getTranslations('Components.Developer.Intros.Details')
  const locale = await getLocale()
  const langMap = { en: 'en', ja: 'jp', zh: 'zh' } as const
  const lang = langMap[locale as keyof typeof langMap] ?? 'jp'
  const intro = getPreferredDeveloperContent(developer, lang)
  return (
    <div className="flex flex-col gap-2">
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold">{t('intro')}</h2>
        <BBCodeContent content={intro.intro || t('no_intro')} className="text-sm break-words" />
      </div>
      {developer.extra_info.length > 0 && (
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold">{t('extra_info')}</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {developer.extra_info.map(info => (
              <div key={info.key} className="flex flex-col gap-1">
                <div className="text-sm text-gray-500">{info.key}</div>
                <div className="text-sm">{info.value}</div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
