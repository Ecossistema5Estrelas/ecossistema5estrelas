import { promises as fs } from "node:fs";
import path from "node:path";

export type Flag = { name: string; enabled: boolean };
const dataPath = path.join(process.cwd(), "data", "flags.json");

export async function getFlags(): Promise<Flag[]> {
  try {
    const raw = await fs.readFile(dataPath, "utf8");
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}
export async function isEnabled(name: string): Promise<boolean> {
  const flags = await getFlags();
  return !!flags.find(f => f.name === name && f.enabled);
}
