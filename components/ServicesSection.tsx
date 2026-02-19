const services = [
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M9 21V9" />
      </svg>
    ),
    title: 'Frontend Engineering',
    desc: 'High-performance React/Next.js apps with pixel-perfect UIs, Core Web Vitals optimisation, and scalable component architectures.',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
      </svg>
    ),
    title: 'Full-Stack Development',
    desc: 'End-to-end solutions with Node.js, PostgreSQL, MongoDB, and REST/GraphQL APIs - from prototype to production.',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M12 2a10 10 0 1 0 10 10" />
        <path d="m14 14 7-7m0 0H14m7 0v7" />
      </svg>
    ),
    title: 'Creative Development',
    desc: 'Motion design, GSAP animations, Three.js WebGL experiences, and interactive storytelling that sets your brand apart.',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <circle cx="12" cy="12" r="3" />
        <path d="M12 1v4M12 19v4M4.22 4.22l2.83 2.83M16.95 16.95l2.83 2.83M1 12h4M19 12h4M4.22 19.78l2.83-2.83M16.95 7.05l2.83-2.83" />
      </svg>
    ),
    title: 'Design Systems',
    desc: 'Scalable component libraries with Storybook, design tokens, dark/light themes, and full Figma integration.',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.91 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.81 1h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 8a16 16 0 0 0 7.91 7.91l.95-.95a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 17z" />
      </svg>
    ),
    title: 'Technical Consulting',
    desc: 'Architecture reviews, performance audits, code quality uplift, and hands-on mentoring for growing engineering teams.',
  },
  {
    icon: (
      <svg
        width="20"
        height="20"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.4"
      >
        <rect x="5" y="2" width="14" height="20" rx="2" />
        <path d="M12 18h.01" />
      </svg>
    ),
    title: 'Mobile Development',
    desc: 'Cross-platform apps with Flutter and React Native - real-world delivery experience across iOS and Android.',
  },
];

export default function ServicesSection() {
  return (
    <section
      id="services"
      className="sec pg"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--border)',
      }}
    >
      <div style={{ marginBottom: 64 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '.3em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 14,
          }}
        >
          What I Do
        </div>
        <div
          className="font-display"
          style={{
            fontSize: 'clamp(40px,7vw,92px)',
            fontWeight: 600,
            letterSpacing: '-.035em',
            lineHeight: 0.93,
          }}
        >
          Services
        </div>
      </div>

      <div className="services-grid">
        {services.map((s) => (
          <div
            key={s.title}
            style={{
              padding: '48px 36px',
              borderRight: '1px solid var(--border)',
              borderBottom: '1px solid var(--border)',
              transition: 'background .25s',
            }}
            onMouseEnter={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'rgba(255,255,255,.025)')
            }
            onMouseLeave={(e) =>
              ((e.currentTarget as HTMLElement).style.background =
                'transparent')
            }
          >
            <div style={{ color: 'var(--accent)', marginBottom: 28 }}>
              {s.icon}
            </div>
            <h3
              className="font-display"
              style={{
                fontSize: 18,
                fontWeight: 600,
                letterSpacing: '-.02em',
                marginBottom: 12,
              }}
            >
              {s.title}
            </h3>
            <p style={{ fontSize: 14, color: 'var(--muted)', lineHeight: 1.7 }}>
              {s.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
