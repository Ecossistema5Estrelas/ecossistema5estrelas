import { createClient } from 'next-sanity';
import { dataset, projectId, apiVersion, useCdn, token } from './env';

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn,
  token, // remova se não usar token
  perspective: token ? 'previewDrafts' : 'published',
});
