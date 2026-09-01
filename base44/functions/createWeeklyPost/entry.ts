import { createClientFromRequest } from 'npm:@base44/sdk@0.8.40';

export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);

    // Resolve this week's Sunday (local-equivalent) as the week_of date.
    const now = new Date();
    const sunday = new Date(now);
    sunday.setDate(now.getDate() - now.getDay());
    const weekOf = sunday.toISOString().split('T')[0];
    const title = `This Week in Bitcoin — week of ${weekOf}`;

    // Sunday run: skip if this week's post already exists AND is populated (idempotent).
    // Mid-week runs (e.g. Wednesday) refresh the existing post with the latest news.
    const isSunday = now.getDay() === 0;
    const existing = await base44.asServiceRole.entities.WeeklyBitcoin.filter({ week_of: weekOf });
    if (existing && existing.length > 0) {
      const post = existing[0];
      const hasItems = (post.items || []).length > 0;
      if (hasItems && isSunday) {
        return Response.json({ ok: true, alreadyExists: true, id: post.id });
      }
      const items = await fetchWeeklyItems(base44, weekOf);
      const updated = await base44.asServiceRole.entities.WeeklyBitcoin.update(post.id, {
        title,
        summary: items.summary,
        items: items.items
      });
      return Response.json({ ok: true, updated: true, id: updated.id, items: items.items.length, refreshed: hasItems });
    }

    const items = await fetchWeeklyItems(base44, weekOf);
    const created = await base44.asServiceRole.entities.WeeklyBitcoin.create({
      week_of: weekOf,
      title,
      summary: items.summary,
      items: items.items
    });

    return Response.json({ ok: true, id: created.id, items: items.items.length });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}

async function fetchWeeklyItems(base44, weekOf) {
  const prompt = `You are a Bitcoin news curator. Search the web for the most important Bitcoin (BTC) news stories from THIS WEEK (the week leading up to ${weekOf}).

Return a JSON object with:
- "summary": one concise sentence (max 220 chars) summarizing the week's Bitcoin market narrative.
- "items": an array of 6 to 8 of the most notable stories. Each item must have:
  - "category": one of "hot_topic", "news", "x_post", or "other" (use "hot_topic" for the 1-2 biggest market-moving stories, "x_post" for notable analyst/CEO quotes or social posts, "news" for the rest)
  - "title": a clear headline (no quotes, no trailing period)
  - "url": the direct source URL of the story
  - "source": the outlet or handle (e.g. "CoinDesk", "CNBC", "@saylor")
  - "description": 1-2 sentences explaining the story and why it matters (max 320 chars)
  - "popup": false

Prioritize: major price moves, ETF flows, regulatory/government news, corporate treasury activity, mining/energy, and notable analyst commentary. Use real, verifiable stories and real URLs from this week only. Do not invent stories or URLs.`;

  const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
    prompt,
    add_context_from_internet: true,
    model: 'gemini_3_flash',
    response_json_schema: {
      type: 'object',
      properties: {
        summary: { type: 'string' },
        items: {
          type: 'array',
          items: {
            type: 'object',
            properties: {
              category: { type: 'string', enum: ['hot_topic', 'news', 'x_post', 'other'] },
              title: { type: 'string' },
              url: { type: 'string' },
              source: { type: 'string' },
              description: { type: 'string' },
              popup: { type: 'boolean' }
            },
            required: ['category', 'title', 'url', 'source', 'description']
          }
        }
      },
      required: ['summary', 'items']
    }
  });

  const items = Array.isArray(result?.items) ? result.items.map((it) => ({
    category: ['hot_topic', 'news', 'x_post', 'other'].includes(it.category) ? it.category : 'news',
    title: String(it.title || '').slice(0, 200),
    url: String(it.url || ''),
    source: String(it.source || ''),
    description: String(it.description || '').slice(0, 500),
    popup: false
  })).filter((it) => it.title && it.url) : [];

  return {
    summary: String(result?.summary || '').slice(0, 300),
    items
  };
}