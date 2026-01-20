export type BlogNavState = {
  q?: string;
  tag?: string;
  serie?: string;
  page?: number;
};

const clampInt = (n: number, min: number, max: number) =>
  Math.max(min, Math.min(max, n));

export function parseBlogNav(searchParams: Record<string, string | string[] | undefined>): BlogNavState {
  const pick = (k: string) => {
    const v = searchParams[k];
    if (Array.isArray(v)) return v[0];
    return v;
  };

  const q = pick("q")?.trim() || undefined;
  const tag = pick("tag")?.trim() || undefined;
  const serie = pick("serie")?.trim() || undefined;

  const pageRaw = pick("page");
  const pageNum = pageRaw ? Number(pageRaw) : 1;
  const page = Number.isFinite(pageNum) ? clampInt(Math.floor(pageNum), 1, 9999) : 1;

  return { q, tag, serie, page };
}

export function buildBlogQuery(state: BlogNavState): string {
  const params = new URLSearchParams();
  if (state.q) params.set("q", state.q);
  if (state.tag) params.set("tag", state.tag);
  if (state.serie) params.set("serie", state.serie);
  if (state.page && state.page > 1) params.set("page", String(state.page));
  const qs = params.toString();
  return qs ? `?${qs}` : "";
}

export function canonicalBlogListHref(state: BlogNavState): string {
  return `/blog${buildBlogQuery(state)}`;
}

export function canonicalBlogReaderHref(slug: string): string {
  return `/blog/${encodeURIComponent(slug)}`;
}