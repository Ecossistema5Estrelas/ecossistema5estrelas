import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createClient } from "@sanity/client";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function envAny(...keys) {
  for (const k of keys) {
    const v = process.env[k];
    if (v && String(v).trim()) return String(v).trim();
  }
  return "";
}

// Aceita múltiplos nomes comuns de env:
const projectId = envAny("SANITY_PROJECT_ID", "NEXT_PUBLIC_SANITY_PROJECT_ID");
const dataset = envAny("SANITY_DATASET", "NEXT_PUBLIC_SANITY_DATASET");
const apiVersion = envAny("SANITY_API_VERSION", "NEXT_PUBLIC_SANITY_API_VERSION", "2024-01-01");

// Token precisa ser WRITE para aplicar (para auditoria pode ser vazio se dataset for público)
const token = envAny(
  "SANITY_WRITE_TOKEN",
  "SANITY_API_WRITE_TOKEN",
  "SANITY_API_TOKEN",
  "SANITY_TOKEN"
);

const args = new Set(process.argv.slice(2));
const APPLY = args.has("--apply");
const LIMIT = (() => {
  const idx = process.argv.indexOf("--limit");
  if (idx >= 0 && process.argv[idx + 1]) return Number(process.argv[idx + 1]);
  return 0;
})();

if (!projectId || !dataset) {
  console.error("FALTAM ENVs do Sanity.");
  console.error("Necessário: SANITY_PROJECT_ID + SANITY_DATASET (ou NEXT_PUBLIC_...).");
  process.exit(1);
}
if (APPLY && !token) {
  console.error("APPLY solicitado, mas token de escrita não foi encontrado.");
  console.error("Defina um: SANITY_WRITE_TOKEN (ou SANITY_API_TOKEN / SANITY_TOKEN).");
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion,
  token: token || undefined,
  useCdn: false,
});

const MOJI_RE = /nÃ£o|Ã©|Ãª|Ã¡|Ã³|Ã§|â€“|â€”|â€œ|â€�|Â |Ã|Â|â€/;

function looksMojibake(s) {
  return MOJI_RE.test(s);
}

// Correção típica: texto UTF-8 que foi decodificado como latin1.
function fixLatin1ToUtf8(s) {
  const fixed = Buffer.from(s, "latin1").toString("utf8");

  // Guard rails:
  // 1) Não aceitar se introduzir caractere de substituição em massa
  const badCount = (fixed.match(/\uFFFD/g) || []).length;
  if (badCount >= 2) return { ok: false, fixed: s };

  // 2) Só aceitar se melhorar: reduz padrões de mojibake
  const before = (s.match(MOJI_RE) || []).length;
  const after = (fixed.match(MOJI_RE) || []).length;

  if (after < before) return { ok: true, fixed };
  // Também aceitamos casos em que o texto original contém "Ã" e o fixed remove tudo isso.
  if (looksMojibake(s) && !looksMojibake(fixed)) return { ok: true, fixed };

  return { ok: false, fixed: s };
}

function deepClone(obj) {
  return JSON.parse(JSON.stringify(obj));
}

async function main() {
  const startedAt = new Date().toISOString().replace(/[:.]/g, "-");
  const auditDir = path.resolve(process.cwd(), "_audit", "encoding");
  const auditPath = path.join(auditDir, `encoding-audit-${startedAt}.json`);
  const snapPath = path.join(auditDir, `encoding-snapshot-${startedAt}.json`);

  const listQ = `*[_type=="post"]|order(publishedAt desc){_id, _rev, title, "slug": slug.current, publishedAt}`;
  const posts = await client.fetch(listQ);

  const limited = LIMIT > 0 ? posts.slice(0, LIMIT) : posts;

  const audit = {
    startedAt: new Date().toISOString(),
    projectId,
    dataset,
    apiVersion,
    apply: APPLY,
    limit: LIMIT || null,
    totals: { posts: limited.length, postsWithHits: 0, spansWithHits: 0, spansFixed: 0 },
    items: [],
  };

  // Snapshot completo (para rollback) somente se APPLY
  const snapshot = [];

  for (const p of limited) {
    const q = `
*[_type=="post" && _id==$id][0]{
  _id,_rev,title,"slug":slug.current,publishedAt,
  body[]{
    ...,
    children[]{..., text}
  }
}`;
    const doc = await client.fetch(q, { id: p._id });
    if (!doc) continue;

    let spansWithHits = 0;
    let spansFixed = 0;

    const body = deepClone(doc.body || []);
    let changed = false;

    for (const blk of body) {
      if (!blk || blk._type !== "block") continue;
      if (!Array.isArray(blk.children)) continue;

      for (const ch of blk.children) {
        if (!ch || typeof ch.text !== "string") continue;
        const t = ch.text;

        if (looksMojibake(t)) {
          spansWithHits++;
          const { ok, fixed } = fixLatin1ToUtf8(t);
          if (ok && fixed !== t) {
            ch.text = fixed;
            spansFixed++;
            changed = true;
          }
        }
      }
    }

    if (spansWithHits > 0) {
      audit.totals.postsWithHits++;
      audit.totals.spansWithHits += spansWithHits;
      audit.totals.spansFixed += spansFixed;
    }

    audit.items.push({
      _id: doc._id,
      slug: doc.slug,
      title: doc.title,
      publishedAt: doc.publishedAt,
      hits: spansWithHits,
      fixed: spansFixed,
      wouldChange: changed,
    });

    if (APPLY && changed) {
      snapshot.push(doc); // rollback material

      // Patch cirúrgico: só body
      await client.patch(doc._id).set({ body }).commit({ autoGenerateArrayKeys: false });
      // Atualiza audit com o fato
    }
  }

  fs.writeFileSync(auditPath, JSON.stringify(audit, null, 2), "utf8");
  if (APPLY) fs.writeFileSync(snapPath, JSON.stringify(snapshot, null, 2), "utf8");

  console.log("AUDIT_PATH:", auditPath);
  if (APPLY) console.log("SNAPSHOT_PATH:", snapPath);
  console.log("TOTAL_POSTS:", audit.totals.posts);
  console.log("POSTS_WITH_HITS:", audit.totals.postsWithHits);
  console.log("SPANS_WITH_HITS:", audit.totals.spansWithHits);
  console.log("SPANS_FIXED:", audit.totals.spansFixed);
  console.log("MODE:", APPLY ? "APPLY" : "DRY-RUN");
}

main().catch((e) => {
  console.error("FATAL:", e);
  process.exit(1);
});
