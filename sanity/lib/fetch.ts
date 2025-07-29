import { client } from './clients'

export async function sanityFetch<T>(query: string, params: Record<string, any> = {}): Promise<T> {
  try {
    return await client.fetch(query, params) as T
  } catch (error) {
    console.error('❌ Erro em sanityFetch:', error)
    throw new Error('Erro ao buscar dados do Sanity')
  }
}