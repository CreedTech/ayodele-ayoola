import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumb from '@/components/Breadcrumb';
import {
  SITE_URL,
  personal,
  experience,
  education,
  allSkills,
  yearsLabel,
} from '@/lib/data';

const [degree] = education;
const companies = experience.map((e) => e.company).join(', ');

export const metadata: Metadata = {
  title: `About - ${personal.name} | ${personal.title} London`,
  description: `${personal.name}, ${personal.title} in London. ${degree.grade} from ${degree.school}, ${yearsLabel} building production software at ${companies}.`,
  alternates: { canonical: `${SITE_URL}/about` },
  openGraph: {
    title: `About ${personal.name} - ${personal.title}`,
    description: `From Lagos to London. ${degree.grade}, ${degree.school}. ${personal.title} across PropTech, FinTech, media and research.`,
    url: `${SITE_URL}/about`,
    type: 'profile',
  },
  twitter: {
    title: `About ${personal.name} - ${personal.title}`,
    description: `Lagos to London, ${yearsLabel} shipping web and mobile products.`,
  },
};

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
      description: `The story of ${personal.name}, ${personal.title}, who moved from Lagos to London and earned a ${degree.grade} degree from ${degree.school}.`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      breadcrumb: { '@id': `${SITE_URL}/about#breadcrumb` },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2'],
      },
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: personal.name,
        jobTitle: personal.title,
        description: `${personal.title} with ${yearsLabel} of experience. ${degree.grade}, ${degree.degree}, ${degree.school}. Currently ${experience[0].role} at ${experience[0].company}, London.`,
        workLocation: { '@type': 'Place', name: personal.location },
        hasOccupation: {
          '@type': 'Occupation',
          name: personal.title,
          occupationLocation: { '@type': 'City', name: 'London' },
          skills: allSkills.join(', '),
          qualifications: `${degree.degree}, ${degree.grade} - ${degree.school}`,
        },
        memberOf: experience.map((e) => ({
          '@type': 'OrganizationRole',
          roleName: e.role,
          startDate: e.start,
          ...(e.end ? { endDate: e.end } : {}),
          memberOf: {
            '@type': 'Organization',
            name: e.company,
            ...(e.domain ? { url: `https://${e.domain}` } : {}),
          },
        })),
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
