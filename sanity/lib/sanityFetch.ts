import { client } from './clients'

type SanityFetchParams = {
  query: string
  params?: Record<string, any>
}

export async function sanityFetch<T>({ query, params = {} }: SanityFetchParams): Promise<T> {
  try {
    return await client.fetch(query, params)
  } catch (error) {
    console.error('❌ Erro em sanityFetch:', error)
    throw new Error('Erro ao buscar dados do Sanity')
  }
}