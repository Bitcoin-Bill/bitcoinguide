import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';
import { createCheckoutSession } from '../../shared/speed.ts';
import { finalizeDebatePayment } from '../../shared/btcpay.ts';

const SATS = 2100;
const COMMENT_SATS = 21;

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { action, debateId, topic, commentText, redirectUrl } = body;
    const validActions = ['membership', 'post', 'engage', 'fork', 'comment'];
    if (!validActions.includes(action)) {
      return Response.json({ error: 'invalid action' }, { status: 400 });
    }
    if ((action === 'post' || action === 'fork') && !topic?.trim()) {
      return Response.json({ error: 'topic required' }, { status: 400 });
    }
    if ((action === 'engage' || action === 'fork' || action === 'comment') && !debateId) {
      return Response.json({ error: 'debateId required' }, { status: 400 });
    }
    if (action === 'comment' && !commentText?.trim()) {
      return Response.json({ error: 'commentText required' }, { status: 400 });
    }

    const userId = user.id;
    const userName = (user.debate_name || user.full_name || 'Member').trim();
    const orderId = 'DBT-' + Date.now().toString(36).toUpperCase();
    const amount = action === 'comment' ? COMMENT_SATS : SATS;

    // Create the DebatePayment record first so the Speed session can reference it.
    const record = await base44.asServiceRole.entities.DebatePayment.create({
      order_id: orderId,
      action_type: action,
      user_id: userId,
      user_email: user.email,
      user_name: userName,
      debate_id: debateId || '',
      topic: topic?.trim() || '',
      comment_text: commentText?.trim() || '',
      amount_sats: amount,
      status: 'new',
    });

    const metadata = {
      orderId,
      action,
      debateId: debateId || '',
      debatePaymentId: record.id,
      userId,
      userEmail: user.email,
    };

    const session = await createCheckoutSession({
      currency: 'SATS',
      amount,
      metadata,
      description: `Bitcoin Bill debate — ${action}`,
      successUrl: redirectUrl || undefined,
    });

    // Store the Speed checkout session id + url on the record for polling.
    await base44.asServiceRole.entities.DebatePayment.update(record.id, {
      btcpay_invoice_id: session.id,
      checkout_url: session.url || session.default_url || '',
    });

    return Response.json({
      invoiceId: session.id,
      debateRecordId: record.id,
      orderId,
      checkoutUrl: session.url || session.default_url || '',
      lightningInvoice: '',
      bitcoinAddress: '',
      amountSats: amount,
      userId,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});