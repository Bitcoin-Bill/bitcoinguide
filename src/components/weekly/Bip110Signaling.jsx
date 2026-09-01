import React, { useState, useEffect } from "react";
import { base44 } from "@/api/base44Client";
import { Activity, ExternalLink, Loader2 } from "lucide-react";
import SignalRateTicker from "@/components/weekly/SignalRateTicker";

function Stat({ label, value, sub }) {
  return (
    <div className="border-l-2 border-verdigris/40 pl-3">
      <p className="font-mono text-[9px] tracking-[0.15em] uppercase text-lead/60 mb-0.5">
        {label}
      </p>
      <p className="font-heading text-lg text-ink leading-tight">{value}</p>
      {sub && <p className="font-mono text-[10px] text-lead/70">{sub}</p>}
    </div>
  );
}

function fmtNum(n) {
  if (n === null || n === undefined) return "—";
  return Number(n).toLocaleString("en-US", { maximumFractionDigits: 1 });
}

export default function Bip110Signaling() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [err, setErr] = useState(null);

  useEffect(() => {
    (async () => {
      try {
        const res = await base44.functions.invoke("fetchBip110Signaling", {});
        setData(res.data);
      } catch (e) {
        setErr(e?.message || "Failed to load BIP-110 data");
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  const updated = data && data.updatedDate
    ? new Date(data.updatedDate).toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
      })
    : null;

  return (
    <div className="border border-border bg-parchment rounded-sm p-5 md:p-6 mb-12">
      <div className="flex items-center gap-2 mb-1">
        <Activity size={16} className="text-verdigris" />
        <p className="font-mono text-xs tracking-[0.2em] uppercase text-lead">
          BIP-110 Signaling
        </p>
      </div>
      <h3 className="font-heading text-xl text-ink leading-tight mb-2">
        Is Bitcoin signaling for the BIP-110 data-limit soft fork?
      </h3>
      <p className="font-body text-sm text-lead/80 leading-relaxed mb-5 max-w-xl">
        BIP-110 (a.k.a. RDTS) is a proposed one-year soft fork that would
        temporarily cap arbitrary data embedded in Bitcoin transactions —
        targeting Ordinals, BRC-20, Runes, and oversized OP_RETURN payloads.
        Miners signal support with version bit 4. It locks in early if 55% of
        blocks (1,109 of 2,016) signal in a difficulty period; otherwise a UASF
        flag day forces activation around August 2026.
      </p>

      {loading ? (
        <div className="flex items-center gap-2 font-mono text-xs text-lead/60">
          <Loader2 size={14} className="animate-spin" /> Loading signaling data…
        </div>
      ) : err || !data || !data.ok ? (
        <p className="font-mono text-xs text-lead/40 italic">
          Signaling data is temporarily unavailable — see the live dashboards
          below.
        </p>
      ) : (
        <>
          <SignalRateTicker />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-5">
            <Stat
              label="Signal rate"
              value={data.signalRate != null ? data.signalRate + "%" : "—"}
              sub={fmtNum(data.signalingBlocks) + " of " + fmtNum(data.periodBlocks) + " blocks"}
            />
            <Stat
              label="Signals needed"
              value={fmtNum(data.signalsNeeded)}
              sub={"of " + fmtNum(data.lockInPeriodBlocks) + " for lock-in"}
            />
            <Stat
              label="Period progress"
              value={data.periodProgress != null ? data.periodProgress + "%" : "—"}
              sub={data.daysLeft != null ? "~" + fmtNum(data.daysLeft) + " days left" : ""}
            />
            <Stat
              label="Lock-in threshold"
              value={data.thresholdPct + "%"}
              sub={fmtNum(data.lockInThreshold) + " of " + fmtNum(data.lockInPeriodBlocks) + " blocks"}
            />
          </div>

          {data.summary && (
            <p className="font-body text-sm text-lead/80 leading-relaxed mb-4 max-w-xl">
              {data.summary}
            </p>
          )}

          <div className="mt-2 flex flex-wrap gap-4 items-center">
            <a
              href="https://bip110.org/monitor"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <ExternalLink size={12} /> bip110.org/monitor
            </a>
            <a
              href="https://wickedsmartbitcoin.com/bip110_signaling"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 font-mono text-[10px] tracking-[0.2em] uppercase text-lead hover:text-ink transition-colors duration-300"
            >
              <ExternalLink size={12} /> Wicked Smart dashboard
            </a>
            {updated && (
              <span className="font-mono text-[10px] tracking-[0.15em] text-lead/40 uppercase">
                Updated {updated}
              </span>
            )}
          </div>
        </>
      )}
    </div>
  );
}