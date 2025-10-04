export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 🧠 Rota de teste
    if (url.pathname === '/api/ping') {
      return new Response(JSON.stringify({ ok: true, message: '🚀 API 5⭐ ativa!' }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    // 💬 Rota de mensagens (salvar e listar)
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      const data = await request.json();
      await env.DB.prepare(
        'INSERT INTO messages (room_id, sender, content) VALUES (?, ?, ?)'
      ).bind(data.room_id || 'default', data.sender || 'user', data.content || '').run();

      return new Response(JSON.stringify({ success: true, stored: data }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    if (url.pathname === '/api/chat' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT * FROM messages ORDER BY created_at DESC LIMIT 20'
      ).all();

      return new Response(JSON.stringify(results), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response('🌌 Stardust Worker rodando com API 5⭐!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
