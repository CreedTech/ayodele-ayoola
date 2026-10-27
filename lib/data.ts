export const SITE_URL = 'https://ayodeleayoola.com';

export const CV_PDF_URL = '/Ayodele_Ayoola_CV.pdf';
export const PORTRAIT_SOURCE_URL =
  'https://res.cloudinary.com/dkrutkbjs/image/upload/v1776971862/IMG_6578_zhrvod.jpg';
export const PORTRAIT_URL = '/portrait.png';
export const CV_PAGE_URL = '/cv';

export const personal = {
  name: 'Ayodele Ayoola',
  short: 'AYOOLA',
  initials: 'AO',
  title: 'Software Engineer',
  headline: 'React, Next.js, TypeScript, Node.js, Flutter & React Native',
  location: 'London, United Kingdom',
  email: 'ayodeleayoolaoke4@gmail.com',
  phone: '+447551113208',
  phoneDisplay: '+44 7551 113208',
  linkedin: 'linkedin.com/in/ayodele-ayoola',
  github: 'github.com/creedtech',
  twitterHandle: '@lazy_programma',
  summary:
    'Software engineer with First-Class Honours, combining frontend, backend and cross-platform mobile development with hands-on architecture and technical leadership. Delivers accessible interfaces, APIs and data-intensive products using React, Next.js, TypeScript, Node.js, Fastify, Flutter and React Native. Experience includes payment and authentication systems, real-time workflows, geospatial visualisation, LLM-powered features and AI agents. Takes ownership from requirements and database design through automated testing, cloud deployment and observability. Leads code reviews, mentors engineers and contributes merged open-source fixes.',
};

type Experience = {
  role: string;
  company: string;
  location: string;
  start: string;
  end?: string;
  stack: string[];
  desc: string;
  highlights: string[];
  logo: string;
  logoUrl: string;
  logoColor: string;
  domain: string;
};

