// /sanity/schemas/blockContent.ts

import { defineType } from 'sanity'

const blockContent = defineType({
  name: 'blockContent',
  title: 'Texto Rico',
  type: 'array',
  of: [
    {
      type: 'block',
      styles: [
        { title: 'Normal', value: 'normal' },
        { title: 'Título H1', value: 'h1' },
        { title: 'Título H2', value: 'h2' },
        { title: 'Citação', value: 'blockquote' },
      ],
      lists: [
        { title: 'Marcadores', value: 'bullet' },
        { title: 'Numerado', value: 'number' },
      ],
      marks: {
        decorators: [
          { title: 'Negrito', value: 'strong' },
          { title: 'Itálico', value: 'em' },
          { title: 'Código', value: 'code' },
        ],
        annotations: [
          {
            name: 'link',
            type: 'object',
            title: 'Link',
            fields: [
              {
                name: 'href',
                type: 'url',
                title: 'URL',
              },
            ],
          },
        ],
      },
    },
    {
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: 'Texto alternativo',
        },
      ],
    },
  ],
})

export default blockContent