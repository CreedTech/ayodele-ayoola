'use client';
import { useMemo, useState } from 'react';
import { motion, MotionConfig } from 'motion/react';
import PageTitle from '@/components/PageTitle';
import ProjectGroups from '@/components/ProjectGroups';
import FooterSection from '@/components/FooterSection';
import { projects } from '@/lib/data';

const TAGS = Object.entries(
  projects.flatMap((p) => p.tags).reduce<Record<string, number>>((acc, t) => {
    acc[t] = (acc[t] ?? 0) + 1;
    return acc;
  }, {}),
)
  .sort((a, b) => b[1] - a[1] || a[0].localeCompare(b[0]))
  .map(([tag, count]) => ({ tag, count }));

export default function ProjectsPage() {
  const [active, setActive] = useState<string | null>(null);
  const filtered = useMemo(
    () => (active ? projects.filter((p) => p.tags.includes(active)) : projects),
    [active],
  );

  const chips = [{ tag: null as string | null, label: 'All', count: projects.length }, ...TAGS.map((t) => ({ tag: t.tag as string | null, label: t.tag, count: t.count }))];

  return (
    <MotionConfig reducedMotion="user">
      <main className="col">
        <style>{`
          .pj-tags { display: flex; flex-wrap: wrap; gap: 4px; margin-top: 32px; }
          .pj-tag { position: relative; display: inline-flex; align-items: baseline; gap: 6px; padding: 6px 12px; border: 0; border-radius: 10px; background: transparent; color: var(--muted); font: inherit; font-size: 14px; cursor: pointer; transition: color .2s, background .2s, transform .15s var(--ease-out); }
          .pj-tag:hover { color: var(--text); background: rgba(255,255,255,.05); }
          .pj-tag:active { transform: scale(.95); }
          .pj-tag[aria-pressed="true"] { color: var(--text); }
          .pj-tag > span { position: relative; }
          .pj-tag__count { font-size: 12px; font-variant-numeric: tabular-nums; opacity: .7; }
          .pj-tag__pill { position: absolute; inset: 0; border-radius: 10px; background: rgba(255,255,255,.1); }
        `}</style>
        <PageTitle aside={`${filtered.length} of ${projects.length}`}>Projects</PageTitle>

        <div className="pj-tags rise" style={{ ['--i' as string]: 1 }} role="group" aria-label="Filter by technology">
          {chips.map((c) => {
            const on = active === c.tag;
            return (
              <button key={c.label} type="button" className="pj-tag" aria-pressed={on} onClick={() => setActive(c.tag)}>
                {on && <motion.span layoutId="pj-tag-pill" className="pj-tag__pill" transition={{ type: 'spring', stiffness: 500, damping: 40 }} />}
                <span>{c.label}</span>
                <span className="pj-tag__count">{c.count}</span>
              </button>
            );
          })}
        </div>

        <section className="col-sec" style={{ marginTop: 40 }}>
          <motion.div key={active ?? 'all'} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}>
            <ProjectGroups items={filtered} />
          </motion.div>
        </section>

        <FooterSection />
      </main>
    </MotionConfig>
  );
}
