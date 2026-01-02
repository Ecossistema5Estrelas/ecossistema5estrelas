import type { ReactNode } from 'react'

export const dynamic = 'force-dynamic'
export const revalidate = 0
export const fetchCache = 'force-no-store'

interface BlogLayoutProps {
  children: ReactNode
}

/**
 * Layout canônico do Blog
 * - Isola renderização do conteúdo
 * - Evita vazamentos de output cru
 * - Mantém governança visual mínima
 */
export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <main className="min-h-screen bg-neutral-950 text-neutral-100">
      {children}
    </main>
  )
}
