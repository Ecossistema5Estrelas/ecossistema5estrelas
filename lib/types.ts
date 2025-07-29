import type { PortableTextBlock } from '@portabletext/types'

/**
 * 📚 Tipo para categorias
 */
export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
}

/**
 * 📝 Tipo para post completo (detalhado)
 */
export interface Post {
  _id: string
  title: string
  description: string
  slug: {
    current: string
  }
  mainImage?: string
  excerpt?: string
  audioUrl?: string
  body?: PortableTextBlock[]
  _createdAt: string
  author?: {
    name?: string
  }
  categories?: Category[] // ✅ ESSENCIAL para os filtros funcionarem
  gallery?: Array<{
    asset: any
    caption?: string
    alt?: string
  }>
}

/**
 * 📄 Tipo reduzido para listagem (pode ser usado na home, se quiser)
 */
export interface PostPreview {
  _id: string
  title: string
  slug: {
    current: string
  }
  excerpt?: string
  description?: string
  _createdAt: string
  mainImage?: string
}