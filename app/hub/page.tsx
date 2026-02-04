// HUB CANÔNICO — FASE 5
// Bloco: S5-I2
// Natureza: Mapa cognitivo (Hub ≠ Blog)
// Renderização: STATIC (SSG)
// Regra: Hub aponta → Blog (somente leitura)

import Link from "next/link";

export const metadata = {
  title: "HUB · Ecossistema 5⭐",
  description: "Mapa de orientação do conhecimento do Ecossistema 5 Estrelas.",
};

export default function HubPage() {
  return (
    <main className="mx-auto max-w-4xl px-6 py-12 space-y-10">
      <header className="space-y-4">
        <h1 className="text-3xl font-bold tracking-tight">
          HUB · Orientação
        </h1>
        <p className="text-neutral-400">
          Aqui você se orienta · Lá você lê.
        </p>
      </header>

      <section className="space-y-3">
        <h2 className="text-xl font-semibold">MAPAS</h2>
        <ul className="list-disc pl-6 space-y-2">
          <li>
            <Link href="/blog/temas" className="hover:underline">
              TEMAS
            </Link>
          </li>
          <li>
            <Link href="/blog/series" className="hover:underline">
              SÉRIES
            </Link>
          </li>
          <li>
            <Link href="/blog/trilhas" className="hover:underline">
              TRILHAS
            </Link>
          </li>
          <li>
            <Link href="/blog/timeline" className="hover:underline">
              LINHA DO TEMPO
            </Link>
          </li>
        </ul>
      </section>

      <footer className="pt-8 border-t border-neutral-800 text-sm text-neutral-500">
        <p>
          O HUB não hospeda conteúdo editorial.
          <br />
          Todo o conhecimento vive no{" "}
          <Link href="/blog" className="underline">
            Blog ArqFuturum
          </Link>.
        </p>
      </footer>
    </main>
  );
}
