"use client";

import { useEffect, useState } from "react";

type Coin = {
  id: string;
  name: string;
  symbol: string;
  glyph: string;
  iconClass: string;
};

const COINS: Coin[] = [
  { id: "bitcoin", name: "Bitcoin", symbol: "BTC / CAD", glyph: "₿", iconClass: "from-[#F7931A] to-[#FDB94E]" },
  { id: "ethereum", name: "Ethereum", symbol: "ETH / CAD", glyph: "Ξ", iconClass: "from-[#627EEA] to-[#8FA4F3]" },
  { id: "tether", name: "Tether", symbol: "USDT / CAD", glyph: "₮", iconClass: "from-[#26A17B] to-[#3FD8A4]" },
];

type RateData = Record<string, { cad: number; cad_24h_change: number }>;

// Fallback values shown before the first fetch resolves or if the API is unreachable.
const FALLBACK: RateData = {
  bitcoin: { cad: 103820, cad_24h_change: 2.41 },
  ethereum: { cad: 4985, cad_24h_change: 1.18 },
  tether: { cad: 1.37, cad_24h_change: -0.03 },
};

function fmt(n: number) {
  return n >= 100
    ? n.toLocaleString("en-CA", { maximumFractionDigits: 0 })
    : n.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
}

export default function LiveRates() {
  const [rates, setRates] = useState<RateData>(FALLBACK);
  const [updated, setUpdated] = useState<string>("");
  const [live, setLive] = useState(false);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/rates", { cache: "no-store" });
        if (!res.ok) throw new Error("rate fetch failed");
        const data: { rates: RateData; live: boolean } = await res.json();
        if (!active) return;
        setRates(data.rates);
        setLive(data.live);
        setUpdated(
          (data.live ? "Updated " : "Indicative · ") +
            new Date().toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" })
        );
      } catch {
        if (active) {
          setLive(false);
          setUpdated("Indicative rates");
        }
      }
    }

    load();
    const t = setInterval(load, 60000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  return (
    <div className="relative w-full max-w-[420px]">
      {/* floating badge */}
      <span className="absolute -bottom-5 -right-6 z-10 hidden animate-floaty items-center gap-2 rounded-2xl bg-white/95 px-4 py-[11px] text-[13px] font-bold text-tc-blue shadow-card-lg sm:flex">
        <span className="grid h-[30px] w-[30px] place-items-center rounded-[9px] bg-gradient-to-br from-tc-orange to-tc-orange-light text-white">
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>
        </span>
        Secure pricing
      </span>

      <div className="rounded-card border border-white/[0.14] bg-gradient-to-b from-[#2E1A86]/90 to-[#170D63]/95 p-[26px] shadow-card-lg backdrop-blur-sm">
        <div className="mb-5 flex items-center justify-between">
          <span className="text-[16px] font-extrabold tracking-tight">Live exchange rates</span>
          <span className="inline-flex items-center gap-[7px] text-[12.5px] font-bold text-tc-light-blue">
            <span
              className={`h-2 w-2 rounded-full ${live ? "animate-pulse bg-[#4ade80]" : "bg-white/40"}`}
            />
            {live ? "Live" : "Offline"}
          </span>
        </div>

        {COINS.map((c) => {
          const d = rates[c.id] ?? FALLBACK[c.id];
          const up = (d?.cad_24h_change ?? 0) >= 0;
          return (
            <div
              key={c.id}
              className="mb-[11px] flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.05] px-4 py-[14px] transition-colors hover:border-white/20 hover:bg-white/[0.08]"
            >
              <div className="flex items-center gap-3">
                <span className={`grid h-[38px] w-[38px] place-items-center rounded-full bg-gradient-to-br ${c.iconClass} text-lg font-extrabold text-white`}>
                  {c.glyph}
                </span>
                <span>
                  <b className="block text-[15px] font-extrabold leading-tight">{c.name}</b>
                  <span className="text-[12px] font-semibold text-tc-muted-purple">{c.symbol}</span>
                </span>
              </div>
              <div className="text-right">
                <div className="text-[16.5px] font-extrabold tracking-tight">CA${fmt(d.cad)}</div>
                <div className={`mt-0.5 text-[12.5px] font-bold ${up ? "text-[#4ade80]" : "text-[#ff7a6b]"}`}>
                  {up ? "+" : ""}
                  {(d.cad_24h_change ?? 0).toFixed(2)}%
                </div>
              </div>
            </div>
          );
        })}

        <div className="mt-4 flex items-center justify-between text-[12px] text-white/60">
          <span className="font-semibold">Indicative rates · CAD</span>
          <span>{updated || "Updating…"}</span>
        </div>
      </div>
    </div>
  );
}
