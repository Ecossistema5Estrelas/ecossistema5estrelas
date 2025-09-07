"use client";

export default function GlobalError({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <html>
      <body className="min-h-dvh bg-black text-white">
        <main className="mx-auto max-w-2xl p-6 text-center">
          <h1 className="text-3xl font-bold">Algo deu errado</h1>
          <p className="mt-2 opacity-80">{error?.message ?? "Erro inesperado."}</p>
          <button
            onClick={() => reset()}
            className="mt-6 px-4 py-2 rounded-xl bg-white/10 hover:bg-white/20 transition"
          >
            Tentar novamente
          </button>
        </main>
      </body>
    </html>
  );
}
