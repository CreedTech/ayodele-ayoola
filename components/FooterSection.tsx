import { personal, socials } from "@/lib/data";

export default function FooterSection() {
  const year = new Date().getFullYear();
  return (
    <footer
      className="pg"
      style={{
        position: "relative", zIndex: 2,
        paddingTop: 28,
        paddingBottom: 28,
        borderTop: "1px solid var(--border)",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        flexWrap: "wrap",
        gap: 16,
      }}
    >
      <p style={{ fontSize: 12, color: "var(--muted)" }}>
        © {year} {personal.name}. Built with Next.js, TypeScript &amp; GSAP.
      </p>

      <div style={{ display: "flex", gap: 24, flexWrap: "wrap" }}>
        {socials.slice(0, 5).map(s => (
          <a
            key={s.label}
            href={s.href}
            target="_blank" rel="noopener noreferrer"
            style={{ fontSize: 12, letterSpacing: ".05em", color: "var(--muted)", textDecoration: "none", transition: "color .12s" }}
            onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
            onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
          >
            {s.label}
          </a>
        ))}
      </div>

      <button
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        style={{
          background: "none",
          border: "1px solid var(--border)",
          borderRadius: 100,
          padding: "5px 14px",
          color: "var(--muted)",
          fontSize: 11,
          letterSpacing: ".08em",
          textTransform: "uppercase",
          cursor: "pointer",
          transition: "border-color .12s, color .12s",
          fontFamily: "inherit",
        }}
        onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "var(--text)"; }}
        onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
      >
        ↑ Back to top
      </button>
    </footer>
  );
}
