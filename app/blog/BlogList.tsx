import Link from "next/link"
import type { Post } from "@/lib/types"

type Props = {
  posts: Post[]
}

export default function BlogList({ posts }: Props) {
  return (
    <ul className="space-y-6">
      {posts.map((post) => {
        // 🔒 Blindagem correta para slug string
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