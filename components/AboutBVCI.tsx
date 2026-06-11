import { Icon } from "./icons";
import Image from "next/image";

const TRUST = [
  { icon: <Icon.building width={20} height={20} className="text-tc-light-blue" />, title: "Incorporated in Ontario", sub: "Blockchain Venture Capital Inc. (BVCI)" },
  { icon: <Icon.shield width={20} height={20} className="text-tc-light-blue" />, title: "FINTRAC-registered MSB", sub: "#M19821264" },
  { icon: <Icon.spark width={20} height={20} className="text-tc-light-blue" />, title: "Public company", sub: "Listed on the CSE under ticker BVCI" },
];

export default function AboutBVCI() {
  return (
    <section id="about" className="bg-tc-blue-deep px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <span className="kicker text-tc-orange">Corporate Trust</span>
          <div className="mb-5 flex items-center gap-4">
            <Image
              src="/images/bvcadt-logo.png"
              alt="BVCI Logo"
              width={70}
              height={100}
              className="flex-none"
            />
            <h2 className="text-[28px] font-extrabold leading-[1.18] tracking-[-0.6px] sm:text-[38px]">
              Backed by <span className="text-tc-orange">Blockchain Venture Capital Inc.</span>
            </h2>
          </div>
          <p className="mb-[18px] max-w-[560px] text-[16px] leading-[1.7] text-white/[0.82]">
            Trillium Coin is a division of <a href="https://www.bvc.com" target="_blank" className="text-tc-orange">Blockchain Venture Capital Inc. (CSE: BVCI)</a>, a Canadian
            company incorporated in Ontario and registered as a Money Services Business with FINTRAC.
          </p>
          <p className="mb-[18px] max-w-[560px] text-[16px] leading-[1.7] text-white/[0.82]">
            Through its blockchain and digital finance initiatives, BVCI is committed to building
            compliant, secure, and innovative digital asset services for Canadian users and businesses.
          </p>
          <p className="max-w-[560px] text-[16px] leading-[1.6] ">
            Registered MSB with FINTRAC. Trillium Coin provides digital asset trading services and is
            not a securities exchange or investment advisor.
          </p>
       
        </div>

        <div className="rounded-card border border-white/[0.16] bg-gradient-to-b from-[#2E1A86]/60 to-[#170D63]/85 p-8 shadow-[0_22px_50px_rgba(0,0,0,0.3)]">
          {TRUST.map((t) => (
            <div key={t.title} className="flex items-center gap-4 border-b border-white/10 py-4 last:border-none">
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl border border-tc-light-blue/30 bg-tc-light-blue/[0.12]">
                {t.icon}
              </span>
              <span>
                <b className="block text-[15px] font-extrabold">{t.title}</b>
                <span className="text-[13px] text-tc-muted-purple">{t.sub}</span>
              </span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
