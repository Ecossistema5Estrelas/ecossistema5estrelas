// app/layout.tsx

import '../styles/globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  metadataBase: new URL('https://ecossistema5estrelas.vercel.app'), // ou .org se já estiver ativo
  title: {
    default: 'ECOSSISTEMA 5ESTRELAS',
    template: '%s | ECOSSISTEMA 5ESTRELAS',
  },
  description:
    'O ECOSSISTEMA 5ESTRELAS integra inovação, impacto social e inteligência artificial em um universo de aplicativos que transformam realidades.',
  applicationName: 'ECOSSISTEMA 5ESTRELAS',
  icons: {
    icon: '/icon-192x192.png',
    apple: '/icons/icon-192x192.png',
    shortcut: '/favicon.ico',
  },
  manifest: '/manifest.json',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
  openGraph: {
    title: 'ECOSSISTEMA 5ESTRELAS',
    description:
      'Inovação inclusiva e inteligência artificial em um ecossistema digital premiado.',
    url: 'https://ecossistema5estrelas.vercel.app', // ou .org
    siteName: 'ECOSSISTEMA 5ESTRELAS',
    images: [
      {
        url: '/opengraph-image.png',
        width: 1200,
        height: 630,
        alt: 'ECOSSISTEMA 5ESTRELAS',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ECOSSISTEMA 5ESTRELAS',
    description:
      'Transformando vidas com IA, acessibilidade e impacto social real.',
    images: ['/opengraph-image.png'],
  },
}

// ✅ Viewport deve ser exportado separadamente no Next.js 15+
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  themeColor: '#6D28D9', // Roxo 5ESTRELAS
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen w-full bg-gradient-main text-white antialiased selection:bg-purple-700 selection:text-white">
        {children}
      </body>
    </html>
  )
}