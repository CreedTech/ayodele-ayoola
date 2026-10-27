import {
  CV_PAGE_URL,
  CV_PDF_URL,
  careerStart,
  education,
  experience,
  formatPeriod,
  openSource,
  personal,
  projects,
  slug,
  socials,
  stackCategories,
  yearsLabel,
} from '@/lib/data';

export type Tone = 'muted' | 'error' | 'ok' | 'strong';

export type Block =
  | { t: 'input'; text: string; path: string }
  | { t: 'text'; text: string; tone?: Tone }
  | { t: 'rows'; rows: { label: string; value: string; href?: string; copy?: string }[] }
  | { t: 'list'; items: ListItem[] }
  | { t: 'bars'; rows: { label: string; left: number; width: number; current: boolean; period: string }[]; years: { year: number; left: number }[] }
  | { t: 'gitlog'; oneline: boolean; commits: Commit[] }
  | { t: 'neofetch'; rows: { label: string; value: string }[] }
  | { t: 'matches'; query: string; items: { source: string; text: string; run: string }[] }
  | { t: 'chips'; label?: string; items: { label: string; run: string }[] }
  | { t: 'groups'; groups: { label: string; items: string[] }[] };

export type ListItem = { title: string; sub?: string; meta?: string; logo?: string; logoUrl?: string; run?: string };
export type Commit = { hash: string; ref?: string; date: string; message: string; body?: string };

export type Ctx = {
  path: string;
  history: string[];
  navigate: (path: string) => void;
  open: (url: string) => void;
  copy: (text: string) => void;
  clear: () => void;
  close: () => void;
};

type Command = {
  name: string;
  summary: string;
  usage?: string;
  hidden?: boolean;
  args?: () => string[];
  run: (args: string[], ctx: Ctx) => Block[];
};

const PAGES: Record<string, string> = { home: '/', '~': '/', about: '/about', projects: '/projects', stack: '/stack', cv: CV_PAGE_URL, contact: '/contact' };

const hash = (s: string) => {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

const socialHref = (icon: string) => socials.find((s) => s.icon === icon)?.href ?? '';

type Target = { label: string; href: string; kind: string };
const TARGETS: Record<string, Target> = {
  github: { label: 'GitHub', href: socialHref('github'), kind: 'profile' },
  linkedin: { label: 'LinkedIn', href: socialHref('linkedin'), kind: 'profile' },
  x: { label: 'X', href: socialHref('twitter'), kind: 'profile' },
  twitter: { label: 'X', href: socialHref('twitter'), kind: 'profile' },
  email: { label: personal.email, href: `mailto:${personal.email}`, kind: 'email' },
  cv: { label: 'CV (PDF)', href: CV_PDF_URL, kind: 'file' },
};
projects.forEach((p) => {
  if (p.href) TARGETS[slug(p.title)] ??= { label: p.title, href: p.href, kind: 'project' };
});
experience.forEach((e) => {
  if (e.domain) TARGETS[slug(e.company)] ??= { label: e.company, href: `https://${e.domain}`, kind: 'company' };
});
openSource.forEach((o) => {
  if (o.href) TARGETS[slug(o.name)] ??= { label: o.name, href: o.href, kind: 'open source' };
});

const COPYABLE: Record<string, string> = {
  email: personal.email,
  phone: personal.phone,
  github: socialHref('github'),
  linkedin: socialHref('linkedin'),
  x: socialHref('twitter'),
};

const lev = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++)
      d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};

const findProject = (q: string) => projects.find((p) => slug(p.title) === q || slug(p.company) === q);
const findRole = (q: string) => experience.find((e) => slug(e.company) === q || slug(e.company).startsWith(q));

const projectItems = (): ListItem[] =>
  projects.map((p) => ({
    title: p.title,
    sub: p.role ?? p.company,
    meta: p.tags.slice(0, 3).join(' · '),
    logo: p.logo,
    logoUrl: p.logoUrl,
    run: `cat ${slug(p.title)}`,
  }));

const experienceItems = (): ListItem[] =>
  experience.map((e) => ({
    title: e.role,
    sub: e.company,
    meta: formatPeriod(e.start, e.end),
    logo: e.logo,
    logoUrl: e.logoUrl,
    run: `cat ${slug(e.company)}`,
  }));

