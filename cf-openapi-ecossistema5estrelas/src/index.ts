/**
 * 🌌 Stardust Worker — LLM Chat App 5ESTRELAS
 * Correção definitiva: export único de ChatRoomDO.
 */

export class ChatRoomDO {
  constructor(state, env) {
    this.state = state;
    this.env = env;
  }

  async fetch(request) {
    return new Response("💬 ChatRoomDO ativo e funcional!", {
      headers: { "content-type": "text/plain" },
    });
  }
}

// ✅ Export único compatível com Wrangler
export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    if (url.pathname.startsWith("/chat")) {
      return new Response(JSON.stringify({
        success: true,
        message: "🚀 Endpoint /chat ativo e Worker funcional!",
      }), { headers: { "content-type": "application/json" } });
    }

    return new Response("🌌 Stardust Worker rodando com sucesso!", {
      headers: { "content-type": "text/plain" },
    });
  },
  ChatRoomDO, // Incluído no export default (detecção do Durable Object)
};
