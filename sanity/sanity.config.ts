import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'

import { schemaTypes } from './schemas'

export default defineConfig({
  name: 'default',
  title: 'ECOSSISTEMA 5ESTRELAS',

  // 🔒 CLI NÃO USA NEXT_PUBLIC_*
  projectId: 'df3uyd06',
  dataset: 'production',

  apiVersion: '2024-01-01',

  plugins: [
    deskTool(),
    visionTool(),
  ],

  schema: {
    types: schemaTypes,
  },
})
