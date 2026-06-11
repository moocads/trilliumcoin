"use client";

import { useEffect, useRef, useState } from "react";
import {
  TokenBTC,
  TokenETH,
  TokenBNB,
  TokenSOL,
  TokenUSDC,
  TokenXRP,
  TokenDOGE,
  TokenADA,
  TokenTRX,
  type IconComponent,
} from "@web3icons/react";
import { CA, US, EU, GB, CN, JP, AU, CH, HK, IN } from "country-flag-icons/react/3x2";

/* ----------------------------- config ----------------------------- */

type FlagComponent = typeof CA;
type Fiat = { code: string; label: string; Flag: FlagComponent };
type Crypto = { id: string; code: string; Icon: IconComponent };

const FIATS: Fiat[] = [
  { code: "cad", label: "CAD", Flag: CA },
  { code: "usd", label: "USD", Flag: US },
  { code: "eur", label: "EUR", Flag: EU },
  { code: "gbp", label: "GBP", Flag: GB },
  { code: "cny", label: "CNY", Flag: CN },
  { code: "jpy", label: "JPY", Flag: JP },
  { code: "aud", label: "AUD", Flag: AU },
  { code: "chf", label: "CHF", Flag: CH },
  { code: "hkd", label: "HKD", Flag: HK },
  { code: "inr", label: "INR", Flag: IN },
];

// stablecoins first, then majors, then the rest
const CRYPTOS: Crypto[] = [
  { id: "usd-coin", code: "USDC", Icon: TokenUSDC },
  { id: "Crypto", code: "BTC", Icon: TokenBTC },
  { id: "ethereum", code: "ETH", Icon: TokenETH },
  { id: "solana", code: "SOL", Icon: TokenSOL },
  { id: "binancecoin", code: "BNB", Icon: TokenBNB },
  { id: "ripple", code: "XRP", Icon: TokenXRP },
  { id: "dogecoin", code: "DOGE", Icon: TokenDOGE },
  { id: "cardano", code: "ADA", Icon: TokenADA },
  { id: "tron", code: "TRX", Icon: TokenTRX },
];

// approximate USD price per coin + USD->fiat multipliers, used to build the
// fallback grid shown before live data loads (every coin/fiat pair is covered)
const CRYPTO_USD: Record<string, number> = {
  Crypto: 74000,
  ethereum: 3550,
  tether: 1,
  binancecoin: 600,
  solana: 170,
  "usd-coin": 1,
  ripple: 0.6,
  dogecoin: 0.16,
  cardano: 0.45,
  tron: 0.13,
};
const FX_FROM_USD: Record<string, number> = {
  usd: 1,
  cad: 1.4,
  eur: 0.92,
  gbp: 0.79,
  cny: 7.2,
  jpy: 157,
  aud: 1.52,
  chf: 0.9,
  hkd: 7.8,
  inr: 83,
};

const FALLBACK: Record<string, Record<string, number>> = Object.fromEntries(
  Object.entries(CRYPTO_USD).map(([id, usd]) => [
    id,
    Object.fromEntries(Object.entries(FX_FROM_USD).map(([f, m]) => [f, usd * m])),
  ])
);

/* --------------------------- formatting ---------------------------- */

const fmtAmount = (v: number, isCrypto: boolean) => {
  if (!isFinite(v) || v === 0) return "0";
  if (!isCrypto) return v.toLocaleString("en-CA", { minimumFractionDigits: 2, maximumFractionDigits: 2 });
  if (v >= 1) return v.toLocaleString("en-CA", { maximumFractionDigits: 4 });
  return v.toLocaleString("en-CA", { maximumFractionDigits: 8 });
};

const fmtRate = (v: number) => {
  if (!isFinite(v) || v === 0) return "0";
  const p = Number(v.toPrecision(4));
  return p.toLocaleString("en-CA", { maximumFractionDigits: 6 });
};

/* --------------------------- selector ------------------------------ */

