import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";
import {
  addPendingDebatePayment,
  removePendingDebatePayment,
} from "@/hooks/usePendingDebatePayments";
// Membership is verified server-side against the auth account — nothing to persist locally.
import { Bitcoin, CheckCircle2, Loader2, X, ExternalLink } from "lucide-react";

export default function DebatePayButton({
  action,
  debateId,
  topic,
  commentText,
  engageText,
  name,
  label,
  disabled,
  onPaid,
}) {
  const [pending, setPending] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState(null);
  const [settled, setSettled] = useState(false);
  const [settleData, setSettleData] = useState(null);
  const settledRef = useRef(false);
  const pollRef = useRef(null);

  const start = async () => {
    setErr(null);
    setBusy(true);
    try {
      const res = await base44.functions.invoke("createDebateInvoice", {
        action,
        debateId,
        topic,
        commentText: commentText || engageText,
        name,
      });
      const data = res.data;
      setPending(data);
      setShowModal(true);
      addPendingDebatePayment(data.debateRecordId);
    } catch (e) {
      setErr(e?.response?.data?.error || e?.message || "Failed to create invoice");
    } finally {
      setBusy(false);
    }
  };

  // Polling runs as long as there's a pending payment — independent of the
  // popup being open, so closing it won't stop a settled payment from posting.
  useEffect(() => {
    if (!pending?.debateRecordId || settledRef.current) return;
    const poll = async () => {
      if (settledRef.current) return;
      try {
        const res = await base44.functions.invoke("checkDebateInvoiceStatus", {
          debateRecordId: pending.debateRecordId,
        });
        const d = res?.data;
        if (d?.settled) {
          settledRef.current = true;
          setSettled(true);
          setSettleData(d);
          removePendingDebatePayment(pending.debateRecordId);
          clearInterval(timer);
          // Membership is tied to the account and verified server-side on reload.
          setTimeout(() => {
            setPending(null);
            setShowModal(false);
            onPaid?.(d);
          }, 1500);
        } else if (d?.status === "expired" || d?.status === "failed") {
          removePendingDebatePayment(pending.debateRecordId);
          clearInterval(timer);
        }
      } catch (e) {
        // keep polling transient errors
      }
    };
    pollRef.current = poll;
    const timer = setInterval(poll, 4000);
    poll();
    return () => clearInterval(timer);
  }, [pending, onPaid]);

  // Instant detection: BTCPay's checkout posts a message to the parent window
  // the moment the invoice is paid.
  useEffect(() => {
    if (!pending) return;
    const onMsg = (e) => {
      const d = e.data || {};
      const type = String(d.type || d.event || "");
      if (/settled|paid|complete|confirmed/i.test(type)) {
        pollRef.current?.();
      }
    };
    window.addEventListener("message", onMsg);
    return () => window.removeEventListener("message", onMsg);
  }, [pending]);

  const close = () => setShowModal(false);

  if (settled) {
    return (
      <div className="flex flex-col gap-1">
        <span className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-verdigris">
          <CheckCircle2 size={12} /> Payment confirmed
        </span>
        {action === "membership" && settleData?.receiptId && (
          <span className="font-mono text-[10px] text-lead">
            Receipt: {settleData.receiptId} — save it to restore access
          </span>
        )}
      </div>
    );
  }

  return (
    <>
      <div className="flex flex-col gap-2">
        {err && <span className="font-mono text-[10px] text-destructive">{err}</span>}
        <button
          onClick={start}
          disabled={busy || disabled || !!pending}
          className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase border border-verdigris text-verdigris px-3 py-1.5 rounded-sm hover:bg-verdigris hover:text-parchment transition-colors duration-300 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <Bitcoin size={12} />
          {busy
            ? "Creating invoice…"
            : pending
            ? "Verifying payment…"
            : label}
        </button>
      </div>

      {pending && showModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-ink/70 backdrop-blur-sm p-4"
          onClick={close}
        >
          <div
            className="relative bg-parchment border border-border rounded-sm shadow-2xl w-full max-w-md max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between px-4 py-3 border-b border-border">
              <p className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead flex items-center gap-1.5">
                <Loader2 size={12} className="animate-spin" /> Waiting for Lightning payment…
              </p>
              <button
                onClick={close}
                aria-label="Close payment popup"
                className="text-lead hover:text-ink transition-colors duration-300"
              >
                <X size={16} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden bg-parchment">
              <iframe
                src={pending.checkoutUrl}
                title="Speed checkout"
                className="w-full h-[480px] border-0"
              />
            </div>
            <div className="flex items-center justify-between gap-2 px-4 py-3 border-t border-border">
              <span className="font-mono text-[10px] tracking-[0.2em] uppercase text-lead/70">
                {pending.amountSats} sats · BTC or Lightning
              </span>
              <a
                href={pending.checkoutUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
              >
                <ExternalLink size={12} /> Open in tab
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
}