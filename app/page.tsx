import HomeIntro from '@/components/HomeIntro';
import SectionHeading from '@/components/SectionHeading';
import CareerTimeline from '@/components/CareerTimeline';
import ExperienceList from '@/components/ExperienceList';
import ProjectGroups from '@/components/ProjectGroups';
import OpenSourceList from '@/components/OpenSourceList';
import GitHubSection from '@/components/GitHubSection';
import ContactSection from '@/components/ContactSection';
import FooterSection from '@/components/FooterSection';
import JsonLd from '@/components/JsonLd';
import {
  SITE_URL,
  personal,
  experience,
  education,
  allSkills,
  yearsLabel,
  careerStart,
  projects,
} from '@/lib/data';

const [degree, diploma] = education;
const current = experience.find((e) => !e.end);
const personDescription = `${personal.title} with ${yearsLabel} building web, mobile and full-stack products with React, Next.js, TypeScript, Node.js and Flutter. ${degree.grade}, ${degree.degree}, ${degree.school}. Based in London, UK.`;

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
      jobTitle: personal.title,
      description: personDescription,
      email: personal.email,
      telephone: personal.phone,
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
          name: diploma.school,
        },
      ],
      hasCredential: [
        {
          '@type': 'EducationalOccupationalCredential',
          name: `${degree.degree} - ${degree.grade}`,
          credentialCategory: 'degree',
          dateCreated: degree.year,
          recognizedBy: {
            '@type': 'CollegeOrUniversity',
            name: degree.school,
          },
        },
        {
          '@type': 'EducationalOccupationalCredential',
          name: diploma.degree,
          credentialCategory: 'diploma',
          dateCreated: '2022',
          recognizedBy: {
            '@type': 'EducationalOrganization',
            name: diploma.school,
          },
        },
      ],
      hasOccupation: {
        '@type': 'Occupation',
        name: personal.title,
        occupationLocation: { '@type': 'City', name: 'London' },
        description: `Builds web, mobile and full-stack products with ${personal.headline}.`,
        skills: allSkills.join(', '),
      },
      worksFor: current
        ? [
            {
              '@type': 'OrganizationRole',
              roleName: current.role,
              startDate: current.start,
              memberOf: {
                '@type': 'Organization',
                '@id': `${SITE_URL}/#org-current`,
                name: current.company,
                url: `https://${current.domain}`,
              },
            },
          ]
        : [],
      knowsAbout: allSkills,
      award: [`${degree.degree}, ${degree.grade} - ${degree.school}, ${degree.year}`],
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
      name: `${personal.name} - ${personal.title}`,
      description:
        `Portfolio of ${personal.name}, ${personal.title} based in London, UK.`,
      author: { '@id': `${SITE_URL}/#person` },
      publisher: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      copyrightYear: new Date().getFullYear(),
      about: { '@id': `${SITE_URL}/#person` },
    },
    {
      '@type': 'WebPage',
      '@id': `${SITE_URL}/#webpage`,
      url: SITE_URL,
      name: `${personal.name} - ${personal.title}, London`,
      description: personDescription,
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
        `${SITE_URL}/cv`,
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
                'End-to-end products with Node.js, Fastify, PostgreSQL, Redis and REST APIs.',
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
            text: `${personal.name} is a ${personal.title} based in London, UK, with ${yearsLabel} of experience building web, mobile and full-stack products. He holds a ${degree.grade} ${degree.degree} from ${degree.school} and has worked for ${experience.map((e) => e.company).join(', ')}.`,
          },
        },
        {
          '@type': 'Question',
          name: 'What technologies does Ayodele Ayoola specialise in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `Ayodele specialises in ${personal.headline}, with PostgreSQL, PostGIS, Redis, MapLibre GL, Docker and GCP.`,
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
            text: 'Notable projects include the ScanSan property intelligence platform with Atlas 2D/3D maps and the Chrome and Firefox Property Assistant, the Onjeki property marketplace (co-founder and CTO), the RentSpace savings and lending app (5,000+ MAU, 4.8-star App Store rating), Vanguard News (5M+ monthly users), the Dowell Research UX platform (500+ enterprise clients), and open-source fixes merged into Remotion, freeCodeCamp and django CMS.',
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
            text: `Ayodele holds a ${degree.degree} with ${degree.grade} from ${degree.school} (${degree.year}) and an ${diploma.degree} from ${diploma.school} (${diploma.year}).`,
          },
        },
        {
          '@type': 'Question',
          name: 'How many years of experience does Ayodele Ayoola have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: `${personal.name} has ${yearsLabel} of professional software experience, starting in ${careerStart.slice(0, 4)}, with roles spanning frontend, full-stack, mobile and technical leadership across PropTech, FinTech, media and research.`,
          },
        },
      ],
    },
    {
      '@type': 'ItemList',
      '@id': `${SITE_URL}/#nav`,
      name: 'Site Navigation',
      itemListElement: [
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
  return (
    <main className="col">
      <JsonLd data={graphSchema} />
      <HomeIntro />

      <section id="work" className="col-sec rise" style={{ ['--i' as string]: 1 }}>
        <SectionHeading aside={yearsLabel}>Work</SectionHeading>
        <CareerTimeline style={{ margin: '0 0 28px' }} />
        <ExperienceList />
      </section>

      <section id="projects" className="col-sec rise" style={{ ['--i' as string]: 2 }}>
        <SectionHeading aside={`${projects.length} projects`}>Projects</SectionHeading>
        <ProjectGroups />
      </section>

      <section id="open-source" className="col-sec">
        <SectionHeading>Open source</SectionHeading>
        <OpenSourceList />
      </section>

      <GitHubSection />
      <ContactSection />
      <FooterSection />
    </main>
  );
}
