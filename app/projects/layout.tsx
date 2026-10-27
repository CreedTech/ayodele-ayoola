import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_URL, personal, projects } from '@/lib/data';

export const metadata: Metadata = {
  title: `Projects - ${personal.name} | Things I've Built`,
  description: `${projects.length} projects by ${personal.name}: property intelligence maps, a property marketplace, savings and lending apps, a news platform with 5M+ monthly users, and open-source tools. Built with React, Next.js, Flutter and Node.js.`,
  alternates: { canonical: `${SITE_URL}/projects` },
  openGraph: {
    title: `Projects - ${personal.name} | ${personal.title}`,
    description: `Things built by ${personal.name}, from property intelligence maps to apps serving 5M+ users. React, Next.js, Flutter, Node.js.`,
    url: `${SITE_URL}/projects`,
    type: 'website',
  },
};

function getAppType(tags: string[]) {
  const t = tags.join(' ').toLowerCase();
  if (t.includes('flutter') || t.includes('react native'))
    return 'MobileApplication';
  if (t.includes('browser extension')) return 'SoftwareApplication';
  return 'WebApplication';
}

const projectsGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/projects#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Projects',
          item: `${SITE_URL}/projects`,
        },
      ],
    },
    {
      '@type': 'CollectionPage',
      '@id': `${SITE_URL}/projects#page`,
      url: `${SITE_URL}/projects`,
      name: "Ayodele Ayoola's Projects",
      description:
        'A curated collection of software projects by Ayodele Ayoola - web apps, mobile apps, AI tools, fintech platforms, and more.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      breadcrumb: { '@id': `${SITE_URL}/projects#breadcrumb` },
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/projects#list`,
      name: 'Software Projects by Ayodele Ayoola',
      description:
        `All software projects built by ${personal.title} ${personal.name}`,
      numberOfItems: projects.filter((p) => p.href).length,
      itemListElement: projects
        .filter((p) => p.href)
        .map((p, i) => ({
          '@type': 'ListItem',
          position: i + 1,
          item: {
            '@type': getAppType(p.tags),
            '@id': p.href
              ? `${p.href}#app`
              : `${SITE_URL}/projects#project-${p.num}`,
            name: p.title,
            description: p.desc,
            url: p.href || undefined,
            applicationCategory: p.tags.includes('AI')
              ? 'AIApplication'
              : p.tags.includes('Flutter') || p.tags.includes('React Native')
                ? 'LifestyleApplication'
                : 'BusinessApplication',
            operatingSystem:
              p.tags.includes('Flutter') || p.tags.includes('React Native')
                ? 'iOS, Android'
                : 'Web',
            ...(p.year ? { datePublished: `${p.year}-01-01` } : {}),
            creator: { '@id': `${SITE_URL}/#person` },
            author: { '@id': `${SITE_URL}/#person` },
            keywords: p.tags.join(', '),
            ...(p.company !== 'Personal Project' && p.company !== 'Open Source'
              ? {
                  producer: {
                    '@type': 'Organization',
                    name: p.company,
                  },
                }
              : {}),
          },
        })),
    },
  ],
};

export default function ProjectsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={projectsGraph} />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Projects' }]}
      />
      {children}
    </>
  );
}