function Selector<T extends { code: string }>({
  options,
  value,
  onChange,
  render,
}: {
  options: T[];
  value: T;
  onChange: (v: T) => void;
  render: (o: T) => React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onDoc = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", onDoc);
    return () => document.removeEventListener("mousedown", onDoc);
  }, []);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.07] py-2 pl-2.5 pr-3 text-[15px] font-bold text-white transition-colors hover:bg-white/[0.12]"
      >
        {render(value)}
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.4} strokeLinecap="round" strokeLinejoin="round" className={`text-white/60 transition-transform ${open ? "rotate-180" : ""}`}>
          <path d="m6 9 6 6 6-6" />
        </svg>
      </button>

      {open && (
        <div className="absolute left-0 top-[calc(100%+8px)] z-20 min-w-[150px] overflow-hidden rounded-2xl border border-white/15 bg-[#1B1078] p-1.5 shadow-[0_24px_50px_rgba(0,0,0,0.5)]">
          {options.map((o) => (
            <button
              key={o.code}
              type="button"
              onClick={() => {
                onChange(o);
                setOpen(false);
              }}
              className={`flex w-full items-center gap-2.5 rounded-xl px-2.5 py-2.5 text-left text-[14.5px] font-semibold transition-colors ${
                o.code === value.code ? "bg-white/10 text-white" : "text-white/80 hover:bg-white/[0.06]"
              }`}
            >
              {render(o)}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

/* ------------------------- main component -------------------------- */

export default function ExchangeCalculator() {
  const [mode, setMode] = useState<"buy" | "sell">("buy");
  const [fiat, setFiat] = useState<Fiat>(FIATS[0]);
  const [crypto, setCrypto] = useState<Crypto>(CRYPTOS[0]);
  const [amount, setAmount] = useState("200");
  const [rates, setRates] = useState(FALLBACK);
  const [updated, setUpdated] = useState("");

  useEffect(() => {
    let active = true;
    const load = async () => {
      try {
        const res = await fetch("/api/convert", { cache: "no-store" });
        if (!res.ok) throw new Error("rate fetch failed");
        const data = await res.json();
        if (!active) return;
        if (data && Object.keys(data).length) {
          setRates((prev) => ({ ...prev, ...data }));
        }
        setUpdated("Updated " + new Date().toLocaleTimeString("en-CA", { hour: "2-digit", minute: "2-digit" }));
      } catch {
        if (active) setUpdated("Indicative rate");
      }
    };
    load();
    const t = setInterval(load, 60000);
    return () => {
      active = false;
      clearInterval(t);
    };
  }, []);

  // price of 1 crypto in the chosen fiat
  const price = rates[crypto.id]?.[fiat.code] ?? FALLBACK[crypto.id][fiat.code];
  const value = parseFloat(amount.replace(/,/g, "")) || 0;

  // buy: spend fiat -> receive crypto | sell: spend crypto -> receive fiat
  const spendIsCrypto = mode === "sell";
  const receiveIsCrypto = mode === "buy";
  const receiveValue = mode === "buy" ? value / price : value * price;
  const ratePerSpend = mode === "buy" ? 1 / price : price;

  const spendSymbol = spendIsCrypto ? crypto.code : fiat.label;
  const receiveSymbol = receiveIsCrypto ? crypto.code : fiat.label;

  const fiatPill = (f: Fiat) => (
    <>
      <f.Flag
        title={f.label}
        className="h-[15px] w-6 shrink-0 rounded-[4px] object-cover shadow-[0_0_0_1px_rgba(255,255,255,0.14)]"
      />
      {f.label}
    </>
  );
  const cryptoPill = (c: Crypto) => (
    <>
      <c.Icon variant="branded" size={28} className="shrink-0 rounded-full" />
      {c.code}
    </>
  );

  const onInput = (raw: string) => {
    // allow digits and a single decimal point
    const cleaned = raw.replace(/[^0-9.]/g, "").replace(/(\..*)\./g, "$1");
    setAmount(cleaned);
  };

  return (
    <div className="w-full max-w-[460px]">
      {/* gradient border wrapper */}
      <div className="rounded-card bg-gradient-to-br from-white/25 via-white/[0.06] to-transparent p-[1.5px] shadow-[0_30px_70px_rgba(0,0,0,0.45)]">
        <div className="relative rounded-[20.5px] bg-[#13093F] p-6 sm:p-7">
          {/* dot grid + glow (clipped to the rounded card, kept separate so dropdowns can overflow) */}
          <div className="pointer-events-none absolute inset-0 overflow-hidden rounded-[20.5px]">
            <div
              className="absolute inset-0 opacity-60"
              style={{
                backgroundImage: "radial-gradient(circle, rgba(255,255,255,0.06) 1px, transparent 1px)",
                backgroundSize: "16px 16px",
              }}
            />
            <div className="absolute -right-16 bottom-[-30%] h-[320px] w-[320px] rounded-full bg-[radial-gradient(circle,rgba(120,90,255,0.45)_0%,rgba(120,90,255,0)_70%)] blur-md" />
          </div>

          <div className="relative">
            {/* top row: toggle + rate */}
            <div className="mb-7 flex items-center justify-between gap-3">
              <div className="inline-flex rounded-full bg-black/30 p-1">
                {(["buy", "sell"] as const).map((m) => (
                  <button
                    key={m}
                    type="button"
                    onClick={() => setMode(m)}
                    className={`rounded-full px-5 py-2 text-[14.5px] font-bold capitalize transition-all ${
                      mode === m
                        ? "bg-gradient-to-br from-tc-orange to-tc-orange-light text-white shadow-[0_6px_16px_rgba(253,83,58,0.4)]"
                        : "text-white/55 hover:text-white/80"
                    }`}
                  >
                    {m}
                  </button>
                ))}
              </div>
              <div className="text-right text-[12.5px] font-semibold leading-tight text-white/55">
                Estimated rate
                <div className="text-white/85">
                  1 {spendSymbol} ≈ {fmtRate(ratePerSpend)} {receiveSymbol}
                </div>
              </div>
            </div>

            {/* spend */}
            <label className="mb-3 block text-[14px] font-semibold text-white/60">I want to spend</label>
            <div className="flex items-center justify-between gap-3">
              <Selector
                options={spendIsCrypto ? (CRYPTOS as any) : (FIATS as any)}
                value={spendIsCrypto ? (crypto as any) : (fiat as any)}
                onChange={(v: any) => (spendIsCrypto ? setCrypto(v) : setFiat(v))}
                render={(o: any) => (spendIsCrypto ? cryptoPill(o) : fiatPill(o))}
              />
              <input
                value={amount}
                onChange={(e) => onInput(e.target.value)}
                inputMode="decimal"
                placeholder="0"
                className="w-0 flex-1 bg-transparent text-right text-[44px] font-extrabold leading-none tracking-tight text-white outline-none placeholder:text-white/25"
              />
            </div>

            {/* divider + swap */}
            <div className="relative my-7">
              <div className="h-px w-full bg-white/10" />
              <button
                type="button"
                onClick={() => setMode((m) => (m === "buy" ? "sell" : "buy"))}
                aria-label="Swap direction"
                className="absolute left-1/2 top-1/2 grid h-10 w-10 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border-4 border-[#13093F] bg-white/[0.08] text-tc-light-blue transition-colors hover:bg-white/15"
              >
                <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} strokeLinecap="round" strokeLinejoin="round">
                  <path d="M7 10l5-5 5 5M17 14l-5 5-5-5" />
                </svg>
              </button>
            </div>

            {/* receive */}
            <label className="mb-3 block text-[14px] font-semibold text-white/60">I will receive (estimated)</label>
            <div className="flex items-center justify-between gap-3">
              <Selector
                options={receiveIsCrypto ? (CRYPTOS as any) : (FIATS as any)}
                value={receiveIsCrypto ? (crypto as any) : (fiat as any)}
                onChange={(v: any) => (receiveIsCrypto ? setCrypto(v) : setFiat(v))}
                render={(o: any) => (receiveIsCrypto ? cryptoPill(o) : fiatPill(o))}
              />
              <div className="min-w-0 flex-1 truncate text-right text-[44px] font-extrabold leading-none tracking-tight text-white">
                {fmtAmount(receiveValue, receiveIsCrypto)}
              </div>
            </div>

            {/* footer */}
            <div className="mt-7 flex items-center justify-between text-[12px] text-white/45">
              <span className="inline-flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-[#4ade80]" />
                Indicative rate · auto-updates
              </span>
              <span>{updated || "Updating…"}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
