import '../styles/globals.css'
import type { Metadata, Viewport } from 'next'

export const metadata: Metadata = {
  title: 'Ecossistema 5ESTRELAS',
  description: 'O futuro da inovação, inclusão e excelência começa aqui.',
  icons: {
    icon: '/icon-192x192.png',
  },
  manifest: '/manifest.json',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1.0,
  themeColor: '#6D28D9', // Roxo oficial do Ecossistema, movido aqui conforme recomendação Next.js
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