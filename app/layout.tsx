import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import NavStatic from '@/components/NavStatic';
import GlobalShell from '@/components/GlobalShell';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  weight: ['300', '400', '500'],
});

const SITE_URL = 'https://ayodeleayoola.com';
const FULL_NAME = 'Ayodele Ayoola';
const TITLE = 'Ayodele Ayoola - Software Developer, London';
const DESCRIPTION =
  'Software Developer with 6+ years building high-performance web, mobile, and full-stack applications. React, Next.js, TypeScript, Flutter expert based in London, UK. First Class Honours, Middlesex University.';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: TITLE,
    template: `%s - ${FULL_NAME}`,
  },
  description: DESCRIPTION,
  keywords: [
    'Ayodele Ayoola',
    'Software Developer London',
    'Frontend Engineer London',
    'React Developer London',
    'Next.js Developer',
    'TypeScript Engineer',
    'Full Stack Developer London',
    'Flutter Developer',
    'Software Engineer for hire',
    'React Next.js TypeScript developer',
    'Web3 developer',
    'Node.js developer London',
    'UI Engineer',
    'Performance engineer',
    'GSAP animation developer',
    'Three.js developer',
    'hire software engineer London',
    'freelance developer London',
    'RentSpace',
    'ScanSan',
    'Vanguard Media developer',
    'Middlesex University Computer Science',
  ],
  authors: [{ name: FULL_NAME, url: SITE_URL }],
  creator: FULL_NAME,
  publisher: FULL_NAME,
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: SITE_URL,
  },
  openGraph: {
    type: 'website',
    locale: 'en_GB',
    url: SITE_URL,
    siteName: `${FULL_NAME} - Portfolio`,
    title: TITLE,
    description: DESCRIPTION,
    images: [
      {
        url: `${SITE_URL}/og-image.JPG`,
        width: 1200,
        height: 630,
        alt: `${FULL_NAME} - Software Developer`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: TITLE,
    description: DESCRIPTION,
    creator: '@ayodeleayoola',
    images: [`${SITE_URL}/og-image.JPG`],
  },
  icons: {
    icon: [
      { url: '/favicon.ico', sizes: 'any' },
      { url: '/favicon.ico', type: 'image/x-icon' },
    ],
    shortcut: '/favicon.ico',
    apple: '/favicon.ico',
  },
  manifest: '/site.webmanifest',
  verification: {
    google: 'REPLACE_WITH_GOOGLE_VERIFICATION_CODE',
  },
  category: 'technology',
  classification: 'Software Engineering Portfolio',
  other: {
    'theme-color': '#0d0d0d',
    'color-scheme': 'dark',
    'msapplication-TileColor': '#0d0d0d',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={inter.variable}>
      <head>
        {/* Clash Display font — preconnect then load async to avoid render-blocking */}
        <link rel="preconnect" href="https://api.fontshare.com" crossOrigin="anonymous" />
        <link
          rel="preload"
          as="style"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
        />
        <link
          rel="stylesheet"
          href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap"
          media="print"
          onLoad={(e) => { (e.currentTarget as HTMLLinkElement).media = 'all'; }}
        />
        <noscript>
          <link rel="stylesheet" href="https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap" />
        </noscript>
        <link rel="canonical" href={SITE_URL} />
        <meta name="geo.region" content="GB-LND" />
        <meta name="geo.placename" content="London, United Kingdom" />
        <meta name="geo.position" content="51.5074;-0.1278" />
        <meta name="ICBM" content="51.5074, -0.1278" />
        <meta name="language" content="English" />
        <meta name="revisit-after" content="3 days" />
        <meta name="rating" content="general" />
        <meta property="profile:first_name" content="Ayodele" />
        <meta property="profile:last_name" content="Ayoola" />
        <link rel="me" href="https://linkedin.com/in/ayodele-ayoola" />
      </head>
      <body className="antialiased" suppressHydrationWarning>
        <NavStatic />
        {children}
        <GlobalShell />
      </body>
    </html>
  );
}
