import { CompanyLogoBadge } from '@/components/CompanyLogoBadge';
import GoArrow from '@/components/GoArrow';
import { displayYear, projects } from '@/lib/data';

type Project = (typeof projects)[number];

const GROUP_LABELS: Record<string, string> = {
  'Open Source': 'Open source',
  'Personal Project': 'Personal projects',
};

const groupProjects = (list: Project[]) =>
  list.reduce<{ company: string; items: Project[] }[]>((acc, p) => {
  const key = p.company === 'RentSpace' ? 'RentSpace Technologies' : p.company;
  const group = acc.find((g) => g.company === key);
  if (group) group.items.push(p);
  else acc.push({ company: key, items: [p] });
  return acc;
  }, []);

function projectLinks(p: Project) {
  if (p.links?.length) return p.links;
  return p.href ? [{ label: 'Visit', href: p.href }] : [];
}

export default function ProjectGroups({ items = projects }: { items?: Project[] }) {
  const groups = groupProjects(items);
  return (
    <div className="pg-list">
      <style>{`
        .pg-group { display: grid; grid-template-columns: 200px 1fr; gap: 28px; padding: 22px 0; border-top: 1px solid var(--border); }
        .pg-group:first-of-type { border-top: 0; padding-top: 4px; }
        .pg-group__company { display: flex; align-items: center; gap: 12px; font-size: 15px; font-weight: 500; color: var(--text); align-self: start; position: sticky; top: 16px; }
        .pg-items { list-style: none; padding: 0; margin: 0; display: grid; gap: 18px; }
        .pg-item__head { display: flex; justify-content: space-between; align-items: baseline; gap: 16px; }
        .pg-item__title { font-size: 15.5px; color: var(--text); }
        .pg-group__company > :first-child { transition: transform .35s var(--ease-out); }
        .pg-group:hover .pg-group__company > :first-child { transform: scale(1.12) rotate(-6deg); }
        .pg-item__role { color: var(--muted); }
        .pg-item__desc { margin-top: 5px; font-size: 14.5px; line-height: 1.65; color: var(--muted); }
        .pg-item__links { display: flex; gap: 16px; margin-top: 8px; font-size: 13.5px; }
        @media (max-width: 600px) {
          .pg-group { grid-template-columns: 1fr; gap: 12px; }
          .pg-group__company { position: static; }
        }
      `}</style>
      {groups.map((g) => {
        const lead = g.items[0];
        return (
          <section key={g.company} className="pg-group">
            <div className="pg-group__company">
              {GROUP_LABELS[g.company] ? (
                <span style={{ width: 40, flexShrink: 0 }} />
              ) : (
                <CompanyLogoBadge
                  company={g.company}
                  logo={lead.logo}
                  logoUrl={lead.logoUrl}
                  size={40}
                  imgPadding={0}
                  fallbackFontSize={11}
                />
              )}
              {GROUP_LABELS[g.company] ?? g.company}
            </div>
            <ul className="pg-items">
              {g.items.map((p) => {
                const links = projectLinks(p);
                const roleAsTitle = g.items.length === 1 && p.title === g.company && !!p.role;
                const title = roleAsTitle ? p.role : p.title;
                return (
                  <li key={p.num}>
                    <div className="pg-item__head">
                      <div className="pg-item__title has-arrow">
                        {p.href ? (
                          <a href={p.href} target="_blank" rel="noopener noreferrer" className="row-link">
                            {title}
                          </a>
                        ) : (
                          title
                        )}
                        {p.role && !roleAsTitle && <span className="pg-item__role">{` · ${p.role}`}</span>}
                        {p.href && <GoArrow />}
                      </div>
                      {displayYear(p.year) && <span className="meta">{displayYear(p.year)}</span>}
                    </div>
                    <p className="pg-item__desc">{p.desc}</p>
                    {links.length > 1 && (
                      <div className="pg-item__links">
                        {links.map((l) => (
                          <a key={l.href} href={l.href} target="_blank" rel="noopener noreferrer" className="row-link">
                            {l.label}
                          </a>
                        ))}
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          </section>
        );
      })}
    </div>
  );
}
