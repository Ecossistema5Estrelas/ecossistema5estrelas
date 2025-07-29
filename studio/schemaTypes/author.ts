// /studio/schemaTypes/author.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Nome',
      type: 'string',
    }),
    defineField({
      name: 'bio',
      title: 'Biografia',
      type: 'array',
      of: [{ type: 'block' }],
    }),
    defineField({
      name: 'image',
      title: 'Foto do Autor',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})