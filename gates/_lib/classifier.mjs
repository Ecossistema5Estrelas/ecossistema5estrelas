
export function normalize(p) {
  return p.replaceAll("\\", "/");
}

export function classifyFile(fp) {
  const p = normalize(fp).toLowerCase();

  // ignore archives by default (não é produção)
  if (p.includes("/_archive/")) return { kind: "archive", reason: "_archive" };

  // App Router document files
  if (p.endsWith("/page.tsx") || p.endsWith("/page.jsx")) return { kind: "page", reason: "app-router-page" };
  if (p.endsWith("/layout.tsx") || p.endsWith("/layout.jsx")) return { kind: "layout", reason: "app-router-layout" };
  if (p.endsWith("/not-found.tsx") || p.endsWith("/not-found.jsx")) return { kind: "document", reason: "app-router-not-found" };
  if (p.endsWith("/error.tsx") || p.endsWith("/error.jsx")) return { kind: "document", reason: "app-router-error" };
  if (p.endsWith("/global-error.tsx") || p.endsWith("/global-error.jsx")) return { kind: "document", reason: "app-router-global-error" };

  // Pages Router (se existir)
  if (p.includes("/pages/") && (p.endsWith(".tsx") || p.endsWith(".jsx"))) return { kind: "page", reason: "pages-router" };

  // Components / UI / Lib hints
  if (p.includes("/components/ui/")) return { kind: "ui", reason: "components-ui" };
  if (p.includes("/components/")) return { kind: "component", reason: "components" };
  if (p.includes("/lib/")) return { kind: "lib", reason: "lib" };

  return { kind: "unknown", reason: "default" };
}

export function isDocumentLike(kind) {
  return kind === "page" || kind === "layout" || kind === "document";
}

export function isPageLike(kind) {
  return kind === "page" || kind === "document";
}

export function isLayoutLike(kind) {
  return kind === "layout";
}
