import CareerTimeline from '@/components/CareerTimeline';
import PrintButton from '@/components/PrintButton';
import {
  CV_PDF_URL,
  education,
  experience,
  formatPeriod,
  openSource,
  personal,
  projects,
  socials,
  stackCategories,
  yearsLabel,
} from '@/lib/data';

const css = `
  .cv { display: grid; grid-template-columns: 210px minmax(0, 1fr); gap: 48px; max-width: 880px; margin: 0 auto; padding: 48px 24px 120px; color: var(--text); font-weight: 400; }
  .cv-rail { position: sticky; top: 32px; align-self: start; display: flex; flex-direction: column; gap: 28px; }
  .cv-name { font-family: var(--font-display); font-size: 40px; font-weight: 600; letter-spacing: -.03em; line-height: 1; }
  .cv-role { margin-top: 10px; font-size: 14px; color: var(--muted); line-height: 1.6; }
  .cv-contact { list-style: none; padding: 0; margin: 0; display: grid; gap: 8px; font-size: 13px; }
  .cv-contact a, .cv-link { color: var(--text); text-decoration: none; border-bottom: 1px solid var(--border); transition: border-color .15s; }
  .cv-contact a:hover, .cv-link:hover { border-color: var(--accent); }
  .cv-contact span { color: var(--muted); }
  .cv-actions { display: grid; gap: 10px; }
  .cv-btn { display: inline-flex; justify-content: center; padding: 11px 18px; border-radius: 100px; font-size: 13px; font-weight: 500; font-family: inherit; text-decoration: none; cursor: pointer; transition: opacity .15s, border-color .15s; }
  .cv-btn--primary { background: var(--accent); color: #000; border: 1px solid var(--accent); }
  .cv-btn--primary:hover { opacity: .85; }
  .cv-btn--ghost { background: transparent; color: var(--text); border: 1px solid var(--border); }
  .cv-btn--ghost:hover { border-color: rgba(255,255,255,.25); }
  .cv-btn:focus-visible, .cv a:focus-visible { outline: 2px solid var(--accent); outline-offset: 3px; }
  .cv-index { display: grid; gap: 6px; font-size: 13px; }
  .cv-index a { color: var(--muted); text-decoration: none; }
  .cv-index a:hover { color: var(--text); }

  .cv-main { max-width: 760px; }
  .cv-summary { font-size: 17px; line-height: 1.75; color: var(--text); max-width: 68ch; }
  .cv-section { margin-top: 72px; scroll-margin-top: 24px; }
  .cv-h2 { font-family: var(--font-display); font-size: 24px; font-weight: 600; letter-spacing: -.02em; margin-bottom: 28px; }
  .cv-h2 small { font-family: var(--font-inter, inherit); font-size: 13px; font-weight: 400; color: var(--muted); margin-left: 10px; letter-spacing: 0; }


  .cv-job { padding: 28px 0; border-top: 1px solid var(--border); break-inside: avoid; }
  .cv-job:first-of-type { border-top: 0; padding-top: 0; }
  .cv-job__head { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; align-items: baseline; }
  .cv-job__role { font-size: 17px; font-weight: 500; }
  .cv-job__company { color: var(--accent); }
  .cv-job__period { font-size: 13px; color: var(--muted); white-space: nowrap; font-variant-numeric: tabular-nums; }
  .cv-job__meta { margin-top: 4px; font-size: 13px; color: var(--muted); }
  .cv-bullets { margin: 14px 0 0; padding-left: 18px; display: grid; gap: 8px; font-size: 14.5px; line-height: 1.7; color: var(--muted); }
  .cv-bullets li::marker { color: var(--accent); }

  .cv-projects { display: grid; grid-template-columns: 1fr 1fr; gap: 0 40px; }
  .cv-project { padding: 18px 0; border-top: 1px solid var(--border); break-inside: avoid; }
  .cv-project__title { font-size: 15px; font-weight: 500; }
  .cv-project__role { font-size: 13px; color: var(--muted); margin-top: 2px; }
  .cv-project p { margin-top: 8px; font-size: 13.5px; line-height: 1.65; color: var(--muted); }
  .cv-project__links { display: flex; gap: 14px; margin-top: 10px; font-size: 12.5px; }

  .cv-os { list-style: none; padding: 0; margin: 0; }
  .cv-os li { display: grid; grid-template-columns: 170px 1fr; gap: 16px; padding: 12px 0; border-top: 1px solid var(--border); font-size: 13.5px; line-height: 1.65; break-inside: avoid; }
  .cv-os li span { color: var(--muted); }

  .cv-skills { display: grid; gap: 14px; margin: 0; }
  .cv-skills div { display: grid; grid-template-columns: 170px 1fr; gap: 16px; font-size: 14px; line-height: 1.7; }
  .cv-skills dt { font-weight: 500; }
  .cv-skills dd { margin: 0; color: var(--muted); }

  .cv-edu { display: grid; gap: 18px; }
  .cv-edu div { display: flex; justify-content: space-between; gap: 16px; flex-wrap: wrap; font-size: 14.5px; }
  .cv-edu span { color: var(--muted); }

  @media (max-width: 900px) {
    .cv { grid-template-columns: 1fr; gap: 40px; padding-top: 32px; }
    .cv-rail { position: static; }
    .cv-index { display: none; }
    .cv-actions { grid-template-columns: 1fr 1fr; }
    .cv-projects { grid-template-columns: 1fr; }
    .cv-os li, .cv-skills div { grid-template-columns: 1fr; gap: 2px; }
  }

  @media print {
    @page { size: A4; margin: 14mm 14mm; }
    html, body { background: #fff !important; color: #111 !important; }
    body > header, .cv-print-hide, .cv-actions, .cv-index, .cv-timeline { display: none !important; }
    .cv { display: block; padding: 0; color: #111; }
    .cv-rail { position: static; display: block; margin-bottom: 18px; }
    .cv-rail > * + * { margin-top: 10px; }
    .cv-name { font-size: 26px; }
    .cv-contact { display: flex; flex-wrap: wrap; gap: 4px 16px; font-size: 11px; }
    .cv-main { max-width: none; }
    .cv-summary { font-size: 11.5px; line-height: 1.55; }
    .cv-section { margin-top: 18px; }
    .cv-h2 { font-size: 15px; margin-bottom: 8px; border-bottom: 1px solid #999; padding-bottom: 3px; }
    .cv-job { padding: 10px 0; border: 0; }
    .cv-job__role { font-size: 12.5px; }
    .cv-bullets { font-size: 10.5px; line-height: 1.5; gap: 2px; margin-top: 6px; }
    .cv-projects { gap: 0 24px; }
    .cv-project { padding: 6px 0; border: 0; }
    .cv-project p, .cv-os li, .cv-skills div, .cv-edu div { font-size: 10.5px; line-height: 1.5; }
    .cv-os li { padding: 3px 0; border: 0; }
    .cv *, .cv-role, .cv-job__period, .cv-job__meta, .cv-project__role, .cv-os li span, .cv-skills dd, .cv-edu span, .cv-bullets { color: #222 !important; }
    .cv-job__company { color: #111 !important; font-weight: 500; }
    .cv a { border: 0 !important; color: #111 !important; }
  }
`;

