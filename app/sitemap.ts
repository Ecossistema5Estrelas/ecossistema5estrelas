import type { MetadataRoute } from 'next'
import { getPosts } from '@/lib/queries'

const baseUrl = 'https://ecossistema5estrelas.org'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const posts = await getPosts()

  const staticRoutes: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ]

  const blogRoutes: MetadataRoute.Sitemap = posts.map((post) => {
    const slug =
      typeof post.slug === 'string'
        ? post.slug
        : post.slug?.current

    return {
      url: `${baseUrl}/blog/${slug}`,
      lastModified: new Date(post._updatedAt || post.publishedAt),
      changeFrequency: 'monthly',
      priority: 0.8,
    }
  })

  return [...staticRoutes, ...blogRoutes]
}
