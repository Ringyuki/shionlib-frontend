'use client'

import { TopGame } from '@/interfaces/admin/stats.interface'
import { Skeleton } from '@/components/shionui/Skeleton'
import { cn } from '@/utils/cn'
import { FadeImage } from '@/components/common/shared/FadeImage'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'

interface TopGamesTableProps {
  data?: TopGame[]
  isLoading?: boolean
  className?: string
}

export function TopGamesTable({ data, isLoading, className }: TopGamesTableProps) {
  const locale = useLocale()
  const t = useTranslations('Admin.Dashboard')

  if (isLoading) {
    return (
      <div className={cn('space-y-3', className)}>
        {Array.from({ length: 5 }).map((_, i) => (
          <Skeleton key={i} className="h-16 rounded-lg" />
        ))}
      </div>
    )
  }

  if (!data || data.length === 0) {
    return (
      <div
        className={cn(
          'flex h-[300px] items-center justify-center rounded-xl border',
          'bg-white/50 dark:bg-gray-900/50 border-gray-200 dark:border-gray-800',
          className,
        )}
      >
        <p className="text-gray-500 dark:text-gray-400">{t('noGamesData')}</p>
      </div>
    )
  }

  const getTitle = (game: TopGame) => {
    if (locale === 'zh' && game.title_zh) return game.title_zh
    if (locale === 'en' && game.title_en) return game.title_en
    return game.title_jp || game.title_zh || game.title_en
  }

  return (
    <div
      className={cn(
        'rounded-xl border',
        'bg-white/50 dark:bg-gray-900/50 backdrop-blur-sm',
        'border-gray-200 dark:border-gray-800',
        className,
      )}
    >
      <div className="border-b border-gray-200 dark:border-gray-800 px-6 py-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{t('topGames')}</h3>
      </div>
      <div className="divide-y divide-gray-200 dark:divide-gray-800">
        {data.map((game, index) => (
          <Link
            key={game.id}
            href={`/${locale}/game/${game.id}`}
            className="flex items-center gap-4 px-6 py-3 transition-colors hover:bg-gray-50 dark:hover:bg-gray-800/50"
          >
            <span className="w-6 text-center font-bold text-gray-500 dark:text-gray-400">
              {index + 1}
            </span>
            <div className="relative h-12 w-12 shrink-0 overflow-hidden rounded-lg bg-gray-200 dark:bg-gray-700">
              {game.cover ? (
                <FadeImage src={game.cover} alt={getTitle(game)} imageClassName="object-cover" />
              ) : (
                <div className="flex h-full w-full items-center justify-center text-gray-400">
                  ?
                </div>
              )}
            </div>
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium text-gray-900 dark:text-gray-100">
                {getTitle(game)}
              </p>
              <div className="flex gap-4 text-sm text-gray-500 dark:text-gray-400">
                <span>
                  {game.views.toLocaleString()} {t('views')}
                </span>
                <span>
                  {game.downloads.toLocaleString()} {t('downloads')}
                </span>
              </div>
            </div>
            <div className="text-right">
              <p className="text-sm font-medium text-gray-900 dark:text-gray-100">
                {game.hot_score.toFixed(1)}
              </p>
              <p className="text-xs text-gray-500 dark:text-gray-400">{t('score')}</p>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}
