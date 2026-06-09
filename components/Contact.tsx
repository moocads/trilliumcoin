import { Icon } from "./icons";

function QrPlaceholder() {
  // Decorative QR-style block. Replace with a generated QR for bitcoin@bvcpay.com when going live.
  return (
    <svg viewBox="0 0 100 100" shapeRendering="crispEdges" className="h-full w-full">
      <rect width="100" height="100" fill="#fff" />
      <g fill="#170D63">
        <rect x="6" y="6" width="22" height="22" />
        <rect x="10" y="10" width="14" height="14" fill="#fff" />
        <rect x="13" y="13" width="8" height="8" />
        <rect x="72" y="6" width="22" height="22" />
        <rect x="76" y="10" width="14" height="14" fill="#fff" />
        <rect x="79" y="13" width="8" height="8" />
        <rect x="6" y="72" width="22" height="22" />
        <rect x="10" y="76" width="14" height="14" fill="#fff" />
        <rect x="13" y="79" width="8" height="8" />
        <rect x="36" y="8" width="6" height="6" /><rect x="48" y="8" width="6" height="6" />
        <rect x="36" y="20" width="6" height="6" /><rect x="60" y="14" width="6" height="6" />
        <rect x="8" y="36" width="6" height="6" /><rect x="20" y="42" width="6" height="6" />
        <rect x="36" y="36" width="6" height="6" /><rect x="48" y="42" width="6" height="6" />
        <rect x="60" y="36" width="6" height="6" /><rect x="72" y="42" width="6" height="6" />
        <rect x="84" y="36" width="6" height="6" /><rect x="42" y="48" width="6" height="6" />
        <rect x="54" y="54" width="6" height="6" /><rect x="66" y="48" width="6" height="6" />
        <rect x="78" y="54" width="6" height="6" /><rect x="36" y="60" width="6" height="6" />
        <rect x="48" y="66" width="6" height="6" /><rect x="60" y="60" width="6" height="6" />
        <rect x="72" y="66" width="6" height="6" /><rect x="84" y="60" width="6" height="6" />
        <rect x="36" y="72" width="6" height="6" /><rect x="48" y="78" width="6" height="6" />
        <rect x="60" y="72" width="6" height="6" /><rect x="72" y="78" width="6" height="6" />
        <rect x="84" y="72" width="6" height="6" /><rect x="42" y="84" width="6" height="6" />
        <rect x="66" y="84" width="6" height="6" /><rect x="84" y="84" width="6" height="6" />
      </g>
    </svg>
  );
}

const CONTACTS = [
  { icon: <Icon.phone width={20} height={20} className="text-tc-light-blue" />, label: "Call us", value: "647-767-6158", href: "tel:6477676158" },
  { icon: <Icon.mail width={20} height={20} className="text-tc-light-blue" />, label: "Email", value: "bitcoin@bvcpay.com", href: "mailto:bitcoin@bvcpay.com" },
  { icon: <Icon.pin width={20} height={20} className="text-tc-light-blue" />, label: "Visit", value: "7030 Woodbine Ave #500, Markham, ON L3R 6G2", href: "https://maps.google.com/?q=7030+Woodbine+Ave+%23500+Markham+ON" },
];

export default function Contact() {
  return (
    <section id="contact" className="bg-tc-blue-deep px-5 py-16 sm:px-8 lg:px-16 lg:py-28">
      <div className="mx-auto grid max-w-[1200px] items-center gap-10 lg:grid-cols-[1.05fr_0.95fr]">
        <div>
          <span className="kicker text-tc-orange">Get In Touch</span>
          <h2 className="mb-[22px] text-[28px] font-extrabold leading-[1.15] tracking-[-0.6px] sm:text-[40px]">
            Talk to us before your next Bitcoin trade
          </h2>

          <div className="mb-[26px] flex flex-col gap-3.5">
            {CONTACTS.map((c) => (
              <a key={c.label} href={c.href} className="group flex items-center gap-3.5 text-[16px] font-semibold transition-colors hover:text-tc-light-blue">
                <span className="grid h-[46px] w-[46px] flex-none place-items-center rounded-xl border border-white/[0.16] bg-white/[0.07]">
                  {c.icon}
                </span>
                <span>
                  <span className="block text-[12px] font-semibold text-tc-muted-purple">{c.label}</span>
                  {c.value}
                </span>
              </a>
            ))}
          </div>

          <div className="flex flex-wrap gap-2.5">
            <span className="badge"><Icon.shield width={14} height={14} className="text-tc-light-blue" />FINTRAC MSB #M19821264</span>
            <span className="badge"><Icon.building width={14} height={14} className="text-tc-light-blue" />CSE: BVC</span>
          </div>
        </div>

        <div className="rounded-card border border-white/[0.16] bg-gradient-to-b from-[#26198F] to-[#170D63] p-[34px] text-center shadow-[0_24px_54px_rgba(0,0,0,0.34)]">
          <div className="mx-auto mb-[22px] h-[170px] w-[170px] rounded-[18px] bg-white p-3.5 shadow-card-lg">
            <QrPlaceholder />
          </div>
          <h3 className="mb-2 text-[19px] font-extrabold">Scan to connect</h3>
          <p className="mb-[22px] text-[14px] leading-[1.5] text-white/[0.78]">
            Add us on WhatsApp / WeChat for one-on-one VIP and OTC support.
          </p>
          <a href="mailto:bitcoin@bvcpay.com" className="btn-primary w-full">Contact Us</a>
        </div>
      </div>
    </section>
  );
}
