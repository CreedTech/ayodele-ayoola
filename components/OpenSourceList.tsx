import GoArrow from '@/components/GoArrow';
import { openSource } from '@/lib/data';

export default function OpenSourceList() {
  return (
    <ul className="os-list">
      <style>{`
        .os-list { list-style: none; padding: 0; margin: 0; }
        .os-item { display: grid; grid-template-columns: 200px 1fr; gap: 28px; padding: 14px 0; border-top: 1px solid var(--border); }
        .os-item:first-of-type { border-top: 0; padding-top: 4px; }
        .os-item__name { font-size: 15px; color: var(--text); }
        .os-item__stars { display: block; margin-top: 2px; font-size: 13px; color: var(--muted); }
        @media (max-width: 600px) {
          .os-item { grid-template-columns: 1fr; gap: 4px; }
        }
      `}</style>
      {openSource.map((o) => (
        <li key={o.name} className="os-item">
          <div className="os-item__name">
            {o.href ? (
              <span className="has-arrow">
                <a href={o.href} target="_blank" rel="noopener noreferrer" className="row-link">
                  {o.name}
                </a>
                <GoArrow />
              </span>
            ) : (
              o.name
            )}
            {o.stars && <span className="os-item__stars">{o.stars} stars</span>}
          </div>
          <p className="para" style={{ fontSize: 14.5 }}>
            {o.desc}
          </p>
        </li>
      ))}
    </ul>
  );
}
