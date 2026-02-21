import { NextResponse } from "next/server";
import { runVulcano } from "@/core/vulcano/engine";

export const runtime = "nodejs";

export async function POST(req: Request) {
  const { messages = [] } = await req.json();

  const stream = new ReadableStream({
    async start(controller) {
      const enc = new TextEncoder();
      const write = (s: string) => controller.enqueue(enc.encode(s));

      for await (const chunk of runVulcano({ messages })) {
        write(chunk);
      }

      controller.close();
    },
  });

  return new NextResponse(stream, {
    headers: { "content-type": "text/plain" },
  });
}
