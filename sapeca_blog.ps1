@'
# ===== Sapeca v4 Indestrutível =====
@'
import { createClient } from "@sanity/client"
import groq from "groq"

export const metadata = {
  title: "Blog | ECOSSISTEMA 5ESTRELAS",
  description: "Conheça as novidades e bastidores do ECOSSISTEMA 5ESTRELAS.",
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: "2023-01-01",
  useCdn: true,
})

export default async function BlogPage() {
  const posts = await client.fetch(
    groq`*[_type == "post"] | order(publishedAt desc){
      _id,
      title,
      "slug": slug.current,
      publishedAt,
      mainImage,
      excerpt
    }`
  )

  return (
    <main className="min-h-screen px-4 py-12 bg-gradient-to-b from-black via-zinc-900 to-zinc-950 text-white">
      <section className="max-w-4xl mx-auto space-y-10">
        <header className="text-center">
          <div className="text-5xl mb-2">📚</div>
          <h1 className="text-4xl font-bold">Blog Oficial</h1>
        </header>
        <ul className="space-y-6">
          {posts.map((post) => (
            <li key={post._id} className="p-4 rounded-lg bg-zinc-800">
              <h2 className="text-2xl font-semibold">{post.title}</h2>
              <p className="text-zinc-400">{post.excerpt}</p>
            </li>
          ))}
        </ul>
      </section>
    </main>
  )
}
'@ | Set-Content -Encoding UTF8 .\app\blog\page.tsx

Remove-Item -Recurse -Force .next -ErrorAction SilentlyContinue
Remove-Item -Recurse -Force node_modules\.cache -ErrorAction SilentlyContinue
Remove-Item -Force public\sw.js -ErrorAction SilentlyContinue

$requiredDeps = @("@sanity/client","groq")
$packageJson = Get-Content package.json -Raw | ConvertFrom-Json
$allDeps = @()
if ($packageJson.dependencies) { $allDeps += $packageJson.dependencies.Keys }
if ($packageJson.devDependencies) { $allDeps += $packageJson.devDependencies.Keys }

foreach ($dep in $requiredDeps + $allDeps) {
    if ($dep -and (-not (Test-Path "node_modules\$dep"))) {
        npm install $dep --legacy-peer-deps
    }
}

$styledPath = "node_modules\styled-components"
if (-not (Test-Path $styledPath)) {
    New-Item -ItemType Directory -Force -Path $styledPath | Out-Null
    "module.exports = { default: (tag) => () => null };" | Set-Content -Encoding UTF8 "$styledPath\index.js"
}

$nextConfigPath = "next.config.mjs"
if (Test-Path $nextConfigPath) {
    $configContent = Get-Content $nextConfigPath -Raw
    if ($configContent -notmatch "styled-components") {
        $aliasBlock = "webpack: (config) => { config.resolve.alias['styled-components'] = require('path').resolve(__dirname, 'node_modules/styled-components'); return config; }"
        $configContent = $configContent -replace "(?<=export default).*?\{", "export default {`n    $aliasBlock,"
        Set-Content -Encoding UTF8 $nextConfigPath $configContent
    }
}

npm install --legacy-peer-deps
npm run dev -- --hostname 127.0.0.1 --port 3000
'@ | Set-Content -Encoding UTF8 sapeca.ps1; Set-ExecutionPolicy -Scope Process -ExecutionPolicy Bypass; .\sapeca.ps1