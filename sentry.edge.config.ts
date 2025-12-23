import * as Sentry from "@sentry/nextjs";

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // Ambiente Edge Runtime
  environment: process.env.NODE_ENV,

  // Edge costuma ter menos contexto → amostragem ainda menor
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.05,

  // Edge não deve coletar PII
  sendDefaultPii: false,

  enableLogs: true,
});