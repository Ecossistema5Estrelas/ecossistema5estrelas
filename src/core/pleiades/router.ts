export function pleiadesRoute(text: string) {
  const t = (text || "").toLowerCase();

  if (t.startsWith("!run ")) return { intent: "executor_request", risk: "low" };
  if (t.includes("adsense")) return { intent: "monetization_plan", risk: "low" };
  if (t.includes("app")) return { intent: "build_app", risk: "low" };

  return { intent: "generic", risk: "low" };
}
