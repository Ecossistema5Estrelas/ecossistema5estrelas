import Link from "next/link";

import type { CategoryProjected } from "../../../src/lib/sanity/types";

// -------------------------
// Contrato de entrada
// -------------------------
type Props = {
  categories?: CategoryProjected[] | null;
  selectedSlugs?: string[] | string | null; // aceita string ou array (normaliza)
  basePath?: string; // default: /blog/temas
};

// -------------------------
// Utilidades contratuais
// -------------------------
function isValidSlug(input: unknown): input is string {
  if (typeof input !== "string") return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input);
}

function normalizeSelected(input?: string[] | string | null): string[] {
  if (!input) return [];
  if (Array.isArray(input)) {
    return Array.from(
      new Set(input.filter((s) => isValidSlug(s)))
    );
  }
  if (typeof input === "string") {
    return isValidSlug(input) ? [input] : [];
  }
  return [];
}

function normalizeCategories(input?: CategoryProjected[] | null) {
  if (!Array.isArray(input)) return [];

  return input.filter((c) => {
    if (!c) return false;
    if (!c._id) return false;
    if (!c.title) return false;
    if (!c.slug?.current) return false;
    if (!isValidSlug(c.slug.current)) return false;
    return true;
  });
}

function toggleSlug(slugs: string[], slug: string) {
  const set = new Set(slugs);
  if (set.has(slug)) set.delete(slug);
  else set.add(slug);
  return Array.from(set);
}

function buildHref(basePath: string, slugs: string[]) {
  // Regra institucional: quando múltiplos, usar querystring
  // Ex: /blog?cats=a,b,c
  if (slugs.length === 0) return "/blog";
  const qs = encodeURIComponent(slugs.join(","));
  return `/blog?cats=${qs}`;
}

// -------------------------
// Componente
// -------------------------
export default function FiltroCategoriaMultiplo({
  categories,
  selectedSlugs,
  basePath = "/blog/temas",
}: Props) {
  const normalizedCats = normalizeCategories(categories);
  const selected = normalizeSelected(selectedSlugs);

  // -------------------------
  // Estado canônico: sem categorias
  // -------------------------
  if (normalizedCats.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 p-4">
        <p className="text-sm opacity-70">
          Nenhuma categoria disponível no momento.
        </p>
      </section>
    );
  }

  return (
    <nav
      aria-label="Filtro por múltiplas categorias"
      className="flex flex-wrap gap-2"
    >
      {normalizedCats.map((cat) => {
        const slug = cat.slug.current;
        const isActive = selected.includes(slug);

        const next = toggleSlug(selected, slug);
        const href =
          next.length === 1
            ? `${basePath}/${next[0]}`
            : buildHref(basePath, next);

        return (
          <Link
            key={cat._id}
            href={href}
            aria-pressed={isActive ? "true" : "false"}
            className={[
              "rounded-full border px-3 py-1 text-xs transition",
              "border-white/10",
              isActive
                ? "bg-white/10 opacity-100"
                : "opacity-70 hover:opacity-100",
            ].join(" ")}
          >
            {cat.title}
          </Link>
        );
      })}
    </nav>
  );
}
