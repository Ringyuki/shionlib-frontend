'use client'

import { useTranslations } from 'next-intl'
import { UseFormReturn } from 'react-hook-form'
import { GameScalar, Staff } from '@/interfaces/edit/game-scalar.interface'
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/shionui/Form'
import { JsonArrayInput } from '@/components/shionui/JsonArrayInput'

interface StaffsProps {
  form: UseFormReturn<GameScalar>
}

export const Staffs = ({ form }: StaffsProps) => {
  const t = useTranslations('Components.Game.Edit.Scalar')

  return (
    <FormField
      control={form.control}
      name="staffs"
      render={({ field }) => (
        <FormItem>
          <FormLabel>{t('staffs')}</FormLabel>
          <FormControl>
            <JsonArrayInput<Staff>
              {...field}
              fields={[
                {
                  key: 'name',
                  label: t('staff_name'),
                  placeholder: t('staff_name_placeholder'),
                },
                {
                  key: 'role',
                  label: t('staff_role'),
                  placeholder: t('staff_role_placeholder'),
                },
              ]}
              emptyItem={{ name: '', role: '' }}
              addButtonText={t('add_staff')}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
