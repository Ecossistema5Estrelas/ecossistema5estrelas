import { getPost } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { urlForImage } from '@/sanity/lib/image'
import type { Metadata } from 'next'
import Image from 'next/image'

type Props = {
  params: Promise<{
    slug: string
  }>
}

/**
 * SEO dinâmico por slug — blindado
 */
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {
      title: 'Post não encontrado',
      description: 'Este conteúdo não está disponível.',
      robots: {
        index: false,
        follow: false,
      },
    }
  }

  return {
    title: post.title,
    description: post.description || 'Leia este artigo no Blog ArqFuturum.',
    openGraph: {
      title: post.title,
      description: post.description || '',
      ...(post.mainImage && {
        images: [urlForImage(post.mainImage).url()],
      }),
    },
  }
}

export default async function PostPage({ params }: Props) {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) return notFound()

  return (
    <article className="py-24">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 text-white">

        {/* Navegação institucional discreta */}
        <div className="mb-10 text-sm">
          <a
            href="/blog"
            className="text-white/60 hover:text-white transition"
          >
            ← Voltar ao Blog
          </a>
        </div>

        {/* Título do post */}
        <h1 className="text-3xl font-semibold tracking-tight mb-3">
          {post.title || 'Sem título'}
        </h1>

        {/* Data de publicação */}
        {post._createdAt && (
          <p className="text-sm text-white/50 mb-10">
            Publicado em{' '}
            {new Date(post._createdAt).toLocaleDateString('pt-BR')}
          </p>
        )}

        {/* Imagem principal (se existir) */}
        {post.mainImage && (
          <div className="mb-12 overflow-hidden rounded border border-white/10">
            <Image
              src={urlForImage(post.mainImage).url()}
              alt={post.title || 'Imagem do post'}
              width={1200}
              height={630}
              className="w-full h-auto object-cover"
              priority
            />
          </div>
        )}

        {/* Conteúdo editorial */}
        <div className="prose prose-invert prose-lg max-w-none">
          <PortableText
            value={post.body}
            components={portableTextComponents}
          />
        </div>

      </div>
    </article>
  )
}