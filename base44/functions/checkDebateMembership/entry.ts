import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';

// Server-side, authoritative membership check for the signed-in user.
// A member is anyone with a paid DebatePayment record of action_type "membership".
Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ authenticated: false, paid: false });

    const matches = await base44.asServiceRole.entities.DebatePayment.filter({
      user_id: user.id,
      action_type: 'membership',
      status: 'paid',
    });
    const paid = !!(matches && matches.length > 0);

    return Response.json({
      authenticated: true,
      paid,
      userId: user.id,
      email: user.email,
      name: user.debate_name || user.full_name || '',
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});