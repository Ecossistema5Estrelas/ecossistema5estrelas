// app/robot.txt/route.ts

import { NextResponse } from 'next/server'

export function GET() {
  const content = `
User-agent: *
Disallow:

Sitemap: https://ecossistema5estrelas.org/sitemap.xml
Host: https://ecossistema5estrelas.org
  `.trim()

  return new NextResponse(content, {
    status: 200,
    headers: {
      'Content-Type': 'text/plain',
    },
  })
}