export const experience: Experience[] = [
  {
    role: 'Senior Frontend Engineer',
    company: 'ScanSan Properties',
    location: 'London, UK',
    start: '2025-06',
    stack: ['React', 'Next.js', 'TypeScript', 'TanStack Query/Table', 'MapLibre GL', 'PostGIS', 'WebGL', 'Three.js'],
    desc:
      'Builds subscription-gated property intelligence across valuations, planning, investment analysis, reporting and tokenisation. Shipped Atlas 2D/3D maps, the Chrome and Firefox Property Assistant, and a shared TanStack DataTable that replaced 20+ legacy tables. Cut new-feature development time 25% through reusable UI architecture, and parallelised CI so checks run in under 2 minutes instead of 7-15.',
    highlights: [
      'Built subscription-gated property intelligence across valuations, planning, investment analysis, reporting and tokenisation. Shipped Atlas 2D/3D maps with spatial overlays, clustering, reverse geocoding and point-in-polygon queries.',
      'Implemented React/Next.js workflows for property tokenisation, including utility-token declarations, asset-review gates and wallet-signed deployment designed around FCA cryptoasset perimeter guidance.',
      'Published the Chrome and Firefox Property Assistant, bringing planning and property context into Rightmove and Zoopla listings.',
      'Consolidated 20+ legacy tables into reusable TanStack DataTable and analytics patterns. Built property-advisor and underwriting journeys with weighted scoring, stress tests and contextual data.',
      'Parallelised CI quality jobs, reducing deployment/check time from roughly 7-15 minutes to 1 minute 20 seconds-2 minutes and improving code-to-release time by 40-50%. Added runtime configuration so approved public settings could change without rebuilding the image.',
      'Built crawlable public listing/area pages, dynamic sitemaps, canonical URLs and structured data. Google Analytics recorded growth from 50 to 1,300 viewers during the tracked period.',
      'Assisted data engineering on planning applications, noise, radon and house-price datasets, with address matching and council polygon acquisition; fixed a Next.js vulnerability and added preventative dependency-age and CI install-script controls.',
    ],
    logo: 'SS',
    logoUrl: 'https://static.wixstatic.com/media/d1ac02_fb90f30d1cc445efbee8efb1e79bd24e%7Emv2.png',
    logoColor: '#1a3a1a',
    domain: 'scansanproperties.com',
  },
  {
    role: 'Software Development Lead',
    company: 'RentSpace Technologies',
    location: 'Remote, Nigeria',
    start: '2023-11',
    end: '2025-05',
    stack: ['Flutter', 'React', 'Next.js', 'TypeScript', 'Node.js', 'GCP', 'Storybook', 'Paystack', 'Flutterwave'],
    desc:
      'Rebuilt the platform across web, backend and mobile in under a month, then led code review, mentoring and delivery for savings, lending, KYC and payment flows. The app reached 5,000+ monthly active users and a 4.8 App Store rating. Transactions ran 40% faster, payment rework lifted checkout success 30%, and automated KYC cut drop-off 35%. Built the Storybook library and GCP deployment system, and interviewed and onboarded seven engineers and designers.',
    highlights: [
      'Built mobile and web flows for onboarding, savings, lending, KYC, payments and financial dashboards; led code review, mentoring and delivery, establishing engineering standards across a multidisciplinary team.',
      'Reworked payment flows blocked by OTP and polling with idempotent handling and webhook confirmation. A company dashboard recorded 30% better checkout success after the changes.',
      'Automated KYC checks and routed exceptions to human review; integrated credit scoring and document verification. The dashboard recorded 35% less KYC drop-off and approval time shorter by up to two days.',
      'Built a Storybook component library, improved API integration and mobile release workflows with Shorebird, and built the GCP deployment system. The company reported 45% faster feature builds.',
      'Interviewed and onboarded two backend, three frontend and two design colleagues; supported roughly 7-8 people. Advised partner engineers on API concurrency, sessions and JWT design; joined the on-call rota.',
    ],
    logo: 'RT',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/rentspace_logo_emqkro.png',
    logoColor: '#1a1a3a',
    domain: 'rentspace.tech',
  },
  {
    role: 'Software Developer',
    company: 'Dowell Research UK',
    location: 'Remote, UK (contract)',
    start: '2023-08',
    end: '2024-09',
    stack: ['React', 'TypeScript', 'Django', 'Stripe', 'PayPal', 'Jest', 'Cypress', 'React Testing Library'],
    desc:
      'Built multi-user UX research workflows for a platform serving 500+ enterprise clients, across session identity, navigation and international subscriptions, with Stripe and PayPal payments and supporting Django services. Authored 31 public pull requests to Dowell Scale Function.',
    highlights: [
      'Built multi-user UX-research workflows across session identity, navigation and payments, including responsive interfaces and international subscription states. Integrated Stripe and PayPal, and supported Django services where frontend workflows depended on them.',
      'Authored 31 public pull requests to Dowell Scale Function, covering session-ID routing, mixed-content fixes, product functionality and integration reliability.',
    ],
    logo: 'DR',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/dowell_logo_a61jso.jpg',
    logoColor: '#2a1a2a',
    domain: 'dowellresearch.uk',
  },
  {
    role: 'Full Stack Engineer',
    company: 'Vanguard Media Limited',
    location: 'Nigeria',
    start: '2022-12',
    end: '2023-08',
    stack: ['React', 'React Native', 'TypeScript', 'Node.js', 'WordPress/PHP', 'Flutter'],
    desc:
      'Shipped reader-facing web and mobile features for Vanguard News, which has 5M+ monthly active users. Replaced direct wp-json calls with a deployed backend that cut API load 35%, and repaired ad tracking and page speed while mobile ad revenue rose 120%.',
    highlights: [
      'Delivered reader-facing web and mobile features for Vanguard News, a platform with 5 million+ monthly active users. Replaced unreliable direct wp-json use with a deployed backend and fixed high-cost endpoints; the company dashboard recorded 35% lower API load.',
      'Worked with editorial and media teams on advertiser-facing placements, repaired mobile analytics and ad tracking, and improved Largest Contentful Paint, image delivery and SEO. Contributed to Flutter alongside React Native; the dashboard recorded 120% higher mobile ad revenue during this work.',
    ],
    logo: 'VM',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/vanguardlogo_egkk3q.png',
    logoColor: '#3a1a1a',
    domain: 'vanguardngr.com',
  },
  {
    role: 'Frontend Mobile Developer',
    company: 'Fudap Co',
    location: 'Remote (contract)',
    start: '2022-11',
    end: '2023-04',
    stack: ['React Native', 'Redux', 'Maps', 'Delivery APIs', 'Payments'],
    desc:
      'Built food ordering and delivery-request flows in React Native with map pickup, API-returned fees and payment handoff. Moving startup fetches to the background made startup 60% faster; GPS tracking, push and loyalty flows lifted repeat orders 25%.',
    highlights: [
      'Built food-delivery ordering and delivery-request flows, including pickup/destination selection, map markers and sender/recipient details, using Redux coordinate state, API-returned fees and request IDs, and payment-link handoff.',
      'Moved nonessential startup fetches to background/on-demand work and cached default user data; the company dashboard recorded 60% faster startup. Built GPS tracking, in-app payment handoff, push notifications and loyalty flows; the dashboard recorded 25% more repeat orders during the period.',
    ],
    logo: 'FC',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/fudap_logo_zm6jb3.png',
    logoColor: '#2a2a1a',
    domain: '',
  },
];

