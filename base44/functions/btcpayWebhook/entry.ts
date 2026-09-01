import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';
import { verifyWebhookSignature, finalizeInvoice, finalizeDebatePayment } from '../../shared/btcpay.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);

    // 1. Verify the HMAC signature — never trust an unsigned request.
    const rawBody = await req.text();
    const signature = req.headers.get('BTCPay-Sig') || '';
    const valid = await verifyWebhookSignature(rawBody, signature);
    if (!valid) return Response.json({ error: 'Invalid signature' }, { status: 401 });

    // 2. Parse and filter by event type.
    const event = JSON.parse(rawBody);
    const eventType = event.type;
    if (eventType !== 'InvoiceSettled' && eventType !== 'InvoicePaymentSettled') {
      return Response.json({ ignored: true, reason: 'event not handled: ' + eventType });
    }

    const inv = event.data || event.invoice || {};
    const btcpayId = inv.id;
    if (!btcpayId) return Response.json({ error: 'No invoice id in payload' }, { status: 400 });

    // 3. Determine payment method + transaction id from the webhook payload.
    let paymentMethod = 'lightning';
    let transactionId = '';
    for (const pm of inv.paymentMethods || []) {
      const id = pm.paymentMethodId || '';
      if (id.includes('LN') || id.includes('Lightning')) {
        paymentMethod = 'lightning';
        transactionId = pm.paymentLink || '';
      } else if (id === 'BTC' || id.includes('OnChain') || id.includes('Chain')) {
        paymentMethod = 'onchain';
        transactionId = pm.destination || '';
      }
    }

    // 4. Find the record: product Invoice first, then debate DebatePayment.
    const invMatches = await base44.asServiceRole.entities.Invoice.filter({ btcpay_invoice_id: btcpayId });
    if (invMatches && invMatches.length > 0) {
      const record = invMatches[0];
      if (record.status === 'paid') return Response.json({ ok: true, duplicate: true });
      await finalizeInvoice(base44, record, {
        paymentMethod,
        transactionId,
        btcAmount: record.btc_amount,
      });
      return Response.json({ ok: true, settled: true });
    }

    const dpMatches = await base44.asServiceRole.entities.DebatePayment.filter({ btcpay_invoice_id: btcpayId });
    if (!dpMatches || dpMatches.length === 0) {
      return Response.json({ error: 'Invoice not found' }, { status: 404 });
    }
    const dp = dpMatches[0];
    if (dp.status === 'paid') return Response.json({ ok: true, duplicate: true });

    await finalizeDebatePayment(base44, dp, { paymentMethod, transactionId });
    return Response.json({ ok: true, settled: true });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});