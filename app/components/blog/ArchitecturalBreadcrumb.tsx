import Link from "next/link";

export type BreadcrumbItem = {
  label: string;
  href?: string;
};

export default function ArchitecturalBreadcrumb({
  items,
}: {
  items: BreadcrumbItem[];
}) {
  return (
    <nav
      aria-label="Breadcrumb"
      className="mb-6 flex flex-wrap items-center gap-2 text-xs tracking-[0.2em] text-white/60"
    >
      {items.map((it, idx) => {
        const isLast = idx === items.length - 1;
        const label = (it.label || "").toUpperCase();

        const node =
          it.href && !isLast ? (
            <Link
              href={it.href}
              className="rounded-full border border-white/10 px-3 py-1 hover:border-white/20"
            >
              {label}
            </Link>
          ) : (
            <span className="rounded-full border border-white/10 px-3 py-1 text-white/80">
              {label}
            </span>
          );

        return (
          <span key={`${it.label}-${idx}`} className="flex items-center gap-2">
            {node}
            {!isLast ? <span className="opacity-60">›</span> : null}
          </span>
        );
      })}
    </nav>
  );
}
