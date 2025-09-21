import "./globals.css";
import type { Metadata } from "next";
import Header from "@/components/site/Header";
import Footer from "@/components/site/Footer";

export const metadata: Metadata = {
  title: "ECOSSISTEMA 5ESTRELAS",
  description: "Micélio tecnológico de apps, conteúdo e experiências 5⭐",
  icons: [{ rel: "icon", url: "/favicon.ico" }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com"/>
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous"/>
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;800&display=swap" rel="stylesheet"/>
        {/* SEM Noto Color Emoji / material icons */}
      </head>
      <body>
        <div className="bg-page">
          <Header />
          <main className="container-estrela py-10">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  );
}