const cvProjects = projects.filter((p) => p.cv);

const contacts = [
  { label: personal.phoneDisplay, href: `tel:${personal.phone}` },
  { label: personal.email, href: `mailto:${personal.email}` },
  { label: 'ayodeleayoola.com', href: '/' },
  ...socials
    .filter((s) => s.icon !== 'twitter')
    .map((s) => ({ label: s.label, href: s.href })),
];

export default function CvPage() {
  return (
    <main className="cv">
      <style>{css}</style>

      <aside className="cv-rail">
        <div>
          <h1 className="cv-name">{personal.name}</h1>
          <p className="cv-role">
            {personal.title}, London
            <br />
            {personal.headline}
          </p>
        </div>

        <ul className="cv-contact">
          {contacts.map((c) => (
            <li key={c.href}>
              <a href={c.href}>{c.label}</a>
            </li>
          ))}
        </ul>

        <div className="cv-actions">
          <a href={CV_PDF_URL} download className="cv-btn cv-btn--primary">
            Download PDF
          </a>
          <PrintButton className="cv-btn cv-btn--ghost" />
        </div>

        <nav className="cv-index" aria-label="CV sections">
          <a href="#experience">Experience</a>
          <a href="#projects">Projects</a>
          <a href="#open-source">Open source</a>
          <a href="#skills">Skills</a>
          <a href="#education">Education</a>
        </nav>
      </aside>

      <div className="cv-main">
        <p className="cv-summary">{personal.summary}</p>

        <CareerTimeline />

        <section id="experience" className="cv-section">
          <h2 className="cv-h2">
            Experience<small>{yearsLabel}</small>
          </h2>
          {experience.map((e) => (
            <article key={e.company} className="cv-job">
              <div className="cv-job__head">
                <div className="cv-job__role">
                  {e.role}, <span className="cv-job__company">{e.company}</span>
                </div>
                <div className="cv-job__period">{formatPeriod(e.start, e.end)}</div>
              </div>
              <div className="cv-job__meta">
                {e.location} · {e.stack.join(', ')}
              </div>
              <ul className="cv-bullets">
                {e.highlights.map((h) => (
                  <li key={h}>{h}</li>
                ))}
              </ul>
            </article>
          ))}
        </section>

        <section id="projects" className="cv-section">
          <h2 className="cv-h2">Projects</h2>
          <div className="cv-projects">
            {cvProjects.map((p) => (
              <article key={p.num} className="cv-project">
                <div className="cv-project__title">{p.title}</div>
                {p.role && <div className="cv-project__role">{p.role}</div>}
                <p>{p.desc}</p>
                {(p.links ?? (p.href ? [{ label: 'Visit', href: p.href }] : [])).length > 0 && (
                  <div className="cv-project__links">
                    {(p.links ?? [{ label: 'Visit', href: p.href }]).map((l) => (
                      <a
                        key={l.href}
                        href={l.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="cv-link"
                      >
                        {l.label}
                      </a>
                    ))}
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>

        <section id="open-source" className="cv-section">
          <h2 className="cv-h2">Open source</h2>
          <ul className="cv-os">
            {openSource.map((o) => (
              <li key={o.name}>
                {o.href ? (
                  <a href={o.href} target="_blank" rel="noopener noreferrer" className="cv-link">
                    {o.name}
                    {o.stars ? ` (${o.stars} stars)` : ''}
                  </a>
                ) : (
                  <strong style={{ fontWeight: 400 }}>{o.name}</strong>
                )}
                <span>{o.desc}</span>
              </li>
            ))}
          </ul>
        </section>

        <section id="skills" className="cv-section">
          <h2 className="cv-h2">Skills</h2>
          <dl className="cv-skills">
            {stackCategories.map((c) => (
              <div key={c.label}>
                <dt>{c.label}</dt>
                <dd>{c.skills.join(', ')}</dd>
              </div>
            ))}
          </dl>
        </section>

        <section id="education" className="cv-section">
          <h2 className="cv-h2">Education</h2>
          <div className="cv-edu">
            {education.map((e) => (
              <div key={e.school}>
                <p>
                  {e.degree}
                  {e.grade ? `, ${e.grade}` : ''}
                  <br />
                  <span>{e.school}</span>
                </p>
                <span>{e.year}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
