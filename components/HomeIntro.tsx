import Image from 'next/image';
import Link from 'next/link';
import { HugeiconsIcon, type IconSvgElement } from '@hugeicons/react';
import { GithubIcon, Linkedin01Icon, Mail01Icon, NewTwitterIcon } from '@hugeicons/core-free-icons';
import LocalTime from '@/components/LocalTime';
import { CV_PAGE_URL, PORTRAIT_URL, personal, socials } from '@/lib/data';

const SOCIAL_ICONS: Record<string, IconSvgElement> = {
  github: GithubIcon,
  linkedin: Linkedin01Icon,
  twitter: NewTwitterIcon,
};

const iconLinks = [
  { label: 'Email', href: `mailto:${personal.email}`, icon: Mail01Icon },
  ...socials.map((s) => ({ label: s.label, href: s.href, icon: SOCIAL_ICONS[s.icon] })),
];

const ext = { target: '_blank', rel: 'noopener noreferrer' };

export default function HomeIntro() {
  return (
    <section className="home-intro" style={{ paddingTop: 80 }}>
      <style>{`
        .home-intro__head { display: flex; align-items: center; justify-content: space-between; gap: 24px; }
        .home-intro__photo { flex-shrink: 0; width: 168px; height: 168px; border-radius: 50%; overflow: hidden; transition: transform .4s var(--ease-out); }
        .home-intro__photo img { display: block; width: 100%; height: 100%; }
        @media (prefers-reduced-motion: no-preference) {
          .home-intro__photo img { animation: portrait-in 1.1s cubic-bezier(.2,.7,.2,1) backwards; }
        }
        @keyframes portrait-in { from { opacity: 0; filter: blur(8px) brightness(2.2) contrast(.6); transform: scale(1.06); } }
        .home-intro__photo:hover { transform: scale(1.06) rotate(-3deg); }
                .home-intro__name { font-family: var(--font-display); font-size: clamp(34px, 5.5vw, 52px); font-weight: 600; letter-spacing: -.035em; line-height: 1; }
        .home-intro__role { display: flex; flex-wrap: wrap; gap: 4px 10px; margin-top: 10px; font-size: 16px; color: var(--muted); }
        .home-intro__bio { margin-top: 32px; font-size: 18px; line-height: 1.75; color: var(--text); max-width: 68ch; }
        .home-intro__links { display: flex; flex-wrap: wrap; align-items: center; gap: 4px; margin-top: 24px; }
        .icon-link { display: inline-grid; place-items: center; width: 36px; height: 36px; margin-left: -8px; border-radius: 10px; color: var(--text); transition: background .2s, transform .25s var(--ease-out); }
        .icon-link + .icon-link { margin-left: 0; }
        .icon-link:hover { background: rgba(255,255,255,.08); transform: translateY(-2px); }
        .icon-link:active { transform: scale(.92); }
        .home-intro__cv { margin-left: 10px; font-size: 15px; }
        @media (max-width: 560px) { .home-intro__photo { transform: scale(.6); transform-origin: right center; margin-left: -64px; } }
      `}</style>

      <div className="home-intro__head rise">
        <div>
          <h1 className="home-intro__name">{personal.name}</h1>
          <p className="home-intro__role">
            <span>{personal.title}</span>
            <span aria-hidden="true">·</span>
            <span>
              London, <LocalTime />
            </span>
          </p>
        </div>
        <div className="home-intro__photo">
          <Image src={PORTRAIT_URL} alt={`Portrait of ${personal.name}`} width={168} height={168} sizes="168px" quality={90} priority />
        </div>
      </div>

      <p className="home-intro__bio rise" style={{ ['--i' as string]: 1 }}>
        I&apos;m Ayoola, a software engineer in London. I&apos;m a Senior Frontend Engineer at{' '}
        <a href="https://scansanproperties.com" {...ext} className="row-link">
          ScanSan
        </a>
        , where I build property maps and data tools. I&apos;m currently building Kipzu, a gamified learning
        app, and{' '}
        <a href="https://awaagent.ng/" {...ext} className="row-link">
          AwaAgent
        </a>
        , a rental platform built around verified inspections. Before this I led web and mobile delivery
        at{' '}
        <a href="https://rentspace.tech" {...ext} className="row-link">
          RentSpace
        </a>{' '}
        and co-founded{' '}
        <a href="https://onjeki.com" {...ext} className="row-link">
          Onjeki
        </a>
        , a property marketplace. I also run{' '}
        <a href="https://www.delaco.net/" {...ext} className="row-link">
          DelacoTech
        </a>
        , which builds web and mobile products for clients, and contribute fixes to open-source projects
        like{' '}
        <a href="https://github.com/remotion-dev/remotion/pull/11584" {...ext} className="row-link">
          Remotion
        </a>{' '}
        and{' '}
        <a href="https://github.com/freeCodeCamp/freeCodeCamp/pull/70716" {...ext} className="row-link">
          freeCodeCamp
        </a>
        .
      </p>

      <div className="home-intro__links rise" style={{ ['--i' as string]: 2 }}>
        {iconLinks.map((l) => (
          <a
            key={l.label}
            href={l.href}
            aria-label={l.label}
            className="icon-link"
            {...(l.href.startsWith('http') ? ext : {})}
          >
            <HugeiconsIcon icon={l.icon} size={18} />
          </a>
        ))}
        <Link href={CV_PAGE_URL} className="row-link home-intro__cv">
          Read my CV
        </Link>
      </div>
    </section>
  );
}
