import type { Metadata } from 'next'
import AppsClient from './AppsClient'

export const metadata: Metadata = {
  title: 'Aplicativos | ECOSSISTEMA 5ESTRELAS',
  description: 'Micélio tecnológico de aplicativos do ECOSSISTEMA 5ESTRELAS.',
  robots: {
    index: false,
    follow: false,
  },
}

export default function AppsPage() {
  return (
    <main id="content" role="main">
      <AppsClient />
    </main>
  )
}
