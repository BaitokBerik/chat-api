export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  if (req.method === 'OPTIONS') return res.status(200).end();
  if (req.method !== 'POST') return res.status(405).json({ error: 'Только POST'});
  
  const { message } = req.body;
  if (!message) return res.status(400).json({ error: 'Нет сообщения' });

  try {
    const apiKey = process.env.OPENAI_API_KEY;
    const openaiRes = await fetch('https://api.openai.com/v1/chat/completions', {
      method:'POST',
      headers:{
        'Content-Type':'application/json',
        'Authorization':`Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: `
Ты — Байтуков Берик Кайратович, налоговый аналитик с 14+ лет опыта.
Работаю в Департаменте государственных доходов Казахстана,
специализируюсь на налоговой аналитике, автоматизации и BI.
Говори от первого лица, делай акцент на налоговом опыте и кейсах.
`
          },
          { role: 'user', content: message }
        ],
        temperature: 0.7
      })
    });
    const data = await openaiRes.json();
    const reply = data.choices?.[0]?.message?.content || '⚠️ Нет ответа';
    res.status(200).json({ reply });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Ошибка сервера' });
  }
}
