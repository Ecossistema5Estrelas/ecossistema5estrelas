import Link from "next/link";

type Variant = "no-posts" | "no-categories" | "not-found" | "error";

type Props = {
  variant: Variant;
  title?: string;
  description?: string;
  showBackToBlog?: boolean;
};

const COPY: Record<Variant, { title: string; description: string }> = {
  "no-posts": {
    title: "SEM POSTS AINDA",
    description: "Ainda não há publicações disponíveis neste recorte.",
  },
  "no-categories": {
    title: "SEM CATEGORIAS DISPONÍVEIS",
    description: "O CMS não retornou categorias válidas no momento.",
  },
  "not-found": {
    title: "NÃO ENCONTRADO",
    description: "O recurso solicitado não existe ou não está publicado.",
  },
  "error": {
    title: "FALHA CONTROLADA",
    description: "Ocorreu um erro. O sistema permaneceu íntegro.",
  },
};

export default function BlogEmptyState({
  variant,
  title,
  description,
  showBackToBlog = true,
}: Props) {
  const base = COPY[variant];

  return (
    <section className="rounded-2xl border border-white/10 p-6">
      <h2 className="text-lg font-semibold">{(title || base.title).toUpperCase()}</h2>
      <p className="mt-2 opacity-80">{description || base.description}</p>

      {showBackToBlog ? (
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href="/blog"
            className="rounded-xl border border-white/10 px-4 py-2"
          >
            Voltar ao blog
          </Link>

          <Link
            href="/blog/temas"
            className="rounded-xl border border-white/10 px-4 py-2 opacity-80 hover:opacity-100"
          >
            Ver temas
          </Link>
        </div>
      ) : null}
    </section>
  );
}