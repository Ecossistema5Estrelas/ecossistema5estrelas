import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { Q } from "@/src/lib/sanity/queries";
import { sanityFetch } from "@/src/lib/sanity/fetch";
import type { PostCard } from "@/src/lib/sanity/types";

type PageProps = { params: { slug: string } };

export const revalidate = 60;

// ---- Validações contratuais ----
function isValidSlug(input: string) {
  // slug.current: lowercase + hífen
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input);
}

// ---- Metadata canônica ----
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params?.slug || "";
  if (!isValidSlug(slug)) return { title: "POST INVÁLIDO" };

  const data = await sanityFetch<any | null>(Q.postBySlug, { slug }, 60);
  if (!data?._id) return { title: "POST NÃO ENCONTRADO" };

  return {
    title: (data.title || "POST").toUpperCase(),
    description:
      typeof data?.body === "string"
        ? data.body.slice(0, 160)
        : "Publicação oficial do ECOSSISTEMA 5⭐.",
  };
}

// ---- Página ----
export default async function Page({ params }: PageProps) {
  const slug = params?.slug || "";

  // Slug inválido → fallback institucional
  if (!isValidSlug(slug)) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">POST INVÁLIDO</h1>
        <p className="mt-3 opacity-80">
          O identificador não atende ao contrato de slug.
        </p>
        <div className="mt-6">
          <Link
            href="/blog"
            className="rounded-xl border border-white/10 px-4 py-2"
          >
            Voltar ao blog
          </Link>
        </div>
      </main>
    );
  }

  const data = await sanityFetch<any | null>(Q.postBySlug, { slug }, 60);

  // 404 legítimo (institucional)
  if (!data?._id) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <article className="prose prose-invert max-w-none">
        <header className="mb-8">
          <h1 className="text-3xl font-semibold tracking-tight">
            {data.title}
          </h1>

          {data.publishedAt ? (
            <p className="mt-2 text-sm opacity-70">
              {new Date(data.publishedAt).toLocaleDateString("pt-BR")}
            </p>
          ) : null}

          {Array.isArray(data.categories) && data.categories.length > 0 ? (
            <ul className="mt-4 flex flex-wrap gap-2">
              {data.categories.map((c: any) => (
                <li
                  key={c._id}
                  className="rounded-full border border-white/10 px-3 py-1 text-xs opacity-80"
                >
                  <Link href={`/blog/temas/${c.slug?.current || ""}`}>
                    {c.title}
                  </Link>
                </li>
              ))}
            </ul>
          ) : null}
        </header>

        {/* Corpo */}
        <section className="mt-8">
          {Array.isArray(data.body) ? (
            // Caso Portable Text esteja configurado no frontend, renderize aqui
            <pre className="opacity-80">
              Renderização PortableText não configurada neste contrato.
            </pre>
          ) : typeof data.body === "string" ? (
            <p className="leading-relaxed opacity-90">{data.body}</p>
          ) : (
            <p className="opacity-80">
              Conteúdo indisponível no formato atual.
            </p>
          )}
        </section>
      </article>

      <nav className="mt-12 flex justify-between">
        <Link
          href="/blog"
          className="rounded-xl border border-white/10 px-4 py-2"
        >
          ← Voltar ao blog
        </Link>
      </nav>
    </main>
  );
}