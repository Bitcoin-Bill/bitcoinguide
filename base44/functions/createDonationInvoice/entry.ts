// Public donation invoice via BTCPay Server. The donor picks the unit
// (sats, BTC, or USD) and an amount; we create a single invoice payable with
// Lightning or on-chain BTC. No login or database record required.
import { createGreenfieldInvoice, extractPaymentMethods } from '../../shared/btcpay.ts';

// Fetch the current BTC/USD spot price. We convert USD donations to a BTC
// invoice ourselves so the donation works even when the BTCPay store has no
// working fiat rate source configured.
async function getBtcUsdRate() {
  const headers = { Accept: 'application/json', 'User-Agent': 'base44-btc-guide/1.0' };

  // 1) CoinGecko
  try {
    const res = await fetch(
      'https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd',
      { headers }
    );
    if (res.ok) {
      const data = await res.json();
      const rate = Number(data?.bitcoin?.usd);
      if (Number.isFinite(rate) && rate > 0) return rate;
    }
  } catch {}

  // 2) Coinbase spot price
  try {
    const res = await fetch('https://api.coinbase.com/v2/prices/BTC-USD/spot', { headers });
    if (res.ok) {
      const data = await res.json();
      const rate = Number(data?.data?.amount);
      if (Number.isFinite(rate) && rate > 0) return rate;
    }
  } catch {}

  throw new Error('Unable to fetch BTC/USD rate right now');
}

Deno.serve(async (req) => {
  try {
    const body = await req.json().catch(() => ({}));
    const currency = String(body?.currency || 'sats').toLowerCase();
    const rawAmount = Number(body?.amount);

    if (!Number.isFinite(rawAmount) || rawAmount <= 0) {
      return Response.json({ error: 'amount required (must be > 0)' }, { status: 400 });
    }

    let invAmount;
    let invCurrency;
    if (currency === 'usd') {
      const rate = await getBtcUsdRate();
      invAmount = (rawAmount / rate).toFixed(8).replace(/\.?0+$/, '');
      invCurrency = 'BTC';
    } else if (currency === 'btc') {
      invAmount = rawAmount.toFixed(8).replace(/\.?0+$/, '');
      invCurrency = 'BTC';
    } else {
      // sats -> BTC
      invAmount = (rawAmount / 1e8).toFixed(8).replace(/\.?0+$/, '');
      invCurrency = 'BTC';
    }

    const inv = await createGreenfieldInvoice({
      amount: invAmount,
      currency: invCurrency,
      metadata: { type: 'donation', amount: rawAmount, currency },
      paymentMethods: ['BTC-LightningNetwork', 'BTC-OnChain'],
      // Note: USD is converted to BTC above before reaching BTCPay, so the
      // store never needs a fiat rate source.
    });

    const { lightningInvoice, bitcoinAddress } = extractPaymentMethods(inv.paymentMethods);

    return Response.json({
      invoiceId: inv.id,
      checkoutUrl: inv.checkoutLink,
      lightningInvoice,
      bitcoinAddress,
      amount: rawAmount,
      currency,
    });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
});