import type { Metadata } from 'next'
import '../styles/globals.css'
import HeaderNav from './components/HeaderNav'

export const metadata: Metadata = {
  title: 'ECOSSISTEMA 5ESTRELAS',
  description: 'Portal oficial do ECOSSISTEMA 5ESTRELAS',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" className="h-full">
      <body className="site-root">
        <div className="site-content min-h-screen">
          <HeaderNav />
          {children}
        </div>
      </body>
    </html>
  )
}

