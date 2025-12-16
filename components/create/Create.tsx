'use client'

import { Header } from './Header'
import { CreateGameForm } from './Form'
import { z } from 'zod'
import { createGameFormSchema } from './Form'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { shionlibRequest } from '@/utils/shionlib-request'
import { toast } from 'react-hot-toast'
import { CreateAlert } from './Alert'

export const CreateGame = () => {
  const t = useTranslations('Components.Create.Create')

  const [loading, setLoading] = useState(false)
  const handleSubmit = async (data: z.infer<typeof createGameFormSchema>) => {
    try {
      setLoading(true)
      const v_id = parseInt(data.vndbId.replace('v', ''))
      const b_id = parseInt(data.bangumiId)
      if (isNaN(v_id) || isNaN(b_id)) {
        toast.error(t('invalidId'))
        return
      }
      const res = await shionlibRequest().post<number>('/game/create/frombv', {
        data: {
          v_id,
          b_id,
          skip_consistency_check: data.skipConsistencyCheck,
        },
      })
      toast.success(t('success', { id: res.data! }), { duration: 10000 })
    } catch {
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Header />
      <CreateGameForm onSubmit={handleSubmit} loading={loading} />
      <CreateAlert />
    </>
  )
}
