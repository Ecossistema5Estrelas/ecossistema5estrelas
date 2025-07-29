import type { Metadata } from 'next'
import { getPosts, getCategories } from '@/sanity/lib/queries'
import { Post } from '@/lib/types'
import BotaoVoltar from '@/components/BotaoVoltar'
import FiltroCategoriasMultiplo from '@/components/blog/FiltroCategoriasMultiplo'

export const dynamic = 'force-dynamic'

// ✅ SEO completo para a página /blog
export const metadata: Metadata = {
  title: 'Blog Oficial do ECOSSISTEMA 5ESTRELAS 🌟',
  description:
    'Explore as inovações, bastidores e novidades do ECOSSISTEMA 5ESTRELAS. Atualizações sobre apps, inteligência artificial e inclusão digital em primeira mão!',
  keywords: [
    'ECOSSISTEMA 5ESTRELAS',
    'Blog 5ESTRELAS',
    'inovação digital',
    'startups brasileiras',
    'inteligência artificial',
    'tecnologia inclusiva',
    'notícias 5estrelas',
    'apps inteligentes'
  ],
  openGraph: {
    title: 'Blog Oficial do ECOSSISTEMA 5ESTRELAS',
    description:
      'Notícias, bastidores e avanços do projeto digital mais inovador do Brasil. 🌟',
    url: 'https://ecossistema5estrelas.org/blog',
    siteName: 'ECOSSISTEMA 5ESTRELAS',
    images: [
      {
        url: 'https://ecossistema5estrelas.org/og-blog.jpg', // substitua pelo caminho real do banner
        width: 1200,
        height: 630,
        alt: 'Blog Oficial ECOSSISTEMA 5ESTRELAS'
      }
    ],
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Blog Oficial do ECOSSISTEMA 5ESTRELAS',
    description:
      'Fique por dentro das inovações e bastidores do maior ecossistema digital do Brasil!',
    images: ['https://ecossistema5estrelas.org/og-blog.jpg']
  },
  metadataBase: new URL('https://ecossistema5estrelas.org'),
  alternates: {
    canonical: '/blog'
  }
}

export default async function BlogPage() {
  const posts: Post[] = await getPosts([]) // 👈 Carrega todos os posts sem filtro
  const categorias = await getCategories()

  return (
    <main className="min-h-screen px-4 py-8 bg-gradient-main text-white">
      <BotaoVoltar />
      <h1 className="text-4xl font-bold mb-6">Blog Oficial 🌟</h1>

      <FiltroCategoriasMultiplo categories={categorias} allPosts={posts} />
    </main>
  )
}