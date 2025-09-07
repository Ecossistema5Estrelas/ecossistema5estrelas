// app/api/posts/route.ts
import { NextResponse } from 'next/server'
import { sanityFetch } from '@/sanity/lib/fetch'

const POSTS_QUERY = `*[_type == "post"] | order(publishedAt desc)[0...10]{
  _id,
  title,
  "slug": slug,
  excerpt,
  publishedAt
}`

export async function GET() {
  const pid = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
  const ds  = process.env.NEXT_PUBLIC_SANITY_DATASET

  // Se as envs não estão configuradas, não quebre a UI.
  if (!pid || !ds) {
    return NextResponse.json({ posts: [] }, { status: 200 })
  }

  try {
    const posts = await sanityFetch<{ _id: string; title: string; slug?: { current: string }; excerpt?: string; publishedAt?: string }[]>({
      query: POSTS_QUERY,
    })
    return NextResponse.json({ posts: posts ?? [] }, { status: 200 })
  } catch {
    // Se der 404 de dataset, token inválido, etc., devolve vazio para o front não quebrar
    return NextResponse.json({ posts: [] }, { status: 200 })
  }
}