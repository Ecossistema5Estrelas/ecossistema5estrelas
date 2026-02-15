import fs from "node:fs"
import path from "node:path"
import crypto from "node:crypto"
import { execSync } from "node:child_process"

function sh(cmd) {
  return execSync(cmd, { stdio: ["ignore", "pipe", "ignore"] }).toString().trim()
}

function sha256File(p) {
  const b = fs.readFileSync(p)
  return crypto.createHash("sha256").update(b).digest("hex")
}

function exists(p) {
  try {
    fs.accessSync(p)
    return true
  } catch {
    return false
  }
}

const now = new Date()
const iso = now.toISOString().replaceAll(":", "-")
const outDir = path.join(".mnemosine", "snapshots")
fs.mkdirSync(outDir, { recursive: true })

const pkg = JSON.parse(fs.readFileSync("package.json", "utf8"))
const lockPath = exists("pnpm-lock.yaml") ? "pnpm-lock.yaml" : null

let git = { ok: false }

try {
  const commit = sh("git rev-parse HEAD")
  const branch = sh("git rev-parse --abbrev-ref HEAD")
  const status = sh("git status --porcelain")
  git = { ok: true, commit, branch, dirty: status.length > 0, status }
} catch (e) {
  console.error("Git metadata unavailable:", e)
}

const snapshot = {
  schema: "mnemosine-snapshot/v1",
  createdAt: now.toISOString(),
  project: pkg.name ?? "ecossistema5estrelas",
  node: process.version,
  packageManager: pkg.packageManager ?? null,
  type: pkg.type ?? null,
  versions: {
    next: pkg.dependencies?.next ?? pkg.devDependencies?.next ?? null,
    react: pkg.dependencies?.react ?? null,
    tailwindcss: pkg.devDependencies?.tailwindcss ?? null,
    eslint: pkg.devDependencies?.eslint ?? null,
    typescript: pkg.devDependencies?.typescript ?? null,
  },
  files: {
    "package.json": sha256File("package.json"),
    ...(lockPath ? { [lockPath]: sha256File(lockPath) } : {}),
    "eslint.config.mjs": exists("eslint.config.mjs") ? sha256File("eslint.config.mjs") : null,
    "tsconfig.json": exists("tsconfig.json") ? sha256File("tsconfig.json") : null,
    "postcss.config.cjs": exists("postcss.config.cjs") ? sha256File("postcss.config.cjs") : null,
    "tailwind.config.cjs": exists("tailwind.config.cjs") ? sha256File("tailwind.config.cjs") : null,
    "studio/postcss.config.cjs": exists("studio/postcss.config.cjs")
      ? sha256File("studio/postcss.config.cjs")
      : null,
  },
  git,
  invariants: [
    "Gate CI: pnpm install --frozen-lockfile",
    "Gate CI: pnpm lint",
    "Gate CI: pnpm typecheck",
    "Gate CI: pnpm build",
    "ESM canônico: package.json.type = module",
    "Configs CJS isolados: *.cjs (postcss/tailwind/studio postcss)",
    "Tailwind canônico: v3.x",
  ],
}

const file = path.join(
  outDir,
  `${iso}__${git.ok ? git.commit.slice(0, 7) : "nogit"}.json`
)

fs.writeFileSync(file, JSON.stringify(snapshot, null, 2))
console.log(file)
