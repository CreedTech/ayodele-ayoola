import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Tech Stack - Ayodele Ayoola | React, Next.js, TypeScript, Flutter',
  description:
    'Full technology stack of Ayodele Ayoola: React, Next.js, TypeScript, Node.js, Flutter, React Native, PostgreSQL, MongoDB, AWS, GSAP, Three.js, Docker, GraphQL, Stripe, Paystack, and more.',
  alternates: { canonical: 'https://ayodeleayoola.com/stack' },
  openGraph: {
    title: 'Tech Stack - Ayodele Ayoola | Software Developer',
    description:
      'Every tool Ayodele reaches for: frontend, backend, mobile, cloud, databases, design, testing, and payments.',
    url: 'https://ayodeleayoola.com/stack',
  },
};

const SITE_URL = 'https://ayodeleayoola.com';

const skills = [
  // Frontend
  { name: 'React', category: 'Frontend' },
  { name: 'Next.js', category: 'Frontend' },
  { name: 'TypeScript', category: 'Frontend' },
  { name: 'JavaScript (ES6+)', category: 'Frontend' },
  { name: 'Redux Toolkit', category: 'Frontend' },
  { name: 'Tailwind CSS', category: 'Frontend' },
  { name: 'GSAP', category: 'Frontend' },
  { name: 'Three.js', category: 'Frontend' },
  { name: 'Framer Motion', category: 'Frontend' },
  { name: 'HTML5 / CSS3', category: 'Frontend' },
  // Backend
  { name: 'Node.js', category: 'Backend' },
  { name: 'Express.js', category: 'Backend' },
  { name: 'Python', category: 'Backend' },
  { name: 'REST APIs', category: 'Backend' },
  { name: 'GraphQL', category: 'Backend' },
  { name: 'WebSockets', category: 'Backend' },
  // Databases
  { name: 'PostgreSQL', category: 'Database' },
  { name: 'MongoDB', category: 'Database' },
  { name: 'Redis', category: 'Database' },
  { name: 'Firebase / Firestore', category: 'Database' },
  // Mobile
  { name: 'Flutter', category: 'Mobile' },
  { name: 'React Native', category: 'Mobile' },
  // Cloud & DevOps
  { name: 'AWS (EC2, S3, Lambda)', category: 'Cloud' },
  { name: 'Docker', category: 'Cloud' },
  { name: 'CI/CD Pipelines', category: 'Cloud' },
  { name: 'Vercel', category: 'Cloud' },
  // Testing
  { name: 'Jest', category: 'Testing' },
  { name: 'React Testing Library', category: 'Testing' },
  { name: 'Cypress', category: 'Testing' },
  { name: 'Playwright', category: 'Testing' },
  // Design
  { name: 'Figma', category: 'Design' },
  { name: 'Storybook', category: 'Design' },
  { name: 'Design Systems', category: 'Design' },
  { name: 'WCAG Accessibility', category: 'Design' },
  // Payments
  { name: 'Stripe', category: 'Payments' },
  { name: 'PayPal', category: 'Payments' },
  { name: 'Flutterwave', category: 'Payments' },
  { name: 'Paystack', category: 'Payments' },
];

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
        'Complete technology stack of Software Developer Ayodele Ayoola, covering frontend, backend, mobile, cloud, databases, design, testing, and payment technologies.',
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
        'Complete list of technologies and tools used by Software Developer Ayodele Ayoola',
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
