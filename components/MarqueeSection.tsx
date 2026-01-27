"use client";
import { skills } from "@/lib/data";

export default function MarqueeSection() {
  const items = [...skills, ...skills]; // double for seamless loop

  return (
    <div
      style={{
        position: "relative", zIndex: 2,
        padding: "36px 0",
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          display: "flex",
          width: "max-content",
          animation: "mq 30s linear infinite",
        }}
        onMouseEnter={e => ((e.currentTarget as HTMLElement).style.animationPlayState = "paused")}
        onMouseLeave={e => ((e.currentTarget as HTMLElement).style.animationPlayState = "running")}
      >
        {[0, 1].map(set => (
          <div key={set} style={{ display: "flex", alignItems: "center", gap: 56, paddingRight: 56, whiteSpace: "nowrap" }}>
            {skills.map((s, i) => (
              <span key={i} style={{ display: "inline-flex", alignItems: "center", gap: 56 }}>
                <span
                  className="font-display"
                  style={{
                    fontSize: "clamp(26px,3.4vw,44px)",
                    fontWeight: 500, letterSpacing: "-.02em",
                    color: i % 3 === 0 ? "var(--text)" : "var(--muted)",
                  }}
                >
                  {s}
                </span>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent)", flexShrink: 0 }} />
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}
