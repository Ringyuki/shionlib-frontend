'use client'

import { AdminGameListItem } from '@/interfaces/admin/content.interface'
import { cn } from '@/utils/cn'
import { FadeImage } from '@/components/common/shared/FadeImage'
import Link from 'next/link'
import { useLocale, useTranslations } from 'next-intl'
import { Badge } from '@/components/shionui/Badge'
import { Button } from '@/components/shionui/Button'
import { MoreHorizontal, Eye, EyeOff, ExternalLink } from 'lucide-react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/shionui/DropdownMenu'

interface GameListItemProps {
  game: AdminGameListItem
  onStatusChange?: (gameId: number, status: number) => void
}

export function GameListItem({ game, onStatusChange }: GameListItemProps) {
  const locale = useLocale()
  const t = useTranslations('Admin.Games')

  const getTitle = () => {
    if (locale === 'zh' && game.title_zh) return game.title_zh
    if (locale === 'en' && game.title_en) return game.title_en
    return game.title_jp || game.title_zh || game.title_en
  }

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString(locale, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    })
  }

  return (
    <div
      className={cn(
        'flex items-center gap-4 rounded-lg border p-4 transition-colors',
        'bg-white/50 dark:bg-gray-900/50',
        'border-gray-200 dark:border-gray-800',
        'hover:bg-gray-50 dark:hover:bg-gray-800/50',
      )}
    >
      {/* Cover */}
      <div className="relative h-16 w-12 shrink-0 overflow-hidden rounded-md bg-gray-200 dark:bg-gray-700">
        {game.cover ? (
          <FadeImage src={game.cover} alt={getTitle()} imageClassName="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-gray-400">?</div>
        )}
      </div>

      {/* Info */}
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2">
          <Link
            href={`/${locale}/game/${game.id}`}
            className="truncate font-medium text-gray-900 hover:underline dark:text-gray-100"
          >
            {getTitle()}
          </Link>
          {game.nsfw && (
            <Badge variant="warning" className="shrink-0">
              NSFW
            </Badge>
          )}
          <Badge variant={game.status === 1 ? 'success' : 'neutral'} className="shrink-0">
            {game.status === 1 ? t('visible') : t('hidden')}
          </Badge>
        </div>
        <div className="mt-1 flex flex-wrap gap-x-4 gap-y-1 text-sm text-gray-500 dark:text-gray-400">
          <span>ID: {game.id}</span>
          <span>
            {t('creator')}: {game.creator.name}
          </span>
          <span>
            {t('views')}: {game.views.toLocaleString()}
          </span>
          <span>
            {t('downloads')}: {game.downloads.toLocaleString()}
          </span>
        </div>
        <div className="mt-1 text-xs text-gray-400 dark:text-gray-500">
          {t('created')}: {formatDate(game.created)} | {t('updated')}: {formatDate(game.updated)}
        </div>
      </div>

      {/* Actions */}
      <div className="flex shrink-0 items-center gap-2">
        <Link href={`/${locale}/game/${game.id}`} target="_blank">
          <Button intent="neutral" appearance="ghost" className="h-8 w-8 p-0">
            <ExternalLink className="h-4 w-4" />
          </Button>
        </Link>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button intent="neutral" appearance="ghost" className="h-8 w-8 p-0">
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onStatusChange?.(game.id, game.status === 1 ? 2 : 1)}>
              {game.status === 1 ? (
                <>
                  <EyeOff className="mr-2 h-4 w-4" />
                  {t('hide')}
                </>
              ) : (
                <>
                  <Eye className="mr-2 h-4 w-4" />
                  {t('show')}
                </>
              )}
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  )
}
