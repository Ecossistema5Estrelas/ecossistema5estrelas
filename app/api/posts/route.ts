import { NextResponse } from 'next/server'
import { getPosts } from '@/sanity/lib/queries'

export async function GET() {
  try {
    const posts = await getPosts()
    return NextResponse.json(posts)
  } catch (error) {
    console.error('❌ Erro ao buscar posts na API:', error)
    return NextResponse.json({ error: 'Erro ao buscar posts' }, { status: 500 })
  }
}