const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

function formatMonth(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  return `${MONTHS[m - 1]} ${y}`;
}

export const slug = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, '-');

export const displayYear = (year?: string) => (year && Number(year) > 2022 ? year : undefined);

export function formatPeriod(start: string, end?: string) {
  return `${formatMonth(start)} - ${end ? formatMonth(end) : 'Present'}`;
}

export const careerStart = experience.reduce(
  (earliest, e) => (e.start < earliest ? e.start : earliest),
  experience[0].start,
);

function yearsSince(ym: string) {
  const [y, m] = ym.split('-').map(Number);
  const now = new Date();
  const months = (now.getFullYear() - y) * 12 + (now.getMonth() + 1 - m);
  return Math.round(months / 12);
}

export const yearsExperience = yearsSince(careerStart);
export const yearsLabel = `${yearsExperience} years`;

export const education = [
  {
    school: 'Middlesex University London',
    degree: 'BSc (Hons) IT & Business Information Systems',
    grade: 'First-Class Honours',
    year: '2025',
  },
  {
    school: 'Aptech',
    degree: 'Advanced Diploma in Software Engineering (ADSE)',
    grade: '',
    year: '2020 - 2022',
  },
];

type Project = {
  title: string;
  desc: string;
  tags: string[];
  year?: string;
  href: string;
  links?: { label: string; href: string }[];
  role?: string;
  cv?: boolean;
  featured: boolean;
  company: string;
  logo: string;
  logoUrl: string;
  logoColor: string;
};

