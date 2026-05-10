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

const SITE_URL = 'https://ayodeleayoola.com';

const graphSchema = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Person',
      '@id': `${SITE_URL}/#person`,
      name: 'Ayodele Ayoola',
      givenName: 'Ayodele',
      familyName: 'Ayoola',
      url: SITE_URL,
      image: {
        '@type': 'ImageObject',
        url: `${SITE_URL}/og-image.JPG`,
        width: 1200,
        height: 630,
      },
      jobTitle: 'Software Developer',
      description:
        'Software Developer with 6+ years building high-performance web, mobile, and full-stack applications. Specialising in React, Next.js, TypeScript, and Flutter. First Class Honours in Computer Science from Middlesex University London. Based in London, UK.',
      email: 'ayodeleayoolaoke4@gmail.com',
      telephone: '+447551113208',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'London',
        addressCountry: 'GB',
      },
      nationality: {
        '@type': 'Country',
        name: 'Nigeria',
      },
      knowsLanguage: [{ '@type': 'Language', name: 'English' }],
      alumniOf: [
        {
          '@type': 'CollegeOrUniversity',
          '@id': 'https://www.mdx.ac.uk/#org',
          name: 'Middlesex University London',
          sameAs: 'https://www.mdx.ac.uk',
        },
        {
          '@type': 'EducationalOrganization',
          name: 'Aptech Computer Education',
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'BSc Computer Science - First Class Honours',
          credentialCategory: 'degree',
          dateCreated: '2025',
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: 'Middlesex University London',
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: 'Advanced Diploma in Software Engineering - Distinction',
          credentialCategory: 'diploma',
          dateCreated: '2022',
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: 'Aptech Computer Education',
          },
        },
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: 'Software Developer',
        occupationLocation: { '@type': 'City', name: 'London' },
        description:
          'Builds high-performance web, mobile, and full-stack applications using React, Next.js, TypeScript, Flutter, and Node.js.',
        skills:
          'React, Next.js, TypeScript, JavaScript, Node.js, Flutter, React Native, PostgreSQL, MongoDB, Redis, AWS, Docker, GraphQL, GSAP, Three.js, Web3, Tailwind CSS, Python, Figma, Design Systems',
        estimatedSalary: {
          '@type': 'MonetaryAmountDistribution',
          name: 'Software Developer London',
          currency: 'GBP',
          duration: 'P1Y',
          percentile10: 60000,
          percentile25: 75000,
          median: 95000,
          percentile75: 120000,
          percentile90: 150000,
        },
      },
      worksFor: [
        {
          '@type': 'OrganizationRole',
          roleName: 'Senior Frontend Engineer',
          startDate: '2025-06',
          memberOf: {
            '@type': 'Organization',
            '@id': `${SITE_URL}/#org-scansan`,
            name: 'ScanSan Properties',
            url: 'https://scansanproperties.com',
            address: {
              '@type': 'PostalAddress',
              addressLocality: 'London',
              addressCountry: 'GB',
            },
          },
        },
      ],
      knowsAbout: [
        'React',
        'Next.js',
        'TypeScript',
        'JavaScript',
        'Node.js',
        'Express.js',
        'Flutter',
        'React Native',
        'PostgreSQL',
        'MongoDB',
        'Redis',
        'AWS',
        'Docker',
        'GraphQL',
        'WebSockets',
        'GSAP',
        'Three.js',
        'Web3',
        'Tailwind CSS',
        'Python',
        'Django',
        'Figma',
        'Design Systems',
        'Core Web Vitals',
        'Performance Optimisation',
        'Geospatial Systems',
        'Real-time Systems',
        'Payment Integrations',
        'Storybook',
        'WCAG Accessibility',
        'CI/CD Pipelines',
        'Stripe',
        'Paystack',
        'Flutterwave',
      ],
      award: [
        'BSc Computer Science First Class Honours - Middlesex University London, 2025',
        'Advanced Diploma in Software Engineering Distinction - Aptech Computer Education, 2022',
      ],
      mainEntityOfPage: `${SITE_URL}/about`,
      sameAs: [
        'https://linkedin.com/in/ayodele-ayoola',
        'https://github.com/creedtech',
        'https://twitter.com/lazy_programma',
        'https://ayodeleayoola.com',
      ],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      url: SITE_URL,
      name: 'Ayodele Ayoola - Software Developer',
      description:
        'Portfolio of Ayodele Ayoola, Software Developer based in London, UK. React, Next.js, TypeScript, Flutter, Node.js expert.',
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      copyrightYear: new Date().getFullYear(),
      about: { '@id': `${SITE_URL}/#person` },
      potentialAction: {
        '@type': 'SearchAction',
        target: {
          '@type': 'EntryPoint',
          urlTemplate: `${SITE_URL}/?q={search_term_string}`,
        },
        'query-input': 'required name=search_term_string',
      },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: 'Ayodele Ayoola - Software Developer, London',
      description:
        'Software Developer with 6+ years building high-performance web, mobile, and full-stack applications. React, Next.js, TypeScript, Flutter expert based in London, UK.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      about: { '@id': `${SITE_URL}/#person` },
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      datePublished: '2024-01-01',
      dateModified: new Date().toISOString().split('T')[0],
      breadcrumb: {
        '@type': 'BreadcrumbList',
        itemListElement: [
          { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        ],
      },
      speakable: {
        '@type': 'SpeakableSpecification',
        cssSelector: ['h1', 'h2', '.hero-description', '.about-summary'],
        xpath: [
          '/html/head/title',
          "/html/head/meta[@name='description']/@content",
        ],
      },
      significantLink: [
        `${SITE_URL}/about`,
        `${SITE_URL}/projects`,
        `${SITE_URL}/stack`,
        `${SITE_URL}/contact`,
      ],
    },
    {
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
        { '@type': 'AdministrativeArea', name: 'North America' },
      ],
      availableChannel: {
        '@type': 'ServiceChannel',
        serviceUrl: `${SITE_URL}/contact`,
        availableLanguage: 'English',
      },
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
    },
    {
      '@type': 'FAQPage',
      '@id': `${SITE_URL}/#faq`,
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
            text: 'Yes. Ayodele Ayoola is available for engineering roles, technical consulting, and freelance projects in London and remotely across the UK, Europe, and North America. You can contact him at ayodeleayoolaoke4@gmail.com or via https://ayodeleayoola.com/contact.',
          },
        },
        {
          '@type': 'Question',
          name: 'What notable projects has Ayodele Ayoola built?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Notable projects include: the PAA AI Property Assistant for ScanSan (Web3 property investment platform), RentSpace Platform (5,000+ MAU, 4.8-star App Store rating), Vanguard Media Platform (5M+ monthly users), Dowell Research UX Platform (500+ enterprise clients), and SwiftVista utility payment system.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where is Ayodele Ayoola based?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ayodele Ayoola is based in London, United Kingdom, and works with clients globally across the UK, Europe, and North America.',
          },
        },
        {
          '@type': 'Question',
          name: "What is Ayodele Ayoola's educational background?",
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ayodele holds a First Class Honours BSc in Computer Science from Middlesex University London (2025) and an Advanced Diploma in Software Engineering with Distinction from Aptech Computer Education (2022).',
          },
        },
        {
          '@type': 'Question',
          name: 'How many years of experience does Ayodele Ayoola have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ayodele Ayoola has over 6 years of professional software development experience, starting in 2019 with roles spanning frontend, full-stack, mobile, and technical leadership across PropTech, FinTech, media, and research sectors.',
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#nav`,
      name: 'Site Navigation',
      itemListElement: [
        { '@type': 'SiteLinksSearchBox', target: SITE_URL },
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL,
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'About',
          item: `${SITE_URL}/about`,
        },
        {
          '@type': 'ListItem',
          position: 3,
          name: 'Projects',
          item: `${SITE_URL}/projects`,
        },
        {
          '@type': 'ListItem',
          position: 4,
          name: 'Tech Stack',
          item: `${SITE_URL}/stack`,
        },
        {
          '@type': 'ListItem',
          position: 5,
          name: 'Contact',
          item: `${SITE_URL}/contact`,
        },
      ],
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
      <JsonLd data={graphSchema} />
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
