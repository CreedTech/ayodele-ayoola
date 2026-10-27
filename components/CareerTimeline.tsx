import { careerStart, experience, formatPeriod, slug } from '@/lib/data';

function toMonths(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return y * 12 + (m - 1);
}

export default function CareerTimeline({ style }: { style?: React.CSSProperties }) {
  const now = new Date();
  const startM = toMonths(careerStart);
  const endM = now.getFullYear() * 12 + now.getMonth();
  const span = endM - startM + 1;
  const firstYear = Number(careerStart.slice(0, 4));
  const years = Array.from(
    { length: now.getFullYear() - firstYear + 1 },
    (_, i) => firstYear + i,
  );
  const pct = (m: number) => `${((m - startM) / span) * 100}%`;

  return (
    <figure className="cv-timeline" aria-label="Career timeline" style={style}>
      <style>{`
        .cv-timeline { margin: 40px 0 0; }
        .cv-timeline__axis { position: relative; height: 18px; margin-left: 200px; font-size: 12px; color: var(--muted); }
        .cv-timeline__year { position: absolute; top: 0; transform: translateX(-50%); }
        .cv-timeline__rows { list-style: none; padding: 0; margin: 6px 0 0; display: grid; gap: 10px; }
        .cv-timeline__row { display: grid; grid-template-columns: 200px 1fr; align-items: center; }
        .cv-timeline__label { font-size: 13.5px; line-height: 1.25; color: var(--muted); padding-right: 12px; }
        .cv-timeline__track { position: relative; height: 10px; background: var(--surface-2); border-radius: 100px; }
        .cv-timeline__bar { position: absolute; top: 0; bottom: 0; border-radius: 100px; background: rgba(255,255,255,.5); }
        .cv-timeline__bar--current { background: var(--accent); }
        .cv-timeline__label { display: grid; }
        .cv-timeline__name, .cv-timeline__period { grid-area: 1 / 1; transition: opacity .2s, transform .25s cubic-bezier(.2,.7,.2,1); }
        .cv-timeline__period { opacity: 0; transform: translateY(4px); color: var(--text); font-variant-numeric: tabular-nums; }
        .cv-timeline__row { cursor: default; }
        .cv-timeline__row:hover .cv-timeline__name { opacity: 0; transform: translateY(-4px); }
        .cv-timeline__row:hover .cv-timeline__period { opacity: 1; transform: none; }
        .cv-timeline__bar { transition: opacity .25s, background .25s, transform .25s cubic-bezier(.2,.7,.2,1); transform-origin: left center; }
        .cv-timeline__row:hover .cv-timeline__bar { background: var(--text); transform: scaleY(1.3); }
        .cv-timeline__row:hover .cv-timeline__bar--current { background: var(--accent); }
        @media (prefers-reduced-motion: no-preference) {
          .cv-timeline__bar { animation: tl-grow .9s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: calc(250ms + var(--i, 0) * 90ms); }
        }
        @keyframes tl-grow { from { transform: scaleX(0); } }
        @media print { .cv-timeline__period { display: none; } }
        @media (max-width: 900px) {
          .cv-timeline__axis { margin-left: 96px; }
          .cv-timeline__row { grid-template-columns: 96px 1fr; }
        }
      `}</style>
      <div className="cv-timeline__axis">
        {years.map((y) => {
          const m = y * 12;
          if (m < startM) return null;
          return (
            <span key={y} className="cv-timeline__year" style={{ left: pct(m) }}>
              {y}
            </span>
          );
        })}
      </div>
      <ol className="cv-timeline__rows">
        {[...experience].reverse().map((e, i) => {
          const s = toMonths(e.start);
          const f = e.end ? toMonths(e.end) + 1 : endM + 1;
          return (
            <li key={e.company} className="cv-timeline__row" data-co={slug(e.company)}>
              <span className="cv-timeline__label">
                <span className="cv-timeline__name">{e.company}</span>
                <span className="cv-timeline__period" aria-hidden="true">
                  {formatPeriod(e.start, e.end)}
                </span>
              </span>
              <span className="cv-timeline__track">
                <span
                  className={`cv-timeline__bar${e.end ? '' : ' cv-timeline__bar--current'}`}
                  style={{ left: pct(s), width: `${((f - s) / span) * 100}%`, ['--i' as string]: i }}
                />
              </span>
            </li>
          );
        })}
      </ol>
    </figure>
  );
}
