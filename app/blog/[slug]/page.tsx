export const dynamic = 'force-dynamic'

import { getPost } from '@/sanity/lib/queries'
import { Post } from '@/lib/types'
import { PortableText } from '@portabletext/react'
import { portableTextComponents } from '@/components/portableTextComponents'
import { notFound } from 'next/navigation'
import BotaoVoltar from '@/components/BotaoVoltar'
import Image from 'next/image'
import type { Metadata } from 'next'
import SocialShare from '@/components/SocialShare'
import { urlForImage } from '@/sanity/lib/image' // ✅ Correto agora

type Props = {
  params: {
    slug: string
  }
}

// SEO dinâmico
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const post: Post | null = await getPost(params.slug)

  return {
    title: post?.title || 'Post não encontrado',
    description: post?.description || 'Sem descrição disponível.',
    openGraph: {
      title: post?.title,
      description: post?.description,
      images: post?.mainImage ? [post.mainImage] : [],
    },
  }
}

export default async function BlogPostPage({ params }: Props) {
  const post: Post | null = await getPost(params.slug)

  if (!post) return notFound()

  return (
    <main className="min-h-screen px-4 py-8 bg-gradient-main text-white">
      <BotaoVoltar />

      <article className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-4">{post.title}</h1>

        {post.mainImage && (
          <Image
            src={post.mainImage}
            alt={post.title}
            width={1200}
            height={600}
            className="rounded-lg mb-6 object-cover w-full h-auto"
          />
        )}

        {/* ✅ GALERIA ATIVADA */}
        {post.gallery && post.gallery.length > 0 && (
          <section className="my-8">
            <h2 className="text-2xl font-bold mb-4">📸 Galeria</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {post.gallery.map((image, index) => (
                <div
                  key={index}
                  className="rounded overflow-hidden border border-white/10 hover:scale-105 transition"
                >
                  <Image
                    src={urlForImage(image).width(800).url()}
                    alt={image.alt || image.caption || `Imagem ${index + 1}`}
                    width={800}
                    height={600}
                    className="object-cover w-full h-56"
                  />
                  {image.caption && (
                    <p className="text-sm text-center text-gray-300 bg-white/5 py-2 px-1">
                      {image.caption}
                    </p>
                  )}
                </div>
              ))}
            </div>
          </section>
        )}

        <PortableText value={post.body ?? []} components={portableTextComponents} />

        <SocialShare slug={post.slug?.current || ''} title={post.title} />
      </article>
    </main>
  )
}