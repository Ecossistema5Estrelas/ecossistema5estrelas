import Link from "next/link";
export default function NotFound(){
  return (
    <main className="max-w-3xl mx-auto p-8 text-center">
      <h1 className="text-3xl font-bold">Página não encontrada</h1>
      <p className="mt-2 opacity-80">O recurso solicitado não existe.</p>
      <p className="mt-4"><Link href="/" className="underline">Voltar para a Home</Link></p>
    </main>
  );
}
