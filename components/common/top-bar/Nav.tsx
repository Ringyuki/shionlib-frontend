'use client'

import { navBarConfig } from '@/config/site/shionlib'
import { Link } from '@/i18n/navigation'
import { useTranslations } from 'next-intl'
import { useSelectedLayoutSegment } from 'next/navigation'
import { cn } from '@/utils/cn'
import { GradientText } from '@/components/shionui/GradientText'
import { GradientIcon } from '@/components/shionui/GradientIcon'

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
            target={link.external ? '_blank' : undefined}
            data-active={isActive ? 'true' : 'false'}
            className={cn(
              link.external ? 'hover:opacity-70' : 'hover:bg-primary/5 hover:text-primary',
              'font-normal px-4 py-2 rounded-md cursor-pointer duration-200',
              isActive && 'bg-primary/10 hover:bg-primary/10 text-primary',
            )}
          >
            <span className="flex items-center gap-1">
              {link.gradientText ? (
                <>
                  {link.icon && (
                    <GradientIcon
                      icon={link.icon as React.ReactElement<SVGSVGElement>}
                      gradient={link.gradientTextColor}
                    />
                  )}
                  <GradientText text={t(link.label)} gradient={link.gradientTextColor} />
                </>
              ) : (
                <>
                  {link.icon && link.icon}
                  {t(link.label)}
                </>
              )}
            </span>
          </Link>
        )
      })}
    </div>
  )
}
