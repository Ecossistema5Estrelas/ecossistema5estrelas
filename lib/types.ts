export type Category = {
  _id: string
  title: string
}

export type Author = {
  name: string
  image?: string
}

export type Post = {
  _id: string
  title: string
  description: string
  slug: {
    current: string
  }
  body: any
  mainImage?: any
  author: Author
  categories: Category[]
  _createdAt: string
}