import { createClient } from "@sanity/client";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || "2024-01-01";

if (!projectId) {
  throw new Error("Missing env: NEXT_PUBLIC_SANITY_PROJECT_ID");
}

export const sanity = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
  perspective: "published",
});

export type SanityImageRef = {
  _type: "image";
  asset: { _ref: string };
};

export type SanitySlug = {
  _type: "slug";
  current: string;
};
