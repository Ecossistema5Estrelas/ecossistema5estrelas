import "./globals.css";
import type { Metadata } from "next";



export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-600 text-white">
        <header className="p-6 text-center text-3xl font-bold tracking-wide drop-shadow-lg">
          ✨ ECOSSISTEMA5ESTRELAS
        </header>
        <main className="max-w-4xl mx-auto p-6">{children}</main>
        <footer className="mt-10 text-center text-sm opacity-80">
          © 2025 ECOSSISTEMA 5ESTRELAS — Todos os direitos reservados. • Privacidade • Termos
        </footer>
      </body>
    </html>
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'https://ecossistema5estrelas.org'),
  title: "ECOSSISTEMA 5ESTRELAS",
  icons: {
    icon: "/favicon.svg",
  },
};

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "https://ecossistema5estrelas.org"),
  alternates: { canonical: "/" }
};
