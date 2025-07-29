// /studio/schemaTypes/post.ts

import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'post',
  title: 'Post',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Título',
      type: 'string',
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    }),
    defineField({
      name: 'excerpt',
      title: 'Resumo',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'description',
      title: 'Descrição',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'mainImage',
      title: 'Imagem Principal',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'audioUrl',
      title: 'URL do Áudio (opcional)',
      type: 'url',
      description: 'Link para o arquivo de áudio (MP3)',
    }),
    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [
        {
          type: 'image',
          options: { hotspot: true },
          fields: [
            {
              name: 'caption',
              title: 'Legenda',
              type: 'string',
              options: {
                isHighlighted: true,
              },
            },
          ],
        },
      ],
      description: 'Adicione múltiplas imagens para exibição em carrossel.',
    }),
    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
    }),
    defineField({
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),
    defineField({
      name: 'body',
      title: 'Conteúdo',
      type: 'blockContent',
    }),
  ],
})
