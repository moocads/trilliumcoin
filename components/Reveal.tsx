"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";

type Dir = "left" | "right" | "up" | "down";

const HIDDEN: Record<Dir, string> = {
  left: "-translate-x-10 opacity-0",
  right: "translate-x-10 opacity-0",
  up: "translate-y-10 opacity-0",
  down: "-translate-y-10 opacity-0",
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  className = "",
}: {
  children: ReactNode;
  direction?: Dir;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (window.matchMedia?.("(prefers-reduced-motion: reduce)").matches) {
      setShown(true);
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setShown(true);
            io.disconnect();
            break;
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -8% 0px" }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      style={{ transitionDelay: `${delay}ms` }}
      className={
        "transition-all duration-[800ms] ease-out will-change-transform " +
        (shown ? "translate-x-0 translate-y-0 opacity-100" : HIDDEN[direction]) +
        (className ? " " + className : "")
      }
    >
      {children}
    </div>
  );
}
