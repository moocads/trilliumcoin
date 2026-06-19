import Image from "next/image";
const LINKS = {
  Service: [
    ["Buy / Sell Crypto", "#buy-sell"],
    ["Advantages", "#advantages"],
    ["How It Works", "#how"],
    ["FAQ", "#faq"],
  ],
  Company: [
    ["About BVCI", "#about"],
    ["Contact", "#contact"],
  ],
};

export default function Footer() {
  return (
    <footer className="border-t border-white/10 bg-tc-blue-darker px-5 pb-7 pt-12 sm:px-8 lg:px-16">
      <div className="mx-auto grid max-w-[1200px] gap-10 sm:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr]">
        <div>
          <div className="flex items-center gap-3">
            <Image src="/images/trillium-coin-logo-old.png" alt="Trillium Coin Logo" width={300} height={100} />
      
          </div>
          <p className="mt-3.5 max-w-[330px] text-[14px] leading-[1.5] text-white">
            A reliable Canadian Crypto trading service, operated by Blockchain Venture Capital Inc.
            (CSE: BVCI) and registered as a Money Services Business with FINTRAC.
          </p>
        </div>

        {Object.entries(LINKS).map(([heading, items]) => (
          <div key={heading}>
            <h4 className="mb-4 text-[13px] font-extrabold uppercase tracking-[1px] text-tc-muted-purple">{heading}</h4>
            {items.map(([label, href]) => (
              <a key={label} href={href} className="mb-2.5 block text-[14.5px] text-white/80 transition-colors hover:text-white">
                {label}
              </a>
            ))}
          </div>
        ))}
      </div>

      <div className="mx-auto mt-9 flex max-w-[1200px] flex-wrap justify-between gap-3 border-t border-white/10 pt-[22px] text-[12.5px] leading-[1.6] text-tc-muted-purple">
        <span>© {new Date().getFullYear()} Blockchain Venture Capital Inc. All rights reserved.</span>
        <span>Registered MSB with FINTRAC #M19821264 · CSE: BVCI · 647-767-6158</span>
      </div>
    </footer>
  );
}
