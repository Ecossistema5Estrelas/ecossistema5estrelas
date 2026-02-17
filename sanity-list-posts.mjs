import dotenv from "dotenv";
dotenv.config({ path: ".env.local" });

import { createClient } from "@sanity/client";

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

function isoMinusDays(days) {
  const d = new Date();
  d.setDate(d.getDate() - days);
  return d.toISOString();
}

export async function listSanityPosts() {
  const projectId = process.env.SANITY_PROJECT_ID;
  const dataset = process.env.SANITY_DATASET;
  const apiVersion = process.env.SANITY_API_VERSION || "2024-01-01";
  const useCdn = String(process.env.SANITY_USE_CDN ?? "true") === "true";
  const token = process.env.SANITY_TOKEN;

  if (!projectId || !dataset) {
    throw new Error("SANITY_PROJECT_ID and SANITY_DATASET are required in .env.local");
  }

  const client = createClient({ projectId, dataset, apiVersion, useCdn, token });

  const query = /* groq */ `
    *[_type == "post" && defined(slug.current)]{
      "slug": slug.current,
      publishedAt
    }
  `;

  const t0 = Date.now();
  const rows = await client.fetch(query);
  const ms = Date.now() - t0;

  const slugs = rows
    .map(r => String(r.slug || "").trim().toLowerCase())
    .filter(Boolean)
    .sort();

  const t24 = isoMinusDays(1);
  const t7 = isoMinusDays(7);
  const t30 = isoMinusDays(30);

  const published = rows
    .map(r => ({ slug: r.slug, publishedAt: r.publishedAt }))
    .filter(r => r.publishedAt && !Number.isNaN(Date.parse(r.publishedAt)));

  const last_24h = published.filter(r => r.publishedAt >= t24).length;
  const last_7d  = published.filter(r => r.publishedAt >= t7).length;
  const last_30d = published.filter(r => r.publishedAt >= t30).length;

  return {
    timestamp: getLocalISOWithOffset(),
    sanity_fetch_ms: ms,
    sanity_total: slugs.length,
    last_24h,
    last_7d,
    last_30d,
    slugs
  };
}

if (process.argv[1].endsWith("sanity-list-posts.mjs")) {
  const data = await listSanityPosts();
  console.log(JSON.stringify(data, null, 2));
}