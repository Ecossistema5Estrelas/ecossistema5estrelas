import { groq } from 'next-sanity';
import { client } from './clients';

// Consulta para um post específico
export async function getPost(slug: string) {
  return await client.fetch(
    groq`*[_type == "post" && slug.current == $slug][0]{
      _id,
      title,
      description,
      body
    }`,
    { slug }
  );
}

// Consulta para todos os posts (usado para gerar estático)
export async function getPosts() {
  return await client.fetch(
    groq`*[_type == "post"] | order(_createdAt desc){
      _id,
      title,
      description,
      slug
    }`
  );
}
