"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Preloader({ onDone }: { onDone: () => void }) {
  const wrapRef = useRef<HTMLDivElement>(null);
  const numRef  = useRef<HTMLDivElement>(null);
  const barRef  = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const counter = { v: 0 };

    gsap.to(counter, {
      v: 100,
      duration: 2.5,
      ease: "power2.inOut",
      onUpdate() {
        const n = Math.round(counter.v);
        if (numRef.current) numRef.current.textContent = String(n);
        if (barRef.current) barRef.current.style.width = n + "%";
      },
      onComplete() {
        if (!numRef.current || !wrapRef.current) { onDone(); return; }
        const tl = gsap.timeline({ onComplete: onDone });
        tl.to(numRef.current, { scale: 1.06, opacity: 0, duration: 0.35, ease: "power2.in" })
          .to(wrapRef.current, { yPercent: -100, duration: 0.9, ease: "power4.inOut" });
      },
    });
  }, [onDone]);

  return (
    <div
      ref={wrapRef}
      style={{
        position: "fixed", inset: 0, zIndex: 8000,
        background: "#030303",
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center",
      }}
    >
      <div
        ref={numRef}
        className="font-display"
        style={{
          fontSize: "clamp(88px,16vw,196px)",
          fontWeight: 600,
          letterSpacing: "-0.04em",
          lineHeight: 1,
          color: "var(--text)",
        }}
      >
        0
      </div>

      <p style={{ fontSize: 11, letterSpacing: "0.3em", textTransform: "uppercase", color: "var(--muted)", marginTop: 14 }}>
        Loading experience
      </p>

      <div ref={barRef} style={{ position: "absolute", bottom: 0, left: 0, height: 2, background: "var(--accent)", width: 0 }} />
    </div>
  );
}
