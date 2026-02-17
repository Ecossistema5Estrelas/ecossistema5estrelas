export type ReadingMode = "focus" | "study" | "scan" | "ref";

export const VALID_READING_MODES: ReadingMode[] = ["focus", "study", "scan", "ref"];

export function isValidReadingMode(value: unknown): value is ReadingMode {
  return typeof value === "string" && (VALID_READING_MODES as string[]).includes(value);
}

/**
 * Parser de modo de leitura
 * Compatível com Next App Router:
 * searchParams é sempre objeto síncrono (nunca Promise)
 */
export function parseReadingMode(
  searchParams: Record<string, string | string[] | undefined>,
  fallback: ReadingMode = "focus"
): ReadingMode {
  const raw = searchParams?.["mode"];
  const value = Array.isArray(raw) ? raw[0] : raw;

  if (isValidReadingMode(value)) return value;

  return fallback;
}

export function canonicalReadingHref(slug: string, mode: ReadingMode): string {
  return `/blog/${encodeURIComponent(slug)}?mode=${mode}`;
}

export const READING_MODE_CONFIG: Record<ReadingMode, { goal: string }> = {
  focus: { goal: "Leitura pura, zero distração" },
  study: { goal: "Aprendizado ativo" },
  scan: { goal: "Skimming e orientação rápida" },
  ref: { goal: "Uso como referência técnica" }
};

export function getReadingModeConfig(mode: ReadingMode) {
  return READING_MODE_CONFIG[mode];
}

