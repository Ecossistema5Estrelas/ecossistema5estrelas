import Link from "next/link";

type Props = {
  currentPage: number;
  totalPages: number;
  basePath: string; // ex: "/blog/page" ou "/blog/temas/tecnologia/page"
  className?: string;
};

function clamp(n: number, min: number, max: number) {
  return Math.min(Math.max(n, min), max);
}

function isValidPage(n: unknown): n is number {
  return typeof n === "number" && Number.isInteger(n) && n > 0;
}

export default function Pagination({
  currentPage,
  totalPages,
  basePath,
  className = "",
}: Props) {
  if (!isValidPage(currentPage)) return null;
  if (!isValidPage(totalPages)) return null;
  if (totalPages <= 1) return null;

  const safeCurrent = clamp(currentPage, 1, totalPages);

  const prev = safeCurrent > 1 ? safeCurrent - 1 : null;
  const next = safeCurrent < totalPages ? safeCurrent + 1 : null;

  const mkHref = (p: number) => `${basePath}/${p}`;

  return (
    <nav
      aria-label="Paginação"
      className={`mt-10 flex items-center justify-center gap-4 ${className}`}
    >
      {prev ? (
        <Link
          href={mkHref(prev)}
          className="rounded-xl border border-white/10 px-4 py-2 opacity-80 hover:opacity-100"
        >
          ← Anterior
        </Link>
      ) : (
        <span className="opacity-30">← Anterior</span>
      )}

      <span className="text-sm opacity-70">
        Página {safeCurrent} de {totalPages}
      </span>

      {next ? (
        <Link
          href={mkHref(next)}
          className="rounded-xl border border-white/10 px-4 py-2 opacity-80 hover:opacity-100"
        >
          Próxima →
        </Link>
      ) : (
        <span className="opacity-30">Próxima →</span>
      )}
    </nav>
  );
}
