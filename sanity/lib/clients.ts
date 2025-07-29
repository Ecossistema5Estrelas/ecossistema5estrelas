// /sanity/lib/clients.ts
// 🔌 Cliente Sanity configurado para uso com consultas GROQ, imagens e mutations

import { createClient } from 'next-sanity'
import { apiVersion, dataset, projectId, useCdn } from '../env'

// 🚀 Cria e exporta o cliente Sanity
export const client = createClient({
  projectId,   // ID do projeto no Sanity (ex: 'abc123')
  dataset,     // Dataset usado (ex: 'production')
  apiVersion,  // Versão da API (ex: '2023-01-01')
  useCdn,      // true em produção (para cache), false para rascunhos/previews
})

// 🧪 Loga as configurações se estiver em ambiente de desenvolvimento
if (process.env.NODE_ENV === 'development') {
  console.log('🔍 Sanity Client conectado:', {
    projectId,
    dataset,
    apiVersion,
    useCdn,
  })
}