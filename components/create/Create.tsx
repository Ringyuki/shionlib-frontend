'use client'

import { Header } from './Header'
import { CreateGameForm } from './Form'
import { z } from 'zod'
import { createGameFormSchema } from './Form'
import { useTranslations } from 'next-intl'
import { useState } from 'react'
import { Alert, AlertDescription, AlertTitle } from '../shionui/Alert'
import { shionlibRequest } from '@/utils/shionlib-request'
import { toast } from 'react-hot-toast'
import { Info, AlertCircle } from 'lucide-react'

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
      <Alert className="mt-4" intent="info" appearance="solid">
        <Info />
        <AlertTitle>提示</AlertTitle>
        <AlertDescription>
          如果你想要创建的游戏条目没有对应的 VNDB ID 和 Bangumi ID，请联系管理员手动添加。
        </AlertDescription>
      </Alert>
      <Alert className="mt-4" intent="warning" appearance="solid">
        <AlertCircle />
        <AlertTitle>错误提示</AlertTitle>
        <AlertDescription>
          <span>可能出现的错误码及原因：</span>
          <ol>
            <ErrorCodeDescription
              errorCode="400103"
              description="Bangumi 请求失败，可能是因为 Bangumi ID 不存在或者 Bangumi 无法访问。"
            />
            <ErrorCodeDescription
              errorCode="400104"
              description="VNDB 请求失败，可能是因为 VNDB ID 不存在或者 VNDB 无法访问。"
            />
            <ErrorCodeDescription
              errorCode="400105"
              description="Shionlib 数据库中已存在该游戏条目。"
            />
            <ErrorCodeDescription
              errorCode="400106"
              description="从 VNDB 和 Bangumi 获取的游戏数据未通过一致性检查，请检查你填写的 ID 否正确。"
            />
          </ol>
        </AlertDescription>
      </Alert>
    </>
  )
}

const ErrorCodeDescription = ({
  errorCode,
  description,
}: {
  errorCode: string
  description: string
}) => {
  return (
    <li>
      <span className="font-bold text-red-700">{errorCode}</span> - {description}
    </li>
  )
}
