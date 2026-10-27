import Image from 'next/image';
import Link from 'next/link';
import { HugeiconsIcon } from '@hugeicons/react';
import { Download04Icon } from '@hugeicons/core-free-icons';
import PageTitle from '@/components/PageTitle';
import SectionHeading from '@/components/SectionHeading';
import CareerTimeline from '@/components/CareerTimeline';
import ExperienceList from '@/components/ExperienceList';
import OpenSourceList from '@/components/OpenSourceList';
import FooterSection from '@/components/FooterSection';
import { CV_PAGE_URL, CV_PDF_URL, PORTRAIT_URL, education, personal, story as STORY, yearsLabel } from '@/lib/data';

export default function AboutPage() {
  return (
    <main className="col">
      <style>{`
        .ab-head { display: flex; justify-content: space-between; align-items: flex-end; gap: 32px; }
        .ab-photo { flex-shrink: 0; width: 200px; height: 200px; border-radius: 50%; overflow: hidden; transition: transform .4s var(--ease-out); }
        .ab-photo:hover { transform: scale(1.04) rotate(-2deg); }
        .ab-photo img { display: block; width: 100%; height: 100%; }
        .ab-lead { margin-top: 40px; font-size: 21px; line-height: 1.6; color: var(--text); max-width: 64ch; }
        .ab-story { display: grid; gap: 18px; margin-top: 20px; max-width: 68ch; }
        .ab-story p { font-size: 17px; line-height: 1.75; color: var(--muted); }
        .ab-cv { display: flex; flex-wrap: wrap; align-items: center; gap: 12px 24px; margin-top: 32px; font-size: 15px; }
        .ab-cv__dl { display: inline-flex; align-items: center; gap: 8px; padding: 11px 18px; border-radius: 12px; background: var(--text); color: #000; font-weight: 600; text-decoration: none; transition: transform .15s var(--ease-out), opacity .2s; }
        .ab-cv__dl:hover { opacity: .9; }
        .ab-cv__dl:active { transform: scale(.96); }
        .ab-edu { margin: 0; }
        .ab-edu > div { display: grid; grid-template-columns: 1fr auto; gap: 24px; padding: 16px 0; border-top: 1px solid var(--border); }
        .ab-edu > div:first-child { border-top: 0; padding-top: 4px; }
        .ab-edu dt { font-size: 16px; font-weight: 500; color: var(--text); }
        .ab-edu dt span { display: block; margin-top: 4px; font-size: 15px; font-weight: 400; color: var(--muted); }
        .ab-edu dd { margin: 0; }
        @media (max-width: 600px) {
          .ab-head { flex-direction: column-reverse; align-items: flex-start; }
          .ab-photo { width: 140px; height: 140px; }
        }
      `}</style>

      <div className="ab-head">
        <PageTitle aside={`${personal.title} · ${yearsLabel}`}>About</PageTitle>
        <div className="ab-photo rise">
          <Image src={PORTRAIT_URL} alt={`Portrait of ${personal.name}`} width={200} height={200} sizes="200px" priority />
        </div>
      </div>

      <p className="ab-lead rise" style={{ ['--i' as string]: 1 }}>
        {STORY[0]}
      </p>
      <div className="ab-story rise" style={{ ['--i' as string]: 2 }}>
        {STORY.slice(1).map((p) => (
          <p key={p.slice(0, 24)}>{p}</p>
        ))}
      </div>

      <div className="ab-cv rise" style={{ ['--i' as string]: 3 }}>
        <a href={CV_PDF_URL} download className="ab-cv__dl">
          <HugeiconsIcon icon={Download04Icon} size={17} />
          Download CV
        </a>
        <Link href={CV_PAGE_URL} className="row-link">
          Read it online
        </Link>
      </div>

      <section id="work" className="col-sec">
        <SectionHeading aside={yearsLabel}>Experience</SectionHeading>
        <CareerTimeline style={{ margin: '0 0 28px' }} />
        <ExperienceList />
      </section>

      <section id="open-source" className="col-sec">
        <SectionHeading>Open source</SectionHeading>
        <OpenSourceList />
      </section>

      <section id="education" className="col-sec">
        <SectionHeading>Education</SectionHeading>
        <dl className="ab-edu">
          {education.map((e) => (
            <div key={e.school}>
              <dt>
                {e.degree}
                <span>
                  {e.school}
                  {e.grade ? ` · ${e.grade}` : ''}
                </span>
              </dt>
              <dd className="meta">{e.year}</dd>
            </div>
          ))}
        </dl>
      </section>

      <FooterSection />
    </main>
  );
}
