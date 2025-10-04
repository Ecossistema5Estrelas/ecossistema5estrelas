import { Hono } from "hono";
import { z } from "zod";
import { zValidator } from "@hono/zod-validator";

export const usersRouter = new Hono<{ Bindings: Env }>();

const userSchema = z.object({
  name: z.string(),
  email: z.string().email(),
});

usersRouter.get("/", async (c) => {
  const { results } = await c.env.DB.prepare("SELECT * FROM users").all();
  return c.json({ success: true, result: results });
});

usersRouter.post("/", zValidator("json", userSchema), async (c) => {
  const body = c.req.valid("json");
  await c.env.DB.prepare("INSERT INTO users (name, email) VALUES (?, ?)")
    .bind(body.name, body.email)
    .run();
  return c.json({ success: true, message: "Usuário criado com sucesso" });
});

usersRouter.get("/:id", async (c) => {
  const id = c.req.param("id");
  const row = await c.env.DB.prepare("SELECT * FROM users WHERE id=?").bind(id).first();
  return c.json({ success: true, result: row });
});

usersRouter.put("/:id", zValidator("json", userSchema), async (c) => {
  const id = c.req.param("id");
  const body = c.req.valid("json");
  await c.env.DB.prepare("UPDATE users SET name=?, email=? WHERE id=?")
    .bind(body.name, body.email, id)
    .run();
  return c.json({ success: true, message: "Usuário atualizado" });
});

usersRouter.delete("/:id", async (c) => {
  const id = c.req.param("id");
  await c.env.DB.prepare("DELETE FROM users WHERE id=?").bind(id).run();
  return c.json({ success: true, message: "Usuário removido" });
});
