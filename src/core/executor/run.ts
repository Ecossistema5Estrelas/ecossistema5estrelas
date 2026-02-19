import { spawn } from "node:child_process";
import { ALLOWLIST } from "@/core/executor/allowlist";
import { heimdallLog } from "@/core/heimdall/log";

export async function* runAllowedCommand(input: {
  inc: string;
  cmdId: string;
}): AsyncGenerator<string> {
  const cmd = ALLOWLIST[input.cmdId];

  if (!cmd) {
    yield `EXECUTOR: BLOQUEADO (cmd não permitido): ${input.cmdId}\n`;
    return;
  }

  await heimdallLog({ inc: input.inc, event: "EXEC_START", payload: { cmdId: input.cmdId } });

  if (cmd.kind !== "node_script") {
    yield `EXECUTOR: BLOQUEADO (kind inválido)\n`;
    return;
  }

  // Segurança: sem shell, caminho explícito
  const child = spawn(process.execPath, [cmd.script, ...(cmd.args ?? [])], {
    shell: false,
    windowsHide: true,
  });

  yield `EXECUTOR: RUN ${cmd.id}\n`;
  yield `SCRIPT: ${cmd.script}\n\n`;

  let stderrBuf = "";
  child.stdout.setEncoding("utf8");
  child.stderr.setEncoding("utf8");

  child.stdout.on("data", (chunk) => {
    // streaming via buffer no generator: empurramos via fila abaixo
  });

  // Fila simples para streaming
  const queue: string[] = [];
  let done = false;

  child.stdout.on("data", (c: string) => queue.push(c));
  child.stderr.on("data", (c: string) => {
    stderrBuf += c;
    queue.push(c);
  });

  const exitCode: number = await new Promise((resolve) => {
    child.on("close", (code) => {
      done = true;
      resolve(code ?? 0);
    });
  });

  // drenar queue final
  while (queue.length) yield queue.shift() as string;

  if (stderrBuf.trim()) {
    yield `\n[stderr acima]\n`;
  }

  yield `\nEXECUTOR: EXIT ${exitCode}\n`;

  await heimdallLog({
    inc: input.inc,
    event: "EXEC_END",
    payload: { cmdId: input.cmdId, exitCode },
  });
}
