import PageTitle from '@/components/PageTitle';
import FooterSection from '@/components/FooterSection';
import { allSkills, stackCategories } from '@/lib/data';

export default function StackPage() {
  return (
    <main className="col">
      <style>{`
        .st-list { margin: 40px 0 0; }
        .st-row { display: grid; grid-template-columns: 200px 1fr; gap: 28px; padding: 20px 0; border-top: 1px solid var(--border); }
        .st-row:first-child { border-top: 0; }
        .st-row dt { font-size: 16px; font-weight: 500; color: var(--text); }
        .st-row dt span { display: block; margin-top: 2px; font-size: 13px; font-weight: 400; color: var(--muted); }
        .st-row dd { margin: 0; display: flex; flex-wrap: wrap; gap: 8px; }
        .st-chip { padding: 5px 12px; border-radius: 9px; background: rgba(255,255,255,.06); font-size: 14px; color: var(--text); transition: background .2s, transform .2s var(--ease-out); }
        .st-chip:hover { background: rgba(255,255,255,.12); transform: translateY(-1px); }
        @media (max-width: 600px) { .st-row { grid-template-columns: 1fr; gap: 12px; } }
      `}</style>
      <PageTitle aside={`${allSkills.length} tools`}>Stack</PageTitle>
      <dl className="st-list rise" style={{ ['--i' as string]: 1 }}>
        {stackCategories.map((c) => (
          <div key={c.label} className="st-row">
            <dt>
              {c.label}
              <span>{c.skills.length} tools</span>
            </dt>
            <dd>
              {c.skills.map((s) => (
                <span key={s} className="st-chip">
                  {s}
                </span>
              ))}
            </dd>
          </div>
        ))}
      </dl>
      <FooterSection />
    </main>
  );
}
