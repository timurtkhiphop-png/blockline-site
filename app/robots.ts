import { MetadataRoute } from 'next'
import { brand } from '@/lib/content'

export const dynamic = 'force-static'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `https://${brand.domain}/sitemap.xml`,
  }
}
