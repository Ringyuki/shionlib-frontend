'use client'

import { GameScalar } from '@/interfaces/edit/game-scalar.interface'
import { Form } from '@/components/shionui/Form'
import { Titles } from './scalar/Titles'
import { Aliases } from './scalar/Aliases'
import { Platform } from './scalar/Platform'
import { Type } from './scalar/Type'
import { Intros } from './scalar/Intros'
import { Tags } from '../actions/Tags'
import { ExtraInfo } from './scalar/ExtraInfo'
import { Staffs } from './scalar/Staffs'
import { ReleaseDate } from './scalar/ReleaseDate'
import { NSFW } from './scalar/NSFW'
import { useForm } from 'react-hook-form'
import { useEditPermissionStore } from '@/store/editPermissionStore'
import { Button } from '@/components/shionui/Button'
import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Check } from 'lucide-react'
import { shionlibRequest } from '@/utils/shionlib-request'
import { useParams } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { useRouter } from 'next/navigation'
import { pick } from './helper/pick'

interface ScalarProps {
  data: GameScalar
}

export const Scalar = ({ data }: ScalarProps) => {
  const t = useTranslations('Components.Game.Edit.Scalar')
  const { permissions } = useEditPermissionStore()
  const [loading, setLoading] = useState(false)
  const { id } = useParams()
  const router = useRouter()
  const form = useForm<GameScalar>({
    defaultValues: data,
  })
  const onSubmit = async (data: GameScalar) => {
    try {
      setLoading(true)
      await shionlibRequest().patch(`/game/${id}/edit/scalar`, {
        data: pick(data, permissions!.fields),
      })
      toast.success(t('success'))
      router.push(`/game/${id}`, { scroll: true })
    } catch {
    } finally {
      setLoading(false)
    }
  }

  return (
    <div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {permissions?.scalarFields.includes('TITLES') && <Titles form={form} />}
          {permissions?.scalarFields.includes('PLATFORMS') && <Platform form={form} />}
          {permissions?.scalarFields.includes('TYPE') && <Type form={form} />}
          {permissions?.scalarFields.includes('ALIASES') && <Aliases form={form} />}
          {permissions?.scalarFields.includes('TAGS') && <Tags form={form} />}
          {permissions?.scalarFields.includes('INTROS') && <Intros form={form} />}
          {permissions?.scalarFields.includes('RELEASE') && <ReleaseDate form={form} />}
          {permissions?.scalarFields.includes('EXTRA') && <ExtraInfo form={form} />}
          {permissions?.scalarFields.includes('STAFFS') && <Staffs form={form} />}
          {permissions?.scalarFields.includes('NSFW') && <NSFW form={form} />}
          <Button type="submit" className="w-full" loading={loading} renderIcon={<Check />}>
            {t('submit')}
          </Button>
        </form>
      </Form>
    </div>
  )
}
