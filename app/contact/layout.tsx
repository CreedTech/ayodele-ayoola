import type { Metadata } from 'next';
import JsonLd from '@/components/JsonLd';

export const metadata: Metadata = {
  title: 'Contact - Hire Ayodele Ayoola | Software Developer London',
  description:
    'Get in touch with Ayodele Ayoola, Software Developer based in London. Available for senior roles, freelance projects, and technical consulting. Email: ayodeleayoolaoke4@gmail.com',
  alternates: { canonical: 'https://www.ayodeleayoola.com/contact' },
  openGraph: {
    title: 'Contact Ayodele Ayoola - Hire a Software Developer',
    description:
      'Available for senior engineering roles, freelance projects, and consulting. London-based, working globally.',
    url: 'https://www.ayodeleayoola.com/contact',
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
      name: 'Contact',
      item: 'https://www.ayodeleayoola.com/contact',
    },
  ],
};

const contactPageSchema = {
  '@context': 'https://schema.org',
  '@type': 'ContactPage',
  '@id': 'https://www.ayodeleayoola.com/contact#contactpage',
  name: 'Contact Ayodele Ayoola',
  url: 'https://www.ayodeleayoola.com/contact',
  description:
    'Contact page for Ayodele Ayoola, Software Developer based in London, UK.',
  mainEntity: {
    '@type': 'Person',
    '@id': 'https://www.ayodeleayoola.com/#person',
    name: 'Ayodele Ayoola',
    email: 'ayodeleayoolaoke4@gmail.com',
    telephone: '+447551113208',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'professional inquiries',
      email: 'ayodeleayoolaoke4@gmail.com',
      availableLanguage: 'English',
      areaServed: ['GB', 'US', 'EU'],
    },
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <JsonLd data={breadcrumbSchema} />
      <JsonLd data={contactPageSchema} />
      {children}
    </>
  );
}
