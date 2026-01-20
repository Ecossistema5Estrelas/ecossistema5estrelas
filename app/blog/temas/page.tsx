import { Q } from "@/src/lib/sanity/queries";
import { sanityFetch } from "@/src/lib/sanity/fetch";
import type { CategoryProjected } from "@/src/lib/sanity/types";

import Link from "next/link";
export const revalidate = 300;

export default async function Page() {
  const items = await sanityFetch<CategoryProjected[]>(Q.categoriesAll, {}, 300);

  return (
    <main className="mx-auto w-full max-w-4xl px-4 py-10">
      <header className="mb-8">
        <h1 className="text-3xl font-semibold tracking-tight">TEMAS</h1>
        <p className="mt-3 opacity-80">Lista de categorias (fonte da verdade: Sanity).</p>
      </header>

      {items?.length ? (
        <section className="grid gap-3">
          {items.map((c) => (
            <a
              key={c._id}
              href={`/blog/temas/${c.slug?.current || ""}`}
              className="rounded-2xl border border-white/10 p-4 hover:border-white/20"
            >
              <div className="text-lg font-semibold">{(c.title || "TEMA").toUpperCase()}</div>
              {c.description ? <div className="mt-1 text-sm opacity-75">{c.description}</div> : null}
            </a>
          ))}
        </section>
      ) : (
        <section className="rounded-2xl border border-white/10 p-6">
          <h2 className="text-lg font-semibold">NENHUM TEMA CADASTRADO</h2>
          <p className="mt-2 opacity-80">Crie categorias no Sanity Studio para aparecer aqui.</p>
        </section>
      )}
    </main>
  );
}




