// Shared Speed (tryspeed.com) API helpers for the debate membership flow.
// Docs: https://apidocs.tryspeed.com/
// Auth: HTTP Basic with the secret key as username, empty password.

const SPEED_API = "https://api.tryspeed.com";
const SPEED_VERSION = "2022-10-15"; // supports on-chain, lightning, ethereum, solana, tron

export function speedConfig() {
  const secretKey = Deno.env.get("SPEED_SECRET_KEY");
  if (!secretKey) throw new Error("SPEED_SECRET_KEY not set");
  return { secretKey };
}

async function speedApi(path, init = {}) {
  const { secretKey } = speedConfig();
  const basic = btoa(`${secretKey}:`);
  const res = await fetch(`${SPEED_API}${path}`, {
    ...init,
    headers: {
      Authorization: `Basic ${basic}`,
      "Content-Type": "application/json",
      "speed-version": SPEED_VERSION,
      ...(init.headers || {}),
    },
  });
  if (!res.ok) {
    const body = await res.text();
    throw new Error(`Speed ${res.status}: ${body}`);
  }
  return res.json();
}

// POST /checkout-sessions — create a one-time checkout session.
export async function createCheckoutSession({ currency, amount, metadata, description, successUrl, cancelUrl }) {
  const body = {
    currency: currency || "SATS",
    amount,
    ...(description ? { description } : {}),
    ...(metadata ? { metadata } : {}),
    ...(successUrl ? { success_url: successUrl } : {}),
    ...(cancelUrl ? { cancel_url: cancelUrl } : {}),
  };
  return speedApi("/checkout-sessions", { method: "POST", body: JSON.stringify(body) });
}

// GET /checkout-sessions/{id} — retrieve status + payments.
export async function getCheckoutSession(id) {
  return speedApi(`/checkout-sessions/${id}`);
}

// Map Speed checkout-session status to our internal state.
export function mapSessionStatus(status) {
  if (status === "paid") return { internal: "paid", settled: true };
  if (status === "deactivated") return { internal: "failed", settled: false };
  return { internal: "new", settled: false };
}

// Detect payment method + transaction id from a paid checkout session's payments array.
export function extractSessionPayment(session) {
  let paymentMethod = "lightning";
  let transactionId = "";
  const payments = session?.payments || [];
  if (payments.length > 0) {
    transactionId = payments[payments.length - 1].id || "";
  }
  // On-chain / ethereum / solana / tron payments carry confirmations; lightning settles immediately.
  // Default to lightning since the membership is priced in SATS (lightning-first).
  return { paymentMethod, transactionId };
}