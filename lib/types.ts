export type Slug = { current?: string | null } | null;

export type Author = {
  _id?: string;
  name?: string;
  slug?: Slug;
  image?: unknown;
};

export type Category = {
  _id?: string;
  title?: string;
  slug?: Slug;
};

export type Post = {
  _id?: string;
  title?: string;
  slug?: Slug;
  publishedAt?: string;
  _updatedAt?: string;
  _createdAt?: string;
  excerpt?: string;
  body?: unknown;
  mainImage?: string | { asset?: { _ref?: string; _type?: string } };
  author?: Author;
  categories?: Category[];
};