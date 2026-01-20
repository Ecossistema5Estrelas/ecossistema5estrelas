import Link from "next/link"

import BlogList from "@/blog/BlogList"
import Pagination from "@/components/Pagination"
import { getPostsCount, getPostsPaginated } from "@/lib/queries"
import { BLOG_PAGE_SIZE, pageToRange } from "@/lib/blog.config"

export const revalidate = 3600

type Props = {
  params: { page: string }
}

export default async function BlogPagedListPage({ params }: Props) {
  const pageNum = Number(params?.page || "1")
  const { page, start, end, pageSize } = pageToRange(pageNum, BLOG_PAGE_SIZE)

  const [total, posts] = await Promise.all([
    getPostsCount(),
    getPostsPaginated({ start, end }),
  ])

  const totalPages = Math.max(1, Math.ceil(Number(total || 0) / pageSize))

  return (
    <main style={{ padding: 24 }}>
      <h1>Blog</h1>

      <div className="text-sm text-neutral-500">
        Total de posts recebidos: {Number(total || 0)}
      </div>

      <div className="mt-8">
        <BlogList posts={posts} />
      </div>

      <Pagination basePath="/blog/page" page={page} totalPages={totalPages} />

      <div className="mt-10">
        <Link className="underline" href="/blog">
          Voltar ao Hub SemÃ¢ntico
        </Link>
      </div>
    </main>
  )
}
