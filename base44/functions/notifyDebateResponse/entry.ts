import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

// Emails the proposer of a debate when another member responds.
// Notifications are ON by default; a proposer can opt out via debate_notify=false.
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json().catch(() => ({}));
    const debateId = body?.debateId;
    if (!debateId) return Response.json({ error: 'debateId required' }, { status: 400 });

    const debate = await base44.asServiceRole.entities.Debate.get(debateId);
    const proposerId = debate.proposer_id;
    if (!proposerId || proposerId === user.id) {
      return Response.json({ notified: false, reason: 'own_debate' });
    }

    const proposer = await base44.asServiceRole.entities.User.get(proposerId).catch(() => null);
    if (!proposer || !proposer.email) {
      return Response.json({ notified: false, reason: 'no_proposer' });
    }

    if (proposer.debate_notify === false) {
      return Response.json({ notified: false, reason: 'disabled' });
    }

    const responderName = user.debate_name || user.full_name || 'A member';
    const topic = debate.topic || 'your debate prompt';
    const base = (body?.origin || 'https://bitcoinguide.app').replace(/\/$/, '');

    await base44.asServiceRole.integrations.Core.SendEmail({
      to: proposer.email,
      subject: 'New response to your debate',
      body:
        `${responderName} responded to your debate prompt:\n\n"${topic}"\n\n` +
        `View and reply on the forum:\n${base}/debate`,
    });

    return Response.json({ notified: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});