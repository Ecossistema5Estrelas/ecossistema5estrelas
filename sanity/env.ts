// @ts-nocheck
// app/schemaType/env.ts

export const projectId: string = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
export const dataset: string = process.env.NEXT_PUBLIC_SANITY_DATASET!
export const apiVersion: string = '2024-01-01'

// Validações explícitas
if (!projectId) {
  throw new Error('Faltando NEXT_PUBLIC_SANITY_PROJECT_ID no .env.local')
}

if (!dataset) {
  throw new Error('Faltando NEXT_PUBLIC_SANITY_DATASET no .env.local')
}
