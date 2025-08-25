import { NextResponse } from "next/server";
import { readFileSync } from "fs";
import { join } from "path";

export const runtime = "nodejs"; // evita Edge e simplifica FS

export async function GET() {
  const file = readFileSync(join(process.cwd(), "data", "posts.json"), "utf8");
  const posts = JSON.parse(file);
  return NextResponse.json(posts);
}
