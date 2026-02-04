'use client';
import { projects } from "@/lib/data";
import { CompanyLogoBadge } from "@/components/CompanyLogoBadge";

export default function WorkSection() {
  return (
    <section id="work" className="sec-lg pg" style={{ position: "relative", zIndex: 2 }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 72 }}>
        <div>
          <div style={{ fontSize: 11, letterSpacing: ".3em", textTransform: "uppercase", color: "var(--muted)", marginBottom: 14 }}>
            Selected Work
          </div>
          <div className="font-display" style={{ fontSize: "clamp(40px,7vw,92px)", fontWeight: 600, letterSpacing: "-.035em", lineHeight: .93 }}>
            Recent<br />Projects
          </div>
        </div>
        <a
          href="/projects"
          style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--muted)", textDecoration: "none", transition: "color .12s" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--text)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--muted)")}
        >
          All Projects
          <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
            <path d="M1 12L12 1M12 1H1M12 1V12" stroke="currentColor" strokeWidth="1.5"/>
          </svg>
        </a>
      </div>

      <div style={{ borderTop: "1px solid var(--border)" }}>
        {projects.map((p) => (
          <a
            key={p.num}
            href={p.href}
            className="work-row"
            style={{
              padding: "36px 0",
              borderBottom: "1px solid var(--border)",
              textDecoration: "none",
              color: "inherit",
              position: "relative",
              transition: "padding-left .15s ease",
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.paddingLeft = "20px";
              const bar = e.currentTarget.querySelector(".w-bar") as HTMLElement;
              if (bar) bar.style.height = "100%";
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.paddingLeft = "0";
              const bar = e.currentTarget.querySelector(".w-bar") as HTMLElement;
              if (bar) bar.style.height = "0";
            }}
          >
            <div className="w-bar" style={{ position: "absolute", left: 0, top: 0, width: 3, height: 0, background: "var(--accent)", transition: "height .15s ease" }} />

            <div style={{ display: "flex", alignItems: "flex-start", gap: 20 }}>
              <CompanyLogoBadge logo={p.logo} logoUrl={p.logoUrl} company={p.company} size={44} />

              <div style={{ flex: 1 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 6, flexWrap: "wrap" }}>
                  <span style={{ fontSize: 11, letterSpacing: ".06em", textTransform: "uppercase", color: "var(--accent)", fontWeight: 500 }}>{p.company}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--muted)", display: "inline-block" }} />
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.role}</span>
                  <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--muted)", display: "inline-block" }} />
                  <span style={{ fontSize: 11, color: "var(--muted)" }}>{p.period}</span>
                </div>
                <div className="font-display" style={{ fontSize: "clamp(22px,3.2vw,48px)", fontWeight: 500, letterSpacing: "-.02em" }}>
                  {p.title}
                </div>
                <p style={{ fontSize: 13.5, color: "var(--muted)", marginTop: 6, maxWidth: 480, lineHeight: 1.65 }}>
                  {p.desc}
                </p>
              </div>
            </div>

            <div className="work-row-meta" style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap", justifyContent: "flex-end" }}>
                {p.tags.map(t => (
                  <span key={t} style={{ fontSize: 11, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 100 }}>
                    {t}
                  </span>
                ))}
                <span style={{ fontSize: 11, letterSpacing: ".07em", textTransform: "uppercase", color: "var(--muted)", border: "1px solid var(--border)", padding: "4px 12px", borderRadius: 100 }}>
                  {p.year}
                </span>
              </div>
              <svg style={{ color: "var(--muted)", flexShrink: 0 }} width="18" height="18" viewBox="0 0 18 18" fill="none">
                <path d="M1 17L17 1M17 1H1M17 1V17" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>
          </a>
        ))}
      </div>
    </section>
  );
}
