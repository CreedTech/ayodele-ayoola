'use client';
import Image from 'next/image';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon } from '@hugeicons/core-free-icons';
import { CompanyLogoBadge } from '@/components/CompanyLogoBadge';
import { PORTRAIT_URL, personal } from '@/lib/data';
import type { Block } from '@/lib/terminal';

type Handlers = { onRun: (cmd: string) => void; onOpen: (url: string) => void; onCopy: (text: string) => void };

function Highlight({ text, query }: { text: string; query: string }) {
  const i = text.toLowerCase().indexOf(query.toLowerCase());
  if (i < 0) return <>{text}</>;
  return (
    <>
      {text.slice(0, i)}
      <mark className="tm-mark">{text.slice(i, i + query.length)}</mark>
      <Highlight text={text.slice(i + query.length)} query={query} />
    </>
  );
}

export default function TerminalOutput({ block, h }: { block: Block; h: Handlers }) {
  switch (block.t) {
    case 'input':
      return (
        <div className="tm-line">
          <span className="tm-prompt">
            ayoola@london <span className="tm-path">{block.path}</span> %
          </span>{' '}
          <button type="button" className="tm-rerun" onClick={() => h.onRun(block.text)} title="Run again">
            {block.text}
          </button>
        </div>
      );
    case 'text':
      return <p className={`tm-line tm-${block.tone ?? 'plain'}`}>{block.text}</p>;
    case 'lines':
      return (
        <pre className={`tm-pre tm-${block.tone ?? 'plain'}`}>
          {block.lines.map((l, i) => (
            <span key={i}>
              {block.highlight ? <Highlight text={l} query={block.highlight} /> : l}
              {'\n'}
            </span>
          ))}
        </pre>
      );
    case 'ls':
      return block.entries.some((e) => e.long) ? (
        <pre className="tm-pre">
          {block.entries.map((e) => (
            <span key={e.name}>
              <button type="button" className={`tm-ls-item${e.dir ? ' is-dir' : ''}`} onClick={() => h.onRun(e.run)}>
                {e.long}
              </button>
              {'\n'}
            </span>
          ))}
        </pre>
      ) : (
        <div className="tm-ls">
          {block.entries.map((e) => (
            <button key={e.name} type="button" className={`tm-ls-item${e.dir ? ' is-dir' : ''}`} onClick={() => h.onRun(e.run)}>
              {e.name}
              {e.dir ? '/' : ''}
            </button>
          ))}
        </div>
      );
    case 'rows':
      return (
        <dl className="tm-rows">
          {block.rows.map((r) => (
            <div key={r.label}>
              <dt>{r.label}</dt>
              <dd>
                {r.href ? (
                  <button type="button" className="tm-link" onClick={() => h.onOpen(r.href!)}>
                    {r.value}
                  </button>
                ) : (
                  r.value
                )}
                {r.copy && (
                  <button type="button" className="tm-icon" onClick={() => h.onCopy(r.copy!)} aria-label={`Copy ${r.label}`}>
                    <HugeiconsIcon icon={Copy01Icon} size={13} />
                  </button>
                )}
              </dd>
            </div>
          ))}
        </dl>
      );
    case 'list':
      return (
        <ul className="tm-list">
          {block.items.map((it) => {
            const body = (
              <>
                {(it.logoUrl || it.logo) && (
                  <CompanyLogoBadge company={it.title} logo={it.logo ?? ''} logoUrl={it.logoUrl ?? ''} size={22} imgPadding={0} fallbackFontSize={8} />
                )}
                <span className="tm-list__title">{it.title}</span>
                {it.sub && <span className="tm-list__sub">{it.sub}</span>}
                {it.meta && <span className="tm-list__meta">{it.meta}</span>}
              </>
            );
            return (
              <li key={it.title + (it.sub ?? '')}>
                {it.run ? (
                  <button type="button" className="tm-list__row" onClick={() => h.onRun(it.run!)}>
                    {body}
                  </button>
                ) : (
                  <div className="tm-list__row">{body}</div>
                )}
              </li>
            );
          })}
        </ul>
      );
    case 'chips':
      return (
        <div className="tm-chips">
          {block.label && <span className="tm-muted">{block.label}:</span>}
          {block.items.map((c) => (
            <button key={c.run} type="button" className="tm-chip" onClick={() => h.onRun(c.run)}>
              {c.label}
            </button>
          ))}
        </div>
      );
    case 'groups':
      return (
        <dl className="tm-rows tm-rows--wide">
          {block.groups.map((g) => (
            <div key={g.label}>
              <dt>{g.label}</dt>
              <dd>{g.items.join(', ')}</dd>
            </div>
          ))}
        </dl>
      );
    case 'matches':
      return (
        <ul className="tm-matches">
          {block.items.map((m) => (
            <li key={m.text}>
              <button type="button" onClick={() => h.onRun(m.run)}>
                <span className="tm-matches__src">{m.source}</span>
                <span>
                  <Highlight text={m.text} query={block.query} />
                </span>
              </button>
            </li>
          ))}
        </ul>
      );
    case 'gitlog':
      return (
        <ol className={`tm-git${block.oneline ? ' tm-git--oneline' : ''}`}>
          {block.commits.map((c) =>
            block.oneline ? (
              <li key={c.hash}>
                <span className="tm-hash">{c.hash}</span>
                {c.ref && <span className="tm-ref"> ({c.ref})</span>} {c.message}
              </li>
            ) : (
              <li key={c.hash}>
                <div>
                  <span className="tm-hash">commit {c.hash}</span>
                  {c.ref && <span className="tm-ref"> ({c.ref})</span>}
                </div>
                <div className="tm-muted">Author: {personal.name}</div>
                <div className="tm-muted">Date:   {c.date}</div>
                <div className="tm-git__msg">{c.message}</div>
                {c.body && <div className="tm-git__body">{c.body}</div>}
              </li>
            ),
          )}
        </ol>
      );
    case 'bars':
      return (
        <div className="tm-bars">
          <div className="tm-bars__axis">
            {block.years.map((y) => (
              <span key={y.year} style={{ left: `${y.left}%` }}>
                {y.year}
              </span>
            ))}
          </div>
          {block.rows.map((r, i) => (
            <div key={r.label} className="tm-bars__row">
              <span className="tm-bars__label">{r.label}</span>
              <span className="tm-bars__track">
                <span
                  className={`tm-bars__bar${r.current ? ' is-current' : ''}`}
                  style={{ left: `${r.left}%`, width: `${r.width}%`, ['--i' as string]: i }}
                />
              </span>
              <span className="tm-bars__period">{r.period}</span>
            </div>
          ))}
        </div>
      );
    case 'neofetch':
      return (
        <div className="tm-neo">
          <Image src={PORTRAIT_URL} alt="" width={132} height={132} className="tm-neo__img" />
          <div>
            <div className="tm-neo__title">
              ayoola<span className="tm-muted">@</span>london
            </div>
            <div className="tm-neo__rule" />
            <dl className="tm-rows">
              {block.rows.map((r) => (
                <div key={r.label}>
                  <dt>{r.label}</dt>
                  <dd>{r.value}</dd>
                </div>
              ))}
            </dl>
            <div className="tm-neo__swatches" aria-hidden="true">
              {['#000', '#3f3f46', '#71717a', '#a1a1aa', '#ededf0', '#fff', '#22c55e', '#16a34a'].map((c) => (
                <span key={c} style={{ background: c }} />
              ))}
            </div>
          </div>
        </div>
      );
  }
}
