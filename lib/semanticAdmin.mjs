import fs from "fs";

function readJSON(path) {
  if (!fs.existsSync(path)) {
    throw new Error("Missing source: " + path);
  }
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

export function getContract() {
  return readJSON("reports/admin.semantic.contract.v1.json");
}

export function getPostsMap() {
  return readJSON("reports/sanity-posts.map.json");
}

export function getTaxonomy() {
  return readJSON("taxonomy.v1.json");
}

export function getNavigation() {
  return readJSON("reports/navigation.semantic.v1.json");
}

export function getOrphans(limit = 50) {
  const map = getPostsMap();
  const orphans = (map.orphans || []).slice(0, limit);
  return { count: map.orphans?.length || 0, sample: orphans };
}

export function getClusters() {
  const map = getPostsMap();
  return map.clusters || [];
}

export function getDensity() {
  const tax = getTaxonomy();
  const map = getPostsMap();
  const total = map.posts?.length || 0;

  const byAxis = {};
  for (const c of tax.categories || []) byAxis[c] = 0;

  for (const p of map.posts || []) {
    if (p.category && byAxis[p.category] !== undefined) {
      byAxis[p.category]++;
    }
  }

  return { total, byAxis };
}

export function getGrowth() {
  const map = getPostsMap();
  const buckets = {};
  for (const p of map.posts || []) {
    const d = p.publishedAt || p._createdAt;
    if (!d) continue;
    const key = d.slice(0, 7);
    buckets[key] = (buckets[key] || 0) + 1;
  }
  return buckets;
}

export function getAlerts() {
  const orphans = getOrphans().count;
  const density = getDensity();
  const emptyAxes = Object.entries(density.byAxis || {})
    .filter(([, v]) => v === 0)
    .map(([k]) => k);

  return {
    orphans_gt_0: orphans > 0,
    empty_axes: emptyAxes
  };
}