import Link from "next/link";
export function AppCard({ app }: { app: any }){
  return (
    <Link href={`/apps/${app.slug}`} className="block rounded-2xl border border-black/10 bg-white p-5 hover:bg-violet-50 transition">
      <div className="text-xs opacity-70">{app.category}</div>
      <h3 className="text-lg font-semibold text-slate-900">{app.name}</h3>
      <p className="text-sm text-slate-700 mt-1">{app.description}</p>
    </Link>
  );
}


