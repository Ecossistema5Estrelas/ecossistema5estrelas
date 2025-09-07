export const postsQuery = `*[_type=="post"]|order(publishedAt desc){
  _id, title, "slug": slug.current, excerpt, publishedAt,
  "cover": coalesce(coverImage.asset->url, ""),
  "author": author->name,
  categories[]->{"title": title, "slug": slug.current},
  tags
}[0...20]`;

export const postBySlugQuery = `*[_type=="post" && slug.current==$slug][0]{
  _id, title, "slug": slug.current, excerpt, publishedAt,
  body, audioUrl, videoUrl,
  gallery[]{asset->{"url": url}},
  "cover": coalesce(coverImage.asset->url, ""),
  "author": author->name,
  categories[]->{"title": title, "slug": slug.current}, tags
}`;
