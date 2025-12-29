import type { Metadata } from 'next'

/**
 * 🧠 Metadata base institucional
 * ❗ NÃO é aplicada automaticamente
 * ❗ Deve ser usada apenas via spread em rotas específicas
 *
 * Exemplo:
 * export const metadata = {
 *   ...baseMetadata,
 *   title: 'Título da página',
 * }
 */
export const baseMetadata: Metadata = {
  title: {
    default: 'ECOSSISTEMA 5ESTRELAS',
    template: '%s | ECOSSISTEMA 5ESTRELAS',
  },

  description: 'Inovação, inclusão e prosperidade digital em um só lugar.',

  applicationName: 'ECOSSISTEMA 5ESTRELAS',

  keywords: [
    'ecossistema',
    '5estrelas',
    'tecnologia',
    'inclusão',
    'inovação',
    'pwa',
    'tokens',
    'nextjs',
    'sanity',
    'firebase',
  ],

  authors: [
    {
      name: 'ECOSSISTEMA 5ESTRELAS',
      url: 'https://ecossistema5estrelas.org',
    },
  ],

  creator: 'ECOSSISTEMA 5ESTRELAS',

  generator: 'Next.js App Router + Sanity CMS',

  metadataBase: new URL('https://ecossistema5estrelas.org'),

  openGraph: {
    title: 'ECOSSISTEMA 5ESTRELAS',
    description: 'O futuro digital construído com propósito e tecnologia.',
    url: 'https://ecossistema5estrelas.org',
    siteName: 'ECOSSISTEMA 5ESTRELAS',
    images: [
      {
        url: '/icon-512.png',
        width: 512,
        height: 512,
        alt: 'Logo do ECOSSISTEMA 5ESTRELAS',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },

  icons: {
    icon: '/icon-192.png',
    apple: '/icon-512.png',
  },

  manifest: '/manifest.json',
}