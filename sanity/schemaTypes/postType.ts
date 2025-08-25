// app/schemaTypes/postType.ts

import type { Author } from './authorType'
import type { Category } from './categoryType'
import type { BlockContent } from './blockContentType'

export interface Post {
  _id: string
  title: string
  description: string
  slug: {
    current: string
  }
  mainImage?: {
    asset: {
      _ref: string
      _type: string
    }
    alt?: string
  }
  publishedAt: string
  categories: Category[]
  author?: Author
  body: BlockContent
}
