// /studio/schemaTypes/category.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título da Categoria',
      type: 'string',
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
    }),
  ],
})