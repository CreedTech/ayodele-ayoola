"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";

const links = [
  // { href: "/#work",     label: "Work" },
  { href: "/projects",  label: "Projects" },
  { href: "#github",    label: "GitHub" },
  { href: "#contact",   label: "Contact" },
];

export default function Nav({ visible }: { visible: boolean }) {
  const navRef   = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (visible) gsap.to(navRef.current, { opacity: 1, duration: 0.7, ease: "power2.out" });
  }, [visible]);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  return (
    <nav
      ref={navRef}
      style={{
        position: "fixed", top: 0, left: 0, right: 0,
        zIndex: 500,
        opacity: 0,
        padding: scrolled ? "16px 52px" : "26px 52px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
        background: scrolled ? "rgba(13,13,13,.88)" : "transparent",
        backdropFilter: scrolled ? "blur(22px)" : "none",
        borderBottom: scrolled ? "1px solid var(--border)" : "none",
        transition: "padding .15s ease, background .15s ease, backdrop-filter .15s ease, border-bottom .12s ease",
      }}
    >
      <a
        href="#"
        className="font-display"
        style={{ fontSize: 17, fontWeight: 600, letterSpacing: "-.02em", color: "var(--text)", textDecoration: "none" }}
      >
        AyodeleAyoola
      </a>

      <ul style={{ display: "flex", gap: 34, listStyle: "none" }}>
        {links.map(l => (
          <li key={l.href}>
            <a
              href={l.href}
              style={{
                fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase",
                color: "var(--muted)", textDecoration: "none",
                position: "relative", transition: "color .12s",
              }}
              onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
              onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
            >
              {l.label}
            </a>
          </li>
        ))}
      </ul>

      <a
        href="mailto:ayodeleayoolaoke4@gmail.com"
        style={{
          fontSize: 12, letterSpacing: ".08em", textTransform: "uppercase",
          color: "var(--accent)", textDecoration: "none",
          border: "1px solid rgba(202,255,51,.35)",
          padding: "8px 18px", borderRadius: 100,
          transition: "background .12s",
        }}
        onMouseEnter={e => (e.currentTarget.style.background = "var(--accent-dim)")}
        onMouseLeave={e => (e.currentTarget.style.background = "transparent")}
      >
        Hire Me
      </a>
    </nav>
  );
}
