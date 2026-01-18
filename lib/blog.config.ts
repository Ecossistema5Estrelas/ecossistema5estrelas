/**
 * BLOG CONFIG (canônico)
 * - Paginação real
 * - Valores estáveis e auditáveis
 */

export const BLOG_PAGE_SIZE = 20

export function clampPage(n: number) {
  if (!Number.isFinite(n)) return 1
  const i = Math.floor(n)
  return i < 1 ? 1 : i
}

export function pageToRange(page: number, pageSize = BLOG_PAGE_SIZE) {
  const p = clampPage(page)
  const start = (p - 1) * pageSize
  const end = start + pageSize
  return { page: p, start, end, pageSize }
}