import React, { useEffect, useRef, useState } from "react";
import { base44 } from "@/api/base44Client";
import { Zap, Bitcoin, Clock, CheckCircle2, ExternalLink, AlertCircle } from "lucide-react";

const qr = (data) =>
  `https://api.qrserver.com/v1/create-qr-code/?size=160x160&data=${encodeURIComponent(data)}`;

function fmt(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

export default function PaymentScreen({ invoice, onSettled, checkFunction = "checkBtcpayInvoiceStatus", checkPayload, displayAmount }) {
  const [secsLeft, setSecsLeft] = useState(15 * 60);
  const [status, setStatus] = useState("waiting"); // waiting | settled | expired | error
  const settledRef = useRef(false);

  useEffect(() => {
    const start = Date.now();
    const tick = setInterval(() => {
      const left = 15 * 60 - Math.floor((Date.now() - start) / 1000);
      setSecsLeft(left);
      if (left <= 0 && !settledRef.current) setStatus("expired");
    }, 1000);

    let pollTimer;
    const poll = async () => {
      if (settledRef.current) return;
      try {
        const res = await base44.functions.invoke(checkFunction, checkPayload || { invoiceRecordId: invoice.invoiceRecordId });
        const d = res?.data;
        if (d?.settled) {
          settledRef.current = true;
          setStatus("settled");
          clearInterval(pollTimer);
          clearInterval(tick);
          onSettled?.(d);
        } else if (d?.status === "expired" || d?.status === "failed") {
          setStatus(d.status);
          clearInterval(pollTimer);
        }
      } catch (e) {
        // keep polling transient errors
      }
    };
    pollTimer = setInterval(poll, 5000);
    poll();
    return () => {
      clearInterval(pollTimer);
      clearInterval(tick);
    };
  }, []);

  if (status === "settled") {
    return (
      <div className="border border-verdigris bg-parchment rounded-sm p-8 text-center max-w-md mx-auto">
        <CheckCircle2 className="mx-auto mb-3 text-verdigris" size={28} />
        <p className="font-heading text-xl text-ink mb-1">Payment confirmed</p>
        <p className="font-body text-sm text-lead">Unlocking your content…</p>
      </div>
    );
  }

  return (
    <div className="border border-border bg-parchment rounded-sm p-6 max-w-2xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <p className="font-mono text-[10px] tracking-[0.3em] uppercase text-lead">
          {status === "expired" ? "Invoice expired" : "Awaiting payment"}
        </p>
        <span
          className={`flex items-center gap-1 font-mono text-xs ${
            secsLeft < 120 ? "text-copper" : "text-lead"
          }`}
        >
          <Clock size={13} /> {fmt(Math.max(secsLeft, 0))}
        </span>
      </div>

      <p className="font-body text-sm text-lead mb-5">
        Send{" "}
        <span className="text-ink font-medium">
          {displayAmount || `$${invoice.amount} ${invoice.currency}`}
        </span>{" "}
        via Lightning or on-chain. Payment status updates automatically.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {invoice.lightningInvoice && (
          <PayMethod
            icon={<Zap size={14} className="text-verdigris" />}
            title="Lightning"
            qrData={invoice.lightningInvoice}
            address={invoice.lightningInvoice}
            link={`lightning:${invoice.lightningInvoice}`}
          />
        )}
        {invoice.bitcoinAddress && (
          <PayMethod
            icon={<Bitcoin size={14} className="text-copper" />}
            title="On-chain Bitcoin"
            qrData={`bitcoin:${invoice.bitcoinAddress}`}
            address={invoice.bitcoinAddress}
          />
        )}
      </div>

      <div className="mt-5 flex flex-wrap items-center gap-3">
        {invoice.checkoutUrl && (
          <a
            href={invoice.checkoutUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300"
          >
            <ExternalLink size={12} /> Open BTCPay checkout
          </a>
        )}
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-wide text-lead/70">
          <span className="inline-block w-2.5 h-2.5 border border-lead/40 border-t-lead rounded-full animate-spin" />
          {status === "expired" ? "Invoice expired — start a new one" : "Checking payment status…"}
        </span>
      </div>

      {status === "expired" && (
        <p className="mt-4 flex items-center gap-2 font-body text-xs text-copper">
          <AlertCircle size={14} /> This invoice expired. Go back and tap Unlock to generate a fresh one.
        </p>
      )}
    </div>
  );
}

function PayMethod({ icon, title, qrData, address, link }) {
  const [copied, setCopied] = useState(false);
  const copy = () => {
    navigator.clipboard.writeText(address);
    setCopied(true);
    setTimeout(() => setCopied(false), 1800);
  };
  return (
    <div className="border border-border rounded-sm p-4 text-center">
      <p className="flex items-center justify-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-lead mb-3">
        {icon} {title}
      </p>
      <img
        src={qr(qrData)}
        alt={`${title} QR`}
        className="w-40 h-40 mx-auto border border-border bg-white p-2 rounded-sm"
      />
      <p className="font-mono text-[10px] text-lead/70 break-all mt-3 mb-2 min-h-[28px]">
        {address}
      </p>
      <div className="flex items-center justify-center gap-2">
        <button
          onClick={copy}
          className="font-mono text-[10px] tracking-wide uppercase text-lead hover:text-verdigris transition-colors"
        >
          {copied ? "Copied ✓" : "Copy"}
        </button>
        {link && (
          <a
            href={link}
            className="font-mono text-[10px] tracking-wide uppercase text-verdigris hover:underline"
          >
            Open wallet
          </a>
        )}
      </div>
    </div>
  );
}