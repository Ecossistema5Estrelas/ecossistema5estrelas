import { sanity } from "./client";

export async function sanityFetch<T>(
  query: string,
  params: Record<string, any> = {},
  revalidateSeconds = 60
): Promise<T> {
  // Next App Router supports fetch caching via next:{revalidate}
  // @sanity/client uses its own transport, so we standardize by calling fetch with config:
  // Sanity client supports "fetch" options including "next" since it uses global fetch under the hood in Next.
  return sanity.fetch<T>(query, params, {
    next: { revalidate: revalidateSeconds },
  } as any);
}
