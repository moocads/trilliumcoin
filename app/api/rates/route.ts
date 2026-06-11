import { NextResponse } from "next/server";

export const revalidate = 60;

const IDS = ["bitcoin", "ethereum", "solana"] as const;

type Rate = { cad: number; cad_24h_change: number; spark: number[] };
type RateData = Record<string, Rate>;

const fbSpark = (base: number) =>
  Array.from({ length: 24 }, (_, i) => base * (1 + 0.01 * Math.sin(i / 2)));

const FALLBACK: RateData = {
  bitcoin: { cad: 103820, cad_24h_change: 2.41, spark: fbSpark(103820) },
  ethereum: { cad: 4985, cad_24h_change: 1.18, spark: fbSpark(4985) },
  solana: { cad: 230, cad_24h_change: 1.05, spark: fbSpark(230) },
};

type MarketCoin = {
  id: string;
  current_price: number;
  price_change_percentage_24h: number;
  sparkline_in_7d?: { price: number[] };
};

export async function GET() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    `?vs_currency=cad&ids=${IDS.join(",")}&sparkline=true&price_change_percentage=24h`;

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_KEY ?? "",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`coingecko ${res.status}`);

    const raw = (await res.json()) as MarketCoin[];
    const rates: RateData = {};
    for (const c of raw) {
      const prices = c.sparkline_in_7d?.price ?? [];
      rates[c.id] = {
        cad: c.current_price,
        cad_24h_change: c.price_change_percentage_24h,
        // last ~24 hourly points => trailing 24 hours
        spark: prices.slice(-24),
      };
    }

    return NextResponse.json(
      { rates, updatedAt: Date.now(), live: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { rates: FALLBACK, updatedAt: Date.now(), live: false },
      { headers: { "Cache-Control": "public, s-maxage=30" } }
    );
  }
}
