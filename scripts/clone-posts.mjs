import { notFound } from "next/navigation"
import Link from "next/link"
import { PortableText } from "@portabletext/react"
import { sanityFetch } from "@/lib/sanity/client"
import { Q } from "@/lib/sanity/queries"

type Props = {
  params: { slug: string }
}

export default async function Page({ params }: Props) {
  const slug = params.slug

  const post = await sanityFetch(Q.postBySlug, { slug })

  if (!post?._id) return notFound()

  return (
    <main style={{ padding: 24, maxWidth: 800, margin: "0 auto" }}>
      <h1>{post.title}</h1>

      {post.publishedAt && (
        <p style={{ opacity: 0.6 }}>
          {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
        </p>
      )}

      <section style={{ marginTop: 24 }}>
        {Array.isArray(post.body)
          ? <PortableText value={post.body} />
          : <p>Conteúdo vazio.</p>}
      </section>

      <div style={{ marginTop: 40 }}>
        <Link href="/blog">← Voltar ao blog</Link>
      </div>
    </main>
  )
}
