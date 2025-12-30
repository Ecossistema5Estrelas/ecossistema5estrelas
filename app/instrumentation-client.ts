import * as Sentry from "@sentry/nextjs";

/**
 * Sentry Next.js instrumentation client
 * Required to instrument router navigations:
 * export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
 */
export const onRouterTransitionStart = Sentry.captureRouterTransitionStart;
