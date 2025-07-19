'use client'

import dynamic from 'next/dynamic'

export const dynamic = 'force-static'

const StudioWrapper = dynamic(() => import('../../../sanity/StudioWrapper'), {
  ssr: false,
})

export default function StudioPage() {
  return <StudioWrapper />
}
