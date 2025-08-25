import { NextResponse } from "next/server";
import { groq } from "next-sanity";
import { client } from "@/sanity/lib/client";

const POSTS_QUERY = groq`*[_type == "post"] | order(publishedAt desc)[0..19]{
  _id,
  title,
  "slug": slug.current,
  publishedAt,
  "coverImage": coalesce(coverImage.asset->url, ""),
  "readingTime": coalesce(readingTime, "4 min"),
  "bodyPortableText": coalesce(bodyPortableText, [])
}`;

export async function GET() {
  const posts = await client.fetch(POSTS_QUERY);
  return NextResponse.json({ posts });
}
