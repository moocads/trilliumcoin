# Trillium Coin — Homepage (Next.js + Tailwind)

Reliable & simple Bitcoin trading landing page for Trillium Coin (a division of
Blockchain Venture Capital Inc. / CSE: BVC).

## Stack
- Next.js 14 (App Router) + TypeScript
- Tailwind CSS 3 (brand tokens in `tailwind.config.ts`)
- Manrope via `next/font/google`

## Run
```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
```

## Structure
```
app/
  layout.tsx        Root layout + Manrope font + metadata
  page.tsx          Assembles all homepage sections
  globals.css       Tailwind + reusable brand classes (.btn-primary, .tc-card, .badge…)
components/
  Header.tsx        Sticky nav + Start Trading CTA
  Hero.tsx          Hero copy, trust badges, payment strip (server)
  LiveRates.tsx     Live BTC/ETH/USDT → CAD rates ('use client', CoinGecko, 60s refresh)
  BuySell.tsx       Buy / Sell Bitcoin cards
  Advantages.tsx    6 advantage cards (compliance card featured)
  HowItWorks.tsx    3-step process on orange gradient
  AboutBVCI.tsx     Corporate trust section
  FAQ.tsx           Accordion ('use client')
  Contact.tsx       Contact list + QR card
  Footer.tsx        MSB number + contact info
  icons.tsx         Inline linear SVG icon set
```

## Notes for going live
- **Live rates**: `LiveRates.tsx` calls the public CoinGecko API directly from the
  browser. For production, proxy it through your own API route (e.g. Strapi or a
  Next.js route handler) to avoid rate limits and add caching. "Indicative rates"
  wording is intentional for compliance (not a tradable quote).
- **QR code**: `Contact.tsx` uses a decorative placeholder. Swap in a real QR
  (WhatsApp/WeChat or bitcoin@bvcpay.com) before launch.
- **Mobile menu**: the hamburger button is present but not yet wired to a drawer.
