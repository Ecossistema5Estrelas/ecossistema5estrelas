import { ImageResponse } from "next/og"

export const runtime = "edge"
export const contentType = "image/png"
export const size = { width: 1200, height: 630 }

export default async function OG() {
  const title = "ECOSSISTEMA 5ESTRELAS"
  const subtitle = "Transformando ideias em impacto"

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          background: "linear-gradient(135deg,#0f172a,#1e293b)",
          color: "#fff",
          alignItems: "center",
          justifyContent: "center",
          padding: 64,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: 24,
            maxWidth: 960,
          }}
        >
          <div style={{ fontSize: 64, fontWeight: 800, letterSpacing: -1 }}>
            {title}
          </div>
          <div style={{ fontSize: 32, opacity: 0.9 }}>{subtitle}</div>
          <div style={{ marginTop: 8, fontSize: 24, opacity: 0.8 }}>
            ecossistema5estrelas.org
          </div>
        </div>
      </div>
    ),
    { ...size }
  )
}
