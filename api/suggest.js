// StreamFlix Global Search & Suggest Proxy API (Serverless)

export default async function handler(req, res) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
  res.setHeader('Cache-Control', 's-maxage=1800, stale-while-revalidate=86400');

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  const { q } = req.query;
  if (!q || q.trim().length < 2) {
    return res.status(200).json({ results: [] });
  }

  try {
    const upstreamUrl = `https://api2new.imdb4.shop/suggest.php?q=${encodeURIComponent(q.trim())}`;
    const response = await fetch(upstreamUrl, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
      }
    });

    if (!response.ok) {
      return res.status(200).json({ results: [] });
    }

    const data = await response.json();
    if (!data || !data.results || !Array.isArray(data.results)) {
      return res.status(200).json({ results: [] });
    }

    const formatted = data.results.map((item, index) => {
      const poster = item.backdrop_path || item.poster_path || "https://images.unsplash.com/photo-1536440136628-849c177e76a1?w=800&auto=format&fit=crop&q=80";
      return {
        id: item.id || (100000 + index),
        imdb_id: item.imdb_id || "",
        title: item.title,
        backdrop_path: poster,
        poster_path: poster,
        vote_average: item.vote_average ? Number(item.vote_average).toFixed(1) : "7.4",
        release_date: item.release_date ? String(item.release_date) : "2024",
        quality: "4K UHD",
        duration: "2h 14m",
        audio: "Hindi (ORG DD 5.1) + English",
        genres: [item.type === 'feature' ? 'Movie' : (item.type || 'Cinema'), 'Drama'],
        overview: `Watch and download ${item.title} in ultra high-definition 4K and 1080p with original Hindi dual audio tracks.`
      };
    });

    return res.status(200).json({ results: formatted });
  } catch (error) {
    console.error('Suggest API error:', error);
    return res.status(200).json({ results: [] });
  }
}
