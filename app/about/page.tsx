'use client';
import { AsciiArt } from '@/components/ascii-art';
import ExperienceOverviewSection from '@/components/ExperienceOverviewSection';
import { CV_VIEW_URL, CV_DOWNLOAD_URL } from '@/lib/data';

const VALUES = [
  {
    title: 'Performance First',
    icon: '⚡',
    desc: 'Every millisecond counts. I optimise for Core Web Vitals, lazy loading, code splitting, and caching - because fast is a feature.',
  },
  {
    title: 'Design-Driven Dev',
    icon: '✦',
    desc: 'Engineering rigour meets design craft. I care about typography, spacing, motion, and the invisible details that make interfaces feel alive.',
  },
  {
    title: 'Continuous Learning',
    icon: '◎',
    desc: 'The web evolves fast. I stay current with Web3, AI tooling, and emerging frameworks - curiosity is what makes this work endlessly interesting.',
  },
];

function FadeUp({
  children,
  delay: _,
}: {
  children: React.ReactNode;
  delay?: number;
}) {
  return <div>{children}</div>;
}

export default function AboutPage() {
  return (
    <main
      style={{ color: 'var(--text)', minHeight: '100vh', paddingBottom: 120 }}
    >
      <style>{`
        @media (max-width: 768px) {
          .ab-narrative { grid-template-columns: 1fr !important; gap: 32px !important; }
          .ab-education { grid-template-columns: 1fr !important; }
          .ab-values    { grid-template-columns: 1fr !important; }
          .ab-hero-pt   { padding-top: 56px !important; }
        }
      `}</style>

      {/* ── Hero ── */}
      <section
        className="pg ab-hero-pt flex flex-col gap-6 md:gap-0 justify-between items-center md:items-start md:flex-row"
        style={{
          paddingTop: 100,
          paddingBottom: 72,
          borderBottom: '1px solid var(--border)',
        }}
      >
        <div>
          <div
            style={{
              fontSize: 11,
              letterSpacing: '.28em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              marginBottom: 24,
            }}
          >
            About
          </div>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(52px,10vw,120px)',
              fontWeight: 700,
              letterSpacing: '-.045em',
              lineHeight: 0.92,
              marginBottom: 28,
            }}
          >
            My Journey
          </h1>
          <p
            style={{
              fontSize: 'clamp(16px,1.8vw,20px)',
              color: 'var(--muted)',
              maxWidth: 520,
              lineHeight: 1.65,
              marginBottom: 32,
            }}
          >
            From Lagos to London - a story of code, craft, and constant growth.
          </p>
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, flexWrap: 'wrap' }}>
            <a
              href={CV_DOWNLOAD_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 8,
                padding: '11px 24px',
                borderRadius: 100,
                background: 'var(--accent)',
                color: '#000',
                fontSize: 12,
                fontWeight: 600,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                textDecoration: 'none',
                transition: 'opacity .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                <polyline points="7 10 12 15 17 10" />
                <line x1="12" y1="15" x2="12" y2="3" />
              </svg>
              Download CV
            </a>
            <a
              href={CV_VIEW_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: 6,
                fontSize: 12,
                letterSpacing: '.08em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                textDecoration: 'none',
                transition: 'color .15s',
              }}
              onMouseEnter={(e) => (e.currentTarget.style.color = 'var(--text)')}
              onMouseLeave={(e) => (e.currentTarget.style.color = 'var(--muted)')}
            >
              View PDF ↗
            </a>
          </div>
        </div>
        {/* ── Portrait placeholder ── */}
        <AsciiArt
          src="https://res.cloudinary.com/dkrutkbjs/image/upload/v1776971862/IMG_6578_zhrvod.jpg"
          resolution={100}
          color="var(--color-neutral-500)"
          animationStyle="fade"
          animationDuration={1.5}
          animateOnView={false}
          className="mx-auto aspect-square w-full max-w-lg bg-neutral-950"
        />

        {/* <div style={{
          width: "100%", maxWidth: 800, height: 200,
          border: "1px solid var(--border)", borderRadius: 16,
          display: "flex", alignItems: "center", justifyContent: "center",
          background: "var(--surface)", fontFamily: "'SF Mono', monospace",
          fontSize: 13, color: "var(--muted)", letterSpacing: ".1em",
        }}>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 28, marginBottom: 10, opacity: 0.3 }}>[ ]</div>
            <div>[ Portrait coming soon ]</div>
            <div style={{ fontSize: 11, marginTop: 6, opacity: 0.5 }}>Ayodele Ayoola, London 2025</div>
          </div>
        </div> */}
      </section>

      {/* ── Narrative ── */}
      {/* ── Narrative ── */}
      <section className="pg" style={{ paddingTop: 80 }}>
        <div
          className="ab-narrative"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1fr',
            gap: 72,
            alignItems: 'start',
          }}
        >
          <FadeUp>
            <p
              className="font-display"
              style={{
                fontSize: 'clamp(20px,2.5vw,36px)',
                fontWeight: 400,
                letterSpacing: '-.02em',
                lineHeight: 1.3,
              }}
            >
              I was originally on track to become a medical doctor, but at the
              last moment I chose a different path. With nothing but a phone and
              free resources, I started teaching myself how to code driven
              purely by curiosity and persistence.
            </p>
          </FadeUp>

          <FadeUp delay={0.1}>
            <p
              style={{ fontSize: 16, lineHeight: 1.85, color: 'var(--muted)' }}
            >
              That curiosity led me to Aptech, where a mentor pushed me beyond a
              basic course into a full diploma in software engineering. Over two
              years, I built a strong foundation while freelancing and even
              teaching, before landing my first industry role at Zummit Africa
              where I quickly transitioned into React, TypeScript, and modern
              frontend development.
            </p>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.85,
                color: 'var(--muted)',
                marginTop: 24,
              }}
            >
              From there, I expanded into mobile development with Flutter, built
              multiple side projects, and joined Vanguard Media where I worked
              across web and mobile while mentoring internally. I also shipped a
              food ordering app as a freelance React Native developer during
              this time.
            </p>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.85,
                color: 'var(--muted)',
                marginTop: 24,
              }}
            >
              At RentSpace, I rebuilt the entire platform across web, backend,
              and mobile in under a month, then scaled it to support real users,
              payments, and a growing engineering team. I later moved to the UK,
              graduated with First-Class Honours from Middlesex University, and
              joined ScanSan as a Frontend Engineer where I delivered
              production-ready work within my first two weeks.
            </p>

            <p
              style={{
                fontSize: 16,
                lineHeight: 1.85,
                color: 'var(--muted)',
                marginTop: 24,
              }}
            >
              Today, I focus on building high-performance, scalable products
              across web and mobile, combining speed, usability, and clean
              architecture with a consistent track record of shipping fast and
              learning even faster.
            </p>
          </FadeUp>
        </div>
      </section>

      {/* ── Experience ── */}
      <ExperienceOverviewSection className="pg" style={{ paddingTop: 100 }} />

      {/* ── Education ── */}
      <section className="pg" style={{ paddingTop: 100 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 48,
          }}
        >
          Education
        </div>
        <div
          className="ab-education"
          style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}
        >
          {[
            {
              school: 'Middlesex University London',
              degree: 'BSc Computer Science',
              grade: 'First Class Honours',
              year: '2022 – 2025',
              note: 'Graduated with distinction. Focused on software engineering, human-computer interaction, and distributed systems.',
            },
            {
              school: 'Aptech Computer Education',
              degree: 'Advanced Diploma in Software Engineering',
              grade: 'Distinction',
              year: '2020 – 2022',
              note: 'Comprehensive program covering full-stack development, database systems, and software architecture fundamentals.',
            },
          ].map((edu, i) => (
            <FadeUp key={i} delay={i * 0.1}>
              <div
                style={{
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  padding: '32px',
                  height: '100%',
                  transition: 'border-color .1s',
                }}
                onMouseEnter={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(255,255,255,.2)')
                }
                onMouseLeave={(e) =>
                  ((e.currentTarget as HTMLDivElement).style.borderColor =
                    'var(--border)')
                }
              >
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'flex-start',
                    marginBottom: 16,
                    gap: 12,
                    flexWrap: 'wrap',
                  }}
                >
                  <div
                    style={{
                      fontSize: 10,
                      letterSpacing: '.1em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                    }}
                  >
                    {edu.year}
                  </div>
                  <span
                    style={{
                      padding: '3px 10px',
                      background: 'rgba(34,197,94,.1)',
                      border: '1px solid rgba(34,197,94,.3)',
                      borderRadius: 100,
                      fontSize: 10,
                      color: 'var(--accent)',
                      fontWeight: 500,
                    }}
                  >
                    {edu.grade}
                  </span>
                </div>
                <div
                  className="font-display"
                  style={{
                    fontSize: 'clamp(16px,1.8vw,22px)',
                    fontWeight: 600,
                    letterSpacing: '-.02em',
                    marginBottom: 4,
                  }}
                >
                  {edu.school}
                </div>
                <div
                  style={{
                    fontSize: 13,
                    color: 'var(--muted)',
                    marginBottom: 14,
                  }}
                >
                  {edu.degree}
                </div>
                <p
                  style={{
                    fontSize: 13,
                    color: 'rgba(255,255,255,.35)',
                    lineHeight: 1.7,
                  }}
                >
                  {edu.note}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>

      {/* ── Values ── */}
      <section className="pg" style={{ paddingTop: 100 }}>
        <div
          style={{
            fontSize: 11,
            letterSpacing: '.28em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
            marginBottom: 48,
          }}
        >
          What I Stand For
        </div>
        <div
          className="ab-values"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3,1fr)',
            gap: 24,
          }}
        >
          {VALUES.map((v, i) => (
            <FadeUp key={v.title} delay={i * 0.1}>
              <div
                style={{
                  padding: '32px',
                  border: '1px solid var(--border)',
                  borderRadius: 16,
                  height: '100%',
                  transition: 'border-color .1s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'rgba(255,255,255,.15)';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor =
                    'var(--border)';
                }}
              >
                <div style={{ fontSize: 26, marginBottom: 18 }}>{v.icon}</div>
                <div
                  className="font-display"
                  style={{
                    fontSize: 'clamp(16px,1.5vw,20px)',
                    fontWeight: 600,
                    letterSpacing: '-.02em',
                    marginBottom: 12,
                  }}
                >
                  {v.title}
                </div>
                <p
                  style={{
                    fontSize: 13.5,
                    color: 'var(--muted)',
                    lineHeight: 1.75,
                  }}
                >
                  {v.desc}
                </p>
              </div>
            </FadeUp>
          ))}
        </div>
      </section>
    </main>
  );
}
