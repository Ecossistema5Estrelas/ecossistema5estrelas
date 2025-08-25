// app/schemaTypes/categoryType.ts

export interface Category {
  _id: string
  title: string
  slug: {
    current: string
  }
}
