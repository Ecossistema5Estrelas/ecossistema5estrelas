import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Ambiente Node.js (SSR, RSC, API routes)
  environment: process.env.NODE_ENV,

  // Amostragem conservadora em produção
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Não coletar PII por padrão (LGPD-safe)
  sendDefaultPii: false,

  // Logs estruturados (opcional, baixo impacto)
  enableLogs: true,
});