import { Hono } from 'hono'

const app = new Hono()
// REMOVIDO uso incorreto de env
  


app.get("/stardust", async (c) => {
  return new Response(
    JSON.stringify({
      status: "ok",
      role: "Stardust",
      message: c.env.SYSTEM_PROMPT,
    }),
    { headers: { "Content-Type": "application/json" } }
  );
});

app.post("/stardust-chat", async (c) => {
  const result = await c.env.AI.run("@cf/meta/llama-3.1-8b-instruct", {
    messages: [
      { role: "system", content: c.env.SYSTEM_PROMPT },
      { role: "user", content: "Inicie a jornada cósmica." }
    ],
  });

  return Response.json(result);
});

export default app;
