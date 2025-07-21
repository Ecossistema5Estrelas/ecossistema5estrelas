// sanity/lib/client.ts
// 🔌 Cliente Sanity para consultas com next-sanity

import { createClient } from 'next-sanity'

// 🔒 Variáveis do ambiente Sanity definidas em /sanity/env.ts
import { apiVersion, dataset, projectId } from '../env'

// 🚀 Exporta o cliente pronto para fazer fetch com GROQ
export const client = createClient({
  projectId,      // ID do projeto Sanity
  dataset,        // Nome do dataset (geralmente 'production')
  apiVersion,     // Versão da API (ex: '2023-07-20')
  useCdn: true,   // Se true, usa cache da CDN (ótimo para produção)
})
