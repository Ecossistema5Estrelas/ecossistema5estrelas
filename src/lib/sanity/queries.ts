export const Q = {
  // categories
  categoriesAll: /* groq */ `
    *[_type=="category"]|order(title asc){
      _id, title, slug, description
    }
  `,

  categoryBySlugWithPosts: /* groq */ `
    *[_type=="category" && slug.current==$slug][0]{
      _id, title, slug, description,
      "posts": *[_type=="post" && references(^._id)]|order(publishedAt desc){
        _id,
        title,
        slug,
        publishedAt,
        mainImage,
        "categories": categories[]->{
          _id, title, slug
        }
      }
    }
  `,

  // posts
  postsLatest: /* groq */ `
    *[_type=="post"]|order(publishedAt desc)[0...$limit]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      "categories": categories[]->{
        _id, title, slug
      }
    }
  `,

  postBySlug: /* groq */ `
    *[_type=="post" && slug.current==$slug][0]{
      _id,
      title,
      slug,
      publishedAt,
      mainImage,
      body,
      "categories": categories[]->{
        _id, title, slug
      }
    }
  `,
} as const;
