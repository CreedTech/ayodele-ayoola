'use client';
import { useState } from 'react';
import { CompanyLogoBadge } from '@/components/CompanyLogoBadge';
import { projects } from '@/lib/data';

const ALL_TAGS = Array.from(new Set(projects.flatMap((p) => p.tags)));

export default function ProjectsPage() {
  const [active, setActive] = useState<string | null>(null);
  const filtered = active
    ? projects.filter((p) => p.tags.includes(active))
    : projects;

  return (
    <main
      style={{ color: 'var(--text)', minHeight: '100vh', paddingBottom: 120 }}
    >
      <style>{`
        @media (max-width: 768px) {
          .pj-hero { padding-top: 56px !important; }
          .pj-filters { display: none !important; }
          .pj-row-meta { display: none !important; }
        }
        .pj-filter-btn {
          padding: 5px 16px;
          border-radius: 100px;
          border: 1px solid var(--border);
          background: transparent;
          color: var(--muted);
          font-size: 11px;
          letter-spacing: .06em;
          text-transform: uppercase;
          cursor: pointer;
          font-family: inherit;
          transition: background .15s, color .15s, border-color .15s;
        }
        .pj-filter-btn:hover { border-color: rgba(255,255,255,.18); color: var(--text); }
        .pj-filter-btn--active { background: var(--accent) !important; color: #000 !important; border-color: var(--accent) !important; font-weight: 600; }
        .pj-filter-btn--active:hover { background: var(--accent) !important; color: #000 !important; }
      `}</style>

      {/* Hero */}
      <section
        className="pg pj-hero"
        style={{
          paddingTop: 100,
          paddingBottom: 72,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div
          style={{
            fontSize: 11,
            letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: 'var(--accent)',
            marginBottom: 24,
          }}
        >
          Built Projects
        </div>
        <div
          style={{
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'space-between',
            gap: 40,
            flexWrap: 'wrap',
          }}
        >
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(52px,10vw,120px)',
              fontWeight: 700,
              letterSpacing: '-.045em',
              lineHeight: 0.92,
            }}
          >
            All Projects
          </h1>
          <p
            style={{
              fontSize: 'clamp(14px,1.4vw,17px)',
              color: 'var(--muted)',
              maxWidth: 380,
              lineHeight: 1.7,
              paddingBottom: 8,
            }}
          >
            Things I&apos;ve shipped - spanning Web3, fintech, media, and
            research platforms across web, mobile, and full-stack.
          </p>
        </div>
      </section>

      {/* Filter bar */}
      <section
        className="pg pj-filters"
        style={{
          paddingTop: 36,
          paddingBottom: 36,
          borderBottom: '1px solid var(--border)',
          display: 'flex',
          gap: 10,
          flexWrap: 'wrap',
          alignItems: 'center',
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: '.1em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginRight: 8,
          }}
        >
          Filter
        </span>
        <button
          onClick={() => setActive(null)}
          className={`pj-filter-btn${active === null ? ' pj-filter-btn--active' : ''}`}
        >
          All
        </button>
        {ALL_TAGS.map((tag) => (
          <button
            key={tag}
            onClick={() => setActive(active === tag ? null : tag)}
            className={`pj-filter-btn${active === tag ? ' pj-filter-btn--active' : ''}`}
          >
            {tag}
          </button>
        ))}
      </section>

      {/* Projects list */}
      <section className="pg" style={{ paddingTop: 0 }}>
        <div>
          {filtered.map((p) => (
            <a
              key={p.num}
              href={p.href}
              className="work-row"
              style={{
                padding: '40px 0',
                borderBottom: '1px solid var(--border)',
                textDecoration: 'none',
                color: 'inherit',
                position: 'relative',
                transition: 'padding-left .15s ease',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.paddingLeft = '20px';
                const bar = e.currentTarget.querySelector(
                  '.w-bar',
                ) as HTMLElement;
                if (bar) bar.style.height = '100%';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.paddingLeft = '0';
                const bar = e.currentTarget.querySelector(
                  '.w-bar',
                ) as HTMLElement;
                if (bar) bar.style.height = '0';
              }}
            >
              <div
                className="w-bar"
                style={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  width: 3,
                  height: 0,
                  background: 'var(--accent)',
                  transition: 'height .15s ease',
                }}
              />

              <div
                style={{ display: 'flex', alignItems: 'flex-start', gap: 20 }}
              >
                <CompanyLogoBadge
                  logo={p.logo}
                  logoUrl={p.logoUrl}
                  company={p.company}
                  size={80}
                  imgPadding={12}
                  fallbackFontSize={11}
                />
                <div style={{ flex: 1 }}>
                  <div
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: 10,
                      marginBottom: 6,
                      flexWrap: 'wrap',
                    }}
                  >
                    <span
                      style={{
                        fontSize: 11,
                        letterSpacing: '.06em',
                        textTransform: 'uppercase',
                        color: 'var(--accent)',
                        fontWeight: 500,
                      }}
                    >
                      {p.company}
                    </span>
                    {/* <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: 'var(--muted)',
                        display: 'inline-block',
                      }}
                    /> */}
                    {/* <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {p.role}
                    </span> */}
                    {/* <span
                      style={{
                        width: 3,
                        height: 3,
                        borderRadius: '50%',
                        background: 'var(--muted)',
                        display: 'inline-block',
                      }}
                    /> */}
                    {/* <span style={{ fontSize: 11, color: 'var(--muted)' }}>
                      {p.period}
                    </span> */}
                  </div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(22px,3.2vw,48px)',
                      fontWeight: 500,
                      letterSpacing: '-.02em',
                    }}
                  >
                    {p.title}
                  </div>
                  <p
                    style={{
                      fontSize: 14,
                      color: 'var(--muted)',
                      marginTop: 8,
                      maxWidth: 560,
                      lineHeight: 1.75,
                    }}
                  >
                    {p.desc}
                  </p>
                </div>
              </div>

              <div
                className="pj-row-meta"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 16,
                  flexShrink: 0,
                }}
              >
                <div
                  style={{
                    display: 'flex',
                    gap: 8,
                    flexWrap: 'wrap',
                    justifyContent: 'flex-end',
                  }}
                >
                  {p.tags.map((t) => (
                    <span
                      key={t}
                      style={{
                        fontSize: 11,
                        letterSpacing: '.07em',
                        textTransform: 'uppercase',
                        color: 'var(--muted)',
                        border: '1px solid var(--border)',
                        padding: '4px 12px',
                        borderRadius: 100,
                      }}
                    >
                      {t}
                    </span>
                  ))}
                  <span
                    style={{
                      fontSize: 11,
                      letterSpacing: '.07em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                      border: '1px solid var(--border)',
                      padding: '4px 12px',
                      borderRadius: 100,
                    }}
                  >
                    {p.year}
                  </span>
                </div>
                <svg
                  style={{ color: 'var(--muted)', flexShrink: 0 }}
                  width="18"
                  height="18"
                  viewBox="0 0 18 18"
                  fill="none"
                >
                  <path
                    d="M1 17L17 1M17 1H1M17 1V17"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </div>
            </a>
          ))}
        </div>
      </section>
    </main>
  );
}
