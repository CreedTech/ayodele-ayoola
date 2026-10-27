import Link from 'next/link';
import SectionHeading from '@/components/SectionHeading';
import CopyButton from '@/components/CopyButton';
import { CV_PAGE_URL, personal, socials } from '@/lib/data';

const rows = [
  { label: 'Email', value: personal.email, href: `mailto:${personal.email}`, copy: personal.email },
  { label: 'Phone', value: personal.phoneDisplay, href: `tel:${personal.phone}`, copy: personal.phone },
  ...socials.map((s) => ({
    label: s.label,
    value: s.href.replace(/^https?:\/\//, ''),
    href: s.href,
    copy: s.href,
  })),
];

export default function ContactSection({ heading = true }: { heading?: boolean }) {
  return (
    <section id="contact" className={heading ? 'col-sec' : undefined}>
      <style>{`
        .ct-list { margin: 0; }
        .ct-row { display: grid; grid-template-columns: 200px 1fr; gap: 28px; padding: 12px 0; border-top: 1px solid var(--border); font-size: 15px; }
        .ct-row:first-child { border-top: 0; padding-top: 4px; }
        .ct-row dt { color: var(--muted); }
        .ct-row dd { margin: 0; min-width: 0; overflow-wrap: anywhere; display: flex; align-items: center; gap: 8px; flex-wrap: wrap; }
        .ct-row .copy-btn { opacity: .55; }
        .ct-row:hover .copy-btn, .ct-row .copy-btn:focus-visible, .ct-row .copy-btn[data-copied="true"] { opacity: 1; }
        @media (max-width: 600px) { .ct-row { grid-template-columns: 1fr; gap: 2px; } }
      `}</style>
      {heading && <SectionHeading aside="London, open to remote">Contact</SectionHeading>}
      <dl className="ct-list">
        {rows.map((r) => (
          <div key={r.label} className="ct-row">
            <dt>{r.label}</dt>
            <dd>
              <a
                href={r.href}
                className="row-link"
                {...(r.href.startsWith('http') ? { target: '_blank', rel: 'noopener noreferrer' } : {})}
              >
                {r.value}
              </a>
              <CopyButton value={r.copy} label={r.label} />
            </dd>
          </div>
        ))}
        <div className="ct-row">
          <dt>CV</dt>
          <dd>
            <Link href={CV_PAGE_URL} className="row-link">
              Read online
            </Link>
          </dd>
        </div>
      </dl>
    </section>
  );
}
