import Hero from "@/components/hero";
import { AppCard } from "@/components/app-card";
export const metadata = { title: "Apps — ecossistema5estrelas" };
export default async function AppsPage(){
  const apps = await fetch("/api/apps", { cache: "no-store" }).then(r => r.json()).catch(()=>[]);
  return (
    <div>
      <Hero title="Apps" subtitle="Catálogo e registro de aplicativos do ecossistema" />
      <div className="grid gap-4 sm:grid-cols-2 mt-4">
        {apps.map((a:any)=>(<AppCard key={a.slug} app={a}/>))}
      </div>
    </div>
  );
}
