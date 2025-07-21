// sanity/lib/live.ts
import { defineLive } from 'next-sanity'
import { client } from './clients' // ✅ agora correto

const configuredClient = client.withConfig({
  perspective: 'previewDrafts',
  useCdn: false,
})

export const { sanityFetch, SanityLive } = defineLive({
  client: configuredClient,
})

