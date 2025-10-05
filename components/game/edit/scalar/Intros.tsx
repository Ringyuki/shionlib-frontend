import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/shionui/Form'
import { Textarea } from '@/components/shionui/Textarea'
import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'
import { GameScalar } from '@/interfaces/edit/game-scalar.interface'

interface IntrosProps {
  form: UseFormReturn<GameScalar>
}

export const Intros = ({ form }: IntrosProps) => {
  const t = useTranslations('Components.Game.Edit.Scalar')
  return (
    <>
      <FormField
        control={form.control}
        name="intro_zh"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('intro_zh')}</FormLabel>
            <FormControl className="break-all">
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="intro_en"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('intro_en')}</FormLabel>
            <FormControl className="break-all">
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="intro_jp"
        render={({ field }) => (
          <FormItem>
            <FormLabel>{t('intro_jp')}</FormLabel>
            <FormControl className="break-all">
              <Textarea {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
