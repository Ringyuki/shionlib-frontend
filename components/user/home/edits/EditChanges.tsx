import { getTranslations } from 'next-intl/server'
import { Badge } from '@/components/shionui/Badge'
import { ArrowRight, Plus, Minus } from 'lucide-react'

interface EditChangesProps {
  changes: any
}

export const EditChanges = async ({ changes }: EditChangesProps) => {
  const t = await getTranslations('Components.User.Home.Edits.EditChanges')

  if (!changes || typeof changes !== 'object') {
    return null
  }

  const formatValue = (value: any): string => {
    if (value === null || value === undefined || value === '') {
      return t('empty')
    }
    if (typeof value === 'object') {
      return JSON.stringify(value, null, 2)
    }
    if (typeof value === 'boolean') {
      return value ? 'true' : 'false'
    }
    return String(value)
  }

  if ('added' in changes || 'removed' in changes) {
    const added = changes.added || []
    const removed = changes.removed || []

    return (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-muted-foreground">{t('changes')}:</span>
        {added.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Plus className="size-4 text-green-600 dark:text-green-400" />
              <span className="text-sm font-medium text-green-600 dark:text-green-400">
                {t('added')}
              </span>
            </div>
            <div className="pl-6 flex flex-col gap-1">
              {added.map((item: any, index: number) => (
                <div
                  key={index}
                  className="text-sm bg-green-50 dark:bg-green-950/20 p-2 rounded border border-green-200 dark:border-green-800"
                >
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs">
                    {formatValue(item)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}

        {removed.length > 0 && (
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <Minus className="size-4 text-red-600 dark:text-red-400" />
              <span className="text-sm font-medium text-red-600 dark:text-red-400">
                {t('removed')}
              </span>
            </div>
            <div className="pl-6 flex flex-col gap-1">
              {removed.map((item: any, index: number) => (
                <div
                  key={index}
                  className="text-sm bg-red-50 dark:bg-red-950/20 p-2 rounded border border-red-200 dark:border-red-800"
                >
                  <pre className="whitespace-pre-wrap break-words font-mono text-xs">
                    {formatValue(item)}
                  </pre>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    )
  }

  if ('before' in changes && 'after' in changes) {
    const before = changes.before || {}
    const after = changes.after || {}

    const allKeys = new Set([...Object.keys(before), ...Object.keys(after)])

    if (allKeys.size === 0) {
      return null
    }

    return (
      <div className="flex flex-col gap-3">
        <span className="text-sm font-medium text-muted-foreground">{t('changes')}:</span>

        {Array.from(allKeys).map(key => {
          const beforeValue = before[key]
          const afterValue = after[key]

          if (JSON.stringify(beforeValue) === JSON.stringify(afterValue)) {
            return null
          }

          return (
            <div key={key} className="flex flex-col gap-2">
              <Badge variant="neutral" className="font-mono text-xs w-fit">
                {key}
              </Badge>

              <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-2 items-start">
                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{t('before')}</span>
                  <div className="text-sm bg-red-50 dark:bg-red-950/20 p-2 rounded border border-red-200 dark:border-red-800">
                    <pre className="whitespace-pre-wrap break-words font-mono text-xs max-h-40 overflow-y-auto">
                      {formatValue(beforeValue)}
                    </pre>
                  </div>
                </div>

                <div className="flex items-center justify-center md:pt-6">
                  <ArrowRight className="size-4 text-muted-foreground" />
                </div>

                <div className="flex flex-col gap-1">
                  <span className="text-xs text-muted-foreground">{t('after')}</span>
                  <div className="text-sm bg-green-50 dark:bg-green-950/20 p-2 rounded border border-green-200 dark:border-green-800">
                    <pre className="whitespace-pre-wrap break-words font-mono text-xs max-h-40 overflow-y-auto">
                      {formatValue(afterValue)}
                    </pre>
                  </div>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  return null
}
