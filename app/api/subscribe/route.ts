import { NextResponse } from "next/server";

const TO_EMAIL = "info@moocads.com";
const FROM_EMAIL = "noreply@trilliumcoin.ca";

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(req: Request) {
  let body: { name?: string; phone?: string; email?: string };
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid request." }, { status: 400 });
  }

  const name = (body.name ?? "").trim();
  const phone = (body.phone ?? "").trim();
  const email = (body.email ?? "").trim();

  if (!name || !phone || !email) {
    return NextResponse.json({ error: "All fields are required." }, { status: 400 });
  }
  if (!isEmail(email)) {
    return NextResponse.json({ error: "Please enter a valid email." }, { status: 400 });
  }

  const apiKey = process.env.SENDGRID_EMAIL_API;
  if (!apiKey) {
    return NextResponse.json(
      { error: "Email service is not configured." },
      { status: 500 }
    );
  }

  const text = `New subscription from the Trillium Coin website:

Name:  ${name}
Phone: ${phone}
Email: ${email}`;

  const html = `<h2>New subscription</h2>
<p><strong>Name:</strong> ${escapeHtml(name)}</p>
<p><strong>Phone:</strong> ${escapeHtml(phone)}</p>
<p><strong>Email:</strong> ${escapeHtml(email)}</p>`;

  try {
    const res = await fetch("https://api.sendgrid.com/v3/mail/send", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        personalizations: [{ to: [{ email: TO_EMAIL }] }],
        from: { email: FROM_EMAIL, name: "Trillium Coin" },
        reply_to: { email, name },
        subject: `New subscription — ${name}`,
        content: [
          { type: "text/plain", value: text },
          { type: "text/html", value: html },
        ],
      }),
    });

    if (!res.ok) {
      const detail = await res.text();
      console.error("SendGrid error", res.status, detail);
      return NextResponse.json(
        { error: "Could not send your details. Please try again." },
        { status: 502 }
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("subscribe route error", err);
    return NextResponse.json({ error: "Something went wrong." }, { status: 500 });
  }
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}
