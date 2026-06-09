import { NextResponse } from "next/server";

export const revalidate = 60;

const IDS = ["bitcoin", "ethereum", "tether"] as const;

type RateData = Record<string, { cad: number; cad_24h_change: number }>;

const FALLBACK: RateData = {
  bitcoin: { cad: 103820, cad_24h_change: 2.41 },
  ethereum: { cad: 4985, cad_24h_change: 1.18 },
  tether: { cad: 1.37, cad_24h_change: -0.03 },
};

export async function GET() {
  const url =
    "https://api.coingecko.com/api/v3/simple/price" +
    `?ids=${IDS.join(",")}&vs_currencies=cad&include_24hr_change=true`;

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_KEY ?? "",
      },
      // Cache upstream response and revalidate at most once per minute.
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`coingecko ${res.status}`);

    const data = (await res.json()) as RateData;

    return NextResponse.json(
      { rates: data, updatedAt: Date.now(), live: true },
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
