'use client';
import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { ArrowUpRight01Icon } from '@hugeicons/core-free-icons';
import { CompanyLogoBadge } from '@/components/CompanyLogoBadge';
import { experience, openSource, projects } from '@/lib/data';

type Preview = { title: string; desc: string; logo: string; logoUrl: string };

const CARD_W = 300;
const MARGIN = 12;

const normalise = (href: string) => {
  try {
    const u = new URL(href);
    return (u.hostname.replace(/^www\./, '') + u.pathname).replace(/\/$/, '');
  } catch {
    return href;
  }
};

const domainOf = (href: string) => {
  try {
    return new URL(href).hostname.replace(/^www\./, '');
  } catch {
    return href;
  }
};

const PREVIEWS = new Map<string, Preview>();
projects.forEach((p) => {
  const entry = { title: p.title, desc: p.desc, logo: p.logo, logoUrl: p.logoUrl };
  [p.href, ...(p.links ?? []).map((l) => l.href)].filter(Boolean).forEach((h) => {
    if (!PREVIEWS.has(normalise(h))) PREVIEWS.set(normalise(h), entry);
  });
});
experience.forEach((e) => {
  if (!e.domain) return;
  PREVIEWS.set(normalise(`https://${e.domain}`), {
    title: e.company,
    desc: `${e.role}. ${e.desc}`,
    logo: e.logo,
    logoUrl: e.logoUrl,
  });
});
openSource.forEach((o) => {
  if (o.href) PREVIEWS.set(normalise(o.href), { title: o.name, desc: o.desc, logo: '', logoUrl: '' });
});

type State = { href: string; x: number; y: number; below: boolean; preview?: Preview } | null;

export default function LinkPreview() {
  const [state, setState] = useState<State>(null);
  const [visible, setVisible] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(() => {
    if (window.matchMedia('(hover: none), (pointer: coarse)').matches) return;

    const clear = () => {
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = null;
    };

    const onOver = (e: PointerEvent) => {
      const a = (e.target as Element).closest?.('a[href]') as HTMLAnchorElement | null;
      if (!a) return;
      let external = false;
      try {
        external = new URL(a.href).origin !== window.location.origin && a.href.startsWith('http');
      } catch {}
      if (!external) return;
      clear();
      timer.current = window.setTimeout(() => {
        const r = a.getBoundingClientRect();
        const half = CARD_W / 2 + MARGIN;
        const x = Math.min(Math.max(r.left + r.width / 2, half), window.innerWidth - half);
        const below = r.top < 220;
        setState({
          href: a.href,
          x,
          y: below ? r.bottom + 10 : r.top - 10,
          below,
          preview: PREVIEWS.get(normalise(a.href)),
        });
        setVisible(true);
      }, 120);
    };

    const onOut = (e: PointerEvent) => {
      const a = (e.target as Element).closest?.('a[href]');
      const to = (e.relatedTarget as Element | null)?.closest?.('a[href]');
      if (a && a === to) return;
      clear();
      setVisible(false);
    };

    const hide = () => {
      clear();
      setVisible(false);
    };

    document.addEventListener('pointerover', onOver, { passive: true });
    document.addEventListener('pointerout', onOut, { passive: true });
    window.addEventListener('scroll', hide, { passive: true });
    return () => {
      clear();
      document.removeEventListener('pointerover', onOver);
      document.removeEventListener('pointerout', onOut);
      window.removeEventListener('scroll', hide);
    };
  }, []);

  if (!state) return null;
  const { preview } = state;
  const domain = domainOf(state.href);

  return (
    <div
      aria-hidden="true"
      className="lp-card"
      data-visible={visible}
      data-below={state.below}
      style={{ left: state.x, top: state.y }}
    >
      <style>{`
        .lp-card { position: fixed; z-index: 9400; width: ${CARD_W}px; padding: 14px; border-radius: 14px; background: #161616; border: 1px solid rgba(255,255,255,.1); box-shadow: 0 20px 50px rgba(0,0,0,.6); pointer-events: none; transform: translate(-50%, -100%) translateY(6px) scale(.97); transform-origin: 50% 100%; opacity: 0; transition: opacity .16s, transform .22s cubic-bezier(.2,.7,.2,1); }
        .lp-card[data-below="true"] { transform: translate(-50%, 0) translateY(-6px) scale(.97); transform-origin: 50% 0; }
        .lp-card[data-visible="true"] { opacity: 1; transform: translate(-50%, -100%); }
        .lp-card[data-below="true"][data-visible="true"] { transform: translate(-50%, 0); }
        .lp-card__head { display: flex; align-items: center; gap: 10px; }
        .lp-card__title { font-size: 14px; font-weight: 600; color: #fff; line-height: 1.3; }
        .lp-card__desc { margin-top: 8px; font-size: 13px; line-height: 1.55; color: var(--muted); display: -webkit-box; -webkit-line-clamp: 3; -webkit-box-orient: vertical; overflow: hidden; }
        .lp-card__domain { display: flex; align-items: center; gap: 4px; margin-top: 10px; font-size: 12.5px; color: var(--muted); }
        .lp-card--bare .lp-card__domain { margin-top: 0; font-size: 13px; }
        @media (prefers-reduced-motion: reduce) { .lp-card { transition: opacity .1s; } }
      `}</style>
      {preview ? (
        <>
          <div className="lp-card__head">
            {(preview.logoUrl || preview.logo) && (
              <CompanyLogoBadge company={preview.title} logo={preview.logo} logoUrl={preview.logoUrl} size={32} imgPadding={4} fallbackFontSize={10} />
            )}
            <div className="lp-card__title">{preview.title}</div>
          </div>
          <p className="lp-card__desc">{preview.desc}</p>
        </>
      ) : null}
      <div className="lp-card__domain">
        <HugeiconsIcon icon={ArrowUpRight01Icon} size={13} />
        {domain}
      </div>
    </div>
  );
}
