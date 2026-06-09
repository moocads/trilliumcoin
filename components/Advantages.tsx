import { type ReactNode } from "react";
import { Icon } from "./icons";
import DotGrid from "./DotGrid";

type Advantage = { icon: ReactNode; title: string; body: string; featured?: boolean };

const ADV: Advantage[] = [
  { icon: <Icon.bolt width={24} height={24} className="text-tc-orange" />, title: "Fast & Easy", body: "Buy and sell crypto quickly with a smooth, simple experience." },
  { icon: <Icon.tag width={24} height={24} className="text-tc-orange" />, title: "Great Pricing", body: "Competitive rates with low trading fees." },
  { icon: <Icon.shield width={24} height={24} className="text-tc-orange" />, title: "Registered & Trusted", body: "FINTRAC-registered MSB operated by a Canadian public company." },
  { icon: <Icon.headset width={24} height={24} className="text-tc-orange" />, title: "VIP Service", body: "One-on-one personalized support for large trades and OTC clients." },
  { icon: <Icon.lock width={24} height={24} className="text-tc-orange" />, title: "Secure", body: "Multi-layer security to protect your assets and transactions." },
  { icon: <Icon.spark width={24} height={24} className="text-tc-orange" />, title: "More and More", body: "Continuously developing new services for a better customer experience." },
];

export default function Advantages() {
  return (
    <section id="advantages" className="relative overflow-hidden bg-tc-blue-deep px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
      <DotGrid className="pointer-events-none absolute inset-0 z-0 h-full w-full" />

      <div className="relative z-[1] mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[680px] text-center lg:mb-[60px]">
          <span className="kicker text-tc-orange">Why Trillium Coin</span>
          <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.6px] sm:text-[40px]">
            We offer many advantages
          </h2>
        </div>

        <div className="grid gap-[22px] sm:grid-cols-2 lg:grid-cols-3">
          {ADV.map((a) => (
            <div
              key={a.title}
              className={
                "group relative overflow-hidden rounded-card border p-[30px] backdrop-blur-xl transition-all duration-300 hover:-translate-y-1.5 " +
                (a.featured
                  ? "border-tc-light-blue/55 bg-tc-blue shadow-[0_0_0_1px_rgba(160,218,243,0.2),0_22px_50px_rgba(0,0,0,0.3)]"
                  : "border-white/15 bg-tc-blue shadow-[inset_0_1px_0_rgba(255,255,255,0.12),0_18px_40px_rgba(0,0,0,0.3)] hover:border-tc-orange/40 hover:shadow-[inset_0_1px_0_rgba(255,255,255,0.16),0_26px_54px_rgba(0,0,0,0.34)]")
              }
            >
              <div className="relative">
              {a.featured && (
                <span className="mb-3.5 inline-block rounded-full border border-tc-light-blue/30 bg-tc-light-blue/10 px-2.5 py-1 text-[11px] font-extrabold uppercase tracking-[0.5px] text-tc-light-blue">
                  Compliance
                </span>
              )}
              <span
                className={
                  "mb-5 grid h-[50px] w-[50px] place-items-center rounded-[14px] border " +
                  (a.featured
                    ? "border-tc-light-blue/40 bg-tc-light-blue/[0.16]"
                    : "border-tc-orange bg-tc-orange/[0.14]")
                }
              >
                {a.icon}
              </span>
              <h3 className="mb-2.5 text-[18.5px] font-extrabold">{a.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-white/[0.74]">{a.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
