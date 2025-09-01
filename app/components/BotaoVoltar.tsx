import Link from "next/link";
import type { PropsWithChildren } from "react";

type Props = PropsWithChildren<{
  href: string;
  texto?: string;      // opcional, mas preferimos children
  className?: string;
}>;

export default function BotaoVoltar({ href, texto, className, children }: Props) {
  const label = children ?? texto ?? "Voltar";
  return (
    <Link
      href={href}
      className={["inline-flex items-center gap-2 rounded-xl px-4 py-2 bg-zinc-800 text-white hover:bg-zinc-700 transition", className]
        .filter(Boolean).join(" ")}
    >
      ← {label}
    </Link>
  );
}

