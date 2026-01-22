function fail(msg) {
  throw new Error("[SANITY] " + msg);
}

function env(name, fallback = null) {
  const v = process.env[name];
  return (v && String(v).trim().length > 0) ? String(v).trim() : fallback;
}

export async function sanityQuery(groq, params = {}, { revalidate = 3600 } = {}) {
  const projectId  = env("SANITY_PROJECT_ID");
  const dataset    = env("SANITY_DATASET");
  const apiVersion = env("SANITY_API_VERSION", "2024-01-01");

  if (!projectId) fail("SANITY_PROJECT_ID ausente");
  if (!dataset)   fail("SANITY_DATASET ausente");

  const base = `https://${projectId}.api.sanity.io/v${apiVersion}/data/query/${dataset}`;

  const usp = new URLSearchParams();
  usp.set("query", groq);

  for (const [k, v] of Object.entries(params || {})) {
    usp.set("$" + k, String(v));
  }

  const url = base + "?" + usp.toString();

  const res = await fetch(url, { next: { revalidate } });

  if (!res.ok) {
    let body = "";
    try {
      body = await res.text();
    } catch {
      // Falha ao ler body — ignorado por contrato (não afeta erro principal)
    }

    fail(
      "HTTP " +
        res.status +
        " ao consultar Sanity | url=" +
        url +
        " | body=" +
        body.slice(0, 800)
    );
  }

  const json = await res.json();
  if (!json || !("result" in json)) fail("Resposta inválida do Sanity");

  return json.result;
}