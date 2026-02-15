/**
 * S3-I1 — HUB ADMIN AUDIT (READ-ONLY)
 * Fonte da verdade: Sanity (auditLog)
 * UI derivada. Sem ações.
 */

import { groq } from "next-sanity";
import { sanityQuery } from "@/lib/sanityFetch.mjs";

type AuditLogItem = {
  _id: string;
  actorId?: string;
  action?: string;
  targetId?: string;
  origin?: string;
  result?: string;
  timestamp?: string;
};

const QUERY_AUDIT_LOG = groq`
  *[_type == "auditLog"] | order(timestamp desc) {
    _id,
    actorId,
    action,
    targetId,
    origin,
    result,
    timestamp
  }
`;

export default async function HubAdminAuditPage() {
  const items = await sanityQuery(QUERY_AUDIT_LOG, {}, { revalidate: 0 });

  return (
    <main className="mx-auto max-w-5xl p-6">
      <h1 className="mb-4 text-2xl font-semibold">HUB ADMIN — AUDIT LOG</h1>

      {items.length === 0 ? (
        <p className="text-sm opacity-70">Nenhum registro encontrado.</p>
      ) : (
        <ul className="space-y-2">
          {items.map((item: AuditLogItem) => (
            <li key={item._id} className="rounded border p-3 text-sm">
              <div><strong>Actor:</strong> {item.actorId ?? "-"}</div>
              <div><strong>Action:</strong> {item.action ?? "-"}</div>
              <div><strong>Target:</strong> {item.targetId ?? "-"}</div>
              <div><strong>Origin:</strong> {item.origin ?? "-"}</div>
              <div><strong>Result:</strong> {item.result ?? "-"}</div>
              <div><strong>Timestamp:</strong> {item.timestamp ?? "-"}</div>
            </li>
          ))}
        </ul>
      )}
    </main>
  );
}
