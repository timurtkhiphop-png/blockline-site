import { MetadataRoute } from 'next'
import { brand } from '@/lib/content'
import { cases } from '@/lib/projects'

export const dynamic = 'force-static'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `https://${brand.domain}`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
    {
      url: `https://${brand.domain}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `https://${brand.domain}/terms`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
    },
    {
      url: `https://${brand.domain}/projects`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    ...cases.filter((c) => !c.locked).map((c) => ({
      url: `https://${brand.domain}/projects/${c.id}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    })),
  ]
}
