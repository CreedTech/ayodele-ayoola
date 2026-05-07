import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'About - Ayodele Ayoola | Software Developer London',
  description:
    "Ayodele Ayoola's journey from Lagos to London. First Class Honours in Computer Science from Middlesex University, 6+ years building production software at ScanSan, RentSpace, Vanguard Media, and Dowell Research.",
  alternates: { canonical: 'https://ayodeleayoola.com/about' },
  openGraph: {
    title: 'About Ayodele Ayoola - Software Developer',
    description:
      'From Lagos to London. Computer Science First Class Honours, Software Developer with experience across Web3 proptech, fintech, media, and research platforms.',
    url: 'https://ayodeleayoola.com/about',
    type: 'profile',
  },
  twitter: {
    title: 'About Ayodele Ayoola - Software Developer',
    description:
      'The story behind the code. Lagos to London, 6+ years shipping products people love.',
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
      item: 'https://ayodeleayoola.com',
    },
    {
      '@type': 'ListItem',
      position: 2,
      name: 'About',
      item: 'https://ayodeleayoola.com/about',
    },
  ],
};

const profilePageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfilePage',
  '@id': 'https://ayodeleayoola.com/about#profilepage',
  name: 'About Ayodele Ayoola',
  url: 'https://ayodeleayoola.com/about',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://ayodeleayoola.com/#person',
    name: 'Ayodele Ayoola',
    jobTitle: 'Software Developer',
    description:
      'Software Developer with 6+ years experience. First Class Honours, Middlesex University London. Specialising in React, Next.js, TypeScript, Flutter, and Node.js.',
    workLocation: { '@type': 'Place', name: 'London, United Kingdom' },
    hasOccupation: {
      '@type': 'Occupation',
      name: 'Software Engineer',
      occupationLocation: { '@type': 'City', name: 'London' },
      skills:
        'React, Next.js, TypeScript, Node.js, Flutter, PostgreSQL, AWS, Docker',
      experienceRequirements: '6+ years',
    },
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={profilePageSchema} />
      {children}
    </>
  );
}
