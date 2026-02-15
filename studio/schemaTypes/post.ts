import { defineField, defineType } from "sanity";

export default defineType({
  name: "post",
  title: "Post",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Título",
      type: "string",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: {
        source: "title",
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "description",
      title: "Descrição",
      type: "text",
      rows: 3,
    }),

    defineField({
      name: "publishedAt",
      title: "Data de Publicação",
      type: "datetime",
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: "body",
      title: "Conteúdo",
      type: "blockContent",
    }),

    defineField({
      name: "categories",
      title: "Categorias",
      type: "array",
      of: [{ type: "reference", to: [{ type: "category" }] }],
    }),

    // Governança semântica (novos, não retroativos)

    defineField({
      name: "themes",
      title: "Temas",
      type: "array",
      of: [{ type: "string" }],
      description: "1 a 3 temas canônicos",
    }),

    defineField({
      name: "series",
      title: "Série",
      type: "string",
    }),

    defineField({
      name: "level",
      title: "Nível",
      type: "string",
      options: {
        list: [
          { title: "Iniciante", value: "iniciante" },
          { title: "Intermediário", value: "intermediario" },
          { title: "Avançado", value: "avancado" },
        ],
      },
    }),

    defineField({
      name: "type",
      title: "Tipo de Conteúdo",
      type: "string",
      options: {
        list: [
          { title: "Ensaio", value: "ensaio" },
          { title: "Editorial", value: "editorial" },
          { title: "Manifesto", value: "manifesto" },
          { title: "Guia", value: "guia" },
          { title: "Relatório", value: "relatorio" },
        ],
      },
    }),
  ],

  preview: {
    select: {
      title: "title",
      subtitle: "publishedAt",
    },
  },
});