const projectList: Project[] = [
  {
    title: 'PAA - Property Analysis Assistant',
    desc: 'Subscription-gated property intelligence across valuations, planning, investment analysis, reporting and tokenisation, with Atlas 2D/3D maps, spatial overlays, clustering and point-in-polygon queries.',
    tags: ['Next.js', 'TypeScript', 'MapLibre GL', 'PostGIS', 'WebGL', 'TanStack'],
    year: '2026',
    href: 'https://paa.scansanproperties.com',
    featured: true,
    company: 'ScanSan Properties',
    logo: 'SS',
    logoUrl: 'https://static.wixstatic.com/media/d1ac02_fb90f30d1cc445efbee8efb1e79bd24e%7Emv2.png',
    logoColor: '#1a3a1a',
  },
  {
    title: 'ScanSan Property Assistant',
    desc: 'Chrome and Firefox extension that brings planning and property context into Rightmove and Zoopla listings.',
    tags: ['React', 'TypeScript', 'Browser Extension'],
    year: '2026',
    href: 'https://chromewebstore.google.com/detail/scansan-property-assistan/makigdomcnfjklokllmkachmemmbepfo',
    links: [
      { label: 'Chrome', href: 'https://chromewebstore.google.com/detail/scansan-property-assistan/makigdomcnfjklokllmkachmemmbepfo' },
      { label: 'Firefox', href: 'https://addons.mozilla.org/en-US/firefox/addon/scansan-property-assistant/' },
    ],
    featured: true,
    company: 'ScanSan Properties',
    logo: 'SE',
    logoUrl: 'https://static.wixstatic.com/media/d1ac02_fb90f30d1cc445efbee8efb1e79bd24e%7Emv2.png',
    logoColor: '#1a3a1a',
  },
  {
    title: 'Kipzu',
    role: 'Gamified learning app',
    desc: 'A gamified learning app: a world of skills, where every small attempt helps you grow. Learners work through short interactive lessons with choices, matching, ordering and numeric checks in a Flutter app, backed by a Node.js and PostgreSQL API, with AI-drafted skills reviewed before they are published.',
    tags: ['Flutter', 'Riverpod', 'Node.js', 'PostgreSQL', 'AI'],
    href: '',
    featured: true,
    company: 'Kipzu',
    logo: 'KZ',
    logoUrl: '/logos/kipzu.png',
    logoColor: '#1f2937',
  },
  {
    title: 'AwaAgent',
    role: 'Rental platform',
    desc: 'Web app for finding, listing and renting property. Tenants, agents, landlords and admins share one platform for listings, inspection booking with visit codes, controlled address disclosure, identity review and payments, with direct Cloudflare R2 uploads for listing and identity media.',
    tags: ['Next.js', 'Express', 'PostgreSQL', 'Cloudflare R2'],
    href: 'https://awaagent.ng/',
    cv: true,
    featured: true,
    company: 'AwaAgent',
    logo: 'AA',
    logoUrl: '/logos/awaagent.svg',
    logoColor: '#1f2937',
  },
  {
    title: 'Onjeki',
    role: 'Co-Founder and CTO',
    desc: 'Flutter and Node.js property marketplace where hosts list homes and customers book short stays or explore rentals and sales. Owned onboarding, discovery, availability, checkout, payouts, reviews and subscriptions; led two developers. Socket.IO messaging, Redis/BullMQ jobs, blue-green deploys on Hetzner, and AI workflows with OpenRouter, LangChain and LangSmith.',
    tags: ['Flutter', 'Node.js', 'PostgreSQL', 'Redis', 'Socket.IO', 'Docker', 'AI'],
    href: 'https://onjeki.com',
    links: [
      { label: 'iOS', href: 'https://apps.apple.com/ca/app/onjeki/id6767225936' },
      { label: 'Android', href: 'https://play.google.com/store/apps/details?id=com.onjeki.app' },
      { label: 'Site', href: 'https://onjeki.com' },
    ],
    cv: true,
    featured: true,
    company: 'Onjeki',
    logo: 'ON',
    logoUrl: '/logos/onjeki.png',
    logoColor: '#1f2937',
  },
  {
    title: 'RentSpace Platform',
    desc: 'PropTech and FinTech platform with savings, lending, KYC, payments and financial dashboards across web and mobile. Rebuilt in under a month; 5,000+ monthly active users.',
    tags: ['Next.js', 'Flutter', 'Node.js', 'GCP', 'Storybook', 'Paystack'],
    year: '2025',
    href: 'https://rentspace.tech',
    featured: true,
    company: 'RentSpace Technologies',
    logo: 'RT',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/rentspace_logo_emqkro.png',
    logoColor: '#1a1a3a',
  },
  {
    title: 'Croft Group',
    role: 'Farm Management Platform',
    desc: 'Farm-management workflows spanning flock, inventory, health, production, sales and reporting, with forecasting and anomaly detection planned around production and stock data.',
    tags: ['Flutter', 'React', 'Express', 'PostgreSQL'],
    href: 'https://croftgroup.farm/',
    cv: true,
    featured: true,
    company: 'Croft Group',
    logo: 'CG',
    logoUrl: '/logos/croft.svg',
    logoColor: '#1f2937',
  },
  {
    title: 'DelacoTech Limited',
    role: 'Founder and CEO',
    desc: 'Technology business delivering client web and mobile products across property, commerce and services. Leads scoping, architecture, code review, releases and handover; manages three developers while staying hands-on.',
    tags: ['React', 'Next.js', 'Flutter', 'Node.js'],
    href: 'https://www.delaco.net/',
    cv: true,
    featured: true,
    company: 'DelacoTech Limited',
    logo: 'DT',
    logoUrl: '/logos/delacotech.png',
    logoColor: '#1f2937',
  },
  {
    title: 'Meh Tracker',
    role: 'Open-Source Job Platform',
    desc: 'Job-search workflows with Next.js, Supabase PostgreSQL/Auth/Storage/Realtime, Drizzle and a Supabase Edge Function that checks listing availability. Contributed responsive product work, OpenRouter integration and PDF fixes.',
    tags: ['Next.js', 'Supabase', 'PostgreSQL', 'Drizzle', 'AI'],
    href: 'https://github.com/git-meh/meh-tracker',
    cv: true,
    featured: true,
    company: 'Open Source',
    logo: 'MT',
    logoUrl: '',
    logoColor: '#1f2937',
  },
  {
    title: 'ReqParser',
    role: 'Open-Source Developer Tool',
    desc: 'TypeScript CLI that turns copied fetch and cURL requests into reusable axios, fetch, cURL or JSON output, with validation and sensitive-header redaction.',
    tags: ['TypeScript', 'Node.js', 'CLI'],
    href: 'https://github.com/CreedTech/reqparser',
    cv: true,
    featured: true,
    company: 'Open Source',
    logo: 'RP',
    logoUrl: '',
    logoColor: '#1f2937',
  },
  {
    title: 'RivalRing',
    role: 'Open-Source Team Lead',
    desc: 'Led frontend and mobile contributors across a 36-person community, guiding RFCs, reviews and mentoring.',
    tags: ['React', 'Flutter'],
    href: '',
    cv: true,
    featured: true,
    company: 'Open Source',
    logo: 'RR',
    logoUrl: '',
    logoColor: '#1f2937',
  },
  {
    title: 'Nowon Security',
    role: 'Client Platform',
    desc: 'Security-firm web product with Django/SQL backend integration.',
    tags: ['Django', 'Bootstrap'],
    year: '2021',
    href: 'https://now-on.vercel.app/',
    cv: true,
    featured: true,
    company: 'Nowon Security',
    logo: 'NS',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777032441/now_on_third_new_logo2026_kzlois.jpg',
    logoColor: '#111827',
  },
  {
    title: 'SwiftVista',
    role: 'Utility Payments',
    desc: 'Flutter payment journeys for airtime, data, bills and subscriptions, with tailored receipts and page transitions.',
    tags: ['Flutter', 'Node.js', 'MongoDB', 'Express'],
    year: '2025',
    href: 'https://swiftwave.vercel.app/',
    cv: true,
    featured: true,
    company: 'SwiftVista',
    logo: 'SW',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031796/Swiftvista.7ce5aee9_ia2mdr.png',
    logoColor: '#0f172a',
  },
  {
    title: "Dammy's Kitchen",
    role: 'Food Ordering',
    desc: 'Customer ordering and delivery flows with real-time order updates for a live food-service product in London.',
    tags: ['React', 'Node.js', 'Stripe', 'Express', 'MongoDB'],
    year: '2026',
    href: 'https://www.dammyskitchen.co.uk/',
    cv: true,
    featured: true,
    company: "Dammy's Kitchen",
    logo: 'FD',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031913/logo-Cjjg64Ai_ezz7ug.png',
    logoColor: '#7c2d12',
  },
  {
    title: 'SafetyBox Redesign',
    role: 'Accessible Interface',
    desc: 'Responsive interfaces built from design work, with Storybook and axe-core used to review components and accessibility behaviour.',
    tags: ['React', 'Storybook', 'axe-core'],
    href: 'https://safetybox-redesign.web.app/',
    cv: true,
    featured: true,
    company: 'SafetyBox',
    logo: 'SB',
    logoUrl: '/logos/safetybox.png',
    logoColor: '#1f2937',
  },
  {
    title: 'DBlackRose',
    role: 'Commerce and Media',
    desc: 'Photography-equipment storefront with a media gallery and role-based catalogue and content administration.',
    tags: ['React', 'Commerce'],
    href: 'https://www.dblackrose.com/',
    cv: true,
    featured: true,
    company: 'DBlackRose',
    logo: 'DB',
    logoUrl: '/logos/dblackrose.png',
    logoColor: '#1f2937',
  },
  {
    title: 'PalmeFoods',
    role: 'Digital Storefront',
    desc: 'Customer ordering alongside staff inventory and fulfilment workflows that connect the storefront to daily operations.',
    tags: ['React', 'Commerce'],
    href: 'https://www.palmefoods.com/',
    cv: true,
    featured: true,
    company: 'PalmeFoods',
    logo: 'PF',
    logoUrl: '/logos/palmefoods.png',
    logoColor: '#1f2937',
  },
  {
    title: 'Oke Jacobs',
    role: 'Photography Portfolio',
    desc: 'Responsive photography portfolio presenting galleries, services and client enquiries.',
    tags: ['React'],
    href: 'https://www.okejacobs.online/',
    cv: true,
    featured: true,
    company: 'Oke Jacobs',
    logo: 'OJ',
    logoUrl: '/logos/okejacobs.png',
    logoColor: '#1f2937',
  },
  {
    title: 'CESPORA',
    role: 'Construction Portfolio',
    desc: 'Construction company site presenting civil engineering services, completed work and enquiry paths.',
    tags: ['React'],
    href: 'https://www.cespora.com/',
    cv: true,
    featured: true,
    company: 'CESPORA',
    logo: 'CE',
    logoUrl: '/logos/cespora.png',
    logoColor: '#1f2937',
  },
  {
    title: 'Vanguard Media Platform',
    desc: 'Reader-facing web and mobile features for Vanguard News, a platform with 5M+ monthly active users.',
    tags: ['React', 'React Native', 'Node.js', 'WordPress', 'PHP'],
    year: '2023',
    href: 'https://vanguardngr.com',
    featured: true,
    company: 'Vanguard Media',
    logo: 'VM',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/vanguardlogo_egkk3q.png',
    logoColor: '#3a1a1a',
  },
  {
    title: 'Rentspace Mobile App',
    desc: 'Cross-platform savings and lending mobile application with KYC and payments integration. 5,000+ monthly active users and a 4.8 App Store rating.',
    tags: ['Flutter', 'Node.js'],
    year: '2025',
    href: 'https://play.google.com/store/apps/details?id=com.rentspace.app.android&pcampaignid=web_share',
    featured: true,
    company: 'RentSpace',
    logo: 'RT',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/rentspace_logo_emqkro.png',
    logoColor: '#1a1a3a',
  },
  {
    title: 'Vanguard Mobile App',
    desc: 'News application for reading and saving articles.',
    tags: ['Flutter', 'React Native', 'REST API'],
    year: '2023',
    href: '',
    featured: true,
    company: 'Vanguard Media',
    logo: 'VM',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/vanguardlogo_egkk3q.png',
    logoColor: '#3a1a1a',
  },
  {
    title: 'Dowell Research Platform (UX Living Labs)',
    desc: 'Multi-user UX research platform for 500+ enterprise clients, with international subscriptions and Stripe and PayPal payments.',
    tags: ['React', 'Django', 'Stripe', 'PayPal'],
    year: '2024',
    href: 'https://dowellresearch.uk',
    featured: true,
    company: 'Dowell Research',
    logo: 'DR',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777031534/dowell_logo_a61jso.jpg',
    logoColor: '#2a1a2a',
  },
  {
    title: 'Zummit Africa Platform',
    desc: 'AI learning and API marketplace platform for developers. Reduced load time 68% through lazy loading and code splitting.',
    tags: ['React', 'TypeScript', 'MUI'],
    year: '2022',
    href: 'https://zummitafrica.com',
    featured: true,
    company: 'Zummit Africa',
    logo: 'ZA',
    logoUrl: 'https://zummitafrica.com/meta/apple-touch-icon.png',
    logoColor: '#1a2a2a',
  },
  {
    title: 'Nurika Health App',
    desc: 'Fitness and crypto rewards app combining wellness with incentives.',
    tags: ['Flutter', 'Dart'],
    year: '2024',
    href: 'https://github.com/CreedTech/nurika_mobile',
    featured: true,
    company: 'Nurika',
    logo: 'NH',
    logoUrl: 'https://res.cloudinary.com/dkrutkbjs/image/upload/v1777032829/splash_logo_fxrqet.png',
    logoColor: '#065f46',
  },
];

