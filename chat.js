document.getElementById('sendBtn').addEventListener('click', handleSend);
document.getElementById('userInput').addEventListener('keypress', e => {
  if (e.key === 'Enter') handleSend();
});

async function handleSend() {
  const inp = document.getElementById('userInput');
  const text = inp.value.trim();
  if (!text) return;
  appendMessage(text, true);
  inp.value = '';
  appendMessage('Думаю…', false);

  try {
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: {'Content-Type':'application/json'},
      body: JSON.stringify({ message: text })
    });
    const { reply } = await res.json();
    // заменяем «Думаю…»
    const chat = document.getElementById('chat');
    chat.lastChild.remove();
    appendMessage(reply, false);
  } catch {
    appendMessage('⚠️ Ошибка запроса', false);
  }
}
