#!/usr/bin/env node
import fs from "fs";
import path from "path";

function out(code, msg){
  if (code===0) console.log(`✅ OK list-posts: ${msg}`);
  else console.log(`❌ FAIL list-posts: ${msg}`);
  process.exit(code);
}

const postsDir = process.argv.includes("--dir")
  ? process.argv[process.argv.indexOf("--dir")+1]
  : "posts";

if (!fs.existsSync(postsDir)) out(3, `Posts dir not found (${postsDir})`);

const stat = fs.statSync(postsDir);
if (!stat.isDirectory()) out(1, `Not a directory: ${postsDir}`);

const args = process.argv.slice(2);
const now = new Date();

function daysAgo(n){
  const d = new Date(now);
  d.setDate(d.getDate()-n);
  return d;
}

let mode = "last";
let n = 10;

if (args.includes("--today")) { mode="today"; }
if (args.includes("--week")) { mode="week"; }
const lastArg = args.find(a => a.startsWith("--last="));
if (lastArg) { mode="last"; n = Number(lastArg.split("=")[1]||10); }

const files = fs.readdirSync(postsDir)
  .map(name => ({ name, full: path.join(postsDir,name) }))
  .filter(x => fs.statSync(x.full).isFile())
  .map(x => ({ ...x, mtime: fs.statSync(x.full).mtime }))
  .sort((a,b) => b.mtime - a.mtime);

let filtered = files;
if (mode==="today") {
  const start = new Date(now); start.setHours(0,0,0,0);
  filtered = files.filter(f => f.mtime >= start);
}
if (mode==="week") {
  const start = daysAgo(7);
  filtered = files.filter(f => f.mtime >= start);
}
if (mode==="last") filtered = files.slice(0, n);

if (filtered.length === 0) {
  console.log("🟨 OK list-posts: No items for filter.");
  process.exit(0);
}

for (const f of filtered) {
  console.log(`${f.mtime.toISOString()}  ${f.name}`);
}
process.exit(0);