'use client';
import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

import HeroSection from '@/components/HeroSection';
import MarqueeSection from '@/components/MarqueeSection';
import ExperienceOverviewSection from '@/components/ExperienceOverviewSection';
import GitHubSection from '@/components/GitHubSection';
// import ServicesSection from '@/components/ServicesSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import JsonLd from '@/components/JsonLd';

const SITE_URL = 'https://www.ayodeleayoola.com';

const personSchema = {
  '@context': 'https://schema.org',
  '@type': 'Person',
  '@id': `${SITE_URL}/#person`,
  name: 'Ayodele Ayoola',
  givenName: 'Ayodele',
  familyName: 'Ayoola',
  url: SITE_URL,
  image: `${SITE_URL}/og-image.JPG`,
  jobTitle: 'Software Developer',
  description:
    'Software Developer with 6+ years building high-performance web, mobile, and full-stack applications. Specialising in React, Next.js, TypeScript, and Flutter. Based in London, UK.',
  email: 'ayodeleayoolaoke4@gmail.com',
  telephone: '+447551113208',
  address: {
    '@type': 'PostalAddress',
    addressLocality: 'London',
    addressCountry: 'GB',
  },
  nationality: 'Nigerian',
  alumniOf: [
    {
      '@type': 'CollegeOrUniversity',
      name: 'Middlesex University London',
      sameAs: 'https://www.mdx.ac.uk',
    },
    {
      '@type': 'EducationalOrganization',
      name: 'Aptech Computer Education',
    },
  ],
  knowsAbout: [
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'Node.js',
    'Flutter',
    'React Native',
    'PostgreSQL',
    'MongoDB',
    'Redis',
    'AWS',
    'Docker',
    'GraphQL',
    'GSAP',
    'Three.js',
    'Web3',
    'Tailwind CSS',
    'Python',
    'Figma',
    'Design Systems',
    'Core Web Vitals',
    'Performance Optimisation',
  ],
  hasCredential: [
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'BSc Computer Science - First Class Honours',
      credentialCategory: 'degree',
      recognizedBy: {
        '@type': 'CollegeOrUniversity',
        name: 'Middlesex University London',
      },
    },
    {
      '@type': 'EducationalOccupationalCredential',
      name: 'Advanced Diploma in Software Engineering - Distinction',
      credentialCategory: 'diploma',
      recognizedBy: {
        '@type': 'EducationalOrganization',
        name: 'Aptech Computer Education',
      },
    },
  ],
  worksFor: {
    '@type': 'Organization',
    name: 'ScanSan Properties',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'London',
      addressCountry: 'GB',
    },
  },
  sameAs: [
    'https://linkedin.com/in/ayodele-ayoola',
    'https://github.com/creedtech',
  ],
};

const websiteSchema = {
  '@context': 'https://schema.org',
  '@type': 'WebSite',
  '@id': `${SITE_URL}/#website`,
  url: SITE_URL,
  name: 'Ayodele Ayoola - Software Developer',
  description:
    'Portfolio of Ayodele Ayoola, Software Developer based in London, UK.',
  author: { '@id': `${SITE_URL}/#person` },
  inLanguage: 'en-GB',
  potentialAction: {
    '@type': 'SearchAction',
    target: {
      '@type': 'EntryPoint',
      urlTemplate: `${SITE_URL}/?q={search_term_string}`,
    },
    'query-input': 'required name=search_term_string',
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  '@id': `${SITE_URL}/#service`,
  name: 'Ayodele Ayoola - Software Engineering Services',
  url: SITE_URL,
  description:
    'Expert software engineering services: frontend, full-stack, mobile, creative development, design systems, and technical consulting.',
  provider: { '@id': `${SITE_URL}/#person` },
  areaServed: [
    { '@type': 'Country', name: 'United Kingdom' },
    { '@type': 'Country', name: 'United States' },
    { '@type': 'AdministrativeArea', name: 'Europe' },
  ],
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Software Engineering Services',
    itemListElement: [
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Frontend Engineering',
          description:
            'High-performance React/Next.js apps with pixel-perfect UIs and Core Web Vitals optimisation.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Full-Stack Development',
          description:
            'End-to-end solutions with Node.js, PostgreSQL, MongoDB, and REST/GraphQL APIs.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Mobile Development',
          description:
            'Cross-platform iOS and Android apps with Flutter and React Native.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Creative Development',
          description:
            'Motion design, GSAP animations, Three.js WebGL experiences.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Design Systems',
          description:
            'Scalable component libraries with Storybook, design tokens, and Figma integration.',
        },
      },
      {
        '@type': 'Offer',
        itemOffered: {
          '@type': 'Service',
          name: 'Technical Consulting',
          description:
            'Architecture reviews, performance audits, and hands-on mentoring.',
        },
      },
    ],
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Who is Ayodele Ayoola?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ayodele Ayoola is a Software Developer based in London, UK, with 6+ years of experience building high-performance web, mobile, and full-stack applications. He holds a First Class Honours degree in Computer Science from Middlesex University London and has worked for companies including ScanSan Properties, RentSpace Technologies, Vanguard Media, and Dowell Research.',
      },
    },
    {
      '@type': 'Question',
      name: 'What technologies does Ayodele Ayoola specialise in?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ayodele specialises in React, Next.js, TypeScript, Node.js, Flutter, React Native, PostgreSQL, MongoDB, AWS, GSAP, Three.js, Tailwind CSS, GraphQL, Docker, and Web3 technologies.',
      },
    },
    {
      '@type': 'Question',
      name: 'Is Ayodele Ayoola available for hire?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Ayodele Ayoola is available for Software Developering roles, technical consulting, and freelance projects in London and remotely. You can contact him at ayodeleayoolaoke4@gmail.com.',
      },
    },
    {
      '@type': 'Question',
      name: 'What notable projects has Ayodele Ayoola built?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Notable projects include: the PAA AI Property Assistant for ScanSan (Web3 property investment), RentSpace Savings App (5,000+ MAU, 4.8 App Store rating), Vanguard Media Platform (5M+ monthly users, 120% mobile ad revenue increase), and a UX Research Platform for 500+ enterprise clients.',
      },
    },
    {
      '@type': 'Question',
      name: 'Where is Ayodele Ayoola based?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Ayodele Ayoola is based in London, United Kingdom, and works with clients globally.',
      },
    },
  ],
};

export default function Home() {
  useEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const lenis = new Lenis({
      duration: 0.9,
      easing: (t: number) => 1 - Math.pow(1 - t, 3),
    });

    lenis.on('scroll', () => ScrollTrigger.update());

    const tick = (t: number) => lenis.raf(t * 1000);
    gsap.ticker.add(tick);
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove(tick);
    };
  }, []);

  return (
    <main>
      <JsonLd data={personSchema} />
      <JsonLd data={websiteSchema} />
      <JsonLd data={serviceSchema} />
      <JsonLd data={faqSchema} />
      <HeroSection />
      <MarqueeSection />
      <ExperienceOverviewSection />
      <GitHubSection />
      {/* <ServicesSection /> */}
      <ContactSection />
      <FooterSection />
    </main>
  );
}
