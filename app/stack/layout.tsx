import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_URL, personal, stackCategories } from '@/lib/data';

export const metadata: Metadata = {
  title: `Tech Stack - ${personal.name} | React, Next.js, TypeScript, Flutter`,
  description: `Technology stack of ${personal.name}: ${personal.headline}, PostgreSQL, PostGIS, Redis, MapLibre GL, LangChain, Docker, GCP and more.`,
  alternates: { canonical: `${SITE_URL}/stack` },
  openGraph: {
    title: `Tech Stack - ${personal.name} | ${personal.title}`,
    description: `Tools ${personal.name} uses across ${stackCategories.map((c) => c.label.toLowerCase()).join(', ')}.`,
    url: `${SITE_URL}/stack`,
  },
};

const skills = stackCategories.flatMap((c) =>
  c.skills.map((name) => ({ name, category: c.label })),
);

const stackGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/stack#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Tech Stack',
          item: `${SITE_URL}/stack`,
        },
      ],
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/stack#page`,
      url: `${SITE_URL}/stack`,
      name: "Ayodele Ayoola's Tech Stack - React, Next.js, TypeScript, Flutter",
      description:
        `Technology stack of ${personal.title} ${personal.name}.`,
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      breadcrumb: { '@id': `${SITE_URL}/stack#breadcrumb` },
      about: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/stack#skillslist`,
      name: "Ayodele Ayoola's Technology Stack",
      description:
        `Technologies and tools used by ${personal.title} ${personal.name}`,
      numberOfItems: skills.length,
      itemListElement: skills.map((skill, i) => ({
        '@type': 'ListItem',
        position: i + 1,
        item: {
          '@type': 'DefinedTerm',
          name: skill.name,
          inDefinedTermSet: {
            '@type': 'DefinedTermSet',
            name: `${skill.category} Technologies`,
          },
        },
      })),
    },
  ],
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={stackGraph} />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Tech Stack' }]}
      />
      {children}
    </>
  );
}
