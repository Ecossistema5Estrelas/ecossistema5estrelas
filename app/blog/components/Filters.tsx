"use client";
import { useEffect } from "react";

type FiltersProps<T = any> = {
  original: T[];                         // lista completa
  onFiltered?: (items: T[]) => void;     // callback com a lista filtrada
};

export default function Filters<T = any>({ original, onFiltered }: FiltersProps<T>) {
  // Inicialmente, envia a lista completa
  useEffect(() => { onFiltered?.(original); }, [original, onFiltered]);

  // UI mínima só pra não quebrar — botão "Limpar" devolve a lista original
  return (
    <div className="mb-4 flex gap-2">
      <button
        type="button"
        className="rounded-lg border px-3 py-1"
        onClick={() => onFiltered?.(original)}
        aria-label="Limpar filtros"
      >
        Limpar filtros
      </button>
    </div>
  );
}



