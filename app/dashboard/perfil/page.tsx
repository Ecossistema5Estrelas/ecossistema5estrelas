"use client";

import { toast } from "sonner";
import { useEffect } from "react";

export default function PerfilPage() {
  useEffect(() => {
    toast("🔔 Bem-vindo ao painel de perfil!");
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Página de Perfil</h1>

      <button
        onClick={() => toast.success("✅ Perfil salvo com sucesso!")}
        className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
      >
        Testar Toast
      </button>
    </div>
  );
}
