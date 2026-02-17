import http from "node:http";
import { execFileSync } from "node:child_process";

const server = http.createServer((req, res) => {
  let body = "";
  req.on("data", chunk => body += chunk);
  req.on("end", () => {
    try {
      process.env.SANITY_WEBHOOK_BODY = body;
      execFileSync("node", ["scripts/editorial/sanity-webhook-validate.mjs"], { stdio: "inherit" });
      res.writeHead(200);
      res.end("OK");
    } catch {
      res.writeHead(400);
      res.end("INVALID");
    }
  });
});

server.listen(3333, () => console.log("🚨 Sanity webhook listening on :3333"));
