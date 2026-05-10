import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';
import Breadcrumb from '@/components/Breadcrumb';

export const metadata: Metadata = {
  title: 'Contact - Hire Ayodele Ayoola | Software Developer London',
  description:
    'Get in touch with Ayodele Ayoola, Software Developer based in London. Available for software development roles, freelance projects, and technical consulting. Email: ayodeleayoolaoke4@gmail.com',
  alternates: { canonical: 'https://ayodeleayoola.com/contact' },
  openGraph: {
    title: 'Contact Ayodele Ayoola - Hire a Software Developer',
    description:
      'Available for engineering roles, freelance projects, and consulting. London-based, working globally across the UK, Europe, and North America.',
    url: 'https://ayodeleayoola.com/contact',
  },
};

const SITE_URL = 'https://ayodeleayoola.com';

const contactGraph = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'BreadcrumbList',
      '@id': `${SITE_URL}/contact#breadcrumb`,
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Contact',
          item: `${SITE_URL}/contact`,
        },
      ],
    },
    {
      '@type': 'ContactPage',
      '@id': `${SITE_URL}/contact#page`,
      url: `${SITE_URL}/contact`,
      name: 'Contact Ayodele Ayoola - Hire a Software Developer',
      description:
        'Contact Ayodele Ayoola, Software Developer based in London, UK. Available for engineering roles, freelance projects, and technical consulting.',
      isPartOf: { '@id': `${SITE_URL}/#website` },
      author: { '@id': `${SITE_URL}/#person` },
      inLanguage: 'en-GB',
      breadcrumb: { '@id': `${SITE_URL}/contact#breadcrumb` },
      potentialAction: [
        {
          '@type': 'CommunicateAction',
          target: 'mailto:ayodeleayoolaoke4@gmail.com',
          name: 'Email Ayodele Ayoola',
        },
        {
          '@type': 'ViewAction',
          target: 'https://linkedin.com/in/ayodele-ayoola',
          name: 'Connect on LinkedIn',
        },
      ],
      mainEntity: {
        '@type': 'Person',
        '@id': `${SITE_URL}/#person`,
        name: 'Ayodele Ayoola',
        email: 'ayodeleayoolaoke4@gmail.com',
        telephone: '+447551113208',
        jobTitle: 'Software Developer',
        url: SITE_URL,
        contactPoint: {
          '@type': 'ContactPoint',
          contactType: 'professional inquiries',
          email: 'ayodeleayoolaoke4@gmail.com',
          availableLanguage: 'English',
          areaServed: ['GB', 'US', 'EU'],
          hoursAvailable: {
            '@type': 'OpeningHoursSpecification',
            dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
            opens: '09:00',
            closes: '18:00',
          },
        },
        seeks: {
          '@type': 'Demand',
          name: 'Software Developer opportunities',
          description:
            'Ayodele Ayoola is actively seeking software development roles, freelance projects, and technical consulting engagements in London and remotely.',
          eligibleRegion: [
            { '@type': 'Country', name: 'United Kingdom' },
            { '@type': 'Country', name: 'United States' },
            { '@type': 'AdministrativeArea', name: 'Europe' },
          ],
        },
      },
    },
  ],
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={contactGraph} />
      <Breadcrumb
        items={[{ label: 'Home', href: '/' }, { label: 'Contact' }]}
      />
      {children}
    </>
  );
}
