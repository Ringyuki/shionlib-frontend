import { Link } from '@/i18n/navigation'
import { cn } from '@/utils/cn'
import { Cinzel } from 'next/font/google'

const cinzel = Cinzel({
  subsets: ['latin'],
  weight: ['700'],
  display: 'swap',
})

export const SiteLogo = () => {
  return (
    <Link href="/" className="flex items-center h-full pl-0">
      <span
        className={cn(
          'text-2xl text-primary dark:text-primary-foreground font-bold select-none cursor-pointer',
          cinzel.className,
        )}
      >
        Shionlib
      </span>
    </Link>
  )
}
