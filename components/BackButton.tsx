"use client";
import { useRouter } from "next/navigation";

export default function BackButton({ className }: { className?: string }) {
  const router = useRouter();
  return (
    <button
      type="button"
      onClick={() => router.back()}
      className={`inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 ${className ?? ""}`}
      aria-label="Voltar"
    >
      <span aria-hidden="true">←</span>
      <span>Voltar</span>
    </button>
  );
}
