import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
      },
      {
        userAgent: 'Baiduspider',
        allow: '/',
      },
    ],
    sitemap: 'https://jrxh.vercel.app/sitemap.xml',
  }
}
