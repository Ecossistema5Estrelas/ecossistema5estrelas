import { ImageResponse } from "@vercel/og";
export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title = searchParams.get("title") ?? "ECOSSISTEMA 5ESTRELAS";
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%", width: "100%",
          display: "flex", flexDirection: "column", justifyContent: "center", padding: 64,
          background: "linear-gradient(90deg,#6366f1,#8b5cf6)", color: "white"
        }}
      >
        <div style={{ fontSize: 60, fontWeight: 700, lineHeight: 1.1 }}>{title}</div>
        <div style={{ marginTop: 16, fontSize: 28, opacity: .9 }}>ecossistema5estrelas.org</div>
      </div>
    ),
    { width: 1200, height: 630 }
  );
}
