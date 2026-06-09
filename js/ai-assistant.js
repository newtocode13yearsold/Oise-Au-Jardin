(function () {
  const CSS = `
    #jardinot-btn {
      position: fixed;
      bottom: 28px;
      right: 28px;
      z-index: 9998;
      width: 60px;
      height: 60px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a3a1c, #2c5f2e);
      border: none;
      cursor: pointer;
      box-shadow: 0 4px 20px rgba(44,95,46,0.45);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 26px;
      transition: transform 0.2s, box-shadow 0.2s;
      outline: none;
    }
    #jardinot-btn:hover {
      transform: scale(1.1);
      box-shadow: 0 6px 28px rgba(44,95,46,0.6);
    }
    #jardinot-btn .jd-pulse {
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      border-radius: 50%;
      background: rgba(44,95,46,0.35);
      animation: jd-pulse 2.4s ease-out infinite;
    }
    @keyframes jd-pulse {
      0% { transform: scale(1); opacity: 0.7; }
      100% { transform: scale(1.75); opacity: 0; }
    }
    #jardinot-tooltip {
      position: fixed;
      bottom: 96px;
      right: 28px;
      z-index: 9997;
      background: #1a3a1c;
      color: #fff;
      padding: 7px 14px;
      border-radius: 20px;
      font-size: 13px;
      font-family: inherit;
      white-space: nowrap;
      box-shadow: 0 3px 12px rgba(0,0,0,0.2);
      pointer-events: none;
      opacity: 0;
      transform: translateY(6px);
      transition: opacity 0.2s, transform 0.2s;
    }
    #jardinot-btn:hover + #jardinot-tooltip,
    #jardinot-tooltip.show {
      opacity: 1;
      transform: translateY(0);
    }
    #jardinot-panel {
      position: fixed;
      bottom: 100px;
      right: 28px;
      z-index: 9999;
      width: 340px;
      max-width: calc(100vw - 32px);
      height: 480px;
      max-height: calc(100vh - 130px);
      background: #fff;
      border-radius: 20px;
      box-shadow: 0 12px 50px rgba(0,0,0,0.18);
      display: flex;
      flex-direction: column;
      overflow: hidden;
      transform: scale(0.85) translateY(20px);
      transform-origin: bottom right;
      opacity: 0;
      pointer-events: none;
      transition: transform 0.25s cubic-bezier(0.34,1.56,0.64,1), opacity 0.2s;
    }
    #jardinot-panel.open {
      transform: scale(1) translateY(0);
      opacity: 1;
      pointer-events: all;
    }
    #jardinot-header {
      background: linear-gradient(135deg, #1a3a1c, #2c5f2e);
      color: #fff;
      padding: 16px 18px 14px;
      display: flex;
      align-items: center;
      gap: 12px;
      flex-shrink: 0;
    }
    #jardinot-avatar {
      width: 40px;
      height: 40px;
      border-radius: 50%;
      background: rgba(255,255,255,0.15);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 22px;
      flex-shrink: 0;
    }
    #jardinot-header-info h4 {
      margin: 0;
      font-size: 15px;
      font-weight: 700;
      letter-spacing: 0.2px;
    }
    #jardinot-header-info p {
      margin: 2px 0 0;
      font-size: 11px;
      opacity: 0.75;
    }
    #jardinot-close {
      margin-left: auto;
      background: rgba(255,255,255,0.15);
      border: none;
      color: #fff;
      width: 30px;
      height: 30px;
      border-radius: 50%;
      cursor: pointer;
      font-size: 16px;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: background 0.15s;
      flex-shrink: 0;
    }
    #jardinot-close:hover { background: rgba(255,255,255,0.28); }
    #jardinot-messages {
      flex: 1;
      overflow-y: auto;
      padding: 16px 14px;
      display: flex;
      flex-direction: column;
      gap: 10px;
      background: #f6f9f4;
    }
    #jardinot-messages::-webkit-scrollbar { width: 4px; }
    #jardinot-messages::-webkit-scrollbar-track { background: transparent; }
    #jardinot-messages::-webkit-scrollbar-thumb { background: #c8d9c8; border-radius: 4px; }
    .jd-msg {
      max-width: 82%;
      padding: 9px 13px;
      border-radius: 16px;
      font-size: 13.5px;
      line-height: 1.45;
      word-break: break-word;
      animation: jd-fade-in 0.2s ease;
    }
    @keyframes jd-fade-in {
      from { opacity: 0; transform: translateY(6px); }
      to { opacity: 1; transform: translateY(0); }
    }
    .jd-msg.bot {
      background: #fff;
      color: #1a3a1c;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .jd-msg.user {
      background: linear-gradient(135deg, #2c5f2e, #3a7a3c);
      color: #fff;
      border-bottom-right-radius: 4px;
      align-self: flex-end;
    }
    .jd-msg.error {
      background: #fff0f0;
      color: #c0392b;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      font-size: 12.5px;
    }
    .jd-typing {
      display: flex;
      align-items: center;
      gap: 5px;
      padding: 10px 14px;
      background: #fff;
      border-radius: 16px;
      border-bottom-left-radius: 4px;
      align-self: flex-start;
      box-shadow: 0 1px 4px rgba(0,0,0,0.08);
    }
    .jd-dot {
      width: 7px;
      height: 7px;
      border-radius: 50%;
      background: #2c5f2e;
      animation: jd-bounce 1.2s infinite ease-in-out;
    }
    .jd-dot:nth-child(2) { animation-delay: 0.2s; }
    .jd-dot:nth-child(3) { animation-delay: 0.4s; }
    @keyframes jd-bounce {
      0%, 60%, 100% { transform: translateY(0); }
      30% { transform: translateY(-6px); }
    }
    #jardinot-suggestions {
      padding: 0 12px 10px;
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      background: #f6f9f4;
      flex-shrink: 0;
    }
    .jd-suggestion {
      background: #fff;
      border: 1px solid #c8d9c8;
      border-radius: 20px;
      padding: 5px 11px;
      font-size: 12px;
      color: #2c5f2e;
      cursor: pointer;
      transition: background 0.15s, border-color 0.15s;
      white-space: nowrap;
    }
    .jd-suggestion:hover { background: #e8f5e9; border-color: #2c5f2e; }
    #jardinot-input-area {
      padding: 12px;
      border-top: 1px solid #e8ede8;
      display: flex;
      gap: 8px;
      background: #fff;
      flex-shrink: 0;
    }
    #jardinot-input {
      flex: 1;
      border: 1.5px solid #dde8dd;
      border-radius: 22px;
      padding: 9px 15px;
      font-size: 13.5px;
      outline: none;
      transition: border-color 0.15s;
      font-family: inherit;
      background: #f6f9f4;
      resize: none;
      max-height: 80px;
      overflow-y: auto;
    }
    #jardinot-input:focus { border-color: #2c5f2e; background: #fff; }
    #jardinot-send {
      width: 38px;
      height: 38px;
      border-radius: 50%;
      background: linear-gradient(135deg, #1a3a1c, #2c5f2e);
      border: none;
      color: #fff;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      transition: transform 0.15s, box-shadow 0.15s;
      flex-shrink: 0;
      align-self: flex-end;
    }
    #jardinot-send:hover { transform: scale(1.08); box-shadow: 0 3px 10px rgba(44,95,46,0.4); }
    #jardinot-send:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
    #jardinot-powered {
      text-align: center;
      font-size: 10px;
      color: #aaa;
      padding: 4px 0 8px;
      background: #fff;
      flex-shrink: 0;
    }
    #jardinot-powered a { color: #aaa; text-decoration: none; }
    @media (max-width: 400px) {
      #jardinot-panel { right: 12px; bottom: 88px; width: calc(100vw - 24px); }
      #jardinot-btn { right: 16px; bottom: 20px; }
      #jardinot-tooltip { right: 16px; }
    }
  `;

  const SUGGESTIONS = [
    '🌿 Quand planter des tomates ?',
    '🌸 Fleurs pour l\'Oise ?',
    '🐛 Lutter contre les pucerons ?',
    '✂️ Taille des haies ?'
  ];

  let history = [];
  let isLoading = false;
  let suggShown = true;

  function init() {
    const style = document.createElement('style');
    style.textContent = CSS;
    document.head.appendChild(style);

    const btn = document.createElement('button');
    btn.id = 'jardinot-btn';
    btn.setAttribute('aria-label', 'Ouvrir Jardinot, l\'assistant jardinier IA');
    btn.innerHTML = '<span class="jd-pulse"></span>🌱';

    const tooltip = document.createElement('div');
    tooltip.id = 'jardinot-tooltip';
    tooltip.textContent = 'Jardinot — Assistant IA';

    const panel = document.createElement('div');
    panel.id = 'jardinot-panel';
    panel.setAttribute('role', 'dialog');
    panel.setAttribute('aria-label', 'Jardinot assistant jardinier IA');
    panel.innerHTML = `
      <div id="jardinot-header">
        <div id="jardinot-avatar">🌱</div>
        <div id="jardinot-header-info">
          <h4>Jardinot</h4>
          <p>Assistant jardinier IA · Oise au Jardin</p>
        </div>
        <button id="jardinot-close" aria-label="Fermer">✕</button>
      </div>
      <div id="jardinot-messages"></div>
      <div id="jardinot-suggestions"></div>
      <div id="jardinot-input-area">
        <textarea id="jardinot-input" placeholder="Posez votre question jardinage…" rows="1" maxlength="800"></textarea>
        <button id="jardinot-send" aria-label="Envoyer">➤</button>
      </div>
      <div id="jardinot-powered">Propulsé par <a href="https://claude.ai" target="_blank" rel="noopener">Claude AI</a></div>
    `;

    document.body.appendChild(btn);
    document.body.appendChild(tooltip);
    document.body.appendChild(panel);

    btn.addEventListener('click', togglePanel);
    document.getElementById('jardinot-close').addEventListener('click', closePanel);
    document.getElementById('jardinot-send').addEventListener('click', sendMessage);
    document.getElementById('jardinot-input').addEventListener('keydown', function (e) {
      if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); sendMessage(); }
    });
    document.getElementById('jardinot-input').addEventListener('input', autoResize);

    renderSuggestions();
    addBotMessage('Bonjour ! Je suis Jardinot 🌱, ton assistant jardinier. Pose-moi n\'importe quelle question sur le jardinage dans l\'Oise !');
  }

  function autoResize() {
    const el = document.getElementById('jardinot-input');
    el.style.height = 'auto';
    el.style.height = Math.min(el.scrollHeight, 80) + 'px';
  }

  function togglePanel() {
    const panel = document.getElementById('jardinot-panel');
    const btn = document.getElementById('jardinot-btn');
    if (panel.classList.contains('open')) {
      panel.classList.remove('open');
      btn.innerHTML = '<span class="jd-pulse"></span>🌱';
    } else {
      panel.classList.add('open');
      btn.innerHTML = '✕';
      setTimeout(() => document.getElementById('jardinot-input').focus(), 280);
    }
  }

  function closePanel() {
    document.getElementById('jardinot-panel').classList.remove('open');
    document.getElementById('jardinot-btn').innerHTML = '<span class="jd-pulse"></span>🌱';
  }

  function renderSuggestions() {
    const box = document.getElementById('jardinot-suggestions');
    if (!suggShown) { box.innerHTML = ''; return; }
    box.innerHTML = SUGGESTIONS.map(s =>
      `<button class="jd-suggestion">${s}</button>`
    ).join('');
    box.querySelectorAll('.jd-suggestion').forEach(b => {
      b.addEventListener('click', function () {
        document.getElementById('jardinot-input').value = this.textContent.replace(/^[^\s]+\s/, '');
        suggShown = false;
        renderSuggestions();
        sendMessage();
      });
    });
  }

  function addBotMessage(text) {
    appendMessage(text, 'bot');
    history.push({ role: 'assistant', content: text });
  }

  function addUserMessage(text) {
    appendMessage(text, 'user');
    history.push({ role: 'user', content: text });
  }

  function addErrorMessage(text) {
    appendMessage(text, 'error');
  }

  function appendMessage(text, type) {
    const area = document.getElementById('jardinot-messages');
    const div = document.createElement('div');
    div.className = `jd-msg ${type}`;
    div.textContent = text;
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
  }

  function showTyping() {
    const area = document.getElementById('jardinot-messages');
    const div = document.createElement('div');
    div.className = 'jd-typing';
    div.id = 'jd-typing-indicator';
    div.innerHTML = '<div class="jd-dot"></div><div class="jd-dot"></div><div class="jd-dot"></div>';
    area.appendChild(div);
    area.scrollTop = area.scrollHeight;
  }

  function hideTyping() {
    const el = document.getElementById('jd-typing-indicator');
    if (el) el.remove();
  }

  async function sendMessage() {
    if (isLoading) return;
    const input = document.getElementById('jardinot-input');
    const text = input.value.trim();
    if (!text) return;

    input.value = '';
    input.style.height = 'auto';
    suggShown = false;
    renderSuggestions();

    addUserMessage(text);
    isLoading = true;
    document.getElementById('jardinot-send').disabled = true;
    showTyping();

    try {
      const res = await fetch('/api/ai-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: text, history: history.slice(0, -1) })
      });
      const data = await res.json();
      hideTyping();
      if (data.reply) {
        addBotMessage(data.reply);
      } else {
        addErrorMessage(data.error || 'Une erreur est survenue. Réessaye !');
      }
    } catch {
      hideTyping();
      addErrorMessage('Impossible de contacter Jardinot. Vérifie ta connexion.');
    }

    isLoading = false;
    document.getElementById('jardinot-send').disabled = false;
    document.getElementById('jardinot-input').focus();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
