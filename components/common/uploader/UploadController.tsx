'use client'

import * as React from 'react'
import { Pause, Play, Square, Upload as UploadIcon } from 'lucide-react'
import { Button } from '@/components/shionui/Button'
import { cn } from '@/utils/cn'
import { useTranslations } from 'next-intl'

interface UploadControllerProps {
  className?: string
  phase:
    | 'idle'
    | 'hashing'
    | 'initializing'
    | 'uploading'
    | 'paused'
    | 'completing'
    | 'completed'
    | 'aborted'
    | 'error'
  onStart: () => void
  onPause: () => void
  onResume: () => void
  onCancel: () => void
  disabled?: boolean
}

export function UploadController({
  className,
  phase,
  onStart,
  onPause,
  onResume,
  onCancel,
}: UploadControllerProps) {
  const t = useTranslations('Components.Common.Uploader.UploadController')

  const canStart = phase === 'idle' || phase === 'error' || phase === 'aborted'
  const canPause = phase === 'uploading'
  const canResume = phase === 'paused'
  const canCancel =
    phase === 'hashing' || phase === 'initializing' || phase === 'uploading' || phase === 'paused'

  return (
    <div className={cn('flex flex-col w-full sm:w-auto sm:flex-row items-center gap-2', className)}>
      <Button
        className="w-full sm:w-auto"
        appearance="soft"
        intent="primary"
        onClick={onStart}
        disabled={!canStart}
      >
        <span className="flex items-center gap-2">
          <UploadIcon className="size-4" />
          <span>{t('start')}</span>
        </span>
      </Button>
      <Button
        className="w-full sm:w-auto"
        appearance="soft"
        intent="neutral"
        onClick={onPause}
        disabled={!canPause}
      >
        <span className="flex items-center gap-2">
          <Pause className="size-4" />
          <span>{t('pause')}</span>
        </span>
      </Button>
      <Button
        className="w-full sm:w-auto"
        appearance="soft"
        intent="primary"
        onClick={onResume}
        disabled={!canResume}
      >
        <span className="flex items-center gap-2">
          <Play className="size-4" />
          <span>{t('resume')}</span>
        </span>
      </Button>
      <Button
        className="w-full sm:w-auto"
        appearance="soft"
        intent="destructive"
        onClick={onCancel}
        disabled={!canCancel}
      >
        <span className="flex items-center gap-2">
          <Square className="size-4" />
          <span>{t('cancel')}</span>
        </span>
      </Button>
    </div>
  )
}

export default UploadController
