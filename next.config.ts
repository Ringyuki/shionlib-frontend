import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
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
        source: '/:locale/:vn([csvpo]\\d+)',
        destination: 'https://vndb.org/:vn',
      },
      {
        source: '/:locale/:vn([csvpo]\\d+)/:rest*',
        destination: 'https://vndb.org/:vn/:rest*',
      },
    ]
  },
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
}

export default withNextIntl(nextConfig)
