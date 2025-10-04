export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // 🧠 Teste básico de status
    if (url.pathname === '/api/ping') {
      return new Response(JSON.stringify({ ok: true, message: '🚀 API 5⭐ ativa!' }), {
        headers: { 'content-type': 'application/json' },
      });
    }

    // 💬 Criar nova mensagem
    if (url.pathname === '/api/chat' && request.method === 'POST') {
      try {
        const data = await request.json();
        await env.DB.prepare(
          'INSERT INTO messages (room_id, sender, content) VALUES (?, ?, ?)'
        ).bind(data.room_id || 'default', data.sender || 'user', data.content || '').run();

        return new Response(JSON.stringify({ success: true, stored: data }), {
          headers: { 'content-type': 'application/json' },
        });
      } catch (err) {
        return new Response(JSON.stringify({ error: err.message }), { status: 500 });
      }
    }

    // 📜 Listar mensagens recentes
    if (url.pathname === '/api/chat' && request.method === 'GET') {
      const { results } = await env.DB.prepare(
        'SELECT * FROM messages ORDER BY created_at DESC LIMIT 20'
      ).all();

      return new Response(JSON.stringify(results), {
        headers: { 'content-type': 'application/json' },
      });
    }

    return new Response('🌌 Stardust Worker rodando com API REST 5⭐!', {
      headers: { 'content-type': 'text/plain' },
    });
  },
};
