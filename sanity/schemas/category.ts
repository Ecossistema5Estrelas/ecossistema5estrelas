// /sanity/schemas/category.ts

import { defineType } from 'sanity'

const category = defineType({
  name: 'category',
  title: 'Categoria',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título da Categoria',
      type: 'string',
      validation: (Rule) => Rule.required().min(2).max(50),
    },
    {
      name: 'description',
      title: 'Descrição (opcional)',
      type: 'text',
      rows: 2,
    },
  ],
  preview: {
    select: {
      title: 'title',
    },
  },
})

export default category