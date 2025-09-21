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
        <div
          className="relative min-h-screen text-white"
          style={{
            backgroundImage: "url('/brain-fractal.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
            backgroundRepeat: "no-repeat",
            backgroundAttachment: "fixed",
          }}
        >
          {/* Logomarca fixa e translúcida no fundo */}
          <div
            className="absolute inset-0 flex items-center justify-center"
            style={{ zIndex: 0, pointerEvents: "none" }}
          >
            <img
              src="/logo-5estrelas.png"
              alt="Logo 5 Estrelas"
              className="w-[360px] md:w-[500px] opacity-15"
            />
          </div>

          {/* Painel translúcido abre-alas */}
          <div className="relative z-10 min-h-screen flex flex-col bg-black/50 backdrop-blur-sm">
            <header className="sticky top-0 z-20 bg-black/30 backdrop-blur border-b border-white/10">
              <Header />
            </header>

            <main className="container-estrela flex-1 py-10">
              {children}
            </main>

            <Footer />
          </div>
        </div>
      </body>
    </html>
  );
}
