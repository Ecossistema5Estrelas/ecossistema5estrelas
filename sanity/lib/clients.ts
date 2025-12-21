// /sanity/lib/clients.ts

import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!
const apiVersion = '2023-08-01'

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true, // usar cache para melhorar performance de leitura pública
})