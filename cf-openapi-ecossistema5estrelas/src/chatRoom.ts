export class ChatRoomDO {
  state: DurableObjectState;
  env: any;
  connections: Map<WebSocket, string>;

  constructor(state: DurableObjectState, env: any) {
    this.state = state;
    this.env = env;
    this.connections = new Map();
  }

  async fetch(request: Request) {
    const upgradeHeader = request.headers.get("Upgrade");
    if (upgradeHeader !== "websocket") {
      return new Response("Expected websocket", { status: 426 });
    }

    const [client, server] = Object.values(new WebSocketPair()) as [WebSocket, WebSocket];
    await this.handleSession(server);
    return new Response(null, { status: 101, webSocket: client });
  }

  async handleSession(ws: WebSocket) {
    ws.accept();

    ws.addEventListener("message", async (evt) => {
      const msg = evt.data.toString();
      for (const [client] of this.connections) {
        try {
          client.send(msg);
        } catch (err) {
          this.connections.delete(client);
        }
      }
    });

    ws.addEventListener("close", () => {
      this.connections.delete(ws);
    });

    this.connections.set(ws, "connected");
  }
}
