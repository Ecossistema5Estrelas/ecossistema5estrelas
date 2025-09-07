export const dynamic = "force-static";
export const revalidate = 86400;
export async function GET() {
  // placeholder estático só para não travar export — ajuste se quiser algo real
  return new Response("OG static OK", { headers: { "content-type": "text/plain" }});
}
