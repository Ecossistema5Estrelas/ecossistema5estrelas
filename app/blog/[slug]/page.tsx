import { notFound } from "next/navigation"
import type { Metadata } from "next"
import Link from "next/link"
import { PortableText } from "@portabletext/react"

import { getPost } from "@/lib/queries"
import { portableTextComponents } from "@/lib/portableText"

/**
 * 🔒 Next 15 — força execução dinâmica da rota
 * Evita cache fantasma e 404 silencioso
 */
export const dynamic = "force-dynamic"

type PageProps = {
  params: Promise<{
    slug: string
  }>
}

/**
 * Metadata dinâmica (SEO)
 */
export async function generateMetadata(
  { params }: PageProps
): Promise<Metadata> {
  const { slug } = await params
  const post = await getPost(slug)

  if (!post) {
    return {}
  }

  return {
    title: post.title,
    description:
      post.excerpt || "Conteúdo oficial do ECOSSISTEMA 5ESTRELAS",
  }
}

/**
 * Página do post
 */
export default async function BlogPostPage(
  { params }: PageProps
) {
  const { slug } = await params

  console.log("🧭 SLUG RECEBIDO:", slug)

  const post = await getPost(slug)

  if (!post) {
    console.log("❌ POST NÃO ENCONTRADO PARA:", slug)
    notFound()
  }

  return (
    <section className="py-24">
      <div className="mx-auto max-w-3xl px-4">
        <Link
          href="/blog"
          className="mb-10 inline-block text-sm text-white/60 hover:text-white"
        >
          ← Voltar para o Blog
        </Link>

        <article className="prose prose-invert max-w-none">
          <h1 className="mb-10 text-3xl font-extrabold">
            {post.title}
          </h1>

          {post.body && (
            <PortableText
              value={post.body}
              components={portableTextComponents}
            />
          )}
        </article>
      </div>
    </section>
  )
}