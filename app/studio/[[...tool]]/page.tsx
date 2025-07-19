// 🚀 Página do Sanity Studio — compatível com App Router (Next.js 15)

import { NextStudio } from 'next-sanity/studio'
import config from '../../../sanity.config'

// 🔒 Força renderização estática para evitar erros de hydration
export const dynamic = 'force-static'

// ✅ Importa metadados e viewport padrão
export { metadata, viewport } from '@/metadata'

export default function StudioPage() {
  return <NextStudio config={config} />
}
