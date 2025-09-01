import { NextResponse } from "next/server";
import fs from "node:fs";
import path from "node:path";
export const dynamic = "force-dynamic";
export async function GET() {
  const root = process.cwd();
  const files = ["app/layout.tsx","app/page.tsx","app/page.client.tsx","app/globals.css","app/blog/page.tsx","app/blog/[slug]/page.tsx","components/brand/brand-stars.tsx"]
    .map(rel => {
      const abs = path.join(root, rel);
      try { const st = fs.statSync(abs); return { rel, exists:true, mtime:st.mtime.toISOString() }; }
      catch { return { rel, exists:false }; }
    });
  return NextResponse.json({ cwd: root, files, buildId: process.env.NEXT_PUBLIC_BUILD_ID });
}