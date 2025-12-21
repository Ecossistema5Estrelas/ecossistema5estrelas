import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'

export const metadata: Metadata = {
  title: 'ECOSSISTEMA 5ESTRELAS',
  description: 'Inovação, inclusão e prosperidade digital em um só lugar.',
  manifest: '/manifest.json',
  icons: {
    icon: '/icon.192x192.png',
    apple: '/icon.512x512.png',
  },
}

export const viewport = {
  themeColor: '#000000',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR" className="dark" suppressHydrationWarning>
      <head />
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white antialiased">
        
        {/* Header Global Premium */}
        <Header />

        {/* Conteúdo central */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {children}
        </main>

        {/* Footer global */}
        <footer className="text-center text-xs text-zinc-500 py-10">
          © {new Date().getFullYear()} ECOSSISTEMA 5ESTRELAS • Todos os direitos reservados
        </footer>

      </body>
    </html>
  )
}