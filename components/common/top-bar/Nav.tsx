'use client'

import { navBarConfig } from '@/config/site/shionlib'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/utils/cn'

export const Nav = () => {
  const t = useTranslations('Components.Common.TopBar.NavBar')
  const segment = useSelectedLayoutSegment()

  return (
    <div className="flex items-center gap-0.5">
      {navBarConfig.links.map(link => {
        const isActive = segment === link.href.replace(/^\//, '')
        return (
          <Link
            key={link.href}
            href={link.href}
            data-active={isActive ? 'true' : 'false'}
            className={cn(
              'font-normal px-4 py-2 rounded-md hover:bg-primary/5 hover:text-primary cursor-pointer duration-200',
              isActive && 'bg-primary/10 hover:bg-primary/10 text-primary',
            )}
          >
            {t(link.label)}
          </Link>
        )
      })}
    </div>
  )
}
