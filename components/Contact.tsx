import { Icon } from "./icons";
import SubscribeForm from "./SubscribeForm";

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

        <SubscribeForm />
      </div>
    </section>
  );
}
