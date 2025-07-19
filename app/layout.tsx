import '../styles/globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ecossistema 5ESTRELAS',
  description: 'O futuro da inovação, inclusão e excelência começa aqui.',
  viewport: 'width=device-width, initial-scale=1.0',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="bg-gradient-main text-white min-h-screen">
        {children}
      </body>
    </html>
  )
}
