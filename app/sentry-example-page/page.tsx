// app/sentry-example-page/page.tsx
"use client";

export default function SentryExamplePage() {
  return (
    <div style={{ padding: 32 }}>
      <h1>Sentry Test — ECOSSISTEMA 5⭐</h1>

      <button
        onClick={() => {
          // Erro real (não depende do SDK estar "pronto" no client)
          throw new Error("Teste REAL Sentry — Portal 5⭐");
        }}
        style={{
          marginTop: 20,
          padding: "12px 16px",
          background: "#111",
          color: "#fff",
          borderRadius: 6,
          cursor: "pointer",
        }}
      >
        Gerar erro de teste
      </button>
    </div>
  );
}