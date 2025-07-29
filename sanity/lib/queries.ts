import { groq } from 'next-sanity'
import { client } from './clients'
import { Post, Category } from '@/lib/types'

/**
 * 🔍 Consulta um post específico pelo slug
 */
export async function getPost(slug: string): Promise<Post | null> {
  const query = groq`
    *[_type == "post" && slug.current == $slug][0] {
      _id,
      title,
      description,
      slug,
      body,
      _createdAt,
      "mainImage": mainImage.asset->url,
      author->{ name },
      categories[]->{ _id, title, slug }
    }
  `
  return await client.fetch(query, { slug })
}

/**
 * 🗂 Consulta todos os posts (com ou sem filtro por categorias)
 */
export async function getPosts(slugs: string[] = []): Promise<Post[]> {
  const filter = slugs.length
    ? `&& count((categories[]->slug.current)[@ in $slugs]) > 0`
    : ''

  const query = groq`
    *[_type == "post" ${filter}] | order(_createdAt desc) {
      _id,
      title,
      description,
      slug,
      _createdAt,
      "mainImage": mainImage.asset->url,
      categories[]->{
        _id,
        title,
        slug
      }
    }
  `
  return await client.fetch(query, { slugs })
}

/**
 * 🏷 Consulta todas as categorias
 */
export async function getCategories(): Promise<Category[]> {
  const query = groq`*[_type == "category"]{ _id, title, slug }`
  return await client.fetch(query)
}