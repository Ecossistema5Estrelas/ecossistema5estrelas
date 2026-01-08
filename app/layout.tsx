import './globals.css'
import type { Metadata, Viewport } from 'next'
import type { ReactNode } from 'react'

import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

import Analytics from '@/components/analytics/Analytics'
import CookieConsent from '@/components/consent/CookieConsent'

/**
 * 🌐 Metadata base do portal (NÍVEL RAIZ)
 *
 * - Define identidade institucional
 * - NÃO bloqueia override por página
 * - SEO específico deve ser definido nas rotas (/sobre, /blog, etc.)
 */
export const metadata: Metadata = {
  title: {
    default: 'ECOSSISTEMA 5ESTRELAS',
    template: '%s | ECOSSISTEMA 5ESTRELAS',
  },
  description: 'Portal institucional do ECOSSISTEMA 5ESTRELAS',

  /** 🧭 SEO & Governança */
  robots: {
    index: true,
    follow: true,
  },

  /** 🔐 Privacidade */
  referrer: 'strict-origin-when-cross-origin',

  /** 🎨 UX nativa */
  colorScheme: 'dark',
}

/**
 * 🎨 Viewport canônico
 * Mantido no layout raiz por padrão institucional
 */
export const viewport: Viewport = {
  themeColor: '#000000',
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white antialiased">
        {/* Header institucional global */}
        <Header />

        {/* Analytics (GA4) — respeita consentimento */}
        <Analytics />

        {/* Conteúdo principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {children}
        </main>

        {/* Footer institucional */}
        <Footer />

        {/* Consentimento de cookies (LGPD) */}
        <CookieConsent />
      </body>
    </html>
  )
}