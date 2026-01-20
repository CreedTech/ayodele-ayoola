'use client';
import { useEffect, useRef, useSyncExternalStore } from 'react';
import gsap from 'gsap';
import { socials, personal } from '@/lib/data';
import IsometricCubes from './IsometricCubes';
import PointerHighlight from './PointerHighlight';

const icons: Record<string, string> = {
  github:
    'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  twitter:
    'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  devto:
    'M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.65l-.01 1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.59-2.54h.76c.42 0 .73.05.71.1-.02.06-.37 1.39-.77 2.95-.4 1.56-.75 2.88-.79 2.95z',
  stack:
    'M15.725 0l-1.72 1.277 6.39 8.588-1.77 1.313L12 2.827 10.418 1.55l-6.005 8.09-1.712-1.268L9.18 0 12 2.165zm-.004 14.248v-1.97H4.27v1.97h11.451zm0 3.778v-1.98H4.27v1.98h11.451zm-6.65-10.34L9.005 6.14l-2.8 3.77 2.8.007 3.07-4.17zm9.68 14.314H.252V13.65h18.499v8.35z',
};

export default function HeroSection() {
  const eyebrowRef = useRef<HTMLSpanElement>(null);
  const charRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const subRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const bottomRef = useRef<HTMLDivElement>(null);
  const cueRef = useRef<HTMLDivElement>(null);
  const mounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );

  const name = ['A', 'Y', 'O', 'O', 'L', 'A'];
  const sub = ['Building', 'digital', 'experiences', 'that', 'matter.'];

  useEffect(() => {
    const chars = charRefs.current.filter(Boolean) as HTMLSpanElement[];
    const subs = subRefs.current.filter(Boolean) as HTMLSpanElement[];

    // Set initial hidden state via GSAP (not inline styles) so SSR renders visibly
    gsap.set(eyebrowRef.current, { y: '110%' });
    gsap.set(chars, { y: '112%' });
    gsap.set(subs, { y: '112%' });
    gsap.set(bottomRef.current, { opacity: 0, y: 16 });
    gsap.set(cueRef.current, { opacity: 0 });

    const tl = gsap.timeline({ defaults: { ease: 'power3.out' }, delay: 0.1 });
    tl.to(eyebrowRef.current, { y: 0, duration: 0.7 })
      .to(chars, { y: 0, duration: 1, stagger: 0.06 }, '-=0.5')
      .to(subs, { y: 0, duration: 0.8, stagger: 0.07 }, '-=0.7')
      .to(bottomRef.current, { opacity: 1, y: 0, duration: 0.8 }, '-=0.4')
      .to(cueRef.current, { opacity: 1, duration: 0.5 }, '-=0.3');

    return () => {
      tl.kill();
    };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: 'calc(100svh - 73px)',
        display: 'flex',
        flexDirection: 'column',
        padding: '48px 52px 52px',
        overflow: 'hidden',
      }}
    >
      <style>{`
        @media (max-width: 1024px) {
          .hero-section { padding-left: 32px !important; padding-right: 32px !important; }
        }
        @media (max-width: 640px) {
          .hero-section { padding: 32px 20px 40px !important; }
          .hero-bottom  { grid-template-columns: 1fr !important; padding-top: 32px !important; }
          .hero-scroll-cue { display: none !important; }
          .hero-right   { align-items: flex-start !important; }
          .hero-cta-row { flex-wrap: wrap !important; }
        }
        @media (min-width: 641px) and (max-width: 900px) {
          .hero-bottom  { grid-template-columns: 1fr 1fr !important; }
          .hero-scroll-cue { display: none !important; }
          .hero-right   { grid-column: 1 / -1 !important; flex-direction: row !important;
                          align-items: center !important; justify-content: space-between !important; }
        }
      `}</style>

      {mounted && <IsometricCubes />}

      {/* Top bar */}
      <div
        style={{
          display: 'flex',
          justifyContent: 'end',
          alignItems: 'center',
          position: 'relative',
          zIndex: 2,
        }}
      >
        <span
          style={{
            fontSize: 11,
            letterSpacing: '.08em',
            textTransform: 'uppercase',
            color: 'var(--muted)',
          }}
        >
          {personal.location}
        </span>
      </div>

      {/* Main name block */}
      <div
        style={{
          flex: 1,
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          position: 'relative',
          zIndex: 2,
          paddingTop: 32,
        }}
      >
        <div style={{ overflow: 'hidden', marginBottom: 24 }}>
          <span
            ref={eyebrowRef}
            style={{
              display: 'inline-block',
              fontSize: 12,
              letterSpacing: '.25em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Creative Developer &amp; Designer
          </span>
        </div>

        {/* Name */}
        <div
          className="font-display"
          style={{
            fontSize: 'clamp(72px,13vw,185px)',
            fontWeight: 700,
            lineHeight: 0.88,
            letterSpacing: '-.045em',
            userSelect: 'none',
          }}
          aria-label="AYOOLA"
        >
          {name.map((ch, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden' }}
            >
              <span
                ref={(el) => {
                  charRefs.current[i] = el;
                }}
                style={{
                  display: 'inline-block',
                  ...(i >= 2
                    ? {
                        WebkitTextStroke: '1.5px var(--text)',
                        color: 'transparent',
                      }
                    : {}),
                }}
              >
                {ch}
              </span>
            </span>
          ))}
        </div>

        {/* Subtitle */}
        <div
          className="font-display"
          style={{
            fontSize: 'clamp(20px,3.2vw,48px)',
            fontWeight: 400,
            letterSpacing: '-.02em',
            color: 'var(--muted)',
            marginTop: 10,
          }}
        >
          {sub.map((w, i) => (
            <span
              key={i}
              style={{ display: 'inline-block', overflow: 'hidden' }}
            >
              <span
                ref={(el) => {
                  subRefs.current[i] = el;
                }}
                style={{ display: 'inline-block' }}
              >
                {w}
                {i < sub.length - 1 ? ' ' : ''}
              </span>
            </span>
          ))}
        </div>
      </div>

      {/* Bottom bar - 3 columns */}
      <div
        ref={bottomRef}
        className="hero-bottom"
        style={{
          position: 'relative',
          zIndex: 2,
          display: 'grid',
          gridTemplateColumns: '1fr auto 1fr',
          gap: 24,
          alignItems: 'flex-end',
          paddingTop: 48,
        }}
      >
        {/* Left: bio + socials */}
        <div>
          <p
            style={{
              fontSize: 14,
              lineHeight: 2.1,
              color: 'var(--muted)',
              maxWidth: 340,
            }}
          >
            Software Developer based in{' '}
            <PointerHighlight>
              <strong style={{ color: 'var(--text)', fontWeight: 400 }}>
                London, UK
              </strong>
            </PointerHighlight>
            , crafting immersive web experiences at the intersection of{' '}
            <PointerHighlight>
              <strong style={{ color: 'var(--text)', fontWeight: 400 }}>
                design and technology
              </strong>
            </PointerHighlight>
            .
          </p>
          <div
            style={{
              display: 'flex',
              flexWrap: 'wrap',
              gap: '8px 18px',
              marginTop: 20,
            }}
          >
            {socials.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 6,
                  fontSize: 12,
                  letterSpacing: '.04em',
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color .25s',
                }}
                onMouseEnter={(e) =>
                  (e.currentTarget.style.color = 'var(--text)')
                }
                onMouseLeave={(e) =>
                  (e.currentTarget.style.color = 'var(--muted)')
                }
              >
                <svg
                  width="12"
                  height="12"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  style={{ flexShrink: 0 }}
                >
                  <path d={icons[s.icon] ?? icons.github} />
                </svg>
                {s.label}
              </a>
            ))}
          </div>
          <p
            style={{
              fontSize: 11,
              letterSpacing: '.1em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
              marginTop: 20,
            }}
          >
            {personal.title}
          </p>
        </div>

        {/* Center: scroll cue */}
        <div
          ref={cueRef}
          className="hero-scroll-cue"
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: 10,
          }}
        >
          <span
            style={{
              fontSize: 10,
              letterSpacing: '.28em',
              textTransform: 'uppercase',
              color: 'var(--muted)',
            }}
          >
            Scroll
          </span>
          <div
            style={{
              width: 1,
              height: 54,
              background:
                'linear-gradient(to bottom, rgba(255,255,255,.3), transparent)',
              animation: 'scroll-line 2.2s ease infinite',
            }}
          />
        </div>

        {/* Right: CTAs + year */}
        {/* <div
          className="hero-right"
          style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 16 }}
        >
          <div className="hero-cta-row" style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <a
              href="#work"
              style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '14px 28px', borderRadius: 100, background: 'var(--accent)', color: '#000', fontSize: 12, fontWeight: 500, letterSpacing: '.07em', textTransform: 'uppercase', textDecoration: 'none', transition: 'opacity .25s' }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = '.85')}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
            >
              View Work
              <svg width="12" height="12" viewBox="0 0 13 13" fill="none">
                <path d="M1 12L12 1M12 1H1M12 1V12" stroke="currentColor" strokeWidth="1.5" />
              </svg>
            </a>
            <a
              href="/contact"
              style={{ display: 'inline-flex', alignItems: 'center', padding: '14px 22px', borderRadius: 100, border: '1px solid var(--border)', color: 'var(--muted)', fontSize: 12, letterSpacing: '.07em', textTransform: 'uppercase', textDecoration: 'none', transition: 'border-color .25s, color .25s' }}
              onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)'; e.currentTarget.style.color = 'var(--text)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border)'; e.currentTarget.style.color = 'var(--muted)'; }}
            >
              Get in Touch
            </a>
          </div>
          <span style={{ fontSize: 11, letterSpacing: '.08em', textTransform: 'uppercase', color: 'var(--muted)' }}>© 2026</span>
        </div> */}
      </div>
    </section>
  );
}
