import { MetadataRoute } from 'next'
import { db } from '@/db'
import { projects } from '@/db/schema'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = (process.env.NEXT_PUBLIC_APP_URL || 'https://rootly-self.vercel.app/').replace(/\/$/, '')
  let projectUrls: { url: string; lastModified: Date; changeFrequency: 'monthly'; priority: number }[] = []
  
  try {
    const allProjects = await db.select({ slug: projects.slug, updatedAt: projects.updatedAt }).from(projects)
    projectUrls = allProjects.map((p) => ({
      url: `${baseUrl}/portfolio/${p.slug}`,
      lastModified: p.updatedAt,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    }))
  } catch {
    projectUrls = [
      { url: `${baseUrl}/portfolio/tani-kita-agriculture-platform`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/portfolio/sehat-connect-healthcare-app`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
      { url: `${baseUrl}/portfolio/logistik-id-internal-system`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.8 },
    ]
  }

  return [
    { url: baseUrl, priority: 1.0, changeFrequency: 'weekly' },
    { url: `${baseUrl}/about`, priority: 0.8, changeFrequency: 'monthly' },
    { url: `${baseUrl}/services`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/portfolio`, priority: 0.9, changeFrequency: 'weekly' },
    { url: `${baseUrl}/process`, priority: 0.7, changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.8, changeFrequency: 'monthly' },
    ...projectUrls,
  ]
}