import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'
import createMDX from '@next/mdx'

const withNextIntl = createNextIntlPlugin()
const withMDX = createMDX()

const nextConfig: NextConfig = {
  pageExtensions: ['ts', 'tsx', 'mdx'],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 't.vndb.org',
      },
      {
        protocol: 'https',
        hostname: 'lain.bgm.tv',
      },
      {
        protocol: 'https',
        hostname: 'images.yurari.moe',
      },
      {
        protocol: 'https',
        hostname: 'shionlib.com',
      },
      {
        protocol: 'https',
        hostname: 'www.kungal.com',
      },
      {
        protocol: 'https',
        hostname: 'www.moyu.moe',
      },
      {
        protocol: 'https',
        hostname: process.env.NEXT_PUBLIC_SHIONLIB_IMAGE_BED_HOST!,
      },
    ],
    contentDispositionType: 'inline',
  },
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:${process.env.NEXT_PUBLIC_API_PORT}/:path*`,
      },
      {
        source: '/:locale/:vn([crsvpo]\\d+)',
        destination: 'https://vndb.org/:vn',
      },
      {
        source: '/:locale/:vn([crsvpo]\\d+)/:rest*',
        destination: 'https://vndb.org/:vn/:rest*',
      },
    ]
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(withMDX(nextConfig))
