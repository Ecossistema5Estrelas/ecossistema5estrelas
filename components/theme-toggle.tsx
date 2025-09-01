"use client";
import { useTheme } from "next-themes";
import { Sun, Moon } from "lucide-react";

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const isDark = theme === "dark";
  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm border border-black/10 dark:border-white/10 bg-white/60 dark:bg-white/10 hover:bg-white/70 dark:hover:bg-white/15 transition"
      aria-label="Alternar tema"
      title="Alternar tema"
      style={{ backdropFilter: "blur(4px)" }}
    >
      {isDark ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
      {isDark ? "Claro" : "Escuro"}
    </button>
  );
}