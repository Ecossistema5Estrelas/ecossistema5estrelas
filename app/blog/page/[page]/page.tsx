import Link from "next/link"

import BlogList from "../../BlogList"
import Pagination from "../../../../components/Pagination"

import { getPostsCount, getPostsPaginated } from "../../../../lib/queries"
import { BLOG_PAGE_SIZE, pageToRange } from "../../../../lib/blog.config"

export const revalidate = 3600

type Props = {
  params: Promise<{ page?: string }>
}

export default async function BlogPagedListPage({ params }: Props) {
  const resolvedParams = await params
  const pageParam = resolvedParams?.page ?? "1"
  const pageNum = Number(pageParam)

  const { page, start, end, pageSize } = pageToRange(pageNum, BLOG_PAGE_SIZE)

  const [total, posts] = await Promise.all([
    getPostsCount(),
    getPostsPaginated({ start, end }),
  ])

  const totalPages = Math.max(1, Math.ceil(Number(total ?? 0) / pageSize))

  return (
    <main style={{ padding: 24 }}>
      <h1>Blog</h1>

      <div className="text-sm text-neutral-500">
        Total de posts recebidos: {Number(total ?? 0)}
      </div>

      <div className="mt-8">
        <BlogList posts={posts} />
      </div>

      <Pagination
        basePath="/blog/page"
        currentPage={page}
        totalPages={totalPages}
      />

      <div className="mt-10">
        <Link className="underline" href="/blog">
          Voltar ao Blog
        </Link>
      </div>
    </main>
  )
}

