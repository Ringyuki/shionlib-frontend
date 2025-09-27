'use client'

import { useTranslations } from 'next-intl'
import { shionlibRequest } from '@/utils/shionlib-request'
import { Progress } from '@/components/shionui/Progress'
import { UploadQuota as UploadQuotaType } from '@/interfaces/upload/upload-quota.interface'
import { useEffect, useState, useRef } from 'react'
import { cn } from '@/utils/cn'

interface UploadQuotaProps {
  fileSize: number
}

export const UploadQuota = ({ fileSize }: UploadQuotaProps) => {
  const t = useTranslations('Components.Game.GameActions.UploadQuota')
  const [used, setUsed] = useState<number>(0)
  const [size, setSize] = useState<number>(0)
  const [calcUsed, setCalcUsed] = useState<number>(0)
  const [loading, setLoading] = useState(false)

  const didFetch = useRef(false)
  useEffect(() => {
    const fetchQuota = async () => {
      if (didFetch.current) return
      didFetch.current = true
      setLoading(true)
      try {
        const res = await shionlibRequest().get<UploadQuotaType>('/uploads/quota')
        setSize(res.data!.size)
        setUsed(res.data!.used)
        setCalcUsed(res.data!.used)
      } catch {
        setSize(0)
        setUsed(0)
        setCalcUsed(0)
      } finally {
        setLoading(false)
      }
    }
    fetchQuota()
  }, [])

  useEffect(() => {
    if (fileSize) {
      setCalcUsed(calcUsed + fileSize)
    } else {
      setCalcUsed(used)
    }
  }, [fileSize])

  const isExceeded = calcUsed > size
  const percent = size && calcUsed ? (calcUsed / size) * 100 : 0

  const formatBytes = (bytes: number) => {
    if (!Number.isFinite(bytes)) return '0 B'
    const units = ['B', 'KB', 'MB', 'GB', 'TB']
    let i = 0
    let n = bytes
    while (n >= 1024 && i < units.length - 1) {
      n /= 1024
      i++
    }
    return `${n.toFixed(1)} ${units[i]}`
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-medium">{t('title')}</h3>
      <div className="flex justify-between items-center">
        <div className="text-xs text-muted-foreground flex gap-2">
          <span>
            {t('size')}: {loading ? '...' : formatBytes(size ?? 0)}
          </span>
          <span>
            {t('used')}: {loading ? '...' : formatBytes(calcUsed ?? 0)}
          </span>
        </div>
        <div className="text-xs text-muted-foreground flex gap-2">
          <span>
            {t('remaining')}:{' '}
            {loading
              ? '...'
              : formatBytes((size ?? 0) - (calcUsed ?? 0) < 0 ? 0 : (size ?? 0) - (calcUsed ?? 0))}
          </span>
        </div>
      </div>
      <Progress value={percent} className={cn(isExceeded && 'bg-red-500')} />
    </div>
  )
}
