import type { Metadata } from 'next';
import Breadcrumb from '@/components/Breadcrumb';
import { SITE_URL, personal, yearsLabel } from '@/lib/data';

export const metadata: Metadata = {
  title: `CV | ${personal.title}`,
  description: `CV of ${personal.name}, ${personal.title} in London with ${yearsLabel} of experience across ${personal.headline}.`,
  alternates: { canonical: `${SITE_URL}/cv` },
  openGraph: {
    title: `CV - ${personal.name}`,
    description: `${personal.title} in London. ${personal.headline}.`,
    url: `${SITE_URL}/cv`,
    type: 'profile',
  },
};

export default function CvLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <div className="cv-print-hide">
        <Breadcrumb items={[{ label: 'Home', href: '/' }, { label: 'CV' }]} />
      </div>
      {children}
    </>
  );
}
