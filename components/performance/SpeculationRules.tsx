'use client';

import Script from "next/script";

const LEVEL = process.env.NEXT_PUBLIC_SPECULATION_LEVEL ?? "off";

export default function SpeculationRules() {
  // trava absoluta: nunca executa fora do browser
  if (typeof window === "undefined") return null;

  if (LEVEL === "off") return null;

  const src =
    LEVEL === "expanded"
      ? "/speculation-rules.expanded.json"
      : "/speculation-rules.json";

  return (
    <Script
      id="speculation-rules"
      type="speculationrules"
      src={src}
      strategy="afterInteractive"
    />
  );
}