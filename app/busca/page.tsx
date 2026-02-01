export default function BuscaPage() {
  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="text-2xl font-semibold">Busca</h1>

      <p className="mt-2 text-sm text-neutral-600">
        Busque conteúdos internos do <strong>Blog ArqFuturum</strong>.
        Esta busca não acessa a internet e não utiliza IA.
      </p>

      <div className="mt-6">
        <label htmlFor="q" className="block text-sm font-medium">
          Procurar no blog
        </label>

        <input
          id="q"
          name="q"
          type="text"
          placeholder="Digite um termo (ex: governança, arquitetura, timeline)"
          className="mt-2 w-full rounded-md border px-3 py-2 text-sm"
        />
      </div>

      <div className="mt-6 rounded-md border bg-neutral-50 p-4 text-sm text-neutral-700">
        Nenhum resultado ainda. Esta é a superfície inicial da busca interna.
      </div>
    </main>
  );
}