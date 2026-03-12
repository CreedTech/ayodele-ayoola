"use client";

interface Category {
  label: string;
  icon: string;
  skills: string[];
}

const CATEGORIES: Category[] = [
  {
    label: "Frontend",
    icon: "◈",
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "Redux Toolkit", "Tailwind CSS", "GSAP", "Three.js", "Framer Motion", "HTML5 / CSS3"],
  },
  {
    label: "Backend",
    icon: "◉",
    skills: ["Node.js", "Express.js", "Python", "REST APIs", "GraphQL", "WebSockets"],
  },
  {
    label: "Databases",
    icon: "▦",
    skills: ["PostgreSQL", "MongoDB", "Redis", "Firebase / Firestore"],
  },
  {
    label: "Mobile",
    icon: "◻",
    skills: ["Flutter", "React Native"],
  },
  {
    label: "Cloud & DevOps",
    icon: "◬",
    skills: ["AWS (EC2, S3, Lambda)", "Docker", "CI/CD Pipelines", "Vercel", "Git & GitHub"],
  },
  {
    label: "Testing",
    icon: "◎",
    skills: ["Jest", "React Testing Library", "Cypress", "Playwright"],
  },
  {
    label: "Design",
    icon: "✦",
    skills: ["Figma", "Storybook", "Design Systems", "WCAG Accessibility"],
  },
  {
    label: "Payments",
    icon: "◑",
    skills: ["Stripe", "PayPal", "Flutterwave", "Paystack"],
  },
];


function CategorySection({ cat }: { cat: Category }) {
  return (
    <div>
      <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 18 }}>
        <span style={{ color: "var(--accent)", fontSize: 16 }}>{cat.icon}</span>
        <h2 className="font-display" style={{ fontSize: "clamp(16px,1.8vw,22px)", fontWeight: 600, letterSpacing: "-.02em" }}>
          {cat.label}
        </h2>
      </div>
      <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
        {cat.skills.map(skill => (
          <span
            key={skill}
            style={{
              padding: "7px 14px",
              border: "1px solid var(--border)",
              borderRadius: 100,
              fontSize: 13,
              color: "var(--muted)",
              letterSpacing: ".01em",
              transition: "border-color .1s, color .2s",
              cursor: "default",
            }}
            onMouseEnter={e => { e.currentTarget.style.borderColor = "rgba(255,255,255,.2)"; e.currentTarget.style.color = "var(--text)"; }}
            onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--border)"; e.currentTarget.style.color = "var(--muted)"; }}
          >
            {skill}
          </span>
        ))}
      </div>
    </div>
  );
}

export default function StackPage() {
  return (
    <main style={{ color: "var(--text)", minHeight: "100vh", paddingBottom: 120 }}>
      <style>{`
        @media (max-width: 768px) {
          .st-cats { grid-template-columns: 1fr !important; gap: 40px !important; }
          .st-hero-pt { padding-top: 56px !important; }
        }
      `}</style>

      {/* Hero */}
      <section className="pg st-hero-pt" style={{ paddingTop: 100, paddingBottom: 72, borderBottom: "1px solid var(--border)" }}>
        <div style={{ fontSize: 11, letterSpacing: ".28em", textTransform: "uppercase", color: "var(--accent)", marginBottom: 24 }}>
          Technologies
        </div>
        <h1 className="font-display" style={{ fontSize: "clamp(52px,10vw,120px)", fontWeight: 700, letterSpacing: "-.045em", lineHeight: 0.92, marginBottom: 28 }}>
          My Stack
        </h1>
        <p style={{ fontSize: "clamp(16px,1.8vw,20px)", color: "var(--muted)", maxWidth: 520, lineHeight: 1.65 }}>
          The tools I reach for when building things that matter.
        </p>
      </section>

      {/* Categories */}
      <section className="pg" style={{ paddingTop: 72 }}>
        <div className="st-cats" style={{ display: "grid", gridTemplateColumns: "repeat(2,1fr)", gap: "56px 80px" }}>
          {CATEGORIES.map(cat => <CategorySection key={cat.label} cat={cat} />)}
        </div>
      </section>

     
    </main>
  );
}