export const projects = projectList.map((p, i) => ({
  ...p,
  num: String(i + 1).padStart(2, '0'),
}));

export const openSource: { name: string; href: string; desc: string; stars?: string }[] = [
  { name: 'Remotion', stars: '65k+', href: 'https://github.com/remotion-dev/remotion/pull/11584', desc: 'Studio fix for folder labels and typeahead in the New Composition dialog.' },
  { name: 'FCaptcha', href: 'https://github.com/WebDecoy/FCaptcha/pull/131', desc: 'Runnable Next.js App Router form and token-verification example, with replay and wrong-host regression tests.' },
  { name: 'sysknife', href: 'https://github.com/lacs-project/sysknife/pull/610', desc: 'Setup fix preserving hand-edited approval guards on reruns, with a regression test that failed before the change.' },
  { name: 'freeCodeCamp', stars: '457k+', href: 'https://github.com/freeCodeCamp/freeCodeCamp/pull/70716', desc: 'Two curriculum fixes covering JavaScript ledger serialization helpers and Python workshop recall.' },
  { name: 'OpsiMate', href: 'https://github.com/OpsiMate/OpsiMate/pull/1186', desc: 'Shared action-matcher type fix that accepts existing action-name criteria without changing runtime behaviour.' },
  { name: 'DevImpact', href: 'https://github.com/O2sa/DevImpact/pull/244', desc: "Accessible labels for icon-only comparison controls using the product's existing translations." },
  { name: 'Tabularis', href: 'https://github.com/TabularisDB/tabularis/pull/1077', desc: 'Database-explorer feature to copy plain, quoted and schema-qualified table or view names.' },
  { name: 'django CMS', href: 'https://github.com/django-cms/djangocms-admin-style/pull/560', desc: 'Admin-style fix keeping autocomplete search fields inline in multiple-select forms.' },
  { name: 'Sidequest', href: 'https://github.com/sidequestjs/sidequest/pull/229', desc: 'Configurable dashboard polling, including a setting to disable automatic refresh.' },
  { name: 'HeyGen Hyperframes', href: 'https://github.com/heygen-com/hyperframes/pull/5563', desc: 'Audio-mixing fix that pads the combined output once instead of every clip.' },
  { name: 'Open Glassbeetle', href: 'https://github.com/Open-Glassbeetle/glassbeetle/pull/155', desc: 'Documentation index linking eight guides, including the semantic-memory proposal.' },
  { name: 'Avenx', href: 'https://github.com/Avenx-JS/avenx-js/pull/1492', desc: 'Dynamic-components guide with a tested switcher example and current rendering limitations.' },
  { name: 'Zummit Africa, Zapi-FE', href: 'https://github.com/Zummit-Africa-Inc/Zapi-FE/pulls?q=is:pr+is:merged+author:CreedTech', desc: '32 authored pull requests, 24 merged, across API tooling, dashboards, notifications, authentication and responsive marketplace work.' },
  { name: 'Independent upstream work', href: '', desc: '13 merged pull requests across 12 repositories, including product code, regression tests, accessibility and documentation.' },
];

