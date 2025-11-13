import { Button } from '@/components/shionui/Button'
import { useTranslations } from 'next-intl'
import { Shapes } from 'lucide-react'
import { shionlibRequest } from '@/utils/shionlib-request'
import { useState } from 'react'
import {
  KunPatchResponse,
  KunPatchResourceResponse,
  HikariResponse,
  KunResponseError,
} from '@/interfaces/patch/patch.interface'
import { toast } from 'react-hot-toast'
import { Patch as PatchComponent } from '../patch/Patch'

interface PatchProps {
  game_id: number
  v_id: string
}

const getPatches = async (v_id: string) =>
  await fetch(`https://www.moyu.moe/api/hikari?vndb_id=${v_id}`)
    .then(res => res.json())
    .then((data: HikariResponse) => {
      if (data.success) return data.data
      throw new KunResponseError(data.message)
    })

export const Patch = ({ game_id, v_id }: PatchProps) => {
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [patches, setPatches] = useState<KunPatchResourceResponse[]>([])
  const t = useTranslations('Components.Game.Actions.Patch')

  const getData = async () => {
    try {
      setLoading(true)
      const data = await getPatches(v_id)
      setPatches(data?.resource ?? [])
      setOpen(true)
    } catch (error: any) {
      if (error instanceof KunResponseError) {
        toast.error(error.message)
      } else {
        toast.error(t('error'))
      }
    } finally {
      setLoading(false)
    }
  }
  return (
    <>
      <Button appearance="outline" renderIcon={<Shapes />} onClick={getData} loading={loading}>
        {t('patch')}
      </Button>
      <PatchComponent patches={patches} open={open} onOpenChange={setOpen} />
    </>
  )
}
