import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './schemaTypes' // <- IMPORTANTE

export default defineConfig({
  name: 'default',
  title: 'ecossistema5estrelas',

  projectId: 'hf3nh9vb', // <-- AGORA VAI!

  dataset: 'production',

  plugins: [deskTool(), visionTool()],

  schema: {
    types: schemaTypes,
  },
})
