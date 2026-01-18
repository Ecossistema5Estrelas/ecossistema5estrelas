import "./globals.css"
import type { Metadata, Viewport } from "next"
import type { ReactNode } from "react"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"
import Analytics from "@/components/analytics/Analytics"
import CookieConsent from "@/components/consent/CookieConsent"

export const metadata: Metadata = {
  title: {
    default: "ECOSSISTEMA 5ESTRELAS",
    template: "%s | ECOSSISTEMA 5ESTRELAS",
  },
  description: "Portal institucional do ECOSSISTEMA 5ESTRELAS",
  robots: {
    index: true,
    follow: true,
  },
  referrer: "strict-origin-when-cross-origin",
  manifest: "/manifest.webmanifest",
}

export const viewport: Viewport = {
  themeColor: "#000000",
}

interface RootLayoutProps {
  children: ReactNode
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR" className="dark">
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white antialiased">
        
        <header>
          <Header />
        </header>

        <nav aria-label="Navegação principal" />

        <Analytics />

        <main
          id="content"
          role="main"
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10"
        >
          {children}
        </main>

        <footer>
          <Footer />
        </footer>

        <CookieConsent />
      </body>
    </html>
  )
}
