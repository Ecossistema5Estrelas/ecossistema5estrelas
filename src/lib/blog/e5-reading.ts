export type ReadingMode = "focus" | "study" | "scan" | "ref";

export const VALID_READING_MODES: ReadingMode[] = ["focus", "study", "scan", "ref"];

export function isValidReadingMode(value: unknown): value is ReadingMode {
  return typeof value === "string" && (VALID_READING_MODES as string[]).includes(value);
}

export async function parseReadingMode(
  searchParams: Promise<Record<string, string | string[] | undefined>>,
  fallback: ReadingMode = "focus"
): Promise<ReadingMode> {
  const resolved = await searchParams;
  const raw = resolved?.["mode"];
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

