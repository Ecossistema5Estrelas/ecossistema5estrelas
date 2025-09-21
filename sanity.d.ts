// sanity.d.ts

import type { Slug } from 'sanity'

export type SanityImage = {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
}

export type Category = {
  _id: string
  _type: 'category'
  title: string
  slug: Slug
}

export type Author = {
  _id: string
  _type: 'author'
  name: string
  image?: SanityImage
  bio?: string
}

export type Post = {
  _id: string
  _type: 'post'
  title: string
  slug: Slug
  description: string
  mainImage: SanityImage
  body: any
  author: Author
  categories: Category[]
  publishedAt: string
}
