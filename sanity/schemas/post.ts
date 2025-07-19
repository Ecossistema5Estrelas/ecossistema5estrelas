const post = {
  name: 'post',
  title: 'Postagem',
  type: 'document',
  fields: [
    {
      name: 'title',
      title: 'Título',
      type: 'string',
    },
    {
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
    },
    {
      name: 'content',
      title: 'Conteúdo',
      type: 'text',
    },
    {
      name: 'publishedAt',
      title: 'Publicado em',
      type: 'datetime',
    },
  ],
};

export default post;
