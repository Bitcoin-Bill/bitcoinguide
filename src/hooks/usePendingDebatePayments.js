import { useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

const KEY = "pending_debate_payments";

export function getPendingDebatePayments() {
  try {
    return JSON.parse(localStorage.getItem(KEY) || "[]");
  } catch {
    return [];
  }
}

export function addPendingDebatePayment(id) {
  if (!id) return;
  const cur = getPendingDebatePayments();
  if (!cur.includes(id)) {
    cur.push(id);
    localStorage.setItem(KEY, JSON.stringify(cur));
  }
}

export function removePendingDebatePayment(id) {
  if (!id) return;
  const cur = getPendingDebatePayments();
  localStorage.setItem(KEY, JSON.stringify(cur.filter((x) => x !== id)));
}

// Re-check any pending debate payments in the background so a payment that
// settles after the popup is closed (or after a refresh) still finalizes
// and posts the debate.
export function usePendingDebatePayments(onSettled) {
  const cb = useRef(onSettled);
  cb.current = onSettled;

  useEffect(() => {
    let active = true;
    const check = async () => {
      const ids = getPendingDebatePayments();
      let settledAny = false;
      for (const id of ids) {
        try {
          const res = await base44.functions.invoke("checkDebateInvoiceStatus", {
            debateRecordId: id,
          });
          const d = res?.data;
          if (d?.settled || d?.status === "expired" || d?.status === "failed") {
            removePendingDebatePayment(id);
            if (d?.settled) settledAny = true;
          }
        } catch {
          // keep pending on transient errors
        }
      }
      if (active && settledAny) cb.current?.();
    };
    check();
    const timer = setInterval(check, 10000);
    return () => {
      active = false;
      clearInterval(timer);
    };
  }, []);
}