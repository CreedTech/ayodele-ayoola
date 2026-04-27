import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: "Projects - Ayodele Ayoola | Things I've Built",
  description:
    'All projects by Ayodele Ayoola - AI assistants, savings apps, high-traffic media platforms, and more. Built with React, Next.js, Flutter, and Node.js.',
  alternates: { canonical: 'https://www.ayodeleayoola.com/projects' },
  openGraph: {
    title: 'Projects - Ayodele Ayoola',
    description:
      'Things built by Ayodele Ayoola - from AI property assistants to apps serving 5M+ users.',
    url: 'https://www.ayodeleayoola.com/projects',
    type: 'website',
  },
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Home',
      item: 'https://www.ayodeleayoola.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'Projects',
      item: 'https://www.ayodeleayoola.com/projects',
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
      <JsonLd data={breadcrumbSchema} />
      {children}
    </>
  );
}
