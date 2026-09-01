import { createClientFromRequest } from 'npm:@base44/sdk@0.8.38';
import { createGreenfieldInvoice, extractPaymentMethods } from '../../shared/btcpay.ts';

Deno.serve(async (req) => {
  try {
    const base44 = createClientFromRequest(req);
    const user = await base44.auth.me();
    if (!user) return Response.json({ error: 'Unauthorized' }, { status: 401 });

    const body = await req.json();
    const { productId, redirectUrl } = body;
    if (!productId) return Response.json({ error: 'productId required' }, { status: 400 });

    const product = await base44.asServiceRole.entities.Product.get(productId);
    if (!product) return Response.json({ error: 'Product not found' }, { status: 404 });

    const orderId = 'ORD-' + Date.now().toString(36).toUpperCase();
    const metadata = {
      orderId,
      productId: product.id,
      productName: product.title,
      userId: user.id,
      userEmail: user.email,
    };

    const inv = await createGreenfieldInvoice({
      amount: product.price,
      currency: product.currency || 'USD',
      metadata,
      redirectUrl,
    });

    const { lightningInvoice, bitcoinAddress } = extractPaymentMethods(inv.paymentMethods);

    const record = await base44.asServiceRole.entities.Invoice.create({
      order_id: orderId,
      btcpay_invoice_id: inv.id,
      product_id: product.id,
      product_name: product.title,
      user_id: user.id,
      user_email: user.email,
      amount: product.price,
      currency: product.currency || 'USD',
      status: 'new',
      checkout_url: inv.checkoutLink,
      lightning_invoice: lightningInvoice,
      bitcoin_address: bitcoinAddress,
    });

    return Response.json({
      invoiceId: inv.id,
      invoiceRecordId: record.id,
      orderId,
      checkoutUrl: inv.checkoutLink,
      lightningInvoice,
      bitcoinAddress,
      amount: product.price,
      currency: product.currency || 'USD',
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});