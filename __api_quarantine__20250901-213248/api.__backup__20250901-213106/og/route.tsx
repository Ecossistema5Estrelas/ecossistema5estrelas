import { ImageResponse } from "next/og";
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
    { width: 1200, height: 630 }
  );
}

