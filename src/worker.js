export default {
  async fetch(request, env) {
    const url = new URL(request.url);

    if (url.pathname === '/api/ai-chat' && request.method === 'POST') {
      return handleAiChat(request, env);
    }

    const response = await env.ASSETS.fetch(request);
    const newResponse = new Response(response.body, response);

    newResponse.headers.set('X-Content-Type-Options', 'nosniff');
    newResponse.headers.set('X-Frame-Options', 'SAMEORIGIN');
    newResponse.headers.set('X-XSS-Protection', '1; mode=block');
    newResponse.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
    newResponse.headers.set('Permissions-Policy', 'geolocation=(), microphone=(), camera=()');
    newResponse.headers.set(
      'Content-Security-Policy',
      [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline' https://www.gstatic.com https://translate.google.com https://translate.googleapis.com",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://translate.googleapis.com",
        "font-src 'self' https://fonts.gstatic.com",
        "img-src 'self' data: blob: https://ui-avatars.com https://firebasestorage.googleapis.com https://www.gstatic.com https://translate.google.com https://translate.googleapis.com",
        "connect-src 'self' https://*.googleapis.com https://*.firebaseio.com https://identitytoolkit.googleapis.com https://securetoken.googleapis.com https://firestore.googleapis.com",
        "frame-src 'none'",
        "object-src 'none'",
        "base-uri 'self'"
      ].join('; ')
    );

    return newResponse;
  }
};

async function handleAiChat(request, env) {
  try {
    const body = await request.json();
    const { message, history } = body;

    if (!message || typeof message !== 'string' || !message.trim()) {
      return jsonResponse({ error: 'Message invalide' }, 400);
    }

    const trimmed = message.trim().slice(0, 1000);

    const safeHistory = Array.isArray(history)
      ? history.slice(-8).map(m => ({
          role: m.role === 'assistant' ? 'assistant' : 'user',
          content: String(m.content).slice(0, 500)
        }))
      : [];

    const messages = [...safeHistory, { role: 'user', content: trimmed }];

    const res = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'x-api-key': env.ANTHROPIC_API_KEY,
        'anthropic-version': '2023-06-01',
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5-20251001',
        max_tokens: 400,
        system: `Tu es Jardinot 🌱, l'assistant jardinier IA d'Oise au Jardin — une plateforme qui connecte des propriétaires avec de jeunes jardiniers dans l'Oise (Picardie), France. Tu donnes des conseils de jardinage pratiques, adaptés au climat de la région. Tu es sympathique, enthousiaste, et concis (2-4 phrases). Réponds dans la langue de l'utilisateur. Parle uniquement de jardinage, plantes, entretien de jardins, et de la plateforme Oise au Jardin.`
      ,
        messages
      })
    });

    if (!res.ok) throw new Error(`Anthropic ${res.status}`);

    const data = await res.json();
    const reply = data.content?.[0]?.text ?? "Je n'ai pas pu répondre. Réessaie !";

    return jsonResponse({ reply });
  } catch (e) {
    console.error('AI chat error:', e);
    return jsonResponse({ error: 'Une erreur est survenue. Réessaye !' }, 500);
  }
}

function jsonResponse(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: {
      'Content-Type': 'application/json',
      'X-Content-Type-Options': 'nosniff'
    }
  });
}
