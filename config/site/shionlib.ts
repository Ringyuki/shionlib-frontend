import { ShionlibSiteConfig, NavBarConfig } from '@/interfaces/site/shion-lib-site-config.interface'

export const shionlibSiteConfig: ShionlibSiteConfig = {
  canonical: 'https://shionlib.com',
  robots: {
    index: false,
    follow: false,
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
      label: 'docs',
      href: '/docs',
    },
    {
      label: 'releases',
      href: '/release',
    },
    {
      label: 'about',
      href: '/about',
    },
  ],
}
