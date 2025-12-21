// /sanity/lib/queries.ts

import { groq } from 'next-sanity'
import { client } from './clients'
import type { Post, Category } from '@/lib/types'

/**
 * 🔍 Consulta apenas posts PUBLICÁVEIS
 * REGRA: CMS pode estar sujo, frontend nunca.
 */
export async function getPosts(): Promise<Post[]> {
  return await client.fetch(
    groq`*[
      _type == "post" &&
      defined(slug.current) &&
      slug.current != "" &&
      defined(title) &&
      title != "" &&
      defined(publishedAt)
    ] | order(publishedAt desc) {
      _id,
      title,
      description,
      slug,
      publishedAt,
      "mainImage": mainImage.asset->url,
      author->{ name },
      categories[]->{ _id, title }
    }`
  )
}

/**
 * 🔍 Consulta um único post PUBLICÁVEL (por slug)
 * Mesma regra da listagem (blindagem total)
 */
export async function getPost(slug: string): Promise<Post | null> {
  return await client.fetch(
    groq`*[
      _type == "post" &&
      slug.current == $slug &&
      defined(title) &&
      title != "" &&
      defined(publishedAt)
    ][0] {
      _id,
      title,
      description,
      slug,
      body,
      publishedAt,
      "mainImage": mainImage.asset->url,
      author->{ name },
      categories[]->{ _id, title }
    }`,
    { slug }
  )
}

/**
 * 🔍 Categorias
 * (não precisam de blindagem editorial)
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