import { Hono } from "hono";

export const usersRouter = new Hono<{ Bindings: Env }>();

usersRouter.get("/", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM users").all();
  return c.json({ success: true, result: results });
});

usersRouter.post("/", async (c) => {
  const body = await c.req.json();
  await c.env.DB.prepare(
    "INSERT INTO users (name, email) VALUES (?, ?)"
  ).bind(body.name, body.email).run();

  return c.json({ success: true, message: "Usuário criado com sucesso" });
});
