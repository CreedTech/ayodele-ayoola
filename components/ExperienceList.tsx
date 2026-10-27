import { CompanyLogoBadge } from '@/components/CompanyLogoBadge';
import { experience, formatPeriod, slug } from '@/lib/data';

const linkCss = experience
  .map((e) => {
    const k = slug(e.company);
    return `#work:has([data-co="${k}"]:hover) .exp-item[data-co="${k}"] { background: var(--surface); }
#work:has([data-co="${k}"]:hover) .cv-timeline__row[data-co="${k}"] .cv-timeline__bar { opacity: 1; background: var(--text); transform: scaleY(1.3); }
#work:has([data-co="${k}"]:hover) .cv-timeline__row[data-co="${k}"] .cv-timeline__bar--current { background: var(--accent); }
#work:has([data-co="${k}"]:hover) .cv-timeline__row[data-co="${k}"] .cv-timeline__name { color: var(--text); }`;
  })
  .join('\n');

export default function ExperienceList() {
  return (
    <ol className="exp-list">
      <style>{`
        .exp-list { list-style: none; padding: 0; margin: 0; }
        .exp-item { display: grid; grid-template-columns: 44px 1fr; gap: 18px; margin: 0 -14px; padding: 22px 14px; border-radius: 14px; border-top: 1px solid var(--border); transition: background .25s; }
        .exp-item:hover, .exp-item:hover + .exp-item { border-top-color: transparent; }
        .exp-item > :first-child { transition: transform .35s var(--ease-out); }
        .exp-item:hover > :first-child { transform: scale(1.08) rotate(-4deg); }
        #work:has([data-co]:hover) .cv-timeline__bar { opacity: .35; }
        .exp-item:first-of-type { border-top-color: transparent; }
        .exp-item__head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; flex-wrap: wrap; }
        .exp-item__role { font-size: 16px; font-weight: 500; color: var(--text); }
        .exp-item__company { color: var(--muted); font-weight: 400; }
        .exp-item__desc { margin-top: 8px; }
        .exp-item__stack { margin-top: 10px; font-size: 13.5px; color: var(--muted); }
        @media (max-width: 560px) {
          .exp-item { grid-template-columns: 1fr; gap: 10px; }
        }
        ${linkCss}
      `}</style>
      {experience.map((e) => (
        <li key={e.company} className="exp-item" data-co={slug(e.company)}>
          <CompanyLogoBadge company={e.company} logo={e.logo} logoUrl={e.logoUrl} size={44} imgPadding={0} />
          <div>
            <div className="exp-item__head">
              <div className="exp-item__role">
                {e.role}
                <span className="exp-item__company">
                  {' at '}
                  {e.domain ? (
                    <a href={`https://${e.domain}`} target="_blank" rel="noopener noreferrer" className="row-link">
                      {e.company}
                    </a>
                  ) : (
                    e.company
                  )}
                </span>
              </div>
              <div className="meta">{formatPeriod(e.start, e.end)}</div>
            </div>
            <div className="meta" style={{ marginTop: 2 }}>
              {e.location}
            </div>
            <p className="para exp-item__desc">{e.desc}</p>
            <p className="exp-item__stack">{e.stack.join(', ')}</p>
          </div>
        </li>
      ))}
    </ol>
  );
}
