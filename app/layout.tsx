import type { Metadata } from "next";
import { Red_Hat_Display } from "next/font/google";
import "./globals.css";
import Header from "@/components/Header";

const redHatDisplay = Red_Hat_Display({
  subsets: ["latin"],
  style: ["normal", "italic"],
  variable: "--font-red-hat",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Trillium Coin — Reliable & Simple Bitcoin Trading in Canada",
  description:
    "Buy and sell Bitcoin with competitive pricing, local Canadian payment methods, and one-on-one support from a FINTRAC-registered MSB operated by a Canadian public company.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={redHatDisplay.variable}>
      <body>
        <Header />
        {children}
      </body>
    </html>
  );
}
