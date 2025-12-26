// sanity/lib/queries.ts
import { groq } from 'next-sanity'
import { client } from './clients'
import type { Post, Category } from '@/lib/types'

/**
 * 🔍 Posts publicáveis (mínimo garantido)
 */
export async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    groq`*[
      _type == "post" &&
      defined(slug.current) &&
      defined(title) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ]
    | order(publishedAt desc) {
      _id,
      title,
      slug,
      publishedAt
    }`
  )
}

/**
 * 🔍 Post individual
 */
export async function getPost(slug: string): Promise<Post | null> {
  return await client.fetch(
    groq`*[
      _type == "post" &&
      slug.current == $slug &&
      defined(title) &&
      defined(publishedAt) &&
      publishedAt <= now()
    ][0] {
      _id,
      title,
      slug,
      body,
      publishedAt
    }`,
    { slug }
  )
}

/**
 * 🔍 Categorias (inalterado)
 */
export async function getCategories(): Promise<Category[]> {
  return await client.fetch(
    groq`*[_type == "category"] | order(title asc) {
      _id,
      title,
      description
    }`
  )
}