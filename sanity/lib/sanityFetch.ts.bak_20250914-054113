// @ts-nocheck
import { createClient } from "next-sanity";

export const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "hf3nh9vb",
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-10-01",
  useCdn: true,
});

/**
 * Fetch genérico e simples: aceita (query) ou (query, params).
 * Ex.: sanityFetch<Post[]>(query)
 *     sanityFetch<Post|null>(query, { slug })
 */
export async function sanityFetch<T>(
  query: string,
  params?: Record<string, unknown>
): Promise<T> {
  const data = await client.fetch(query as any, params as any)
  return data as T
}

