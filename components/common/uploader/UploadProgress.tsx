'use client'

import * as React from 'react'
import { cn } from '@/utils/cn'
import { Progress } from '@/components/shionui/Progress'
import { useTranslations } from 'next-intl'

type UploadProgressProps = {
  className?: string
  bytesUploaded: number
  totalBytes: number
  speedBps?: number
  etaSec?: number | null
}

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

const formatSpeed = (bps?: number) => {
  if (!bps || bps <= 0) return '-'
  return `${formatBytes(bps)}/s`
}

const formatEta = (sec?: number | null) => {
  if (!sec && sec !== 0) return '-'
  const s = Math.max(0, sec)
  const h = Math.floor(s / 3600)
  const m = Math.floor((s % 3600) / 60)
  const r = Math.floor(s % 60)
  if (h > 0) return `${h}h ${m}m ${r}s`
  if (m > 0) return `${m}m ${r}s`
  return `${r}s`
}

export function UploadProgress({
  className,
  bytesUploaded,
  totalBytes,
  speedBps,
  etaSec,
}: UploadProgressProps) {
  const t = useTranslations('Components.Common.Uploader.UploadProgress')
  const percent = totalBytes > 0 ? Math.min(100, (bytesUploaded / totalBytes) * 100) : 0

  return (
    <div className={cn('flex w-full flex-col gap-2', className)}>
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {formatBytes(bytesUploaded)} / {formatBytes(totalBytes)}
        </span>
        <span>{percent.toFixed(1)}%</span>
      </div>
      <Progress value={percent} />
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span>
          {t('speed')}: {formatSpeed(speedBps)}
        </span>
        <span>
          {t('eta')}: {formatEta(etaSec ?? undefined)}
        </span>
      </div>
    </div>
  )
}

export default UploadProgress
