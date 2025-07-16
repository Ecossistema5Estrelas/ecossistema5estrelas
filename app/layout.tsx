// /app/layout.tsx

import '../styles/globals.css';
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Ecossistema 5ESTRELAS',
  description: 'O futuro da inovação brasileira',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}