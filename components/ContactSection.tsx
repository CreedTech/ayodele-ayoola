import { personal } from "@/lib/data";

export default function ContactSection() {
  return (
    <section
      id="contact"
      className="sec-lg pg"
      style={{
        position: "relative", zIndex: 2,
        borderTop: "1px solid var(--border)",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 48 }}>
        Let&apos;s work together
      </div>

      <div
        className="font-display"
        style={{ fontSize: "clamp(60px,12vw,160px)", fontWeight: 700, letterSpacing: "-.045em", lineHeight: .88, marginBottom: 52 }}
      >
        <div>Got a</div>
        <div style={{ color: "var(--accent)" }}>project?</div>
      </div>

      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
        <a
          href={`mailto:${personal.email}`}
          className="font-display"
          style={{
            fontSize: "clamp(14px,1.8vw,22px)", color: "var(--muted)", textDecoration: "none",
            letterSpacing: ".03em", borderBottom: "1px solid var(--border)", paddingBottom: 4,
            transition: "color .12s, border-color .12s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--accent)"; e.currentTarget.style.borderColor = "var(--accent)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--muted)"; e.currentTarget.style.borderColor = "var(--border)"; }}
        >
          {personal.email}
        </a>

        <div style={{ display: "flex", gap: 16, marginTop: 16 }}>
          <a
            href={`mailto:${personal.email}`}
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 34px", borderRadius: 100,
              background: "var(--accent)", color: "#000",
              fontSize: 12, fontWeight: 500, letterSpacing: ".07em",
              textTransform: "uppercase", textDecoration: "none", transition: "opacity .12s",
            }}
            onMouseEnter={e => (e.currentTarget.style.opacity = ".85")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            Send Message
            <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
              <path d="M1 12L12 1M12 1H1M12 1V12" stroke="currentColor" strokeWidth="1.5"/>
            </svg>
          </a>
          <a
            href={`https://${personal.linkedin}`}
            target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 10,
              padding: "16px 28px", borderRadius: 100,
              border: "1px solid var(--border)", color: "var(--muted)",
              fontSize: 12, letterSpacing: ".07em", textTransform: "uppercase", textDecoration: "none",
              transition: "border-color .3s, color .12s",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.25)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
          >
            LinkedIn
          </a>
        </div>
      </div>
    </section>
  );
}
