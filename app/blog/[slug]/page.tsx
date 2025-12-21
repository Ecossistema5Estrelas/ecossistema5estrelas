import { getPost } from '@/sanity/lib/queries'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { urlForImage } from '@/sanity/lib/image'
import type { Metadata } from 'next'
import BotaoVoltar from '@/components/BotaoVoltar'
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
    description: post.description || 'Leia este artigo no Blog 5ESTRELAS.',
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
    <div className="max-w-3xl mx-auto px-4 py-10 text-white">
      <BotaoVoltar />

      <h1 className="text-3xl font-bold mb-2">
        {post.title || 'Sem título'}
      </h1>

      {post._createdAt && (
        <p className="text-sm text-gray-400 mb-6">
          Publicado em{' '}
          {new Date(post._createdAt).toLocaleDateString('pt-BR')}
        </p>
      )}

      {post.mainImage && (
        <div className="mb-6 rounded overflow-hidden border border-white/10">
          <Image
            src={urlForImage(post.mainImage).url()}
            alt={post.title || 'Imagem do post'}
            width={900}
            height={500}
            className="w-full h-auto object-cover"
            priority
          />
        </div>
      )}

      <div className="prose prose-invert prose-lg max-w-none">
        <PortableText
          value={post.body}
          components={portableTextComponents}
        />
      </div>
    </div>
  )
}