// Shared BTCPay Server Greenfield helpers used by all paywall backend functions.
// Docs: https://docs.btcpayserver.org/API/Greenfield/v1/

export function btcpayConfig() {
  return {
    host: (Deno.env.get("BTCPAY_HOST") || "").replace(/\/$/, ""),
    apiKey: Deno.env.get("BTCPAY_API_KEY"),
    storeId: Deno.env.get("BTCPAY_STORE_ID"),
    webhookSecret: Deno.env.get("BTCPAY_WEBHOOK_SECRET"),
  };
}

async function greenfield(path, init = {}) {
  const { host, apiKey } = btcpayConfig();
  if (!host || !apiKey) throw new Error("BTCPAY_HOST or BTCPAY_API_KEY not set");
  const res = await fetch(`${host}${path}`, {
    ...init,
    headers: {
      Authorization: `token ${apiKey}`,
      "Content-Type": "application/json",
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    const { storeId } = btcpayConfig();
    throw new Error(
      `BTCPay ${res.status}: ${body} | host=${host} | storeIdLen=${storeId ? storeId.length : 0} | apiKeyLen=${apiKey ? apiKey.length : 0}`
    );
  }
  return res.json();
}

// GET /api/v1/stores/{storeId}/invoices/{id} — uses the single API key (needs canviewinvoices).
export async function getGreenfieldInvoice(id) {
  const { storeId } = btcpayConfig();
  return greenfield(`/api/v1/stores/${storeId}/invoices/${id}`);
}

// POST /api/v1/stores/{storeId}/invoices
export async function createGreenfieldInvoice({ amount, currency, metadata, redirectUrl, paymentMethods }) {
  const { storeId } = btcpayConfig();
  if (!storeId) throw new Error("BTCPAY_STORE_ID not set");
  const checkout = {};
  if (redirectUrl) {
    checkout.redirectURL = redirectUrl;
    checkout.redirectAutomatically = true;
  }
  if (paymentMethods) checkout.paymentMethods = paymentMethods;
  const body = {
    amount: String(amount),
    currency: currency || "USD",
    metadata: metadata || {},
    checkout,
  };
  return greenfield(`/api/v1/stores/${storeId}/invoices`, {
    method: "POST",
    body: JSON.stringify(body),
  });
}

// Extract the Lightning BOLT11 and on-chain address from paymentMethods.
export function extractPaymentMethods(paymentMethods) {
  let lightningInvoice = "";
  let bitcoinAddress = "";
  let paymentMethod = "";
  for (const pm of paymentMethods || []) {
    const id = pm.paymentMethodId || "";
    if (id.includes("LN") || id.includes("Lightning")) {
      lightningInvoice = pm.paymentLink || "";
      if (!paymentMethod) paymentMethod = "lightning";
    } else if (id === "BTC" || id.includes("OnChain") || id.includes("Chain")) {
      bitcoinAddress = pm.destination || "";
      if (!paymentMethod) paymentMethod = "onchain";
    }
  }
  return { lightningInvoice, bitcoinAddress, paymentMethod };
}

// Map BTCPay invoice status to our internal status. Settled = funds confirmed enough to unlock.
export function mapStatus(status) {
  if (["Settled", "Paid", "Complete", "Confirmed", "Processing"].includes(status)) return { internal: "paid", settled: true };
  if (status === "Expired") return { internal: "expired", settled: false };
  if (status === "Invalid") return { internal: "failed", settled: false };
  return { internal: "new", settled: false };
}

// Verify the BTCPay webhook HMAC signature (BTCPay-Sig header = "sha256=<hex>").
export async function verifyWebhookSignature(rawBody, signature) {
  const { webhookSecret } = btcpayConfig();
  if (!webhookSecret || !signature) return false;
  const sig = signature.startsWith("sha256=") ? signature.slice(7) : signature;
  const key = await crypto.subtle.importKey(
    "raw",
    new TextEncoder().encode(webhookSecret),
    { name: "HMAC", hash: "SHA-256" },
    false,
    ["verify"]
  );
  const data = new TextEncoder().encode(rawBody);
  const sigBytes = hexToBytes(sig);
  return await crypto.subtle.verify("HMAC", key, sigBytes, data);
}

function hexToBytes(hex) {
  const clean = hex.replace(/[^0-9a-fA-F]/g, "");
  const arr = new Uint8Array(clean.length / 2);
  for (let i = 0; i < arr.length; i++) arr[i] = parseInt(clean.substr(i * 2, 2), 16);
  return arr;
}

// Idempotent finalization: mark invoice paid, grant access, create receipt.
// Safe to call from both the polling endpoint and the webhook — duplicates are skipped.
export async function finalizeInvoice(base44, record, settled) {
  // 1. Update the invoice record (skip if already paid)
  if (record.status !== "paid") {
    await base44.asServiceRole.entities.Invoice.update(record.id, {
      status: "paid",
      payment_method: settled.paymentMethod,
      transaction_id: settled.transactionId || record.transaction_id || "",
      btc_amount: settled.btcAmount ?? record.btc_amount ?? 0,
      settled_date: new Date().toISOString(),
    });
  }

  // 2. Grant access (idempotent)
  const existingAccess = await base44.asServiceRole.entities.Access.filter({
    user_id: record.user_id,
    product_id: record.product_id,
  });
  if (!existingAccess || existingAccess.length === 0) {
    await base44.asServiceRole.entities.Access.create({
      user_id: record.user_id,
      product_id: record.product_id,
    });
  }

  // 3. Generate receipt (idempotent)
  const existingReceipt = await base44.asServiceRole.entities.Receipt.filter({
    invoice_id: record.id,
  });
  if (!existingReceipt || existingReceipt.length === 0) {
    const receiptNumber = "R" + Date.now().toString(36).toUpperCase() + Math.floor(Math.random() * 36).toString(36);
    await base44.asServiceRole.entities.Receipt.create({
      invoice_id: record.id,
      btcpay_invoice_id: record.btcpay_invoice_id,
      receipt_number: receiptNumber,
      product_id: record.product_id,
      product_name: record.product_name,
      user_id: record.user_id,
      user_email: record.user_email,
      btc_amount: settled.btcAmount ?? record.btc_amount ?? 0,
      fiat_amount: record.amount,
      currency: record.currency,
      payment_method: settled.paymentMethod,
      transaction_id: settled.transactionId || record.transaction_id || "",
      store_name: "BTCPay Store",
    });
  }
}

// Create a sats-denominated BTCPay invoice (BTC currency, amount in BTC).
export async function createSatsInvoice({ sats, metadata, redirectUrl }) {
  const btcAmount = (sats / 1e8).toFixed(8).replace(/\.?0+$/, "");
  return createGreenfieldInvoice({ amount: btcAmount, currency: "BTC", metadata, redirectUrl, paymentMethods: ["BTC-LightningNetwork"] });
}

function makeReceiptId() {
  return "DR-" + Date.now().toString(36).toUpperCase() + "-" + Math.floor(Math.random() * 46656).toString(36).toUpperCase();
}

// Idempotent finalization for a debate payment.
// "membership" actions: just mark paid + issue a receipt id (no debate created).
// post/engage/fork/comment: execute the action exactly once, then mark paid.
export async function finalizeDebatePayment(base44, record, settled) {
  if (record.status === "paid") {
    return { alreadyPaid: true, receiptId: record.receipt_id || "", userId: record.user_id };
  }

  const now = new Date().toISOString();
  const name = record.user_name || record.user_email || "Anonymous";
  const receiptId = record.receipt_id || makeReceiptId();

  // Membership unlock — no debate record is created.
  if (record.action_type === "membership") {
    await base44.asServiceRole.entities.DebatePayment.update(record.id, {
      status: "paid",
      receipt_id: receiptId,
      payment_method: settled.paymentMethod,
      transaction_id: settled.transactionId || "",
      settled_date: now,
    });
    return { alreadyPaid: false, receiptId, userId: record.user_id };
  }

  const Debate = base44.asServiceRole.entities.Debate;
  let resultDebateId = record.result_debate_id || "";
  let resultArgumentId = record.result_argument_id || "";

  if ((record.action_type === "post" || record.action_type === "fork") && !resultDebateId) {
    const created = await Debate.create({
      topic: record.topic || "",
      proposer_id: record.user_id,
      proposer_name: name,
      challenger_id: null,
      challenger_name: null,
      status: "open",
      time_limit: 10,
      parent_debate_id: record.action_type === "fork" ? record.debate_id : "",
      votes: [],
      arguments: [{
        id: `a-${Date.now()}`,
        author_id: record.user_id,
        author_name: name,
        side: "pro",
        text: record.topic || "",
        note: null,
        created_date: now,
      }],
    });
    resultDebateId = created.id;
  } else if (record.action_type === "engage" && !resultArgumentId) {
    const fresh = await Debate.get(record.debate_id);
    const argId = `r-${Date.now()}`;
    await Debate.update(record.debate_id, {
      status: "engaged",
      challenger_id: record.user_id,
      challenger_name: name,
      arguments: [...(fresh.arguments || []), {
        id: argId,
        author_id: record.user_id,
        author_name: name,
        side: "con",
        text: record.comment_text || "",
        note: null,
        created_date: now,
      }],
    });
    resultArgumentId = argId;
  } else if (record.action_type === "comment" && !resultArgumentId) {
    const fresh = await Debate.get(record.debate_id);
    const argId = `c-${Date.now()}`;
    await Debate.update(record.debate_id, {
      arguments: [...(fresh.arguments || []), {
        id: argId,
        author_id: record.user_id,
        author_name: name,
        side: "comment",
        text: record.comment_text || "",
        note: null,
        created_date: now,
      }],
    });
    resultArgumentId = argId;
  }

  await base44.asServiceRole.entities.DebatePayment.update(record.id, {
    status: "paid",
    receipt_id: receiptId,
    payment_method: settled.paymentMethod,
    transaction_id: settled.transactionId || "",
    settled_date: now,
    result_debate_id: resultDebateId,
    result_argument_id: resultArgumentId,
  });

  return { alreadyPaid: false, receiptId, resultDebateId, resultArgumentId, userId: record.user_id };
}