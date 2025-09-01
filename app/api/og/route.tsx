import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "ECOSSISTEMA 5ESTRELAS";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(90deg,#6366f1,#8b5cf6)",
          color: "#fff",
        }}
      >
        <div style={{ fontSize: 64, fontWeight: 800 }}>
          ECOSSISTEMA 5ESTRELAS
        </div>
      </div>
    ),
    { ...size }
  );
}
