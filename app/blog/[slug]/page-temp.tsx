import { getPost } from '@/sanity/lib/queries';
import { PortableText } from '@portabletext/react';
import { notFound } from 'next/navigation';

type Props = {
  params: {
    slug: string;
  };
};

export async function generateMetadata({ params }: Props) {
  const post = await getPost(params.slug);
  return {
    title: post?.title || 'Post não encontrado',
    description: post?.description || 'Sem descrição disponível.',
  };
}

export default async function BlogPostPage({ params }: Props) {
  const post = await getPost(params.slug);

  if (!post) return notFound();

  return (
    <main className="max-w-3xl mx-auto px-4 py-10">
      <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
      <p className="text-gray-600 mb-6">{post.description}</p>
      <article className="prose prose-invert">
        <PortableText value={post.body} />
      </article>
    </main>
  );
}
