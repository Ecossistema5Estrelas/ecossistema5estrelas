// /studio/schemaTypes/blockContent.ts

import { defineType, defineArrayMember } from 'sanity'

export default defineType({
  name: 'blockContent',
  title: 'Conteúdo Rico e Multimídia',
  type: 'array',
  of: [
    // Texto rico
    defineArrayMember({
      type: 'block',
    }),

    // Imagens
    defineArrayMember({
      type: 'image',
      options: { hotspot: true },
    }),

    // Vídeo do YouTube (inclusive Shorts)
    defineArrayMember({
      name: 'youtube',
      title: 'YouTube',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL do YouTube',
          type: 'url',
        },
      ],
      preview: {
        select: {
          title: 'url',
        },
      },
    }),

    // TikTok
    defineArrayMember({
      name: 'tiktok',
      title: 'TikTok',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL do TikTok',
          type: 'url',
        },
      ],
      preview: {
        select: {
          title: 'url',
        },
      },
    }),

    // Instagram
    defineArrayMember({
      name: 'instagram',
      title: 'Instagram',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL do Instagram',
          type: 'url',
        },
      ],
      preview: {
        select: {
          title: 'url',
        },
      },
    }),

    // Twitter (X)
    defineArrayMember({
      name: 'x',
      title: 'Twitter (X)',
      type: 'object',
      fields: [
        {
          name: 'url',
          title: 'URL do Tweet',
          type: 'url',
        },
      ],
    }),

    // Áudio (Rádio ou Podcast)
    defineArrayMember({
      name: 'audio',
      title: 'Áudio (Rádio ou Podcast)',
      type: 'object',
      fields: [
        {
          name: 'file',
          title: 'Arquivo de Áudio',
          type: 'file',
          options: {
            accept: 'audio/*',
          },
        },
        {
          name: 'legenda',
          title: 'Legenda ou descrição',
          type: 'string',
        },
      ],
    }),

    // Botão personalizado (CTA)
    defineArrayMember({
      type: 'object',
      name: 'button',
      title: 'Botão Personalizado',
      fields: [
        {
          name: 'label',
          title: 'Texto do Botão',
          type: 'string',
        },
        {
          name: 'url',
          title: 'Link',
          type: 'url',
        },
      ],
    }),
  ],
})