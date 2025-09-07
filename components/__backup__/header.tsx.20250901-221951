"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

type Theme = "light" | "dark";

const links = [
  { href: "/loja", label: "🛍 Loja" },
  { href: "/blog", label: "📚 Blog" },
  { href: "/sobre", label: "🏁 Sobre" },
  { href: "/contato", label: "✉️ Contato" },
];

function apply(theme: Theme) {
  const html = document.documentElement;
  if (theme === "dark") html.classList.add("dark");
  else html.classList.remove("dark");
  localStorage.setItem("theme", theme);
}

function currentTheme(): Theme {
  const saved = localStorage.getItem("theme") as Theme | null;
  if (saved) return saved;
  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

export default function Header() {
  const pathname = usePathname();
  const [theme, setTheme] = useState<Theme>("light");

  useEffect(() => {
    try {
      const initial = currentTheme();
      setTheme(initial);
      apply(initial);
    } catch {
      setTheme("light");
      apply("light");
    }
  }, []);

  const toggle = () => {
    const next: Theme = theme === "dark" ? "light" : "dark";
    setTheme(next);
    apply(next);
  };

  // Ícone mostra a AÇÃO disponível (lua = escurecer, sol = clarear)
  const icon = theme === "dark" ? "🌞" : "🌙";
  const title = theme === "dark" ? "Voltar ao claro" : "Ativar modo escuro";

  return (
    <header className="sticky top-0 z-50 backdrop-blur bg-white/70 dark:bg-gray-900/80 border-b border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="no-underline">
          <div className="leading-tight">
            <div className="text-xs md:text-sm -mb-0.5 text-gray-700 dark:text-gray-300">⭐⭐⭐⭐⭐</div>
            <div className="font-extrabold tracking-tight text-indigo-700 dark:text-indigo-300 whitespace-nowrap">
              ECOSSISTEMA 5ESTRELAS
            </div>
          </div>
        </Link>

        <nav className="flex items-center gap-2 text-sm">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={`px-3 py-1 rounded-full transition no-underline ${
                pathname === l.href
                  ? "bg-indigo-600 text-white"
                  : "text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-gray-800"
              }`}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={toggle}
            title={title}
            aria-label="Alternar tema"
            className="ml-3 px-3 py-1 rounded-full bg-gray-200 dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-700 transition"
          >
            {icon}
          </button>
        </nav>
      </div>
    </header>
  );
}
