import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

// Server-authoritative debate creation for paid members.
// Used for both posting a new debate (parentDebateId empty) and forking an
// existing one (parentDebateId set, with a brand-new prompt heading).
// Runs as service role so proposer_id + arguments actually persist
// (user-context creates were silently dropping those fields).
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    // Verify paid membership server-side.
    const memberships = await base44.asServiceRole.entities.DebatePayment.filter({
      user_id: user.id,
      action_type: 'membership',
      status: 'paid',
    });
    if (!memberships || memberships.length === 0) {
      return Response.json({ error: 'Not a member' }, { status: 403 });
    }

    const body = await req.json();
    const { topic, side, parentDebateId } = body || {};
    if (!topic || !String(topic).trim()) {
      return Response.json({ error: 'topic required' }, { status: 400 });
    }
    const argSide = side === 'con' ? 'con' : 'pro';

    // When forking, confirm the parent debate exists.
    if (parentDebateId) {
      try {
        await base44.asServiceRole.entities.Debate.get(parentDebateId);
      } catch (e) {
        return Response.json({ error: 'parent debate not found' }, { status: 400 });
      }
    }

    const name = (user.debate_name || user.full_name || 'Member').trim();
    const now = new Date().toISOString();

    const created = await base44.asServiceRole.entities.Debate.create({
      topic: String(topic).trim(),
      proposer_id: user.id,
      proposer_name: name,
      challenger_id: null,
      challenger_name: null,
      status: 'open',
      time_limit: 10,
      parent_debate_id: parentDebateId || '',
      votes: [],
      arguments: [
        {
          id: `a-${Date.now()}`,
          author_id: user.id,
          author_name: name,
          side: argSide,
          text: String(topic).trim(),
          note: null,
          created_date: now,
        },
      ],
    });

    return Response.json({ id: created.id, topic: created.topic });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});