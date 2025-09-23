import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const res = NextResponse.next();
  const ck = "ab_bucket";
  let bucket = req.cookies.get(ck)?.value;

  if (!bucket) {
    bucket = Math.random() < 0.1 ? "canary" : "control"; // 10% canary
    res.cookies.set(ck, bucket, { path: "/", maxAge: 60*60*24*30 });
  }

  res.headers.set("x-ab-bucket", bucket);
  return res;
}





