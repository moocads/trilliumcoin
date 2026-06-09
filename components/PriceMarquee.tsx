"use client";

import { useEffect, useState } from "react";

type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

function fmtPrice(n: number) {
  if (n >= 1)
    return n.toLocaleString("en-CA", { maximumFractionDigits: n >= 100 ? 0 : 2 });
  return n.toLocaleString("en-CA", { maximumFractionDigits: 6 });
}

function CoinPill({ c }: { c: MarketCoin }) {
  const change = c.price_change_percentage_24h ?? 0;
  const up = change >= 0;
  return (
    <div className="flex shrink-0 items-center gap-3 border-r border-white/10 px-6 py-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img src={c.image} alt={c.name} width={26} height={26} className="rounded-full" />
      <span className="text-[14px] font-bold uppercase tracking-wide text-white">
        {c.symbol}
      </span>
      <span className="text-[14px] font-semibold text-white/85">CA${fmtPrice(c.current_price)}</span>
      <span className={`text-[13px] font-bold ${up ? "text-[#4ade80]" : "text-[#ff7a6b]"}`}>
        {up ? "▲" : "▼"} {Math.abs(change).toFixed(2)}%
      </span>
    </div>
  );
}

export default function PriceMarquee() {
  const [coins, setCoins] = useState<MarketCoin[]>([]);

  useEffect(() => {
    let active = true;

    async function load() {
      try {
        const res = await fetch("/api/markets", { cache: "no-store" });
        if (!res.ok) throw new Error("markets fetch failed");
        const data: { coins: MarketCoin[] } = await res.json();
        if (active && data.coins?.length) setCoins(data.coins);
      } catch {
        /* keep previous data */
      }
    }

    load();
    const t = setInterval(load, 60000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  if (!coins.length) return null;

  return (
    <section
      aria-label="Top 20 cryptocurrency prices"
      className="relative z-0 border-y border-white/10 bg-tc-blue-deep py-1"
    >
      <div className="group relative overflow-hidden">
        {/* edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-gradient-to-r from-tc-blue-deep to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-gradient-to-l from-tc-blue-deep to-transparent" />

        <div className="flex w-max animate-marquee group-hover:[animation-play-state:paused]">
          {[...coins, ...coins].map((c, i) => (
            <CoinPill key={`${c.id}-${i}`} c={c} />
          ))}
        </div>
      </div>
    </section>
  );
}
