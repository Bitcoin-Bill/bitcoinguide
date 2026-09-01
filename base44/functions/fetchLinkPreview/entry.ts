Deno.serve(async (req) => {
  try {
    const { url } = await req.json();
    if (!url) return Response.json({ error: 'URL required' }, { status: 400 });

    function decodeHtml(str) {
      if (!str) return null;
      return str
        .replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>')
        .replace(/&quot;/g, '"').replace(/&#39;/g, "'").replace(/&#x27;/g, "'").replace(/&apos;/g, "'");
    }

    let hostname = null;
    try { hostname = new URL(url).hostname.replace(/^www\./, ''); } catch {}
    const favicon = hostname ? `https://www.google.com/s2/favicons?domain=${hostname}&sz=64` : null;

    // Detect PDF links — return a document-styled preview instead of fetching HTML
    if (url.toLowerCase().endsWith('.pdf') || url.toLowerCase().includes('bitcoin-whitepaper')) {
      return Response.json({
        type: 'pdf',
        title: null,
        description: null,
        image: null,
        favicon, url, hostname
      });
    }

    // Handle YouTube URLs via oEmbed API
    const ytMatch = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/|shorts\/))([\w-]+)/);
    if (ytMatch) {
      const videoId = ytMatch[1];
      try {
        const oembedRes = await fetch(`https://www.youtube.com/oembed?url=https://www.youtube.com/watch?v=${videoId}&format=json`);
        if (oembedRes.ok) {
          const o = await oembedRes.json();
          return Response.json({
            title: o.title,
            description: `By ${o.author_name} on YouTube`,
            image: o.thumbnail_url,
            favicon: `https://www.google.com/s2/favicons?domain=youtube.com&sz=64`,
            url, hostname: 'youtube.com'
          });
        }
      } catch {}
    }

    // Hardcoded previews for known bot-blocked sites
    const knownSites = {
      'strike.me': {
        title: 'Strike | Buy, sell & send bitcoin – low fees & high limits',
        description: 'Strike is the best place for bitcoin with ultra-low fees, high trading limits, and easy transactions. Buy, sell, or send bitcoin seamlessly–ideal for all users.',
        image: 'https://www.datocms-assets.com/99305/1728911016-og.png?auto=format&fit=max&w=1200',
      },
    };

    if (hostname && knownSites[hostname]) {
      const cached = knownSites[hostname];
      return Response.json({
        title: cached.title,
        description: cached.description,
        image: cached.image,
        favicon, url, hostname
      });
    }

    // Generic fetch with browser-like headers
    const response = await fetch(url, {
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
        'Accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8',
        'Accept-Language': 'en-US,en;q=0.9',
        'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
        'Sec-Fetch-Dest': 'document',
        'Sec-Fetch-Mode': 'navigate',
        'Sec-Fetch-Site': 'none',
        'Upgrade-Insecure-Requests': '1',
      },
      redirect: 'follow'
    });

    const html = await response.text();

    const getMeta = (property) => {
      const patterns = [
        new RegExp(`<meta[^>]*(?:property|name)=["']${property}["'][^>]*content=["']([^"']*)["']`, 'i'),
        new RegExp(`<meta[^>]*content=["']([^"']*)["'][^>]*(?:property|name)=["']${property}["']`, 'i'),
      ];
      for (const p of patterns) {
        const m = html.match(p);
        if (m) return decodeHtml(m[1]);
      }
      return null;
    };

    let title = getMeta('og:title') || getMeta('twitter:title') || html.match(/<title[^>]*>([^<]*)<\/title>/i)?.[1]?.trim() || null;
    title = decodeHtml(title);

    if (!title) {
      const h1Match = html.match(/<h1[^>]*>([^<]+)<\/h1>/i);
      if (h1Match) title = decodeHtml(h1Match[1].trim());
    }

    let description = getMeta('og:description') || getMeta('twitter:description') || getMeta('description') || null;
    let image = getMeta('og:image') || getMeta('twitter:image') || null;
    if (image && !image.startsWith('http')) {
      try { image = new URL(image, url).href; } catch {}
    }

    return Response.json({ title, description, image, favicon, url, hostname });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});