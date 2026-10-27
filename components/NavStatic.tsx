'use client';
import Link from 'next/link';
import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { HugeiconsIcon } from '@hugeicons/react';
import { CommandLineIcon } from '@hugeicons/core-free-icons';
import { useModKey } from '@/lib/use-mod-key';

const links = [
  { href: '/about', label: 'About' },
  { href: '/projects', label: 'Projects' },
  { href: '/stack', label: 'Stack' },
  { href: '/cv', label: 'CV' },
  { href: '/contact', label: 'Contact' },
];

export default function NavStatic() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const pathname = usePathname();
  const mod = useModKey();

  return (
    <>
      <header
        style={{
          position: 'relative',
          zIndex: 100,
          maxWidth: 928,
          margin: '0 auto',
          padding: '22px 24px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <Link
          href="/"
          className="font-display nav-static__logo"
          style={{
            fontSize: 17,
            fontWeight: 600,
            letterSpacing: '-.02em',
            color: 'var(--text)',
            textDecoration: 'none',
          }}
        >
          Ayoola
        </Link>

        {/* Desktop nav */}
        <nav className="nav-static__links" style={{ display: 'flex', gap: 32 }}>
          {links.map((l) => {
            const isActive =
              l.href === '/'
                ? pathname === '/'
                : l.href === '/#work'
                  ? false
                  : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                className="nav-static__link"
                style={{
                  fontSize: 14,
                  color: isActive ? 'var(--text)' : 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color .1s ease',
                  fontWeight: isActive ? 500 : 300,
                  borderBottom: isActive ? '1px solid var(--accent)' : '1px solid transparent',
                  paddingBottom: 2,
                }}
              >
                {l.label}
              </Link>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
          {/* Terminal trigger - hidden on small screens */}
          <button
            className="nav-static__links"
            onClick={() =>
              window.dispatchEvent(new CustomEvent('open-terminal'))
            }
            title="Open terminal"
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '5px 10px',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontSize: 13,
              transition: 'border-color .1s, color .2s',
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.borderColor = 'rgba(255,255,255,.2)';
              e.currentTarget.style.color = 'var(--text)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.borderColor = 'var(--border)';
              e.currentTarget.style.color = 'var(--muted)';
            }}
          >
            <HugeiconsIcon icon={CommandLineIcon} size={14} />
            <span>Terminal</span>
            <kbd style={{ font: 'inherit', fontSize: 11, opacity: 0.75 }}>{mod === '⌘' ? '⌘K' : 'Ctrl K'}</kbd>
          </button>

          <Link
            href="/contact"
            className="nav-static__cta"
            style={{
              fontSize: 12,
              color: 'var(--accent)',
              textDecoration: 'none',
              border: '1px solid rgba(34,197,94,.3)',
              padding: '8px 18px',
              borderRadius: 100,
              transition: 'background .12s',
            }}
          >
            Hire me
          </Link>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMobileOpen((v) => !v)}
            aria-label="Toggle menu"
            style={{
              display: 'none',
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '6px 10px',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontSize: 16,
              lineHeight: 1,
            }}
            className="nav-hamburger"
          >
            {mobileOpen ? '✕' : '☰'}
          </button>
        </div>
      </header>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <nav
          style={{
            position: 'relative',
            zIndex: 99,
            background: 'var(--surface)',
            borderBottom: '1px solid var(--border)',
            display: 'flex',
            flexDirection: 'column',
            padding: '16px 20px',
            gap: 4,
          }}
        >
          {links.map((l) => {
            const isActive = l.href === '/' ? pathname === '/' : pathname.startsWith(l.href);
            return (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                style={{
                  fontSize: 13,
                  color: isActive ? 'var(--accent)' : 'var(--muted)',
                  textDecoration: 'none',
                  padding: '12px 0',
                  borderBottom: '1px solid var(--border)',
                  transition: 'color .2s',
                  fontWeight: isActive ? 500 : 300,
                }}
              >
                {l.label}
              </Link>
            );
          })}
          <button
            onClick={() => {
              setMobileOpen(false);
              window.dispatchEvent(new CustomEvent('open-terminal'));
            }}
            style={{
              marginTop: 8,
              display: 'flex',
              alignItems: 'center',
              gap: 7,
              background: 'none',
              border: '1px solid var(--border)',
              borderRadius: 6,
              padding: '8px 12px',
              width: '100%',
              color: 'var(--muted)',
              cursor: 'pointer',
              fontSize: 11,
              letterSpacing: '.06em',
            }}
          >
            <HugeiconsIcon icon={CommandLineIcon} size={14} />
            Terminal
          </button>
        </nav>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-static__links { display: none !important; }
          .nav-hamburger { display: block !important; }
        }
        @media (max-width: 480px) {
          .nav-static__cta { padding: 6px 12px !important; font-size: 10px !important; letter-spacing: .06em !important; }
        }
      `}</style>
    </>
  );
}
