import { Icon } from "./icons";
import GridWaves from "./GridWaves";

const STEPS = [
  { n: "01", icon: <Icon.id width={22} height={22} />, title: "Complete KYC", body: "Fill out the quick KYC registration form so we can verify your identity and stay compliant." },
  { n: "02", icon: <Icon.send width={22} height={22} />, title: "Send Funds", body: "Send your electronic funds or fiat currency to us using cash, bank wire, EMT, or EFT." },
  { n: "03", icon: <Icon.check width={22} height={22} />, title: "Receive Crypto or Fiat", body: "We transfer the agreed amount of cryptocurrency or fiat currency to you — quickly and securely." },
];

export default function HowItWorks() {
  return (
    <section id="how" className="bg-how-deep relative overflow-hidden px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
      <GridWaves className="pointer-events-none absolute inset-0 z-0 h-full w-full opacity-70" />
      {/* fade the grid into the section near the content */}
      <div className="pointer-events-none absolute inset-0 z-[1] bg-gradient-to-b from-tc-blue-deep/30 via-tc-blue-deep/10 to-tc-blue-deep/60" />

      <div className="relative z-[2] mx-auto max-w-[1200px]">
        <div className="mx-auto mb-12 max-w-[680px] text-center lg:mb-[60px]">
          <span className="kicker text-tc-orange">Simple Process</span>
          <h2 className="text-[30px] font-extrabold leading-[1.15] tracking-[-0.6px] text-white sm:text-[40px]">
            How it works?
          </h2>
          <p className="mt-4 text-[16px] leading-[1.6] text-white/90">
            Three clear steps from start to settlement — no jargon, no surprises.
          </p>
        </div>

        <div className="grid gap-[22px] lg:grid-cols-3">
          {STEPS.map((s) => (
            <div
              key={s.n}
              className="relative rounded-card border border-white/[0.14] bg-tc-blue/80 px-7 py-8 shadow-[0_22px_46px_rgba(8,12,46,0.45)] backdrop-blur-sm transition-all duration-300 hover:-translate-y-1.5 hover:border-tc-orange/45"
            >
              <div className="mb-1.5 text-[46px] font-extrabold leading-none text-white/25">{s.n}</div>
              <span className="-mt-[30px] mb-[18px] ml-auto grid h-[46px] w-[46px] place-items-center rounded-xl border border-white/20 bg-white/10">
                {s.icon}
              </span>
              <h3 className="mb-2.5 text-[18px] font-extrabold">{s.title}</h3>
              <p className="text-[14.5px] leading-[1.6] text-white/80">{s.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
