"use client";

import { useState } from "react";

const FAQS = [
  {
    q: "What payment methods do you accept?",
    a: "We accept Cash, Bank Wire, EMT, and EFT for Canadian clients. Settlement method is confirmed with you before each trade.",
  },
  {
    q: "Do I need to complete KYC?",
    a: "It depends on the size of your trade. Under Canadian regulations, cash purchases or sales of crypto under $1,000 CAD within a 24-hour period do not require KYC. For trades at or above that threshold, we are required as a FINTRAC-registered MSB to complete a quick identity verification before settlement. This keeps our service fully compliant and secure for everyone.",
  },
  {
    q: "What is an e-wallet and where can I get one?",
    a: "An e-wallet is used to store, send, and receive crypto. It can be downloaded as an app from the App Store or Google Play.",
  },
  {
    q: "What is an OTC Desk? How is it different from a CEX or DEX?",
    a: "A CEX (Centralized Exchange) is a platform run by a single company — like Binance, Coinbase, or Kraken — where you trade on a public order book and the exchange holds your funds. A DEX (Decentralized Exchange) is a peer-to-peer marketplace like Uniswap or PancakeSwap where you trade directly from your own wallet via smart contracts, with no middleman. An OTC Desk (Over-The-Counter Desk) is a private, direct trading service for individuals or businesses who want to buy or sell crypto without placing orders on a public exchange — avoiding price slippage and getting personalized support. Trillium Coin is an OTC Desk.",
  },
  {
    q: "How long does a Crypto transaction take?",
    a: "Most trades settle quickly once funds and KYC are confirmed. Network confirmation times can vary slightly depending on blockchain conditions.",
  },
  {
    q: "Do you support large trades or OTC clients?",
    a: "Yes. Larger trades receive one-on-one OTC handling with personalized pricing and dedicated support from our team.",
  },
];

export default function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="bg-blue-band px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[680px] text-center lg:mb-[60px]">
          <span className="kicker text-tc-orange">Questions</span>
          <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.6px] sm:text-[40px]">
            Frequently asked questions
          </h2>
        </div>

        <div className="mx-auto max-w-[820px]">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            return (
              <div
                key={f.q}
                className={
                  "mb-3.5 overflow-hidden rounded-2xl border bg-tc-blue transition-colors " +
                  (isOpen ? "border-tc-light-blue/40" : "border-white/[0.12]")
                }
              >
                <button
                  onClick={() => setOpen(isOpen ? null : i)}
                  className="flex w-full items-center justify-between gap-4 px-6 py-[22px] text-left text-[16.5px] font-bold"
                  aria-expanded={isOpen}
                >
                  {f.q}
                  <span
                    className={
                      "grid h-7 w-7 flex-none place-items-center rounded-full text-lg leading-none transition-transform duration-300 " +
                      (isOpen
                        ? "rotate-45 border-transparent bg-gradient-to-br from-tc-orange to-tc-orange-light"
                        : "border border-white/[0.18] bg-white/[0.08]")
                    }
                  >
                    +
                  </span>
                </button>
                <div
                  className="grid transition-all duration-300 ease-in-out"
                  style={{ gridTemplateRows: isOpen ? "1fr" : "0fr" }}
                >
                  <div className="overflow-hidden">
                    <p className="px-6 pb-[22px] text-[14.5px] leading-[1.65] text-tc-off-white">{f.a}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
