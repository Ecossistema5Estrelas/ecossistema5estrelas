// instrumentation-client.ts
import * as Sentry from "@sentry/nextjs";

Sentry.init({
  // Use variável de ambiente para não hardcodar segredo no repo
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,

  // LGPD-safe por padrão (mantenha false)
  sendDefaultPii: false,

  // Performance: alto em dev, conservador em prod
  tracesSampleRate: process.env.NODE_ENV === "development" ? 1.0 : 0.1,

  // Logs estruturados (opcional)
  enableLogs: true,
});