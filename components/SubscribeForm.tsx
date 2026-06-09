"use client";

import { useState } from "react";

type Status = "idle" | "loading" | "success" | "error";

export default function SubscribeForm() {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [consent, setConsent] = useState(true);
  const [status, setStatus] = useState<Status>("idle");
  const [message, setMessage] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (status === "loading") return;

    if (!consent) {
      setStatus("error");
      setMessage("Please confirm you agree to receive updates.");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, email }),
      });
      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        setStatus("error");
        setMessage(data.error || "Could not submit. Please try again.");
        return;
      }

      setStatus("success");
      setMessage("Thanks for subscribing — we'll be in touch shortly.");
      setName("");
      setPhone("");
      setEmail("");
      setConsent(false);
    } catch {
      setStatus("error");
      setMessage("Network error. Please try again.");
    }
  };

  const inputClass =
    "w-full rounded-xl border border-white/[0.16] bg-white/[0.06] px-4 py-3 text-[15px] font-medium text-white outline-none transition-colors placeholder:text-white/40 focus:border-tc-light-blue/60 focus:bg-white/[0.09]";

  return (
    <div className="rounded-card border border-white/[0.16] bg-gradient-to-b from-[#26198F] to-[#170D63] p-[34px] shadow-[0_24px_54px_rgba(0,0,0,0.34)]">
      <h3 className="mb-2 text-[22px] font-extrabold">Subscribe for updates</h3>
      <p className="mb-6 text-[14px] leading-[1.5] text-white/[0.78]">
        Leave your details and our team will reach out with rates, news, and
        one-on-one VIP / OTC support.
      </p>

      <form onSubmit={onSubmit} className="flex flex-col gap-3.5" noValidate>
        <div>
          <label htmlFor="sub-name" className="mb-1.5 block text-[13px] font-semibold text-white/70">
            Full name
          </label>
          <input
            id="sub-name"
            type="text"
            autoComplete="name"
            required
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Jane Doe"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="sub-phone" className="mb-1.5 block text-[13px] font-semibold text-white/70">
            Phone
          </label>
          <input
            id="sub-phone"
            type="tel"
            autoComplete="tel"
            required
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            placeholder="+1 647 000 0000"
            className={inputClass}
          />
        </div>

        <div>
          <label htmlFor="sub-email" className="mb-1.5 block text-[13px] font-semibold text-white/70">
            Email
          </label>
          <input
            id="sub-email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="you@example.com"
            className={inputClass}
          />
        </div>

        <label htmlFor="sub-consent" className="mt-1 flex cursor-pointer items-start gap-2.5 text-[12.5px] leading-[1.5] text-white/65">
          <input
            id="sub-consent"
            type="checkbox"
            checked={consent}
            onChange={(e) => setConsent(e.target.checked)}
            className="mt-0.5 h-4 w-4 flex-none cursor-pointer accent-tc-orange"
          />
          <span>
            I agree to receive marketing updates, rate alerts, and news from Trillium Coin by
            email or phone, and I can unsubscribe at any time.
          </span>
        </label>

        <button
          type="submit"
          disabled={status === "loading" || !consent}
          className="btn-primary mt-1.5 w-full disabled:cursor-not-allowed disabled:opacity-70"
        >
          {status === "loading" ? "Sending…" : "Subscribe"}
        </button>

        {message && (
          <p
            role="status"
            className={`text-[13.5px] font-semibold ${
              status === "success" ? "text-[#4ade80]" : "text-[#ff7a6b]"
            }`}
          >
            {message}
          </p>
        )}
      </form>
    </div>
  );
}
