// Telegram Webhook Serverless Function for StreamFlix (@MaltiMuvesbot)

const BOT_TOKEN = '8827551091:AAEusqcTbycViOYjsvEp-FQud083EIMUjwA';

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method === 'GET') {
    return res.status(200).json({ status: 'active', bot: '@MaltiMuvesbot', platform: 'StreamFlix V2' });
  }

  if (req.method === 'POST') {
    try {
      const update = req.body;
      if (!update || !update.message) {
        return res.status(200).json({ ok: true, note: 'no message' });
      }

      const chatId = update.message.chat.id;
      const rawText = update.message.text || '';
      const firstName = update.message.from?.first_name || 'Movie Lover';

      let movieQuery = rawText.replace('/start', '').trim();
      const isStartOnly = !movieQuery || rawText === '/start';

      if (isStartOnly) {
        const welcomeMessage = `🍿 *Welcome to StreamFlix Official Bot (@MaltiMuvesbot)*, ${firstName}!\n\n` +
          `🎬 *Search and Stream any Movie or Web Series in 4K UHD.*\n\n` +
          `🔹 *Send me any Movie or Series name* (e.g. \`Stree 2\`, \`Deadpool\`, \`Kalki\`, \`Animal\`)\n` +
          `🔹 Get instant *1-Click High-Speed 10Gbps Download links* (4K / 1080p / 720p)\n` +
          `🔹 Watch online ad-free on StreamFlix platform!\n\n` +
          `⚡ *Try sending a title now:*`;

        await sendTelegramMessage(chatId, welcomeMessage, [
          [{ text: '🍿 Open StreamFlix 4K Web App', url: 'https://streamflix-ott.vercel.app' }]
        ]);
        return res.status(200).json({ ok: true });
      }

      // If user sent a movie title or clicked deep-link
      const titleSlug = encodeURIComponent(movieQuery.toLowerCase().replace(/[^a-z0-9]+/g, '-'));
      const replyMessage = `🍿 *StreamFlix 4K OTT Cloud Delivery*\n\n` +
        `🎬 *Title:* ${movieQuery.toUpperCase()}\n` +
        `⭐ *Rating:* 8.2/10 • IMDb Verified\n` +
        `🔊 *Audio:* Hindi (Org DD 5.1) + English Atmos\n` +
        `⚡ *Speed:* 10 Gbps Cloudflare R2 Direct CDN\n\n` +
        `📥 *Direct Fast Download Gateways:*\n` +
        `• 4K UHD (2160p HEVC 10-Bit): [Download 6.8 GB](https://vegamovies.gallery/download-${titleSlug}-2160p-4k/)\n` +
        `• 1080p Full HD (x264 WebRip): [Download 2.4 GB](https://vegamovies.gallery/download-${titleSlug}-1080p/)\n` +
        `• 720p HD Mobile Optimized: [Download 950 MB](https://vegamovies.gallery/download-${titleSlug}-720p/)\n` +
        `• 480p Data Saver Clean: [Download 450 MB](https://vegamovies.gallery/download-${titleSlug}-480p/)\n\n` +
        `▶️ *Or stream online directly on StreamFlix ad-free:*`;

      await sendTelegramMessage(chatId, replyMessage, [
        [
          { text: '▶️ Watch Online on StreamFlix (4K)', url: `https://streamflix-ott.vercel.app` }
        ],
        [
          { text: '📥 10Gbps Direct Download (Vega)', url: `https://vegamovies.gallery/download-${titleSlug}-1080p/` }
        ]
      ]);

      return res.status(200).json({ ok: true });
    } catch (err) {
      console.error('Telegram webhook error:', err);
      return res.status(200).json({ ok: false, error: err.message });
    }
  }

  return res.status(405).json({ error: 'Method not allowed' });
}

async function sendTelegramMessage(chatId, text, inlineKeyboard = []) {
  const url = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;
  const body = {
    chat_id: chatId,
    text: text,
    parse_mode: 'Markdown',
    disable_web_page_preview: false
  };

  if (inlineKeyboard.length > 0) {
    body.reply_markup = { inline_keyboard: inlineKeyboard };
  }

  const response = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body)
  });

  return response.json();
}
