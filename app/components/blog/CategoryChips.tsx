import Link from "next/link";
import type { CategoryProjected } from "@/src/lib/sanity/types";

type Props = {
  categories?: CategoryProjected[] | null;
  basePath?: string; // default: /blog/temas
  className?: string;
  ariaLabel?: string;
};

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

export default function CategoryChips({
  categories,
  basePath = "/blog/temas",
  className = "",
  ariaLabel = "Categorias",
}: Props) {
  const normalized = normalizeCategories(categories);

  // Estado canônico: sem categorias => não renderiza nada (não inventa)
  if (normalized.length === 0) return null;

  return (
    <ul aria-label={ariaLabel} className={`flex flex-wrap gap-2 ${className}`}>
      {normalized.map((c) => (
        <li
          key={c._id}
          className="rounded-full border border-white/10 px-3 py-1 text-xs opacity-80 hover:opacity-100"
        >
          <Link href={`${basePath}/${c.slug.current}`}>{c.title}</Link>
        </li>
      ))}
    </ul>
  );
}