const COMMANDS: Command[] = [
  {
    name: 'help',
    summary: 'List every command',
    run: () => [
      {
        t: 'rows',
        rows: COMMANDS.filter((c) => !c.hidden).map((c) => ({ label: c.usage ?? c.name, value: c.summary })),
      },
      { t: 'text', text: 'Tab completes, ↑ ↓ walk history, Ctrl+L clears, Esc closes. Click anything underlined to run it.', tone: 'muted' },
    ],
  },
  {
    name: 'whoami',
    summary: 'Who this is',
    run: () => [
      { t: 'text', text: `${personal.name}, ${personal.title.toLowerCase()} in London.`, tone: 'strong' },
      { t: 'text', text: personal.summary, tone: 'muted' },
      { t: 'chips', label: 'Next', items: [{ label: 'neofetch', run: 'neofetch' }, { label: 'git log', run: 'git log' }, { label: 'ls projects', run: 'ls projects' }] },
    ],
  },
  {
    name: 'neofetch',
    summary: 'System info, but it is me',
    run: () => [
      {
        t: 'neofetch',
        rows: [
          { label: 'Role', value: experience[0] ? `${experience[0].role} @ ${experience[0].company}` : personal.title },
          { label: 'Uptime', value: `${yearsLabel} (since ${formatPeriod(careerStart).replace(' - Present', '')})` },
          { label: 'Shell', value: 'React · Next.js · TypeScript · Node.js · Flutter' },
          { label: 'Projects', value: `${projects.length} shipped` },
          { label: 'Open source', value: `${openSource.length} contributions` },
          { label: 'Packages', value: `${stackCategories.reduce((n, c) => n + c.skills.length, 0)} tools` },
          { label: 'Education', value: `${education[0].degree}, ${education[0].grade}` },
          { label: 'Location', value: 'London, United Kingdom' },
        ],
      },
    ],
  },
  {
    name: 'ls',
    usage: 'ls [projects|experience|open-source|pages]',
    summary: 'List things',
    args: () => ['projects', 'experience', 'open-source', 'pages'],
    run: ([what]) => {
      if (what === 'projects') return [{ t: 'list', items: projectItems() }];
      if (what === 'experience' || what === 'work') return [{ t: 'list', items: experienceItems() }];
      if (what === 'open-source' || what === 'oss')
        return [{ t: 'list', items: openSource.map((o) => ({ title: o.name, sub: o.desc, meta: o.stars ? `${o.stars} stars` : undefined, run: o.href ? `open ${slug(o.name)}` : undefined })) }];
      if (what === 'pages') return [{ t: 'chips', items: Object.keys(PAGES).filter((p) => p !== '~').map((p) => ({ label: `${p}/`, run: `cd ${p}` })) }];
      return [{ t: 'chips', items: ['projects', 'experience', 'open-source', 'pages'].map((d) => ({ label: `${d}/`, run: `ls ${d}` })) }];
    },
  },
  {
    name: 'cat',
    usage: 'cat <project|company>',
    summary: 'Read the details of one thing',
    args: () => [...projects.map((p) => slug(p.title)), ...experience.map((e) => slug(e.company))],
    run: ([q]) => {
      if (!q) return [{ t: 'text', text: 'cat: name something, for example cat onjeki', tone: 'error' }];
      const role = findRole(q);
      if (role)
        return [
          { t: 'list', items: [{ title: `${role.role} at ${role.company}`, sub: `${formatPeriod(role.start, role.end)} · ${role.location}`, logo: role.logo, logoUrl: role.logoUrl }] },
          ...role.highlights.map((h) => ({ t: 'text' as const, text: `• ${h}` })),
          { t: 'text', text: role.stack.join(', '), tone: 'muted' },
          ...(role.domain ? [{ t: 'chips' as const, items: [{ label: `open ${slug(role.company)}`, run: `open ${slug(role.company)}` }] }] : []),
        ];
      const p = findProject(q);
      if (p)
        return [
          { t: 'list', items: [{ title: p.title, sub: [p.role, p.company, p.year].filter(Boolean).join(' · '), logo: p.logo, logoUrl: p.logoUrl }] },
          { t: 'text', text: p.desc },
          { t: 'text', text: p.tags.join(', '), tone: 'muted' },
          ...(p.links?.length || p.href
            ? [{ t: 'chips' as const, items: (p.links ?? [{ label: 'Visit', href: p.href }]).map((l) => ({ label: `open ${l.label.toLowerCase()}`, run: `open ${l.href}` })) }]
            : []),
        ];
      return [{ t: 'text', text: `cat: ${q}: no such project or company. Try ls projects.`, tone: 'error' }];
    },
  },
  {
    name: 'open',
    usage: 'open <name|url>',
    summary: 'Open a project, company or profile',
    args: () => Object.keys(TARGETS),
    run: ([q], ctx) => {
      if (!q) return [{ t: 'chips', label: 'Open', items: ['github', 'linkedin', 'x', 'email', 'cv'].map((k) => ({ label: k, run: `open ${k}` })) }];
      if (/^(https?:|mailto:|\/)/.test(q)) {
        ctx.open(q);
        return [{ t: 'text', text: `Opening ${q}`, tone: 'ok' }];
      }
      const target = TARGETS[q];
      if (!target) return [{ t: 'text', text: `open: nothing called ${q}. Press Tab after "open " to see names.`, tone: 'error' }];
      ctx.open(target.href);
      return [{ t: 'text', text: `Opening ${target.label} (${target.kind})`, tone: 'ok' }];
    },
  },
  {
    name: 'cd',
    usage: 'cd <page>',
    summary: 'Move the site behind this window',
    args: () => Object.keys(PAGES).filter((p) => p !== '~'),
    run: ([q = '~'], ctx) => {
      const page = PAGES[q.replace(/^\/|\/$/g, '') || '~'];
      if (!page) return [{ t: 'text', text: `cd: no such page: ${q}`, tone: 'error' }];
      ctx.navigate(page);
      return [];
    },
  },
  {
    name: 'pwd',
    summary: 'Show the current page',
    run: (_, ctx) => [{ t: 'text', text: `https://ayodeleayoola.com${ctx.path}` }],
  },
  {
    name: 'git',
    usage: 'git log [--oneline]',
    summary: 'Career as commit history',
    args: () => ['log', 'log --oneline'],
    run: ([sub, flag]) => {
      if (sub !== 'log') return [{ t: 'text', text: 'git: only "git log" is installed here.', tone: 'error' }];
      const commits: Commit[] = [
        ...experience.map((e, i) => ({
          hash: hash(e.company),
          ref: i === 0 ? 'HEAD -> main' : undefined,
          date: formatPeriod(e.start, e.end),
          message: `feat: ${e.role.toLowerCase()} at ${e.company}`,
          body: e.desc,
        })),
        ...education.map((ed) => ({
          hash: hash(ed.school),
          ref: undefined,
          date: ed.year,
          message: `chore: ${ed.degree}${ed.grade ? `, ${ed.grade.toLowerCase()}` : ''}`,
          body: ed.school,
        })),
      ];
      return [{ t: 'gitlog', oneline: flag === '--oneline', commits }];
    },
  },
  {
    name: 'timeline',
    summary: 'Career drawn to scale',
    run: () => {
      const toM = (ym: string) => {
        const [y, m] = ym.split('-').map(Number);
        return y * 12 + m - 1;
      };
      const now = new Date();
      const start = toM(careerStart);
      const end = now.getFullYear() * 12 + now.getMonth() + 1;
      const span = end - start;
      const firstYear = Number(careerStart.slice(0, 4)) + 1;
      return [
        {
          t: 'bars',
          years: Array.from({ length: now.getFullYear() - firstYear + 1 }, (_, i) => firstYear + i).map((y) => ({ year: y, left: ((y * 12 - start) / span) * 100 })),
          rows: [...experience].reverse().map((e) => {
            const s = toM(e.start);
            const f = e.end ? toM(e.end) + 1 : end;
            return { label: e.company, left: ((s - start) / span) * 100, width: ((f - s) / span) * 100, current: !e.end, period: formatPeriod(e.start, e.end) };
          }),
        },
      ];
    },
  },
  {
    name: 'grep',
    usage: 'grep <word>',
    summary: 'Search everything I have done',
    run: (args) => {
      const q = args.join(' ').trim();
      if (!q) return [{ t: 'text', text: 'grep: give it a word, for example grep payments', tone: 'error' }];
      const needle = q.toLowerCase();
      const items: { source: string; text: string; run: string }[] = [];
      experience.forEach((e) =>
        [e.desc, ...e.highlights, e.stack.join(', ')].forEach((text) => {
          if (text.toLowerCase().includes(needle)) items.push({ source: e.company, text, run: `cat ${slug(e.company)}` });
        }),
      );
      projects.forEach((p) => {
        const text = `${p.title}: ${p.desc} (${p.tags.join(', ')})`;
        if (text.toLowerCase().includes(needle)) items.push({ source: p.company === 'Open Source' ? 'Open source' : p.company, text, run: `cat ${slug(p.title)}` });
      });
      openSource.forEach((o) => {
        const text = `${o.name}: ${o.desc}`;
        if (text.toLowerCase().includes(needle)) items.push({ source: 'Open source', text, run: o.href ? `open ${slug(o.name)}` : 'ls open-source' });
      });
      const seen = new Set<string>();
      const unique = items.filter((i) => (seen.has(i.text) ? false : (seen.add(i.text), true)));
      if (!unique.length) return [{ t: 'text', text: `grep: no matches for "${q}"`, tone: 'muted' }];
      return [{ t: 'text', text: `${unique.length} ${unique.length === 1 ? 'match' : 'matches'} for "${q}"`, tone: 'muted' }, { t: 'matches', query: q, items: unique }];
    },
  },
  {
    name: 'stack',
    usage: 'stack [category]',
    summary: 'Tools I use',
    args: () => stackCategories.map((c) => slug(c.label)),
    run: ([q]) => {
      const cats = q ? stackCategories.filter((c) => slug(c.label).startsWith(q)) : stackCategories;
      if (!cats.length) return [{ t: 'text', text: `stack: no category ${q}`, tone: 'error' }];
      return [{ t: 'groups', groups: cats.map((c) => ({ label: c.label, items: c.skills })) }];
    },
  },
  {
    name: 'contact',
    summary: 'Every way to reach me',
    run: () => [
      {
        t: 'rows',
        rows: [
          { label: 'email', value: personal.email, href: `mailto:${personal.email}`, copy: personal.email },
          { label: 'phone', value: personal.phoneDisplay, href: `tel:${personal.phone}`, copy: personal.phone },
          ...socials.map((s) => ({ label: s.label.toLowerCase().replace(' / ', '/'), value: s.href.replace(/^https?:\/\//, ''), href: s.href, copy: s.href })),
        ],
      },
    ],
  },
  {
    name: 'copy',
    usage: 'copy <email|phone|github|linkedin|x>',
    summary: 'Copy a detail to your clipboard',
    args: () => Object.keys(COPYABLE),
    run: ([q], ctx) => {
      const value = q && COPYABLE[q];
      if (!value) return [{ t: 'chips', label: 'Copy', items: Object.keys(COPYABLE).map((k) => ({ label: k, run: `copy ${k}` })) }];
      ctx.copy(value);
      return [{ t: 'text', text: `Copied ${value}`, tone: 'ok' }];
    },
  },
  {
    name: 'cv',
    usage: 'cv [--pdf]',
    summary: 'Read or download the CV',
    args: () => ['--pdf'],
    run: ([flag], ctx) => {
      if (flag === '--pdf') {
        ctx.open(CV_PDF_URL);
        return [{ t: 'text', text: 'Opening the PDF', tone: 'ok' }];
      }
      ctx.navigate(CV_PAGE_URL);
      return [{ t: 'text', text: 'Opened /cv behind this window. cv --pdf downloads it.', tone: 'ok' }];
    },
  },
  {
    name: 'hire',
    summary: 'Start a conversation',
    run: (_, ctx) => {
      ctx.open(`mailto:${personal.email}?subject=${encodeURIComponent('Working together')}`);
      return [{ t: 'text', text: 'Opening your email app. I reply within a day.', tone: 'ok' }];
    },
  },
  {
    name: 'date',
    summary: 'Time in London',
    run: () => [
      {
        t: 'text',
        text: new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'short' }).format(new Date()),
      },
    ],
  },
  {
    name: 'history',
    summary: 'Commands you have run',
    run: (_, ctx) =>
      ctx.history.length
        ? [{ t: 'chips', items: ctx.history.slice(-20).map((h) => ({ label: h, run: h })) }]
        : [{ t: 'text', text: 'Nothing yet.', tone: 'muted' }],
  },
  { name: 'clear', summary: 'Clear the screen', run: (_, ctx) => (ctx.clear(), []) },
  { name: 'exit', summary: 'Close the terminal', run: (_, ctx) => (ctx.close(), []) },
  { name: 'echo', summary: 'Print text', hidden: true, run: (args) => [{ t: 'text', text: args.join(' ') }] },
  {
    name: 'sudo',
    summary: 'Ask nicely',
    hidden: true,
    run: (args, ctx) => {
      if (args.join(' ').startsWith('hire')) return COMMANDS.find((c) => c.name === 'hire')!.run([], ctx);
      return [{ t: 'text', text: `${args[0] ?? 'that'} is not in the sudoers file. This incident will be reported to Ayoola.`, tone: 'muted' }];
    },
  },
];

const ALIASES: Record<string, string> = { skills: 'stack', experience: 'ls experience', projects: 'ls projects', work: 'ls experience', about: 'cd about', man: 'help', '?': 'help', ll: 'ls', email: 'copy email', resume: 'cv' };

export const COMMAND_NAMES = COMMANDS.map((c) => c.name);

export function tokenize(line: string) {
  return line.trim().split(/\s+/).filter(Boolean);
}

export function isKnownCommand(word: string) {
  return COMMAND_NAMES.includes(word) || word in ALIASES;
}

export function run(line: string, ctx: Ctx): Block[] {
  let [name, ...args] = tokenize(line);
  if (!name) return [];
  name = name.toLowerCase();
  if (ALIASES[name]) {
    const [aliased, ...rest] = tokenize(ALIASES[name]);
    name = aliased;
    args = [...rest, ...args];
  }
  const cmd = COMMANDS.find((c) => c.name === name);
  if (cmd) return cmd.run(args.map((a) => (a.startsWith('http') || a.startsWith('/') ? a : a.toLowerCase())), ctx);
  const close = COMMAND_NAMES.map((c) => ({ c, d: lev(name, c) })).sort((a, b) => a.d - b.d)[0];
  return [
    { t: 'text', text: `command not found: ${name}`, tone: 'error' },
    ...(close && close.d <= 2
      ? [{ t: 'chips' as const, label: 'Did you mean', items: [{ label: [close.c, ...args].join(' '), run: [close.c, ...args].join(' ') }] }]
      : [{ t: 'text' as const, text: 'Type help to see what works.', tone: 'muted' as const }]),
  ];
}

export function complete(line: string): string[] {
  const endsWithSpace = /\s$/.test(line);
  const parts = tokenize(line);
  if (parts.length === 0) return [];
  if (parts.length === 1 && !endsWithSpace) {
    const q = parts[0].toLowerCase();
    return [...COMMANDS.filter((c) => !c.hidden).map((c) => c.name), ...Object.keys(ALIASES)].filter((c) => c.startsWith(q) && c !== q);
  }
  const head = parts[0].toLowerCase();
  const cmd = COMMANDS.find((c) => c.name === head);
  if (!cmd?.args) return [];
  const typed = parts.slice(1).join(' ').toLowerCase() + (endsWithSpace && parts.length > 1 ? ' ' : '');
  return cmd
    .args()
    .filter((a) => a.startsWith(typed) && a !== typed.trim())
    .map((a) => `${head} ${a}`);
}

export const STARTERS = ['whoami', 'neofetch', 'git log', 'timeline', 'grep payments', 'ls projects', 'open onjeki', 'copy email'];
