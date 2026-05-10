import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'About - Ayodele Ayoola | Software Developer London',
  description:
    "Ayodele Ayoola's journey from Lagos to London. First Class Honours in Computer Science from Middlesex University, 6+ years building production software at ScanSan, RentSpace, Vanguard Media, and Dowell Research.",
  alternates: { canonical: 'https://ayodeleayoola.com/about' },
  openGraph: {
    title: 'About Ayodele Ayoola - Software Developer',
    description:
      'From Lagos to London. Computer Science First Class Honours. Software Developer with experience across Web3 PropTech, FinTech, media, and research platforms.',
    url: 'https://ayodeleayoola.com/about',
    type: 'profile',
  },
  twitter: {
    title: 'About Ayodele Ayoola - Software Developer',
    description:
      'The story behind the code. Lagos to London, 6+ years shipping products people love.',
  },
};

const SITE_URL = 'https://ayodeleayoola.com';

const aboutGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/about#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: `${SITE_URL}/about`,
        },
      ],
    },
    {
      '@type': 'ProfilePage',
      '@id': `${SITE_URL}/about#page`,
      url: `${SITE_URL}/about`,
      name: 'About Ayodele Ayoola',
      description:
        'The story of Ayodele Ayoola - Software Developer who moved from Lagos to London, earned a First Class degree in Computer Science, and built software for millions of users.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      breadcrumb: { '@id': `${SITE_URL}/about#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.about-summary', '.bio-text'],
      },
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Ayodele Ayoola',
        jobTitle: 'Software Developer',
        description:
          'Software Developer with 6+ years experience. First Class Honours in Computer Science, Middlesex University London. Specialising in React, Next.js, TypeScript, Flutter, and Node.js. Currently Senior Frontend Engineer at ScanSan Properties, London.',
        workLocation: { '@type': 'Place', name: 'London, United Kingdom' },
        hasOccupation: {
          '@type': 'Occupation',
          name: 'Software Developer',
          occupationLocation: { '@type': 'City', name: 'London' },
          skills:
            'React, Next.js, TypeScript, Node.js, Flutter, PostgreSQL, AWS, Docker, GraphQL, GSAP, Three.js, Web3, Tailwind CSS',
          experienceRequirements: '6+ years',
          qualifications:
            'BSc Computer Science First Class Honours - Middlesex University London',
        },
        memberOf: [
          {
            '@type': 'OrganizationRole',
            roleName: 'Senior Frontend Engineer',
            startDate: '2025-06',
            memberOf: {
              '@type': 'Organization',
              name: 'ScanSan Properties',
              url: 'https://scansanproperties.com',
            },
          },
          {
            '@type': 'OrganizationRole',
            roleName: 'Lead Software Engineer',
            startDate: '2023-08',
            endDate: '2025-05',
            memberOf: {
              '@type': 'Organization',
              name: 'RentSpace Technologies',
              url: 'https://rentspace.tech',
            },
          },
          {
            '@type': 'OrganizationRole',
            roleName: 'Full-Stack Developer',
            startDate: '2022-04',
            endDate: '2023-08',
            memberOf: {
              '@type': 'Organization',
              name: 'Vanguard Media Limited',
              url: 'https://vanguardngr.com',
            },
          },
          {
            '@type': 'OrganizationRole',
            roleName: 'Software Developer',
            startDate: '2021-11',
            endDate: '2022-03',
            memberOf: {
              '@type': 'Organization',
              name: 'Dowell Research UK',
              url: 'https://dowellresearch.uk',
            },
          },
          {
            '@type': 'OrganizationRole',
            roleName: 'React Native Developer',
            startDate: '2021-01',
            endDate: '2021-10',
            memberOf: {
              '@type': 'Organization',
              name: 'FUDAP CO',
            },
          },
          {
            '@type': 'OrganizationRole',
            roleName: 'Frontend Developer',
            startDate: '2020-07',
            endDate: '2020-12',
            memberOf: {
              '@type': 'Organization',
              name: 'Zummit Africa',
              url: 'https://zummitafrica.com',
            },
          },
        ],
      },
    },
  ],
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={aboutGraph} />
      <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'About' }]} />
      {children}
    </>
  );
}
