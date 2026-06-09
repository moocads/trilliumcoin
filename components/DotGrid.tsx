"use client";

import { useEffect, useRef } from "react";

type Props = {
  className?: string;
  gap?: number;
  /** glow radius around the pointer in px */
  radius?: number;
};

export default function DotGrid({ className, gap = 22, radius = 150 }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const parent = canvas.parentElement;
    if (!parent) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let w = 0;
    let h = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);

    // pointer (target) and smoothed pointer (current)
    const target = { x: -9999, y: -9999 };
    const cur = { x: -9999, y: -9999 };
    let active = 0; // 0..1 fade for the glow when pointer enters/leaves

    const resize = () => {
      w = parent.clientWidth || 1;
      h = parent.clientHeight || 1;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = Math.floor(w * dpr);
      canvas.height = Math.floor(h * dpr);
      canvas.style.width = "100%";
      canvas.style.height = "100%";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(parent);

    const onMove = (e: PointerEvent) => {
      const rect = parent.getBoundingClientRect();
      target.x = e.clientX - rect.left;
      target.y = e.clientY - rect.top;
      active = 1;
    };
    const onLeave = () => {
      active = 0;
    };
    parent.addEventListener("pointermove", onMove);
    parent.addEventListener("pointerleave", onLeave);

    const R = radius;
    const baseColor = "rgba(120,150,255,0.16)";
    let raf = 0;

    const draw = () => {
      ctx.clearRect(0, 0, w, h);

      // smooth pointer follow
      cur.x += (target.x - cur.x) * 0.18;
      cur.y += (target.y - cur.y) * 0.18;

      // soft ambient glow blob under the pointer
      if (active > 0) {
        const g = ctx.createRadialGradient(cur.x, cur.y, 0, cur.x, cur.y, R * 1.15);
        g.addColorStop(0, "rgba(40,90,255,0.22)");
        g.addColorStop(0.5, "rgba(40,90,255,0.07)");
        g.addColorStop(1, "rgba(40,90,255,0)");
        ctx.globalCompositeOperation = "lighter";
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(cur.x, cur.y, R * 1.15, 0, Math.PI * 2);
        ctx.fill();
        ctx.globalCompositeOperation = "source-over";
      }

      const startX = ((-8 % gap) + gap) % gap;
      const startY = ((-8 % gap) + gap) % gap;
      const R2 = R * R;

      for (let y = startY; y <= h; y += gap) {
        for (let x = startX; x <= w; x += gap) {
          const dx = x - cur.x;
          const dy = y - cur.y;
          const d2 = dx * dx + dy * dy;

          if (d2 < R2) {
            const d = Math.sqrt(d2);
            const t = (1 - d / R) * active;
            const dotR = 1.1 + t * 2.4;
            ctx.beginPath();
            ctx.arc(x, y, dotR, 0, Math.PI * 2);
            if (t > 0.35) {
              ctx.shadowColor = "rgba(60,120,255,0.9)";
              ctx.shadowBlur = 10 * t;
            } else {
              ctx.shadowBlur = 0;
            }
            ctx.fillStyle = `rgba(${90 + t * 90},${150 + t * 80},255,${0.16 + t * 0.84})`;
            ctx.fill();
          } else {
            ctx.shadowBlur = 0;
            ctx.beginPath();
            ctx.arc(x, y, 1.1, 0, Math.PI * 2);
            ctx.fillStyle = baseColor;
            ctx.fill();
          }
        }
      }
      ctx.shadowBlur = 0;

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(raf);
      } else {
        raf = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    return () => {
      cancelAnimationFrame(raf);
      document.removeEventListener("visibilitychange", onVisibility);
      parent.removeEventListener("pointermove", onMove);
      parent.removeEventListener("pointerleave", onLeave);
      ro.disconnect();
    };
  }, [gap, radius]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className={className ?? "pointer-events-none absolute inset-0 z-0 h-full w-full"}
    />
  );
}
