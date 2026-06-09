import Hero from "@/components/Hero";
import BuySell from "@/components/BuySell";
import PriceMarquee from "@/components/PriceMarquee";
import Advantages from "@/components/Advantages";
import HowItWorks from "@/components/HowItWorks";
import AboutBVCI from "@/components/AboutBVCI";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import Reveal from "@/components/Reveal";

const ORDER = ["left", "right", "up", "down"] as const;

const SECTIONS = [
  Hero,
  BuySell,
  PriceMarquee,
  Advantages,
  HowItWorks,
  AboutBVCI,
  FAQ,
  Contact,
  Footer,
];

export default function Home() {
  return (
    <main className="overflow-x-clip">
      {SECTIONS.map((Section, i) => (
        <Reveal key={i} direction={ORDER[i % ORDER.length]}>
          <Section />
        </Reveal>
      ))}
    </main>
  );
}
