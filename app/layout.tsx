import "./globals.css"
import type { Metadata } from "next"
import { Analytics } from "@vercel/analytics/react"

const SITE = process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.vercel.app"

export const metadata: Metadata = {
  metadataBase: new URL(SITE),
  title: {
    default: "ECOSSISTEMA 5ESTRELAS",
    template: "%s · 5ESTRELAS",
  },
  description: "Portal oficial do ECOSSISTEMA 5ESTRELAS",
  openGraph: {
    type: "website",
    siteName: "ECOSSISTEMA 5ESTRELAS",
    url: SITE,
  },
  twitter: {
    card: "summary_large_image",
  },
  alternates: {
    canonical: SITE,
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
        <Analytics />
      </body>
    </html>
  )
}
