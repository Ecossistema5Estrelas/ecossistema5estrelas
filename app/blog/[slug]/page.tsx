import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

export async function generateStaticParams() {
  const slugs: string[] = await client.fetch(
    groq`*[_type=="post" && defined(slug.current)][].slug.current`
  );
  return slugs.map((slug) => ({ slug }));
}

export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const data = await client.fetch(
    groq`*[_type=="post" && slug.current==$slug][0]{
      _id, title, "slug": slug.current, publishedAt,
      "coverImage": coalesce(coverImage.asset->url, ""),
      "readingTime": coalesce(readingTime, "4 min"),
      bodyPortableText
    }`,
    { slug }
  );

  if (!data) return <div>Post não encontrado.</div>;
  return (
    <main className="container mx-auto max-w-2xl p-6">
      <h1 className="text-3xl font-bold mb-4">{data.title}</h1>
      {/* TODO: renderizar PortableText aqui */}
    </main>
  );
}
