"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

const NAV = [
  ["Buy / Sell", "#buy-sell"],
  ["Advantages", "#advantages"],
  ["How It Works", "#how"],
  ["About BVCI", "#about"],

];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={
        "fixed inset-x-0 top-8 z-50  flex items-center justify-between px-5 transition-all duration-300 sm:px-8 lg:px-16 " +
        (scrolled
          ? "border-b border-white/10 bg-tc-blue-deep/70 py-3 shadow-[0_8px_30px_rgba(0,0,0,0.35)] backdrop-blur-xl"
          : "border-b border-transparent bg-transparent py-[22px]")
      }
    >
      <a href="#" className="flex items-center gap-3">
        
        <Image src="/images/trillium-coin-logo-2.png" alt="Trillium Coin Logo" width={200} height={100} />
        {/* <span className="leading-tight">
          <b className="block text-[17px] font-extrabold tracking-tight">Trillium Coin</b>
          <span className="block text-[11px] font-semibold tracking-wide text-tc-muted-purple">
            by Blockchain Venture Capital Inc.
          </span>
        </span> */}
      </a>

      <nav className="hidden items-center gap-7 lg:flex">
        {NAV.map(([label, href]) => (
          <a key={label} href={href} className="text-[14.5px] font-semibold text-white/80 transition-colors hover:text-white">
            {label}
          </a>
        ))}
        <a href="#contact" className="btn-primary px-6 py-3 text-[14.5px]">
          Subscribe
        </a>
      </nav>

      <button className="text-2xl text-white lg:hidden" aria-label="Open menu">☰</button>
    </header>
  );
}
