import Hero from "@/components/hero";
type Params = { params: { slug: string } };
export async function generateMetadata({ params }: Params){ return { title: `App — ${params.slug}` } }
export default async function AppPage({ params }: Params){
  const app = await fetch(`/api/apps?slug=${params.slug}`, { cache: "no-store" }).then(r=>r.json()).catch(()=>null);
  if(!app){ return (<div><Hero title="App não encontrado" subtitle="Volte para /apps" /></div>); }
  return (
    <div>
      <Hero title={app.name} subtitle={app.description} />
      <section className="py-6">
        <p className="opacity-80">Categoria: <strong>{app.category}</strong></p>
        {app.url ? <p className="mt-2"><a className="underline text-blue-600" href={app.url} target="_blank">Abrir aplicativo</a></p> : null}
      </section>
    </div>
  );
}
