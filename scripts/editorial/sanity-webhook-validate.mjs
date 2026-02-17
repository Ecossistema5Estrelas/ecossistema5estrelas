import process from "node:process";

const payload = JSON.parse(process.env.SANITY_WEBHOOK_BODY || "{}");

function fail(msg) {
  console.error("❌ SANITY VALIDATION FAILED:", msg);
  process.exit(1);
}

if (payload._type !== "post") {
  console.log("OK: not a post");
  process.exit(0);
}

const { title, slug, publishedAt } = payload;

if (!title) fail("missing title");
if (!slug?.current) fail("missing slug");
if (!publishedAt) fail("missing publishedAt");

if (new Date(publishedAt) > new Date()) {
  fail("publishedAt is in the future");
}

console.log("✅ SANITY POST VALIDATED");
