import 'dotenv/config';
import { createClient } from '@sanity/client';

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: false
});

const q = '*[_type == "post"][0..2]';

const data = await client.fetch(q);
console.log(JSON.stringify(data, null, 2));