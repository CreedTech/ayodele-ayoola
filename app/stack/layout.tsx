import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Tech Stack - Ayodele Ayoola | React, Next.js, TypeScript, Flutter',
  description:
    'Full technology stack of Ayodele Ayoola: React, Next.js, TypeScript, Node.js, Flutter, React Native, PostgreSQL, MongoDB, AWS, GSAP, Three.js, Docker, GraphQL, Stripe, Paystack, and more.',
  alternates: { canonical: 'https://www.ayodeleayoola.com/stack' },
  openGraph: {
    title: 'Tech Stack - Ayodele Ayoola',
    description:
      'Every tool Ayodele reaches for: frontend, backend, mobile, cloud, databases, design, testing, and payments.',
    url: 'https://www.ayodeleayoola.com/stack',
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
      name: 'Tech Stack',
      item: 'https://www.ayodeleayoola.com/stack',
    },
  ],
};

const skillsSchema = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  '@id': 'https://www.ayodeleayoola.com/stack#skillslist',
  name: "Ayodele Ayoola's Technology Stack",
  description:
    'Complete list of technologies and tools used by Software Developer Ayodele Ayoola',
  itemListElement: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript (ES6+)',
    'Redux Toolkit',
    'Tailwind CSS',
    'GSAP',
    'Three.js',
    'Framer Motion',
    'HTML5 / CSS3',
    'Node.js',
    'Express.js',
    'Python',
    'REST APIs',
    'GraphQL',
    'WebSockets',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'Firebase / Firestore',
    'Flutter',
    'React Native',
    'AWS (EC2, S3, Lambda)',
    'Docker',
    'CI/CD Pipelines',
    'Vercel',
    'Jest',
    'React Testing Library',
    'Cypress',
    'Playwright',
    'Figma',
    'Storybook',
    'Design Systems',
    'WCAG Accessibility',
    'Stripe',
    'PayPal',
    'Flutterwave',
    'Paystack',
  ].map((skill, i) => ({
    '@type': 'ListItem',
    position: i + 1,
    name: skill,
  })),
};

export default function StackLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={skillsSchema} />
      {children}
    </>
  );
}
