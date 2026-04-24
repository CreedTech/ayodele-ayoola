"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import ScrollTrigger from "gsap/ScrollTrigger";
import { blogPosts } from "@/lib/data";

export default function BlogSection() {
  const cardRefs = useRef<HTMLAnchorElement[]>([]);

  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    cardRefs.current.forEach((c, i) => {
      if (!c) return;
      gsap.from(c, {
        opacity: 0, y: 32, duration: 0.8, delay: i * 0.12, ease: "power3.out",
        scrollTrigger: { trigger: c, start: "top 88%" },
      });
    });
  }, []);

  return (
    <section
      id="blog"
      style={{
        position: "relative", zIndex: 2,
        padding: "130px 52px",
        borderTop: "1px solid var(--border)",
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
            Writing
          </div>
          <div
            className="font-display"
            style={{ fontSize: "clamp(40px,7vw,92px)", fontWeight: 600, letterSpacing: "-.035em", lineHeight: .93 }}
          >
            Latest<br />Articles
          </div>
        </div>
        <a
          href="#"
          style={{
            display: "flex", alignItems: "center", gap: 8,
            fontSize: 12, letterSpacing: ".07em", textTransform: "uppercase",
            color: "var(--muted)", textDecoration: "none", transition: "color .12s",
          }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          All Articles
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 12L12 1M12 1H1M12 1V12" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </a>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(3,1fr)", gap: 1, background: "var(--border)", borderRadius: 16, overflow: "hidden" }}>
        {blogPosts.map((post, i) => (
          <a
            key={i}
            href={post.href}
            ref={el => { if (el) cardRefs.current[i] = el; }}
            style={{
              display: "block",
              background: "var(--surface)",
              padding: "48px 40px",
              textDecoration: "none",
              color: "inherit",
              transition: "background .12s",
              position: "relative",
              overflow: "hidden",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface-2)";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = "var(--surface)";
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 32 }}>
              <span style={{
                fontSize: 11, letterSpacing: ".1em", textTransform: "uppercase",
                color: "var(--accent)", border: "1px solid rgba(34,197,94,.25)",
                padding: "4px 12px", borderRadius: 100,
              }}>
                {post.tag}
              </span>
              <svg style={{ color: "var(--muted)" }} width="16" height="16" viewBox="0 0 16 16" fill="none">
                <path d="M1 15L15 1M15 1H1M15 1V15" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>

            <h3
              className="font-display"
              style={{
                fontSize: "clamp(18px,2vw,24px)", fontWeight: 500,
                letterSpacing: "-.02em", lineHeight: 1.25,
                marginBottom: 20,
              }}
            >
              {post.title}
            </h3>

            <p style={{ fontSize: 12, color: "var(--muted)", letterSpacing: ".05em" }}>
              {post.date}
            </p>
          </a>
        ))}
      </div>
    </section>
  );
}
