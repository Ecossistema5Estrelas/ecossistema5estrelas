'use client'

import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'

// Configurações do projeto
import { apiVersion, dataset, projectId } from './sanity/env'
import { schema } from './sanity/schemaTypes'

export default defineConfig({
  basePath: '/studio',
  projectId,
  dataset,
  schema,
  plugins: [
    deskTool(),
  ],
})