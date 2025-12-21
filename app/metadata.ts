import type { Metadata } from 'next'

export const defaultMetadata: Metadata = {
  title: 'ECOSSISTEMA 5ESTRELAS',
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
  authors: [{ name: 'ECOSSISTEMA 5ESTRELAS', url: 'https://ecossistema5estrelas.org' }],
  creator: 'ECOSSISTEMA 5ESTRELAS',
  generator: 'Next.js + Sanity + Firebase',
  metadataBase: new URL('https://ecossistema5estrelas.org'),
  openGraph: {
    title: 'ECOSSISTEMA 5ESTRELAS',
    description: 'O futuro digital construído com propósito e tecnologia.',
    url: 'https://ecossistema5estrelas.org',
    siteName: 'ECOSSISTEMA 5ESTRELAS',
    images: [
      {
        url: '/icon.512x512.png',
        width: 512,
        height: 512,
        alt: 'Logo do ECOSSISTEMA 5ESTRELAS',
      },
    ],
    locale: 'pt_BR',
    type: 'website',
  },
  icons: {
    icon: '/icon.192x192.png',
    apple: '/icon.512x512.png',
  },
  manifest: '/manifest.json',
  themeColor: '#000000',
}