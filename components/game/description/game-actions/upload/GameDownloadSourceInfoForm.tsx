import {
  Form,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
  FormField,
} from '@/components/shionui/Form'
import { Textarea } from '@/components/shionui/Textarea'
import {
  MultiSelect,
  MultiSelectTrigger,
  MultiSelectContent,
  MultiSelectItem,
  MultiSelectValue,
} from '@/components/shionui/MultiSelect'
import { useTranslations } from 'next-intl'
import { Control, useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Platform,
  Language,
  PlatformOptions,
  LanguageOptions,
} from '@/interfaces/game/game.interface'
import { Button } from '@/components/shionui/Button'

const platformValues = PlatformOptions.map(option => option.value) as [Platform, ...Platform[]]
const languageValues = LanguageOptions.map(option => option.value) as [Language, ...Language[]]

export const gameDownloadSourceSchemaType = z.object({
  platform: z.enum(platformValues).array().min(1),
  language: z.enum(languageValues).array().min(1),
  note: z.string().optional(),
})

interface GameDownloadSourceInfoFormProps {
  onSubmit: (data: z.infer<typeof gameDownloadSourceSchemaType>) => void
  loading: boolean
}

export const GameDownloadSourceInfoForm = ({
  onSubmit,
  loading,
}: GameDownloadSourceInfoFormProps) => {
  const t = useTranslations('Components.Game.GameActions.GameUploadDialog')

  const gameDownloadSourceSchema = z.object({
    platform: z.enum(platformValues).array().min(1, t('validation.platform')),
    language: z.enum(languageValues).array().min(1, t('validation.language')),
    note: z.string().max(255, t('validation.note')),
  })
  const form = useForm<z.infer<typeof gameDownloadSourceSchema>>({
    resolver: zodResolver(gameDownloadSourceSchema),
    defaultValues: {
      platform: [],
      language: [],
      note: '',
    },
  })
  const platform = form.watch('platform')
  const language = form.watch('language')

  const handleSubmit = async (data: z.infer<typeof gameDownloadSourceSchema>) => {
    onSubmit(data)
  }
  return (
    <div className="flex flex-col">
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(handleSubmit)}>
          <FormField
            control={form.control as Control<z.infer<typeof gameDownloadSourceSchema>>}
            name="platform"
            render={() => (
              <FormItem>
                <FormLabel>{t('platform')}</FormLabel>
                <FormControl>
                  <MultiSelect
                    value={platform}
                    onValueChange={values =>
                      form.setValue('platform', values as Platform[], {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                  >
                    <MultiSelectTrigger className="w-full transition-all duration-200">
                      <MultiSelectValue placeholder={t('platformPlaceholder')} />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      {PlatformOptions.map(platform => (
                        <MultiSelectItem
                          key={platform.value}
                          value={platform.value}
                          className="hover:bg-primary/10 transition-all duration-200"
                        >
                          {platform.label}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectContent>
                  </MultiSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control as Control<z.infer<typeof gameDownloadSourceSchema>>}
            name="language"
            render={() => (
              <FormItem>
                <FormLabel>{t('language')}</FormLabel>
                <FormControl>
                  <MultiSelect
                    value={language}
                    onValueChange={values =>
                      form.setValue('language', values as Language[], {
                        shouldValidate: true,
                        shouldDirty: true,
                        shouldTouch: true,
                      })
                    }
                  >
                    <MultiSelectTrigger className="w-full transition-all duration-200">
                      <MultiSelectValue placeholder={t('languagePlaceholder')} />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      {LanguageOptions.map(language => (
                        <MultiSelectItem
                          key={language.value}
                          value={language.value}
                          className="hover:bg-primary/10 transition-all duration-200"
                        >
                          {language.label}
                        </MultiSelectItem>
                      ))}
                    </MultiSelectContent>
                  </MultiSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <FormField
            control={form.control as Control<z.infer<typeof gameDownloadSourceSchema>>}
            name="note"
            render={() => (
              <FormItem>
                <FormLabel>{t('note')}</FormLabel>
                <FormControl>
                  <Textarea {...form.register('note')} placeholder={t('notePlaceholder')} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          ></FormField>
          <Button type="submit" className="w-full" loading={loading}>
            {t('submit')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
