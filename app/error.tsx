"use client";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-neutral-900 text-white">
      <h1 className="text-3xl font-bold mb-4">Algo deu errado</h1>
      <p className="mb-6">{error.message}</p>
      <button
        onClick={() => reset()}
        className="px-4 py-2 rounded bg-emerald-600 hover:bg-emerald-700"
      >
        Tentar novamente
      </button>
    </div>
  );
}
