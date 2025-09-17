import type { NextConfig } from 'next'
import createNextIntlPlugin from 'next-intl/plugin'

const withNextIntl = createNextIntlPlugin()

const nextConfig: NextConfig = {
  rewrites: async () => {
    return [
      {
        source: '/api/:path*',
        destination: `http://localhost:${process.env.NEXT_PUBLIC_DEV_API_PORT}/:path*`,
      },
    ]
  },
}

export default withNextIntl(nextConfig)
