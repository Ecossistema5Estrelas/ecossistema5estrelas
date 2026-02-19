import { heimdallLog } from "@/core/heimdall/log";
import { pleiadesRoute } from "@/core/pleiades/router";
import { runAllowedCommand } from "@/core/executor/run";

export async function* runVulcano({ messages }: { messages: any[] }) {
  const last = messages.at(-1)?.content ?? "";
  const inc = "INC-" + Date.now();

  await heimdallLog({ inc, event: "VULCANO_START", payload: { lastLen: String(last).length } });

  // Gatilho explícito de execução: "!run <cmd>"
  const trimmed = String(last).trim();
  const isRun = trimmed.toLowerCase().startsWith("!run ");
  const cmdId = isRun ? trimmed.slice(5).trim() : "";

  const plan = pleiadesRoute(last);

  yield `INC:${inc}\n`;
  yield `INTENT:${plan.intent}\n`;
  yield `MODE:${isRun ? "EXEC" : "PLAN"}\n\n`;

  if (!isRun) {
    yield "PLAN-ONLY (sem execução).\n\n";
    yield JSON.stringify({ executed: false, ...plan }, null, 2);
    await heimdallLog({ inc, event: "VULCANO_END", payload: { mode: "plan" } });
    return;
  }

  // Execução READ-ONLY por allowlist
  yield `REQUESTED_CMD:${cmdId}\n\n`;

  for await (const chunk of runAllowedCommand({ inc, cmdId })) {
    yield chunk;
  }

  await heimdallLog({ inc, event: "VULCANO_END", payload: { mode: "exec", cmdId } });
}
