import { dirname, resolve } from 'path'
import { fileURLToPath } from 'url'

const __dirname = dirname(fileURLToPath(import.meta.url))

/** @type {import('next').NextConfig} */
const nextConfig = {
  turbopack: {
    root: __dirname,
    resolveAlias: {
      '@': resolve(__dirname),
    },
  },
  redirects: async () => [
    {
      source: '/huangdao',
      destination: '/',
      permanent: true,
    },
  ],
}
export default nextConfig
