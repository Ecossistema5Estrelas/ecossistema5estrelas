import './globals.css'
import type { Metadata } from 'next'
import Header from '@/components/layout/Header'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
  title: 'ECOSSISTEMA 5ESTRELAS',
  description: 'Portal institucional do ECOSSISTEMA 5ESTRELAS',
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
      <body className="min-h-screen bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white antialiased">
        <Header />

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {children}
        </main>

        <Footer />
      </body>
    </html>
  )
}