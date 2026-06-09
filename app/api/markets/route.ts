import { NextResponse } from "next/server";

export const revalidate = 60;

export type MarketCoin = {
  id: string;
  symbol: string;
  name: string;
  image: string;
  current_price: number;
  price_change_percentage_24h: number;
};

export async function GET() {
  const url =
    "https://api.coingecko.com/api/v3/coins/markets" +
    "?vs_currency=cad&order=market_cap_desc&per_page=20&page=1" +
    "&sparkline=false&price_change_percentage=24h";

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
    const coins: MarketCoin[] = raw.map((c) => ({
      id: c.id,
      symbol: c.symbol,
      name: c.name,
      image: c.image,
      current_price: c.current_price,
      price_change_percentage_24h: c.price_change_percentage_24h,
    }));

    return NextResponse.json(
      { coins, updatedAt: Date.now(), live: true },
      {
        headers: {
          "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
        },
      }
    );
  } catch {
    return NextResponse.json(
      { coins: [], updatedAt: Date.now(), live: false },
      { headers: { "Cache-Control": "public, s-maxage=30" } }
    );
  }
}
