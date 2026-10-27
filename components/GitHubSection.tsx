'use client';
import { useState } from 'react';
import dynamic from 'next/dynamic';
import { motion, MotionConfig } from 'motion/react';
import SectionHeading from '@/components/SectionHeading';
const GitHubCalendarWrapper = dynamic(() => import('./GitHubCalendarWrapper'), { ssr: false });

const CURRENT_YEAR = new Date().getFullYear();
const YEARS = Array.from({ length: 5 }, (_, i) => CURRENT_YEAR - i);

export default function GitHubSection() {
  const [year, setYear] = useState(CURRENT_YEAR);
  return (
    <MotionConfig reducedMotion="user">
      <section id="github" className="col-sec">
        <style>{`
          .gh-years { display: flex; gap: 2px; }
          .gh-yr-btn { position: relative; padding: 3px 10px; border: 0; border-radius: 8px; background: transparent; color: var(--muted); font: inherit; font-size: 14px; font-variant-numeric: tabular-nums; cursor: pointer; transition: color .2s, transform .15s var(--ease-out); }
          .gh-yr-btn:hover { color: var(--text); }
          .gh-yr-btn:active { transform: scale(.94); }
          .gh-yr-btn[aria-pressed="true"] { color: var(--text); }
          .gh-yr-btn span { position: relative; }
          .gh-yr-pill { position: absolute; inset: 0; border-radius: 8px; background: rgba(255,255,255,.09); box-shadow: inset 0 0 0 1px rgba(255,255,255,.06); }
        `}</style>
        <SectionHeading
          aside={
            <div className="gh-years">
              {YEARS.map((y) => (
                <button
                  key={y}
                  type="button"
                  aria-pressed={year === y}
                  onClick={() => setYear(y)}
                  className="gh-yr-btn"
                >
                  {year === y && (
                    <motion.span
                      layoutId="gh-year-pill"
                      className="gh-yr-pill"
                      transition={{ type: 'spring', stiffness: 500, damping: 38 }}
                    />
                  )}
                  <span>{y}</span>
                </button>
              ))}
            </div>
          }
        >
          Contributions
        </SectionHeading>
        <motion.div
          key={year}
          initial={{ opacity: 0, y: 6, filter: 'blur(4px)' }}
          animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
          transition={{ duration: 0.35, ease: [0.2, 0.7, 0.2, 1] }}
        >
          <GitHubCalendarWrapper year={year} />
        </motion.div>
      </section>
    </MotionConfig>
  );
}
