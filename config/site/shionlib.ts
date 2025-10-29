import { ShionlibSiteConfig, NavBarConfig } from '@/interfaces/site/shion-lib-site-config.interface'

export const shionlibSiteConfig: ShionlibSiteConfig = {
  canonical: process.env.NEXT_PUBLIC_SITE_URL || 'https://shionlib.com',
  robots: {
    index: process.env.NEXT_PUBLIC_ROBOTS_INDEX === 'true',
    follow: process.env.NEXT_PUBLIC_ROBOTS_FOLLOW === 'true',
  },
}

export const navBarConfig: NavBarConfig = {
  links: [
    {
      label: 'games',
      href: '/game',
    },
    {
      label: 'producers',
      href: '/developer',
    },
    {
      label: 'releases',
      href: '/release',
    },
    {
      label: 'docs',
      href: '/docs',
    },
    {
      label: 'about',
      href: '/docs/about/about-shionlib',
    },
  ],
}
