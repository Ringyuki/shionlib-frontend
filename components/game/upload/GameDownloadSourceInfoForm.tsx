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
import { Control, useForm, useWatch } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import {
  Platform,
  Language,
  PlatformOptions,
  LanguageOptions,
} from '@/interfaces/game/game.interface'
import { Button } from '@/components/shionui/Button'
import { cn } from '@/utils/cn'

const platformValues = PlatformOptions.map(option => option.value) as [Platform, ...Platform[]]
const languageValues = LanguageOptions.map(option => option.value) as [Language, ...Language[]]

export const gameDownloadSourceSchemaType = z.object({
  platform: z.enum(platformValues).array().min(1),
  language: z.enum(languageValues).array().min(1),
  note: z.string().optional(),
})

interface GameDownloadSourceInfoFormProps {
  className?: string
  onSubmit: (data: z.infer<typeof gameDownloadSourceSchemaType>) => void
  loading: boolean
  initialValues?: z.infer<typeof gameDownloadSourceSchemaType>
}

export const GameDownloadSourceInfoForm = ({
  className,
  onSubmit,
  loading,
  initialValues,
}: GameDownloadSourceInfoFormProps) => {
  const t = useTranslations('Components.Game.Upload.GameUploadDialog')

  const gameDownloadSourceSchema = z.object({
    platform: z.enum(platformValues).array().min(1, t('validation.platform')),
    language: z.enum(languageValues).array().min(1, t('validation.language')),
    note: z.string().max(255, t('validation.note')),
  })
  const form = useForm<z.infer<typeof gameDownloadSourceSchema>>({
    resolver: zodResolver(gameDownloadSourceSchema),
    defaultValues: initialValues ?? {
      platform: [],
      language: [],
      note: '',
    },
  })
  const platform = useWatch({ control: form.control, name: 'platform' })
  const language = useWatch({ control: form.control, name: 'language' })

  const handleSubmit = async (data: z.infer<typeof gameDownloadSourceSchema>) => {
    onSubmit(data)
  }
  return (
    <div className={cn('flex flex-col', className)}>
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
                    <MultiSelectTrigger className="w-full">
                      <MultiSelectValue
                        placeholder={t('platformPlaceholder')}
                        resolveLabel={v => PlatformOptions.find(p => p.value === v)?.label ?? v}
                      />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      {PlatformOptions.map(platform => (
                        <MultiSelectItem key={platform.value} value={platform.value}>
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
                    <MultiSelectTrigger className="w-full">
                      <MultiSelectValue
                        placeholder={t('languagePlaceholder')}
                        resolveLabel={v => LanguageOptions.find(l => l.value === v)?.label ?? v}
                      />
                    </MultiSelectTrigger>
                    <MultiSelectContent>
                      {LanguageOptions.map(language => (
                        <MultiSelectItem key={language.value} value={language.value}>
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
