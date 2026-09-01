import React, { useState, useEffect, useRef } from "react";
import { base44 } from "@/api/base44Client";

export default function SignalRateTicker() {
  const [rate, setRate] = useState(null);
  const [display, setDisplay] = useState(0);
  const [updatedDate, setUpdatedDate] = useState(null);
  const rafRef = useRef(null);

  const fetchOnce = async () => {
    try {
      const res = await base44.functions.invoke("fetchBip110Signaling", {});
      const d = res?.data;
      if (d && d.ok) {
        setRate(d.signalRate);
        setUpdatedDate(d.updatedDate || null);
      }
    } catch (e) {
      /* ignore polling errors */
    }
  };

  useEffect(() => {
    fetchOnce();
    const id = setInterval(fetchOnce, 60000);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (rate === null) return;
    const start = display;
    const end = Number(rate) || 0;
    const duration = 900;
    const t0 = performance.now();
    const tick = (now) => {
      const p = Math.min(1, (now - t0) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(start + (end - start) * eased);
      if (p < 1) rafRef.current = requestAnimationFrame(tick);
    };
    rafRef.current = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafRef.current);
  }, [rate]);

  const updated = updatedDate
    ? new Date(updatedDate).toLocaleTimeString("en-US", {
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="flex flex-col items-start gap-1 mb-5">
      <div className="flex items-baseline gap-2">
        <span className="font-heading text-5xl md:text-6xl font-light text-ink tabular-nums leading-none">
          {display.toFixed(1)}
          <span className="text-2xl text-lead/60">%</span>
        </span>
        <span className="flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-verdigris">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full rounded-full bg-verdigris opacity-60 animate-ping" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-verdigris" />
          </span>
          Live
        </span>
      </div>
      <p className="font-mono text-[10px] tracking-[0.15em] uppercase text-lead/60">
        BIP-110 signal rate · snapshot {updated ? `updated ${updated}` : "loading…"} · refreshes 2× daily
      </p>
    </div>
  );
}