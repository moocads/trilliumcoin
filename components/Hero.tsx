import LiveRates from "./LiveRates";
import DotGrid from "./DotGrid";
import { Icon } from "./icons";
import { CA } from "country-flag-icons/react/3x2";

const PAY = ["Cash", "Bank Wire", "EMT", "EFT", "Crypto"];

export default function Hero() {
  return (
    <section className="bg-hero relative overflow-hidden">
      <DotGrid className="pointer-events-none absolute inset-0 z-[1] h-full w-full" />

      {/* arc / network pattern */}
      <svg
        className="pointer-events-none absolute inset-0 h-full w-full opacity-90"
        viewBox="0 0 1440 760"
        preserveAspectRatio="xMaxYMid slice"
        fill="none"
      >
        <g stroke="rgba(255,255,255,0.18)" strokeWidth={1.2}>
          <path d="M1700 -120 A 900 900 0 0 0 540 900" />
          <path d="M1780 -40 A 980 980 0 0 0 640 1000" />
          <path d="M1620 -200 A 820 820 0 0 0 460 820" />
        </g>
        <g stroke="rgba(160,218,243,0.22)" strokeWidth={1}>
          <circle cx="1180" cy="150" r="3.5" fill="rgba(160,218,243,0.5)" />
          <circle cx="980" cy="430" r="3" fill="rgba(253,83,58,0.6)" />
          <circle cx="1300" cy="520" r="2.5" fill="rgba(160,218,243,0.4)" />
          <line x1="1180" y1="150" x2="980" y2="430" />
          <line x1="980" y1="430" x2="1300" y2="520" />
        </g>
      </svg>
      <div className="pointer-events-none absolute -right-28 -top-20 h-[520px] w-[520px] rounded-full bg-[radial-gradient(circle,rgba(253,83,58,.35)_0%,rgba(253,83,58,0)_70%)] blur-[10px]" />

      <div className="relative z-[5] mx-auto grid max-w-[1320px] items-center gap-10 px-5 pb-7 pt-[152px] sm:px-8 lg:grid-cols-[48%_52%] lg:px-16 lg:pb-14 lg:pt-[180px]">
        <div>
          <span className="inline-flex items-center gap-2 rounded-full border border-tc-light-blue/30 bg-tc-light-blue/10 px-[15px] py-[7px] text-[12.5px] font-bold uppercase tracking-[0.4px] text-tc-light-blue">
       <CA width={14} height={14} className="text-tc-light-blue" />
            Canadian Crypto Service
          </span>

          <h1 className="mb-[18px] mt-[22px] text-[38px] font-extrabold leading-[1.05] tracking-[-1px] sm:text-[46px] lg:text-[56px]">
            Reliable and simple{" "}
            <span className="bg-gradient-to-r from-tc-orange-light to-tc-orange bg-clip-text text-transparent">
              Crypto trading
            </span>{" "}
            with Trillium Coin
          </h1>

          <p className="mb-[30px] max-w-[520px] text-[15px] leading-[1.6] text-white/80 sm:text-[17px]">
            Buy and sell Crypto with competitive pricing, local Canadian payment methods, and{" "}
            <span className="font-bold text-white">one-on-one support</span> — from a FINTRAC-registered MSB
            operated by a Canadian public company.
          </p>

          <div className="mb-[30px] flex flex-wrap gap-3.5 max-[520px]:flex-col">
            <a href="#buy-sell" className="btn-primary max-[520px]:w-full">
              Buy / Sell Crypto <Icon.arrowRight width={17} height={17} strokeWidth={2.4} />
            </a>
            <a href="#contact" className="btn-secondary max-[520px]:w-full">
              Contact Us
            </a>
          </div>

          <div className="flex flex-wrap gap-2.5">
            <span className="badge"><Icon.shield width={14} height={14} className="text-tc-light-blue" />FINTRAC MSB #M19821264</span>
            <span className="badge"><Icon.building width={14} height={14} className="text-tc-light-blue" />CSE: BVCI</span>
          </div>

        </div>

        <div className="flex justify-center max-lg:order-2">
          <LiveRates />
        </div>
      </div>

      {/* payment strip */}
      <div className="relative z-[5] mx-auto flex max-w-[1320px] flex-wrap items-center gap-x-6 gap-y-3 px-5 pb-9 pt-[18px] sm:px-8 lg:px-16 lg:pb-14">
        <span className="text-[13px] font-bold tracking-[0.3px] text-tc-muted-purple">We accept</span>
        <div className="flex flex-wrap gap-2.5">
          {PAY.map((p) => (
            <span key={p} className="rounded-full border border-white/[0.16] bg-white/[0.06] px-4 py-[9px] text-[13.5px] font-semibold text-white/90">
              {p}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
