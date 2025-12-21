import { NextResponse } from 'next/server'
import { getPosts } from '@/sanity/lib/queries'

export const revalidate = 60 // Revalida a cada 60 segundos (ISR)

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json({ success: true, posts })
  } catch (error) {
    console.error('[API] Erro ao buscar posts:', error)
    return NextResponse.json(
      { success: false, message: 'Erro ao buscar posts.' },
      { status: 500 }
    )
  }
}