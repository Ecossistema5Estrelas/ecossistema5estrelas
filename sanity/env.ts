// /sanity/env.ts
// 🔐 Carrega variáveis de ambiente essenciais para conectar com o Sanity

// 📅 Define a versão da API (fallback padrão seguro)
export const apiVersion =
  process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2023-01-01'

// 📦 Nome do dataset (ex: 'production')
export const dataset = assertValue(
  process.env.NEXT_PUBLIC_SANITY_DATASET,
  '❌ Missing environment variable: NEXT_PUBLIC_SANITY_DATASET'
)

// 🆔 ID do projeto Sanity (copiado do sanity.io/manage)
export const projectId = assertValue(
  process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  '❌ Missing environment variable: NEXT_PUBLIC_SANITY_PROJECT_ID'
)

// 🚀 Usa cache via CDN apenas em produção
export const useCdn = process.env.NODE_ENV === 'production'

// 🛡️ Função auxiliar para validar variáveis obrigatórias
function assertValue<T>(v: T | undefined, errorMessage: string): T {
  if (v === undefined) {
    throw new Error(errorMessage)
  }
  return v
}