import { NextResponse } from "next/server";

export const revalidate = 60;

const IDS = [
  "bitcoin",
  "ethereum",
  "tether",
  "binancecoin",
  "solana",
  "usd-coin",
  "ripple",
  "dogecoin",
  "cardano",
  "tron",
];
const VS = ["cad", "usd", "eur", "gbp", "cny", "jpy", "aud", "chf", "hkd", "inr"];

export async function GET() {
  const url =
    "https://api.coingecko.com/api/v3/simple/price" +
    `?ids=${IDS.join(",")}&vs_currencies=${VS.join(",")}`;

  try {
    const res = await fetch(url, {
      headers: {
        accept: "application/json",
        "x-cg-demo-api-key": process.env.COINGECKO_KEY ?? "",
      },
      next: { revalidate: 60 },
    });

    if (!res.ok) throw new Error(`coingecko ${res.status}`);

    const data = await res.json();

    return NextResponse.json(data, {
      headers: {
        "Cache-Control": "public, s-maxage=60, stale-while-revalidate=120",
      },
    });
  } catch {
    return NextResponse.json({}, { headers: { "Cache-Control": "public, s-maxage=30" } });
  }
}
