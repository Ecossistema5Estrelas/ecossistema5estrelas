'use client'
import { PortableText } from '@portabletext/react'
import type { PortableTextBlock } from '@portabletext/types'

export default function PortableBody({ value }: { value: PortableTextBlock[] }) {
  return <PortableText value={value} />
}



