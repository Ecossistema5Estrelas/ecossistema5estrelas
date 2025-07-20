export default {
  name: 'author',
  title: 'Autor',
  type: 'document',
  fields: [
    { name: 'name', title: 'Nome', type: 'string' },
    { name: 'image', title: 'Foto', type: 'image' },
    {
      name: 'bio',
      title: 'Biografia',
      type: 'array',
      of: [{ type: 'block' }],
    },
  ],
}
