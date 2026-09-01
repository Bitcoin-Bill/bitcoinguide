import React, { useState } from "react";
import { Bitcoin, Copy, Check, ExternalLink } from "lucide-react";

const LN_ADDRESS = "l2iekert@shakepay.me";
const SATS = 21;

// Resolve a Lightning address (user@domain) into a real BOLT11 invoice
// via LNURL-pay. Runs fully client-side — no backend needed.
// Shakepay's LNURL endpoint doesn't send CORS headers, so the browser
// can't call it directly — we route through public CORS proxies, trying
// each until one returns a usable invoice.
const PROXIES = [
  (u) => `https://corsproxy.io/?url=${encodeURIComponent(u)}`,
  (u) => `https://api.allorigins.win/raw?url=${encodeURIComponent(u)}`,
  (u) => `https://api.codetabs.com/v1/proxy/?quest=${encodeURIComponent(u)}`,
];

async function fetchJson(url) {
  // Try a direct request first, then fall back to CORS proxies.
  const attempts = [url, ...PROXIES.map((p) => p(url))];
  for (const target of attempts) {
    try {
      const res = await fetch(target);
      if (!res.ok) continue;
      const data = await res.json();
      if (data && (data.callback || data.pr)) return data;
    } catch (e) {
      // try next proxy
    }
  }
  throw new Error("All fetch attempts failed");
}

async function fetchInvoice(amountSats) {
  const [user, domain] = LN_ADDRESS.split("@");
  const lnurlData = await fetchJson(
    `https://${domain}/.well-known/lnurlp/${user}`
  );
  if (!lnurlData.callback) throw new Error("No LNURL callback");
  const amountMsat = amountSats * 1000;
  const cb = new URL(lnurlData.callback);
  cb.searchParams.set("amount", amountMsat.toString());
  const invData = await fetchJson(cb.toString());
  if (!invData.pr) throw new Error("No invoice returned");
  return invData.pr;
}

export default function PayGate({ label = "Pay 21 sats", onPaid, compact = false }) {
  const [stage, setStage] = useState("idle"); // idle | loading | invoice | error | paid
  const [invoice, setInvoice] = useState(null);
  const [error, setError] = useState(null);
  const [copied, setCopied] = useState(false);

  const start = async () => {
    setStage("loading");
    setError(null);
    try {
      const pr = await fetchInvoice(SATS);
      setInvoice(pr);
      setStage("invoice");
    } catch (e) {
      // Browser CORS or network block on Shakepay's LNURL endpoint —
      // fall back to manual pay (static Lightning address) instead of erroring.
      setInvoice(null);
      setStage("invoice");
    }
  };

  const copyInvoice = () => {
    if (!invoice) return;
    navigator.clipboard.writeText(invoice);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  if (stage === "paid") {
    return (
      <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-verdigris">
        <Check size={12} /> Paid
      </span>
    );
  }

  if (stage === "loading") {
    return (
      <span className="inline-flex items-center gap-2 font-mono text-[10px] tracking-[0.2em] uppercase text-lead/60">
        <span className="inline-block w-3 h-3 border border-lead/40 border-t-lead rounded-full animate-spin" />
        Generating invoice…
      </span>
    );
  }

  if (stage === "error") {
    return (
      <div className={`flex flex-col gap-2 ${compact ? "" : "mt-2"}`}>
        <span className="font-mono text-[10px] text-copper">
          {error}
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={start}
            className="font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:border-verdigris hover:text-verdigris transition-colors duration-300"
          >
            Retry
          </button>
          <button
            onClick={() => {
              setStage("invoice");
              setInvoice(null);
            }}
            className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
          >
            Pay manually
          </button>
        </div>
      </div>
    );
  }

  if (stage === "invoice") {
    return (
      <div className={`flex flex-col gap-3 ${compact ? "" : "mt-2"}`}>
        <div className="flex items-center gap-2 font-mono text-[10px] tracking-wide text-lead">
          <Bitcoin size={12} className="text-verdigris shrink-0" />
          Send <span className="text-ink">{SATS} sats</span> to
          <span className="text-ink">{LN_ADDRESS}</span>
        </div>

        {invoice ? (
          <>
            {/* QR code rendered via public API — no library needed */}
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                invoice.toUpperCase()
              )}`}
              alt="Lightning invoice QR"
              className="w-40 h-40 border border-border rounded-sm bg-white p-2"
            />
            <div className="flex items-center gap-2">
              <button
                onClick={copyInvoice}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:border-verdigris hover:text-verdigris transition-colors duration-300"
              >
                {copied ? <Check size={12} /> : <Copy size={12} />}
                {copied ? "Copied" : "Copy invoice"}
              </button>
              <a
                href={`lightning:${invoice}`}
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-verdigris hover:underline"
              >
                <ExternalLink size={12} />
                Open wallet
              </a>
            </div>
            <p className="font-body text-[11px] text-lead/70 italic max-w-[260px]">
              Scan with your Lightning wallet to pay {SATS} sats to {LN_ADDRESS}.
              After paying, confirm below.
            </p>
          </>
        ) : (
          <>
            <img
              src={`https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(
                `lightning:${LN_ADDRESS}`
              )}`}
              alt="Lightning address QR"
              className="w-40 h-40 border border-border rounded-sm bg-white p-2"
            />
            <p className="font-body text-xs text-lead max-w-[280px]">
              Open your Lightning wallet and send <span className="text-ink">{SATS} sats</span> to{" "}
              <span className="font-mono text-ink">{LN_ADDRESS}</span>, then
              confirm below.
            </p>
          </>
        )}

        <button
          onClick={() => {
            setStage("paid");
            onPaid?.();
          }}
          className="self-start font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300"
        >
          I've paid — continue
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={start}
      className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-border text-lead px-3 py-1.5 rounded-sm hover:border-verdigris hover:text-verdigris transition-colors duration-300"
    >
      <Bitcoin size={12} />
      {label}
    </button>
  );
}