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
        © {year} {personal.name}. Built with Next.js &amp; GSAP.
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

      <p style={{ fontSize: 12, color: "var(--muted)" }}>{personal.location}</p>
    </footer>
  );
}
