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
 * - Identidade institucional
 * - Permite override por página
 * - NÃO contém propriedades de viewport
 */
export const metadata: Metadata = {
  title: {
    default: 'ECOSSISTEMA 5ESTRELAS',
    template: '%s | ECOSSISTEMA 5ESTRELAS',
  },
  description: 'Portal institucional do ECOSSISTEMA 5ESTRELAS',

  /**
   * 🧭 SEO & Governança
   */
  robots: {
    index: true,
    follow: true,
  },
  referrer: 'strict-origin-when-cross-origin',

  /**
   * 📱 PWA
   */
  manifest: '/manifest.webmanifest',
}

/**
 * 🎨 Viewport canônico institucional
 * (somente propriedades suportadas)
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
    <head>
      <script type="speculationrules" src="/speculation-rules.json"></script>
    </head>
      <head>
        {/* ⚡ Performance de rede — domínios críticos */}
        <link rel="dns-prefetch" href="https://www.googletagmanager.com" />
        <link
          rel="preconnect"
          href="https://www.googletagmanager.com"
          crossOrigin=""
        />
      </head>

      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white antialiased">
        {/* Header institucional */}
        <Header />

        {/* Analytics (respeita consentimento) */}
        <Analytics />

        {/* Conteúdo principal */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {children}
        </main>

        {/* Footer institucional */}
        <Footer />

        {/* Consentimento LGPD */}
        <CookieConsent />
      </body>
    </html>
  )
}
