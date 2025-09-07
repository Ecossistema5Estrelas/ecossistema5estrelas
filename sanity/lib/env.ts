export const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!;
export const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET!;
export const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2025-08-01';
export const useCdn = process.env.NODE_ENV === 'production';
export const token = process.env.SANITY_API_READ_TOKEN; // opcional (para drafts/privado)
