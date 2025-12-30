export const dynamic = 'force-dynamic'

import { notFound } from 'next/navigation'
import { sanityClient } from '@/lib/sanity'

export default async function BlogPost({ params }) {
  const post = await sanityClient.fetch(
    query,
    { slug: params.slug },
    { cache: 'no-store' }
  )

  if (!post) {
    notFound()
  }

  return (
    // render normal
  )
}