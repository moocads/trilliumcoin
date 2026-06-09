import { Icon } from "./icons";
import DotGrid from "./DotGrid";
import ExchangeCalculator from "./ExchangeCalculator";

const SERVICES = [
  {
    icon: <Icon.arrowRight width={22} height={22} />,
    title: "Buy Bitcoin",
    body: "Fund with cash, bank wire, EMT, or EFT and receive Bitcoin to your own wallet. Competitive rates with no hidden fees, settled quickly.",
  },
  {
    icon: <Icon.send width={20} height={20} />,
    title: "Sell Bitcoin",
    body: "Send your Bitcoin and receive Canadian dollars through your preferred local payout method. Larger trades get one-on-one OTC handling.",
  },
];

export default function BuySell() {
  return (
    <section id="buy-sell" className="relative z-30 bg-blue-band px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
      <DotGrid className="pointer-events-none absolute inset-0 z-0 h-full w-full overflow-hidden" />

      <div className="relative z-[1] mx-auto grid max-w-[1200px] items-center gap-12 lg:grid-cols-[1fr_460px] lg:gap-16">
        {/* left: copy + service rows */}
        <div>
          <span className="kicker">Our Service</span>
          <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.6px] sm:text-[40px]">
            Buy / Sell Bitcoin
          </h2>
          <p className="mt-4 max-w-[520px] text-[16px] leading-[1.6] text-white/[0.78]">
            Two simple paths, one trusted desk. Whether you are converting cash into Bitcoin or
            cashing out to CAD, we handle the trade with clear pricing and personal support.
          </p>

          <div className="mt-9 space-y-4">
            {SERVICES.map((s) => (
              <div
                key={s.title}
                className="group flex gap-4 rounded-card border border-white/[0.12] bg-tc-blue/60 p-5 shadow-card backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:border-tc-orange/45"
              >
                <span className="grid h-[50px] w-[50px] shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-tc-orange to-tc-orange-light text-white shadow-orange">
                  {s.icon}
                </span>
                <div>
                  <h3 className="mb-1.5 text-[19px] font-extrabold">{s.title}</h3>
                  <p className="text-[14.5px] leading-[1.55] text-white/[0.74]">{s.body}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3.5 max-[420px]:flex-col">
            <a href="#contact" className="btn-primary max-[420px]:w-full">
              Buy Bitcoin <Icon.arrowRight width={17} height={17} strokeWidth={2.4} />
            </a>
            <a href="#contact" className="btn-secondary max-[420px]:w-full">
              Sell Bitcoin
            </a>
          </div>
        </div>

        {/* right: live calculator */}
        <div className="flex justify-center lg:justify-end">
          <ExchangeCalculator />
        </div>
      </div>
    </section>
  );
}
