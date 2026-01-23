import Link from "next/link";
import { getPostsCount } from "@/lib/queries";

export const metadata = {
  title: "Blog ArqFuturum — Hub Semântico",
  description:
    "Portal conceitual do Blog ArqFuturum. Explore ideias, estude temas, aprofunde conceitos e navegue pela linha do tempo do ECOSSISTEMA 5ESTRELAS.",
};

export default async function BlogHubPage() {
  const totalPosts = await getPostsCount();

  return (
    <main className="mx-auto max-w-6xl px-6 py-16">
      <header className="mb-16">
        <h1 className="text-4xl font-semibold tracking-tight">
          Blog ArqFuturum
        </h1>

        <p className="mt-4 max-w-3xl text-lg text-muted-foreground">
          Este não é um feed. É um portal de ideias.
          <br />
          O Blog ArqFuturum organiza pensamento, arquitetura e governança
          para sistemas digitais de longo prazo.
        </p>

        <div className="mt-6 text-sm text-muted-foreground">
          Total de posts publicados: <strong>{totalPosts}</strong>
        </div>
      </header>

      <section className="grid grid-cols-1 gap-6 md:grid-cols-2">
        <HubCard
          title="Explorar"
          description="Descoberta livre e navegação cronológica."
          href="/blog/page/1"
        />

        <HubCard
          title="Estudar"
          description="Temas, séries e trilhas estruturadas."
          href="/blog/temas"
        />

        <HubCard
          title="Aprofundar"
          description="Leitura contínua e densidade conceitual."
          href="/blog/series"
        />

        <HubCard
          title="Linha do Tempo"
          description="A memória cronológica do blog."
          href="/blog/timeline"
        />
      </section>
    </main>
  );
}

function HubCard({
  title,
  description,
  href,
}: {
  title: string;
  description: string;
  href: string;
}) {
  return (
    <Link
      href={href}
      className="group block rounded-xl border border-border p-6 transition hover:border-foreground"
    >
      <h2 className="text-xl font-medium">{title}</h2>
      <p className="mt-2 text-sm text-muted-foreground">{description}</p>
      <span className="mt-4 inline-block text-sm font-medium underline underline-offset-4">
        Acessar
      </span>
    </Link>
  );
}
