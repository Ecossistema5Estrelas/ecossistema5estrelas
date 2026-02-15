import Link from "next/link";

import type { CategoryProjected } from "../../../src/lib/sanity/types";

// -------------------------
// Contrato de entrada
// -------------------------
type Props = {
  categories?: CategoryProjected[] | null;
  selectedSlug?: string | null;
  basePath?: string; // default: /blog/temas
};

// -------------------------
// Utilidades contratuais
// -------------------------
function isValidSlug(input: unknown): input is string {
  if (typeof input !== "string") return false;
  return /^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(input);
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

// -------------------------
// Componente
// -------------------------
export default function FiltroCategoria({
  categories,
  selectedSlug,
  basePath = "/blog/temas",
}: Props) {
  const normalized = normalizeCategories(categories);

  // -------------------------
  // Estado canônico: sem categorias
  // -------------------------
  if (normalized.length === 0) {
    return (
      <section className="rounded-2xl border border-white/10 p-4">
        <p className="text-sm opacity-70">
          Nenhuma categoria disponível no momento.
        </p>
      </section>
    );
  }

  return (
    <nav aria-label="Filtro por categorias" className="flex flex-wrap gap-2">
      {normalized.map((cat) => {
        const slug = cat.slug.current;
        const isActive = slug === selectedSlug;

        const href = `${basePath}/${slug}`;

        return (
          <Link
            key={cat._id}
            href={href}
            aria-current={isActive ? "true" : undefined}
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
