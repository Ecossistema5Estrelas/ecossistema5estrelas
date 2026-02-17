import 'dotenv/config';
import { createClient } from '@sanity/client';

function getLocalISOWithOffset(date = new Date()) {
  const tz = -date.getTimezoneOffset();
  const sign = tz >= 0 ? "+" : "-";
  const hh = String(Math.floor(Math.abs(tz) / 60)).padStart(2,"0");
  const mm = String(Math.abs(tz) % 60).padStart(2,"0");
  const yyyy = date.getFullYear();
  const mo = String(date.getMonth()+1).padStart(2,"0");
  const dd = String(date.getDate()).padStart(2,"0");
  const h = String(date.getHours()).padStart(2,"0");
  const m = String(date.getMinutes()).padStart(2,"0");
  const s = String(date.getSeconds()).padStart(2,"0");
  return `${yyyy}-${mo}-${dd}T${h}:${m}:${s}${sign}${hh}:${mm}`;
}

const client = createClient({
  projectId: process.env.SANITY_PROJECT_ID,
  dataset: process.env.SANITY_DATASET,
  apiVersion: process.env.SANITY_API_VERSION,
  useCdn: false
});

export async function listSanityPosts() {
  const t0 = Date.now();

  const query = `
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      "publishedAt": publishedAt
    }
  `;

  const rows = await client.fetch(query);
  const ms = Date.now() - t0;

  const now = Date.now();
  const DAY = 24 * 60 * 60 * 1000;

  const last24h = rows.filter(r => r.publishedAt && (now - new Date(r.publishedAt).getTime()) <= DAY);
  const last7d  = rows.filter(r => r.publishedAt && (now - new Date(r.publishedAt).getTime()) <= 7 * DAY);
  const last30d = rows.filter(r => r.publishedAt && (now - new Date(r.publishedAt).getTime()) <= 30 * DAY);

  const slugs = rows.map(r => r.slug).sort();

  return {
    timestamp: getLocalISOWithOffset(),
    sanity_fetch_ms: ms,
    sanity_total: slugs.length,
    last_24h: last24h.length,
    last_7d: last7d.length,
    last_30d: last30d.length,
    slugs
  };
}

if (process.argv[1].endsWith("sanity-list-posts.mjs")) {
  const data = await listSanityPosts();
  console.log(JSON.stringify(data, null, 2));
}