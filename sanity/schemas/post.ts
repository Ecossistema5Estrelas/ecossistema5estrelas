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
      description: 'Título editorial claro, sem hype ou emojis.',
      validation: (Rule) =>
        Rule.required()
          .min(10)
          .warning('Use um título editorial claro e significativo.'),
    }),

    defineField({
      name: 'description',
      title: 'Resumo (Description)',
      type: 'text',
      rows: 3,
      description:
        'Resumo editorial do post. Usado na listagem e no SEO.',
      validation: (Rule) =>
        Rule.required()
          .min(50)
          .max(300)
          .warning('Resumo curto, claro e convidativo (2–3 linhas).'),
    }),

    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'publishedAt',
      title: 'Data de Publicação',
      type: 'datetime',
      description:
        '⚠️ Só preencher quando o texto estiver FINAL. Controla visibilidade no site.',
    }),

    defineField({
      name: 'mainImage',
      title: 'Imagem de Capa',
      type: 'image',
      options: {
        hotspot: true,
      },
      description:
        'Opcional. Use apenas se a imagem realmente agregar valor conceitual.',
    }),

    defineField({
      name: 'gallery',
      title: 'Galeria de Imagens',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description:
        'Opcional. Use com moderação. O foco é leitura, não galeria.',
    }),

    defineField({
      name: 'media',
      title: 'Vídeo ou Áudio (opcional)',
      type: 'url',
      description:
        'Conteúdo complementar (podcast, vídeo, entrevista).',
      validation: (Rule) =>
        Rule.uri({
          scheme: ['http', 'https'],
        }),
    }),

    defineField({
      name: 'author',
      title: 'Autor',
      type: 'reference',
      to: [{ type: 'author' }],
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'categories',
      title: 'Categorias',
      type: 'array',
      of: [{ type: 'reference', to: { type: 'category' } }],
    }),

    defineField({
      name: 'tags',
      title: 'Tags',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        layout: 'tags',
      },
    }),

    defineField({
      name: 'body',
      title: 'Conteúdo (ArqFuturum)',
      type: 'blockContent',
      description:
        'Texto principal. 4–7 parágrafos, curtos, claros, positivos e acessíveis.',
      validation: (Rule) =>
        Rule.required().warning(
          'Use 4–7 parágrafos, curtos (máx. ~5 linhas) e linguagem acessível.'
        ),
    }),

    // 📋 CHECKLIST EDITORIAL (VISUAL / HUMANO)
    defineField({
      name: 'editorialChecklist',
      title: 'Checklist Editorial — ArqFuturum',
      type: 'string',
      readOnly: true,
      initialValue: `
✔ 4 a 7 parágrafos
✔ Parágrafos curtos (máx. ~5 linhas)
✔ Linguagem clara e acessível
✔ Tom positivo e construtivo
✔ Técnica presente, mas leve
✔ Não promocional
✔ Não excessivamente técnico
✔ Soa como liderança visionária
`,
      description:
        'Checklist visual. Se algum item falhar, não publicar.',
    }),
  ],

  preview: {
    select: {
      title: 'title',
      publishedAt: 'publishedAt',
      media: 'mainImage',
    },
    prepare({ title, publishedAt, media }) {
      return {
        title,
        media,
        subtitle: publishedAt
          ? `Publicado em ${new Date(publishedAt).toLocaleDateString('pt-BR')}`
          : 'Rascunho — não publicado',
      }
    },
  },
})