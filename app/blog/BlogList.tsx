import Link from "next/link"

/**
 * Contrato canônico de post resumido
 * Usado APENAS em listagens
 */
type PostSummary = {
  _id: string
  title: string
  slug: string
  publishedAt: string
}

type Props = {
  posts: PostSummary[]
}

/**
 * Lista de posts do blog
 * - NÃO renderiza conteúdo
 * - NÃO conhece body
 * - NÃO aceita post completo
 */
export default function BlogList({ posts }: Props) {
  return (
    <ul className="space-y-6">
      {posts.map((post) => {
        // Blindagem final de segurança
        if (!post.slug || typeof post.slug !== "string") {
          return null
        }

        return (
          <li key={post._id}>
            <Link
              href={`/blog/${post.slug}`}
              className="text-lg font-semibold underline"
            >
              {post.title}
            </Link>

            <div className="text-sm text-neutral-500">
              {new Date(post.publishedAt).toLocaleDateString("pt-BR")}
            </div>
          </li>
        )
      })}
    </ul>
  )
}