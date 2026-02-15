import { portableTextComponents } from "@/lib/portableText";
import { PortableText } from "@portabletext/react";
import { notFound } from "next/navigation";
import Link from "next/link";

import { parseReadingMode } from "../../../src/lib/blog/e5-reading";
import ArchitecturalBreadcrumb from "../../components/blog/ArchitecturalBreadcrumb";
import { Q } from "../../../src/lib/sanity/queries";
import { sanityFetch } from "../../../src/lib/sanity/fetch";

import type { Metadata } from "next";

type PageProps = { params: { slug: string } };

export const revalidate = 60;

// ---- ValidaÃ§Ãµes contratuais ----
function isValidSlug(input: string) {
  // slug.current: lowercase + hÃ­fen
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input);
}

// ---- Metadata canÃ´nica ----
export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const slug = params?.slug || "";
  if (!isValidSlug(slug)) return { title: "POST INVÃLIDO" };

  const data = await sanityFetch<any | null>(Q.postBySlug, { slug }, 60);
  if (!data?._id) return { title: "POST NÃƒO ENCONTRADO" };

  return {
    title: (data.title || "POST").toUpperCase(),
    description:
      typeof data?.body === "string"
        ? data.body.slice(0, 160)
        : "PublicaÃ§Ã£o oficial do ECOSSISTEMA 5â­.",
  };
}

// ---- PÃ¡gina ----
export default async function Page({
  params,
  searchParams,
}: PageProps & { searchParams: Record<string, string | string[] | undefined> }) {
  const slug = params?.slug || "";
  parseReadingMode(searchParams); // mantido por efeito semÃ¢ntico

  // Slug invÃ¡lido â†’ fallback institucional
  if (!isValidSlug(slug)) {
    return (
      <main className="mx-auto w-full max-w-4xl px-4 py-10">
        <h1 className="text-2xl font-semibold tracking-tight">POST INVÃLIDO</h1>
        <p className="mt-3 opacity-80">
          O identificador nÃ£o atende ao contrato de slug.
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

  // 404 legÃ­timo (institucional)
  if (!data?._id) notFound();

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      {/* E3:BREADCRUMB */}
      <ArchitecturalBreadcrumb
        items={[
          { label: "Blog ArqFuturum", href: "/blog" },
          ...(Array.isArray(data.categories) && data.categories.length > 0
            ? [
                { label: "Temas", href: "/blog/temas" },
                {
                  label: data.categories[0]?.title || "Tema",
                  href: `/blog/temas/${data.categories[0]?.slug?.current || ""}`,
                },
              ]
            : []),
          { label: data.title || "Post" },
        ]}
      />

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
    <PortableText
      value={data.body}
      components={portableTextComponents}
    />
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
          â† Voltar ao blog
        </Link>
      </nav>
    </main>
  );
}



