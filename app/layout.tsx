import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "ECOSSISTEMA 5ESTRELAS",
  description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
  openGraph: {
    title: "ECOSSISTEMA 5ESTRELAS",
    description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
    images: ["/logo-5estrelas.png", "/brain-fractal.png"],
  },
  twitter: {
    card: "summary_large_image",
    title: "ECOSSISTEMA 5ESTRELAS",
    description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
    images: ["/logo-5estrelas.png"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <div className="bg-page min-h-screen flex flex-col">
          {/* Banner com as imagens */}
          <header className="flex items-center justify-between px-6 py-4 bg-black">
            <img src="/logo-5estrelas.png" alt="Logo 5 Estrelas" className="h-10" />
            <img src="/brain-fractal.png" alt="Brain Fractal" className="h-10" />
          </header>

          {/* Header do site */}
          <Header />

          {/* Conteúdo principal */}
          <main className="container-estrela flex-1 py-10">
            {children}
          </main>

          {/* Rodapé */}
          <Footer />
        </div>
      </body>
    </html>
  );
}