export const stackCategories = [
  {
    label: 'Frontend',
    skills: ['React', 'Next.js', 'TypeScript', 'JavaScript', 'React Server Components', 'Server Actions', 'TanStack Query/Table', 'Zustand', 'Redux', 'Storybook', 'Tailwind CSS', 'Accessibility', 'Responsive UI'],
  },
  {
    label: 'Mobile',
    skills: ['Flutter', 'Dart', 'React Native', 'Riverpod', 'GetX', 'BLoC/Cubit', 'go_router', 'Deep links', 'Notifications', 'Offline caching', 'App releases'],
  },
  {
    label: 'Backend and data',
    skills: ['Node.js', 'Fastify', 'Express', 'REST APIs', 'PostgreSQL', 'PostGIS', 'Prisma', 'MongoDB', 'Redis', 'BullMQ', 'Socket.IO', 'Python/Django', 'Authentication', 'Payments and webhooks'],
  },
  {
    label: 'Maps and AI',
    skills: ['MapLibre GL', 'ArcGIS', 'WebGL', 'Three.js', 'OpenRouter', 'LangChain', 'LangSmith'],
  },
  {
    label: 'Cloud and delivery',
    skills: ['Cloudflare/R2', 'GCP', 'Docker', 'GitHub Actions', 'Grafana', 'Prometheus', 'Loki'],
  },
  {
    label: 'Testing',
    skills: ['Jest', 'Cypress', 'Playwright', 'React Testing Library', 'axe-core'],
  },
  {
    label: 'Payments',
    skills: ['Stripe', 'PayPal', 'Paystack', 'Flutterwave'],
  },
];

export const allSkills = stackCategories.flatMap((c) => c.skills);

export const socials = [
  { label: 'GitHub', href: 'https://github.com/creedtech', icon: 'github' },
  { label: 'LinkedIn', href: 'https://linkedin.com/in/ayodele-ayoola', icon: 'linkedin' },
  { label: 'Twitter / X', href: 'https://twitter.com/lazy_programma', icon: 'twitter' },
];

export const GITHUB_USERNAME = 'creedtech';
