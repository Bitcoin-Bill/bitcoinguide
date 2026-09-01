import React, { useState, useEffect, useRef } from "react";
import { ChevronDown } from "lucide-react";
import { usePageAccent } from "@/lib/pageAccent";

const CURRENCIES = [
  { code: "USD", symbol: "$", locale: "en-US" },
  { code: "CAD", symbol: "C$", locale: "en-CA" },
  { code: "MXN", symbol: "MX$", locale: "es-MX" },
  { code: "EUR", symbol: "€", locale: "de-DE" },
];

export default function BtcTicker({ className = "", dropUp = false }) {
  const [currency, setCurrency] = useState("USD");
  const [price, setPrice] = useState(null);
  const [open, setOpen] = useState(false);
  const ref = useRef(null);
  const accent = usePageAccent();

  useEffect(() => {
    let active = true;

    const fetchPrice = async () => {
      try {
        const res = await fetch(
          `https://api.coinbase.com/v2/prices/BTC-${currency}/spot`
        );
        const json = await res.json();
        if (active && json?.data?.amount) {
          setPrice(parseFloat(json.data.amount));
        }
      } catch (e) {
        // silent fail
      }
    };

    fetchPrice();
    const interval = setInterval(fetchPrice, 60000);

    return () => {
      active = false;
      clearInterval(interval);
    };
  }, [currency]);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const active = CURRENCIES.find((c) => c.code === currency);

  const formatted =
    price != null
      ? price.toLocaleString(active.locale, {
          style: "currency",
          currency: active.code,
          minimumFractionDigits: active.code === "MXN" ? 0 : 0,
          maximumFractionDigits: 0,
        })
      : "…";

  return (
    <div ref={ref} className={`relative ${className}`}>
      <button
        onClick={() => setOpen((v) => !v)}
        style={{ color: accent }}
        className="flex items-center gap-1.5 font-mono text-xs tracking-[0.2em] uppercase hover:opacity-70 transition-opacity duration-300"
      >
        BTC {formatted} {active.code}
        <ChevronDown
          size={12}
          className={`transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      {open && (
        <div className={`absolute right-0 ${dropUp ? "bottom-full mb-2" : "top-full mt-2"} z-50 bg-parchment border border-border rounded-sm shadow-lg min-w-[100px] py-1`}>
          {CURRENCIES.map((c) => (
            <button
              key={c.code}
              onClick={() => {
                setCurrency(c.code);
                setOpen(false);
              }}
              className={`w-full text-left px-3 py-1.5 font-mono text-xs tracking-[0.15em] uppercase transition-colors duration-300 ${
                c.code === currency
                  ? "text-ink bg-secondary"
                  : "text-lead hover:text-ink hover:bg-secondary/50"
              }`}
            >
              {c.code}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}