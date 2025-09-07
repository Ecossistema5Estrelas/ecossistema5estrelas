export default function Page() {
  const btn = "flex flex-col items-center justify-center p-6 rounded-2xl shadow-lg text-xl font-semibold transition transform hover:scale-105";
  return (
    <div className="grid gap-6 sm:grid-cols-3 text-center">
      <a href="/blog" className={btn + " bg-yellow-400 text-black"}>📚 Blog</a>
      <a href="/loja" className={btn + " bg-green-400 text-black"}>🛍 Loja</a>
      <a href="/sobre" className={btn + " bg-blue-400 text-white"}>🏛 Sobre</a>
    </div>
  );
}
