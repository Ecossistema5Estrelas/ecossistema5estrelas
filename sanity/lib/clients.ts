import { createClient } from 'next-sanity'

const projectId =
  process.env.SANITY_PROJECT_ID ||
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID

const dataset =
  process.env.SANITY_DATASET ||
  process.env.NEXT_PUBLIC_SANITY_DATASET

if (!projectId || !dataset) {
  throw new Error('Sanity client: SANITY_PROJECT_ID/SANITY_DATASET não definidos')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion: '2022-06-01',
  useCdn: true,
})