import type { Metadata } from 'next'
import Link from 'next/link'
import { notFound } from 'next/navigation'

type PageProps = {
  params: {
    slug: string
  }
}

export const metadata: Metadata = {
  title: 'Blog • ECOSSISTEMA 5ESTRELAS',
  alternates: {
    canonical: '/blog'
  }
}

export default async function BlogPostPage({ params }: PageProps) {
  const { slug } = params

  // ⚠️ placeholder canônico
  // Aqui entra o fetch real do post (Sanity / CMS)
  // Se não existir, mantém o notFound()
  if (!slug) {
    notFound()
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">

        {/* Voltar ao blog */}
        <div className="mb-8">
          <Link
            href="/blog"
            className="text-sm text-white/60 hover:text-white transition"
          >
            ← Voltar para o Blog
          </Link>
        </div>

        {/* Conteúdo do post (placeholder estrutural) */}
        <article className="prose prose-invert max-w-none">
          <h1>{slug}</h1>

          <p>
            Conteúdo do post será renderizado aqui a partir do CMS.
          </p>
        </article>

      </div>
    </section>
  )
}