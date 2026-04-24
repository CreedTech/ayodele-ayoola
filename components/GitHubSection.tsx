'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
const GitHubCalendarWrapper = dynamic(() => import('./GitHubCalendarWrapper'), { ssr: false });

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = [
  CURRENT_YEAR,
  CURRENT_YEAR - 1,
  CURRENT_YEAR - 2,
  CURRENT_YEAR - 3,
  CURRENT_YEAR - 4,
];
export default function GitHubSection() {
  const [year, setYear] = useState(CURRENT_YEAR);
  return (
    <section
      id="github"
      className="sec-lg pg"
      style={{
        position: 'relative',
        zIndex: 2,
        borderTop: '1px solid var(--border)',
      }}
    >
      <style>{`
        .gh-yr-btn {
          padding: 5px 14px;
          border-radius: 100px;
          border: none;
          background: rgba(255,255,255,.04);
          color: var(--muted);
          font-size: 12px;
          cursor: pointer;
          letter-spacing: .03em;
          transition: background .15s, color .15s;
          font-family: inherit;
        }
        .gh-yr-btn:hover {
          background: rgba(255,255,255,.08);
          color: var(--text);
        }
        .gh-yr-btn--active {
          background: var(--accent) !important;
          color: #000 !important;
          font-weight: 600;
        }
        .gh-yr-btn--active:hover {
          background: var(--accent) !important;
          color: #000 !important;
        }
        @media (max-width: 1024px) {
          .gh-card, .gh-heading { width: 82% !important; }
          .gh-card { padding: 26px 24px 22px !important; }
        }
        @media (max-width: 768px) {
          .gh-card, .gh-heading { width: 100% !important; }
          .gh-card { padding: 24px 16px 20px !important; }
          .gh-card-body { flex-direction: column !important; }
          .gh-year-list {
            flex-direction: row !important;
            flex-wrap: wrap !important;
            padding-top: 0 !important;
          }
        }
      `}</style>

      <div className="gh-heading" style={{ width: '65%', margin: '0 auto 20px' }}>
        <p style={{
          fontSize: 11,
          letterSpacing: '.28em',
          textTransform: 'uppercase',
          color: 'var(--accent)',
          marginBottom: 12,
        }}>
          GitHub Activity
        </p>
        <h2
          className="font-display"
          style={{ fontSize: 'clamp(28px,4vw,48px)', fontWeight: 700, letterSpacing: '-.03em', lineHeight: 1 }}
        >
          Contributions
        </h2>
      </div>

      <div
        className="gh-card"
        style={{
          width: '65%',
          margin: '0 auto',
          background: '#0f0f0f',
          border: '1px solid var(--border)',
          borderRadius: 16,
          padding: '28px 32px 24px',
        }}
      >
        <div
          className="gh-card-body"
          style={{ display: 'flex', gap: 24, alignItems: 'flex-start' }}
        >
          <div
            style={{
              flex: 1,
              minWidth: 0,
              paddingBottom: 4,
            }}
          >
            <GitHubCalendarWrapper year={year} />
          </div>

          <div
            className="gh-year-list"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 6,
              flexShrink: 0,
              paddingTop: 2,
            }}
          >
            {YEARS.map((y) => (
              <button
                key={y}
                onClick={() => setYear(y)}
                className={`gh-yr-btn${year === y ? ' gh-yr-btn--active' : ''}`}
              >
                {y}
              </button>
            ))}
          </div>
         
            {/* <GitHubCalendarWrapper year={CURRENT_YEAR} /> */}
          </div>
        </div>
    </section>
  );
}
