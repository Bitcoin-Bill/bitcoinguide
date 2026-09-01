import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';
import { getGreenfieldInvoice, mapStatus, finalizeInvoice } from '../../shared/btcpay.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { invoiceRecordId } = body;
    if (!invoiceRecordId) return Response.json({ error: 'invoiceRecordId required' }, { status: 400 });

    const record = await base44.asServiceRole.entities.Invoice.get(invoiceRecordId);
    if (!record) return Response.json({ error: 'Invoice not found' }, { status: 404 });
    if (record.user_id !== user.id) return Response.json({ error: 'Forbidden' }, { status: 403 });

    const inv = await getGreenfieldInvoice(record.btcpay_invoice_id);
    const m = mapStatus(inv.status);

    // Finalize on the client-poll path too (webhook may be faster, both are idempotent).
    if (m.settled && record.status !== 'paid') {
      let paymentMethod = record.payment_method || 'lightning';
      let transactionId = record.transaction_id || '';
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
      await finalizeInvoice(base44, record, {
        paymentMethod,
        transactionId,
        btcAmount: record.btc_amount,
      });
    }

    return Response.json({
      status: m.internal,
      settled: m.settled,
      rawStatus: inv.status,
      invoiceRecordId: record.id,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});