import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';
import { getCheckoutSession, mapSessionStatus, extractSessionPayment } from '../../shared/speed.ts';
import { finalizeDebatePayment } from '../../shared/btcpay.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    const body = await req.json();
    const { debateRecordId } = body;
    if (!debateRecordId) return Response.json({ error: 'debateRecordId required' }, { status: 400 });

    const record = await base44.asServiceRole.entities.DebatePayment.get(debateRecordId);
    if (!record) return Response.json({ error: 'not found' }, { status: 404 });

    if (record.status === 'paid') {
      return Response.json({
        status: 'paid',
        settled: true,
        debateRecordId: record.id,
        receiptId: record.receipt_id || '',
        userId: record.user_id,
        userName: record.user_name,
        actionType: record.action_type,
      });
    }

    if (!record.btcpay_invoice_id) {
      return Response.json({ status: 'new', settled: false, debateRecordId: record.id });
    }

    const session = await getCheckoutSession(record.btcpay_invoice_id);
    const m = mapSessionStatus(session.status);

    let fin = null;
    if (m.settled) {
      const { paymentMethod, transactionId } = extractSessionPayment(session);
      fin = await finalizeDebatePayment(base44, record, { paymentMethod, transactionId });
    }

    return Response.json({
      status: m.internal,
      settled: m.settled,
      debateRecordId: record.id,
      receiptId: fin?.receiptId || record.receipt_id || '',
      userId: record.user_id,
      userName: record.user_name,
      actionType: record.action_type,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});