'use client'

import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'
import { GameScalar, ExtraInfo as ExtraInfoType } from '@/interfaces/edit/game-scalar.interface'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/shionui/Form'
import { JsonArrayInput } from '@/components/shionui/JsonArrayInput'

interface ExtraInfoProps {
  form: UseFormReturn<GameScalar>
}

export const ExtraInfo = ({ form }: ExtraInfoProps) => {
  const t = useTranslations('Components.Game.Edit.Scalar')

  return (
    <FormField
      control={form.control}
      name="extra_info"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('extra_info')}</FormLabel>
          <FormControl>
            <JsonArrayInput<ExtraInfoType>
              {...field}
              fields={[
                {
                  key: 'key',
                  label: t('extra_info_key'),
                  placeholder: t('extra_info_key_placeholder'),
                },
                {
                  key: 'value',
                  label: t('extra_info_value'),
                  placeholder: t('extra_info_value_placeholder'),
                },
              ]}
              emptyItem={{ key: '', value: '' }}
              addButtonText={t('add_extra_info')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
