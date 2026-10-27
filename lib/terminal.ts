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
import {
  ALIASES,
  HOME,
  buildFs,
  dirForPage,
  display,
  globToRegExp,
  lookup,
  pageFor,
  resolve,
  sizeOf,
  walk,
  type FsDir,
  type FsFile,
  type FsNode,
} from '@/lib/terminal-fs';

export type Tone = 'muted' | 'error' | 'ok' | 'strong';

export type Block =
  | { t: 'input'; text: string; path: string }
  | { t: 'text'; text: string; tone?: Tone }
  | { t: 'lines'; lines: string[]; highlight?: string; tone?: Tone }
  | { t: 'ls'; entries: { name: string; dir: boolean; run: string; long?: string }[] }
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
  cwd: string;
  prevCwd: string;
  env: Record<string, string>;
  history: string[];
  setCwd: (path: string) => void;
  setEnv: (key: string, value: string) => void;
  navigate: (path: string) => void;
  open: (url: string) => void;
  copy: (text: string) => void;
  clear: () => void;
  close: () => void;
};

type Run = (args: string[], ctx: Ctx, stdin?: string[]) => Block[];
type Command = { name: string; summary: string; usage?: string; group: 'portfolio' | 'unix' | 'hidden'; paths?: boolean; args?: () => string[]; run: Run };

const err = (text: string): Block => ({ t: 'text', text, tone: 'error' });
const ok = (text: string): Block => ({ t: 'text', text, tone: 'ok' });
const lines = (l: string[], highlight?: string): Block => ({ t: 'lines', lines: l, highlight });

const hash = (s: string) => {
  let h = 2166136261;
  for (const ch of s) h = Math.imul(h ^ ch.charCodeAt(0), 16777619);
  return (h >>> 0).toString(16).padStart(8, '0').slice(0, 7);
};

const socialHref = (icon: string) => socials.find((s) => s.icon === icon)?.href ?? '';
const COPYABLE: Record<string, string> = { email: personal.email, phone: personal.phone, github: socialHref('github'), linkedin: socialHref('linkedin'), x: socialHref('twitter') };

const lev = (a: string, b: string) => {
  const d = Array.from({ length: a.length + 1 }, (_, i) => [i, ...Array(b.length).fill(0)]);
  for (let j = 1; j <= b.length; j++) d[0][j] = j;
  for (let i = 1; i <= a.length; i++)
    for (let j = 1; j <= b.length; j++) d[i][j] = Math.min(d[i - 1][j] + 1, d[i][j - 1] + 1, d[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1));
  return d[a.length][b.length];
};

const parseFlags = (args: string[]) => {
  const flags = new Set<string>();
  const rest: string[] = [];
  let n: number | undefined;
  for (let i = 0; i < args.length; i++) {
    const a = args[i];
    if (a === '-n' && /^\d+$/.test(args[i + 1] ?? '')) n = Number(args[++i]);
    else if (/^-\d+$/.test(a)) n = Number(a.slice(1));
    else if (/^-[a-zA-Z]+$/.test(a)) a.slice(1).split('').forEach((f) => flags.add(f));
    else rest.push(a);
  }
  return { flags, rest, n };
};

const toLines = (blocks: Block[]): string[] =>
  blocks.flatMap((b): string[] => {
    switch (b.t) {
      case 'text':
        return b.text.split('\n');
      case 'lines':
        return b.lines;
      case 'ls':
        return b.entries.map((e) => e.long ?? e.name + (e.dir ? '/' : ''));
      case 'rows':
        return b.rows.map((r) => `${r.label}\t${r.value}`);
      case 'list':
        return b.items.map((i) => [i.title, i.sub, i.meta].filter(Boolean).join('\t'));
      case 'matches':
        return b.items.map((i) => `${i.source}: ${i.text}`);
      case 'gitlog':
        return b.commits.map((c) => `${c.hash} ${c.message}`);
      case 'groups':
        return b.groups.map((g) => `${g.label}: ${g.items.join(', ')}`);
      case 'bars':
        return b.rows.map((r) => `${r.label}\t${r.period}`);
      case 'neofetch':
        return b.rows.map((r) => `${r.label}: ${r.value}`);
      case 'chips':
        return b.items.map((i) => i.label);
      default:
        return [];
    }
  });

const failed = (blocks: Block[]) => blocks.some((b) => (b.t === 'text' || b.t === 'lines') && b.tone === 'error');

const readOnly = (cmd: string): Run => (args) => [err(`${cmd}: ${args.find((a) => !a.startsWith('-')) ?? ''}: Read-only file system`.replace(': :', ':'))];

const projectCard = (key: string): Block[] => {
  const p = projects.find((x) => slug(x.title) === key);
  if (!p) return [];
  return [
    { t: 'list', items: [{ title: p.title, sub: [p.role, p.company, p.year].filter(Boolean).join(' · '), logo: p.logo, logoUrl: p.logoUrl }] },
    { t: 'text', text: p.desc },
    { t: 'text', text: p.tags.join(', '), tone: 'muted' },
    ...((p.links?.length || p.href)
      ? [{ t: 'chips' as const, items: (p.links ?? [{ label: 'site', href: p.href }]).map((l) => ({ label: `open ${l.label.toLowerCase()}`, run: `open ${l.href}` })) }]
      : []),
  ];
};

const roleCard = (key: string): Block[] => {
  const e = experience.find((x) => slug(x.company) === key);
  if (!e) return [];
  return [
    { t: 'list', items: [{ title: `${e.role} at ${e.company}`, sub: `${formatPeriod(e.start, e.end)} · ${e.location}`, logo: e.logo, logoUrl: e.logoUrl }] },
    ...e.highlights.map((h) => ({ t: 'text' as const, text: `• ${h}` })),
    { t: 'text', text: e.stack.join(', '), tone: 'muted' },
  ];
};

const COMMANDS: Command[] = [];
let FS: FsDir;
const fs = () => (FS ??= buildFs(COMMANDS.map((c) => c.name)));

const readTargets = (cmd: string, args: string[], ctx: Ctx, stdin?: string[]): { name: string; text: string[] }[] | Block[] => {
  if (!args.length) return stdin ? [{ name: '', text: stdin }] : [err(`${cmd}: missing file operand`)];
  const out: { name: string; text: string[] }[] = [];
  for (const a of args) {
    const node = lookup(fs(), resolve(ctx.cwd, a));
    if (!node) return [err(`${cmd}: ${a}: No such file or directory`)];
    if (node.kind === 'dir') return [err(`${cmd}: ${a}: Is a directory`)];
    if (node.binary) return [err(`${cmd}: ${a}: binary file, try open ${a}`)];
    out.push({ name: a, text: node.content.split('\n') });
  }
  return out;
};
const isBlocks = (x: unknown[]): x is Block[] => x.length > 0 && typeof (x[0] as Block).t === 'string';

const lsEntries = (node: FsDir, path: string, all: boolean, long: boolean) => {
  const kids = node.children.filter((c) => all || !c.name.startsWith('.'));
  const list: FsNode[] = all ? [{ kind: 'dir', name: '.', children: [] }, { kind: 'dir', name: '..', children: [] }, ...kids] : kids;
  return list.map((c) => {
    const full = c.name === '.' ? path : c.name === '..' ? resolve(path, '..') : resolve(path, c.name);
    const rel = display(full);
    return {
      name: c.name,
      dir: c.kind === 'dir',
      run: c.kind === 'dir' ? `cd ${rel}` : `cat ${rel}`,
      long: long
        ? `${c.kind === 'dir' ? 'drwxr-xr-x' : '-r--r--r--'}  ayoola  staff  ${String(sizeOf(c)).padStart(6)}  27 Oct 2026  ${c.name}${c.kind === 'dir' ? '/' : ''}`
        : undefined,
    };
  });
};

COMMANDS.push(
  {
    name: 'help',
    group: 'portfolio',
    summary: 'List every command',
    run: () => [
      { t: 'text', text: 'Portfolio', tone: 'strong' },
      { t: 'rows', rows: COMMANDS.filter((c) => c.group === 'portfolio').map((c) => ({ label: c.usage ?? c.name, value: c.summary })) },
      { t: 'text', text: 'Unix', tone: 'strong' },
      { t: 'rows', rows: COMMANDS.filter((c) => c.group === 'unix').map((c) => ({ label: c.usage ?? c.name, value: c.summary })) },
      { t: 'text', text: 'Pipes (|), && and ; work. $USER, $HOME and $PWD expand. Tab completes paths. Ctrl+L clears.', tone: 'muted' },
    ],
  },
  {
    name: 'neofetch',
    group: 'portfolio',
    summary: 'System info, but it is me',
    run: () => [
      {
        t: 'neofetch',
        rows: [
          { label: 'Role', value: `${experience[0].role} @ ${experience[0].company}` },
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
    name: 'finger',
    usage: 'finger [ayoola]',
    group: 'portfolio',
    summary: 'Who Ayoola is',
    run: () => [
      { t: 'text', text: `${personal.name}, ${personal.title.toLowerCase()} in London.`, tone: 'strong' },
      { t: 'text', text: personal.summary, tone: 'muted' },
      { t: 'chips', label: 'Next', items: ['neofetch', 'git log', 'ls ~/projects'].map((c) => ({ label: c, run: c })) },
    ],
  },
  {
    name: 'git',
    usage: 'git log [--oneline]',
    group: 'portfolio',
    summary: 'Career as commit history',
    args: () => ['log', 'log --oneline', 'status'],
    run: ([sub, flag], ctx) => {
      if (sub === 'status') return [lines([`On branch main`, `Your career is up to date with 'origin/main'.`, '', `Working on: Kipzu, AwaAgent, ScanSan`, `cwd: ${display(ctx.cwd)}`])];
      if (sub !== 'log') return [err(`git: '${sub ?? ''}' is not a git command here. Try git log or git status.`)];
      const commits: Commit[] = [
        ...experience.map((e, i) => ({ hash: hash(e.company), ref: i === 0 ? 'HEAD -> main' : undefined, date: formatPeriod(e.start, e.end), message: `feat: ${e.role.toLowerCase()} at ${e.company}`, body: e.desc })),
        ...education.map((ed) => ({ hash: hash(ed.school), date: ed.year, message: `chore: ${ed.degree}${ed.grade ? `, ${ed.grade.toLowerCase()}` : ''}`, body: ed.school })),
      ];
      return [{ t: 'gitlog', oneline: flag === '--oneline', commits }];
    },
  },
  {
    name: 'timeline',
    group: 'portfolio',
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
    name: 'stack',
    usage: 'stack [category]',
    group: 'portfolio',
    summary: 'Tools I use',
    args: () => stackCategories.map((c) => slug(c.label)),
    run: ([q]) => {
      const cats = q ? stackCategories.filter((c) => slug(c.label).startsWith(q.toLowerCase())) : stackCategories;
      if (!cats.length) return [err(`stack: no category ${q}`)];
      return [{ t: 'groups', groups: cats.map((c) => ({ label: c.label, items: c.skills })) }];
    },
  },
  {
    name: 'contact',
    group: 'portfolio',
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
    group: 'portfolio',
    summary: 'Copy a detail, or pipe anything into copy',
    args: () => Object.keys(COPYABLE),
    run: ([q], ctx, stdin) => {
      if (stdin) {
        ctx.copy(stdin.join('\n'));
        return [ok(`Copied ${stdin.length} ${stdin.length === 1 ? 'line' : 'lines'}`)];
      }
      const value = q && COPYABLE[q.toLowerCase()];
      if (!value) return [{ t: 'chips', label: 'Copy', items: Object.keys(COPYABLE).map((k) => ({ label: k, run: `copy ${k}` })) }];
      ctx.copy(value);
      return [ok(`Copied ${value}`)];
    },
  },
  {
    name: 'open',
    usage: 'open <file|dir|url>',
    group: 'portfolio',
    summary: 'Open a file, folder or link',
    paths: true,
    run: ([q = '.'], ctx) => {
      if (/^(https?:|mailto:|tel:)/.test(q)) {
        ctx.open(q);
        return [ok(`Opening ${q}`)];
      }
      const path = resolve(ctx.cwd, q, ctx.prevCwd);
      const node = lookup(fs(), path);
      if (!node) return [err(`open: ${q}: No such file or directory`)];
      if (node.kind === 'dir') {
        const page = pageFor(fs(), path);
        if (!page) return [err(`open: ${q}: nothing to open`)];
        ctx.navigate(page);
        return [ok(`Opened ${page}`)];
      }
      if (!node.href) return [err(`open: ${q}: no link for this file, try cat ${q}`)];
      ctx.open(node.href);
      return [ok(`Opening ${node.href}`)];
    },
  },
  {
    name: 'cv',
    usage: 'cv [--pdf]',
    group: 'portfolio',
    summary: 'Read or download the CV',
    args: () => ['--pdf'],
    run: ([flag], ctx) => {
      if (flag === '--pdf') {
        ctx.open(CV_PDF_URL);
        return [ok('Opening the PDF')];
      }
      ctx.setCwd(`${HOME}/cv`);
      ctx.navigate(CV_PAGE_URL);
      return [ok('Opened /cv behind this window. cv --pdf downloads it.')];
    },
  },
  {
    name: 'hire',
    group: 'portfolio',
    summary: 'Start a conversation',
    run: (_, ctx) => {
      ctx.open(`mailto:${personal.email}?subject=${encodeURIComponent('Working together')}`);
      return [ok('Opening your email app. I reply within a day.')];
    },
  },

  {
    name: 'ls',
    usage: 'ls [-la] [path]',
    group: 'unix',
    summary: 'List a folder',
    paths: true,
    run: (args, ctx) => {
      const { flags, rest } = parseFlags(args);
      const targets = rest.length ? rest : ['.'];
      const out: Block[] = [];
      for (const t of targets) {
        const path = resolve(ctx.cwd, t, ctx.prevCwd);
        const node = lookup(fs(), path);
        if (!node) {
          out.push(err(`ls: ${t}: No such file or directory`));
          continue;
        }
        if (targets.length > 1) out.push({ t: 'text', text: `${t}:`, tone: 'strong' });
        if (node.kind === 'file') out.push({ t: 'ls', entries: [{ name: node.name, dir: false, run: `cat ${display(path)}` }] });
        else out.push({ t: 'ls', entries: lsEntries(node, path, flags.has('a'), flags.has('l')) });
      }
      return out;
    },
  },
  {
    name: 'cd',
    usage: 'cd [path|..|-|~]',
    group: 'unix',
    summary: 'Change folder (the site follows)',
    paths: true,
    run: ([q], ctx) => {
      const path = resolve(ctx.cwd, q, ctx.prevCwd);
      const node = lookup(fs(), path);
      if (!node) return [err(`cd: no such file or directory: ${q}`)];
      if (node.kind !== 'dir') return [err(`cd: not a directory: ${q}`)];
      ctx.setCwd(path);
      const page = pageFor(fs(), path);
      if (page) ctx.navigate(page);
      return q === '-' ? [{ t: 'text', text: display(path) }] : [];
    },
  },
  { name: 'pwd', group: 'unix', summary: 'Print the current folder', run: (_, ctx) => [{ t: 'text', text: ctx.cwd }] },
  {
    name: 'cat',
    usage: 'cat <file...>',
    group: 'unix',
    summary: 'Print files',
    paths: true,
    run: (args, ctx, stdin) => {
      const { rest } = parseFlags(args);
      if (rest.length === 1 && !stdin) {
        const node = lookup(fs(), resolve(ctx.cwd, rest[0]));
        if (node?.kind === 'file' && node.ref) {
          const card = node.ref.type === 'project' ? projectCard(node.ref.key) : roleCard(node.ref.key);
          if (card.length) return card;
        }
      }
      const r = readTargets('cat', rest, ctx, stdin);
      if (isBlocks(r)) return r;
      return [lines((r as { text: string[] }[]).flatMap((f) => f.text))];
    },
  },
  { name: 'less', group: 'hidden', summary: '', paths: true, run: (a, c, s) => COMMANDS.find((x) => x.name === 'cat')!.run(a, c, s) },
  { name: 'more', group: 'hidden', summary: '', paths: true, run: (a, c, s) => COMMANDS.find((x) => x.name === 'cat')!.run(a, c, s) },
  {
    name: 'head',
    usage: 'head [-n N] [file]',
    group: 'unix',
    summary: 'First lines',
    paths: true,
    run: (args, ctx, stdin) => {
      const { rest, n = 10 } = parseFlags(args);
      const r = readTargets('head', rest, ctx, stdin);
      return isBlocks(r) ? r : [lines((r as { text: string[] }[]).flatMap((f) => f.text.slice(0, n)))];
    },
  },
  {
    name: 'tail',
    usage: 'tail [-n N] [file]',
    group: 'unix',
    summary: 'Last lines',
    paths: true,
    run: (args, ctx, stdin) => {
      const { rest, n = 10 } = parseFlags(args);
      const r = readTargets('tail', rest, ctx, stdin);
      return isBlocks(r) ? r : [lines((r as { text: string[] }[]).flatMap((f) => f.text.slice(-n)))];
    },
  },
  {
    name: 'wc',
    usage: 'wc [-lwc] [file]',
    group: 'unix',
    summary: 'Count lines, words and bytes',
    paths: true,
    run: (args, ctx, stdin) => {
      const { flags, rest } = parseFlags(args);
      const r = readTargets('wc', rest, ctx, stdin);
      if (isBlocks(r)) return r;
      return [
        lines(
          (r as { name: string; text: string[] }[]).map((f) => {
            const text = f.text.join('\n');
            const counts = { l: f.text.length, w: text.split(/\s+/).filter(Boolean).length, c: new TextEncoder().encode(text).length };
            const picked = flags.size ? (['l', 'w', 'c'] as const).filter((k) => flags.has(k)) : (['l', 'w', 'c'] as const);
            return `${picked.map((k) => String(counts[k]).padStart(7)).join('')} ${f.name}`.trimEnd();
          }),
        ),
      ];
    },
  },
  {
    name: 'sort',
    usage: 'sort [-r] [file]',
    group: 'unix',
    summary: 'Sort lines',
    paths: true,
    run: (args, ctx, stdin) => {
      const { flags, rest } = parseFlags(args);
      const r = readTargets('sort', rest, ctx, stdin);
      if (isBlocks(r)) return r;
      const all = (r as { text: string[] }[]).flatMap((f) => f.text).sort((a, b) => a.localeCompare(b));
      return [lines(flags.has('r') ? all.reverse() : all)];
    },
  },
  {
    name: 'uniq',
    group: 'unix',
    summary: 'Drop repeated lines',
    paths: true,
    run: (args, ctx, stdin) => {
      const r = readTargets('uniq', parseFlags(args).rest, ctx, stdin);
      if (isBlocks(r)) return r;
      return [lines((r as { text: string[] }[]).flatMap((f) => f.text).filter((l, i, a) => l !== a[i - 1]))];
    },
  },
  {
    name: 'grep',
    usage: 'grep [-ivcn] <word> [file]',
    group: 'unix',
    summary: 'Search files, piped text, or everything',
    paths: true,
    run: (args, ctx, stdin) => {
      const { flags, rest } = parseFlags(args);
      const [q, ...files] = rest;
      if (!q) return [err('usage: grep [-ivcn] <word> [file...]')];
      const needle = q.toLowerCase();
      const match = (l: string) => l.toLowerCase().includes(needle) !== flags.has('v');
      if (stdin || files.length) {
        const r = readTargets('grep', files, ctx, stdin);
        if (isBlocks(r)) return r;
        const hits = (r as { name: string; text: string[] }[]).flatMap((f) =>
          f.text.map((l, i) => ({ l, i, f: f.name })).filter((x) => match(x.l)).map((x) => `${files.length > 1 ? `${x.f}:` : ''}${flags.has('n') ? `${x.i + 1}:` : ''}${x.l}`),
        );
        if (flags.has('c')) return [lines([String(hits.length)])];
        return hits.length ? [lines(hits, flags.has('v') ? undefined : q)] : [];
      }
      const items: { source: string; text: string; run: string }[] = [];
      walk(lookup(fs(), HOME)!, HOME, (n, p) => {
        if (n.kind !== 'file' || n.binary) return;
        n.content.split('\n').forEach((l) => {
          if (l.trim() && match(l) && !items.some((x) => x.text === l)) items.push({ source: display(p), text: l.replace(/^[-#]\s*/, ''), run: `cat ${display(p)}` });
        });
      });
      if (flags.has('c')) return [lines([String(items.length)])];
      if (!items.length) return [{ t: 'text', text: `grep: no matches for "${q}"`, tone: 'muted' }];
      return [{ t: 'text', text: `${items.length} ${items.length === 1 ? 'match' : 'matches'} for "${q}" across ~`, tone: 'muted' }, { t: 'matches', query: q, items }];
    },
  },
  {
    name: 'find',
    usage: 'find [path] [-name pattern]',
    group: 'unix',
    summary: 'Find files by name',
    paths: true,
    run: (args, ctx) => {
      const i = args.indexOf('-name');
      const pattern = i >= 0 ? args[i + 1] : undefined;
      const start = args.find((a, k) => !a.startsWith('-') && k !== i + 1) ?? '.';
      const root = resolve(ctx.cwd, start);
      const node = lookup(fs(), root);
      if (!node) return [err(`find: ${start}: No such file or directory`)];
      const re = pattern ? globToRegExp(pattern.replace(/^['"]|['"]$/g, '')) : null;
      const out: string[] = [];
      walk(node, root, (n, p) => {
        if (!re || re.test(n.name)) out.push(display(p));
      });
      return [lines(out)];
    },
  },
  {
    name: 'tree',
    usage: 'tree [path]',
    group: 'unix',
    summary: 'Draw a folder as a tree',
    paths: true,
    run: ([q = '.'], ctx) => {
      const root = resolve(ctx.cwd, q);
      const node = lookup(fs(), root);
      if (!node || node.kind !== 'dir') return [err(`tree: ${q}: not a directory`)];
      const out = [display(root)];
      let dirs = 0;
      let files = 0;
      const draw = (d: FsDir, prefix: string) => {
        const kids = d.children.filter((c) => !c.name.startsWith('.'));
        kids.forEach((c, i) => {
          const last = i === kids.length - 1;
          out.push(`${prefix}${last ? '└── ' : '├── '}${c.name}${c.kind === 'dir' ? '/' : ''}`);
          if (c.kind === 'dir') {
            dirs++;
            draw(c, prefix + (last ? '    ' : '│   '));
          } else files++;
        });
      };
      draw(node, '');
      return [lines([...out, '', `${dirs} directories, ${files} files`])];
    },
  },
  {
    name: 'file',
    usage: 'file <path>',
    group: 'unix',
    summary: 'Say what a file is',
    paths: true,
    run: (args, ctx) =>
      args.map((a) => {
        const n = lookup(fs(), resolve(ctx.cwd, a));
        if (!n) return err(`file: ${a}: No such file or directory`);
        const kind = n.kind === 'dir' ? 'directory' : n.binary ? (n.name.endsWith('.pdf') ? 'PDF document, version 1.7' : 'Mach-O 64-bit executable arm64') : n.name.endsWith('.md') ? 'Markdown text, UTF-8' : 'ASCII text';
        return { t: 'text', text: `${a}: ${kind}` } as Block;
      }),
  },
  {
    name: 'echo',
    usage: 'echo <text>',
    group: 'unix',
    summary: 'Print text ($VARS expand)',
    run: (args) => [{ t: 'text', text: args.join(' ') }],
  },
  {
    name: 'man',
    usage: 'man <command>',
    group: 'unix',
    summary: 'Manual for a command',
    args: () => COMMANDS.filter((c) => c.group !== 'hidden').map((c) => c.name),
    run: ([q]) => {
      const c = COMMANDS.find((x) => x.name === q);
      if (!q) return [err('What manual page do you want? For example, man ls')];
      if (!c || c.group === 'hidden') return [err(`No manual entry for ${q}`)];
      return [lines([`${c.name.toUpperCase()}(1)`, '', 'NAME', `    ${c.name} - ${c.summary}`, '', 'SYNOPSIS', `    ${c.usage ?? c.name}`])];
    },
  },
  {
    name: 'which',
    usage: 'which <command>',
    group: 'unix',
    summary: 'Where a command lives',
    run: (args) => args.map((a) => (ALIASES[a] ? { t: 'text', text: `${a}: aliased to ${ALIASES[a]}` } : COMMANDS.some((c) => c.name === a) ? { t: 'text', text: `/bin/${a}` } : err(`${a} not found`)) as Block),
  },
  { name: 'whoami', group: 'unix', summary: 'Current user', run: () => [{ t: 'text', text: 'ayoola' }] },
  { name: 'id', group: 'unix', summary: 'User and groups', run: () => [{ t: 'text', text: 'uid=501(ayoola) gid=20(staff) groups=20(staff),80(engineers),501(founders)' }] },
  { name: 'hostname', group: 'unix', summary: 'Machine name', run: () => [{ t: 'text', text: 'london' }] },
  {
    name: 'uname',
    usage: 'uname [-a]',
    group: 'unix',
    summary: 'System name',
    run: (args) => [{ t: 'text', text: parseFlags(args).flags.has('a') ? 'AyoolaOS london 4.0.0 Darwin Kernel: React/Next.js/Node.js/Flutter arm64' : 'AyoolaOS' }],
  },
  {
    name: 'uptime',
    group: 'unix',
    summary: 'Time since the first role',
    run: () => {
      const t = new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', hour: '2-digit', minute: '2-digit' }).format(new Date());
      return [{ t: 'text', text: `${t}  up ${yearsLabel} (since ${formatPeriod(careerStart).replace(' - Present', '')}), 1 user` }];
    },
  },
  {
    name: 'date',
    group: 'unix',
    summary: 'Time in London',
    run: () => [{ t: 'text', text: new Intl.DateTimeFormat('en-GB', { timeZone: 'Europe/London', dateStyle: 'full', timeStyle: 'long' }).format(new Date()) }],
  },
  {
    name: 'cal',
    group: 'unix',
    summary: 'This month',
    run: () => {
      const now = new Date();
      const first = new Date(now.getFullYear(), now.getMonth(), 1);
      const days = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();
      const title = first.toLocaleString('en-GB', { month: 'long', year: 'numeric' });
      const cells = [...Array(first.getDay()).fill('  '), ...Array.from({ length: days }, (_, i) => String(i + 1).padStart(2))];
      const rows: string[] = [];
      for (let i = 0; i < cells.length; i += 7) rows.push(cells.slice(i, i + 7).join(' '));
      return [lines([title.padStart(10 + Math.floor(title.length / 2)), 'Su Mo Tu We Th Fr Sa', ...rows], String(now.getDate()))];
    },
  },
  {
    name: 'env',
    group: 'unix',
    summary: 'Environment variables',
    run: (_, ctx) => [lines(Object.entries({ ...ctx.env, PWD: ctx.cwd }).map(([k, v]) => `${k}=${v}`))],
  },
  { name: 'printenv', group: 'hidden', summary: '', run: (a, c) => (a[0] ? [{ t: 'text', text: c.env[a[0]] ?? '' }] : COMMANDS.find((x) => x.name === 'env')!.run([], c)) },
  {
    name: 'export',
    usage: 'export KEY=value',
    group: 'unix',
    summary: 'Set a variable for this session',
    run: (args, ctx) => {
      for (const a of args) {
        const m = a.match(/^([A-Za-z_][A-Za-z0-9_]*)=(.*)$/);
        if (!m) return [err(`export: not valid in this context: ${a}`)];
        ctx.setEnv(m[1], m[2]);
      }
      return [];
    },
  },
  {
    name: 'alias',
    group: 'unix',
    summary: 'List shortcuts',
    run: () => [lines(Object.entries(ALIASES).map(([k, v]) => `${k}='${v}'`))],
  },
  {
    name: 'history',
    group: 'unix',
    summary: 'Commands you have run',
    run: (_, ctx) => (ctx.history.length ? [lines(ctx.history.map((h, i) => `${String(i + 1).padStart(5)}  ${h}`))] : [{ t: 'text', text: 'Nothing yet.', tone: 'muted' }]),
  },
  {
    name: 'ps',
    group: 'unix',
    summary: 'What is running now',
    run: () => [lines(['  PID TTY      TIME CMD', ' 2025 ttys000  0:01 scansan --role senior-frontend', ' 2026 ttys001  0:01 kipzu --gamified-learning', ' 2026 ttys002  0:01 awaagent --rentals', ' 4040 ttys003  0:00 -zsh'])],
  },
  { name: 'kill', group: 'hidden', summary: '', run: (a) => [err(`kill: kill ${a.at(-1) ?? ''} failed: operation not permitted`)] },
  { name: 'ping', group: 'hidden', summary: '', run: (a) => [err(`ping: cannot resolve ${a[0] ?? ''}: network access is disabled in this shell`)] },
  { name: 'curl', group: 'hidden', summary: '', run: () => [err('curl: network access is disabled in this shell. Try open <url>.')] },
  { name: 'wget', group: 'hidden', summary: '', run: () => [err('wget: network access is disabled in this shell. Try open <url>.')] },
  { name: 'touch', group: 'hidden', summary: '', run: readOnly('touch') },
  { name: 'mkdir', group: 'hidden', summary: '', run: readOnly('mkdir') },
  { name: 'rmdir', group: 'hidden', summary: '', run: readOnly('rmdir') },
  { name: 'mv', group: 'hidden', summary: '', run: readOnly('mv') },
  { name: 'cp', group: 'hidden', summary: '', run: readOnly('cp') },
  { name: 'chmod', group: 'hidden', summary: '', run: readOnly('chmod') },
  { name: 'ln', group: 'hidden', summary: '', run: readOnly('ln') },
  {
    name: 'rm',
    group: 'hidden',
    summary: '',
    run: (args) => (args.includes('-rf') && args.some((a) => a === '/' || a === '~' || a === '*') ? [err('rm: nice try. This file system is read-only, and so is my career.')] : readOnly('rm')(args, {} as Ctx)),
  },
  { name: 'vim', group: 'hidden', summary: '', run: (a) => [err(`vim: ${a[0] ?? 'file'} is on a read-only file system. Good news: you never have to work out how to quit.`)] },
  { name: 'nano', group: 'hidden', summary: '', run: readOnly('nano') },
  { name: 'emacs', group: 'hidden', summary: '', run: readOnly('emacs') },
  {
    name: 'sudo',
    group: 'hidden',
    summary: '',
    run: (args, ctx) => {
      if (args.join(' ').startsWith('hire')) return COMMANDS.find((c) => c.name === 'hire')!.run([], ctx);
      return [{ t: 'text', text: `ayoola is not in the sudoers file. This incident will be reported.`, tone: 'muted' }];
    },
  },
  { name: 'clear', group: 'unix', summary: 'Clear the screen', run: (_, ctx) => (ctx.clear(), []) },
  { name: 'exit', group: 'unix', summary: 'Close the terminal', run: (_, ctx) => (ctx.close(), []) },
);

export const COMMAND_NAMES = COMMANDS.map((c) => c.name);

export function tokenize(line: string): string[] {
  const out: string[] = [];
  const re = /"([^"]*)"|'([^']*)'|(\S+)/g;
  let m: RegExpExecArray | null;
  while ((m = re.exec(line))) out.push(m[1] ?? m[2] ?? m[3]);
  return out;
}

export function isKnownCommand(word: string) {
  return COMMAND_NAMES.includes(word) || word in ALIASES;
}

const expand = (line: string, ctx: Ctx) =>
  line.replace(/\$(\w+)|\$\{(\w+)\}/g, (_, a, b) => {
    const k = a ?? b;
    return k === 'PWD' ? ctx.cwd : (ctx.env[k] ?? '');
  });

function runOne(segment: string, ctx: Ctx, stdin?: string[]): Block[] {
  let [name, ...args] = tokenize(segment);
  if (!name) return [];
  if (ALIASES[name]) {
    const [a, ...rest] = tokenize(ALIASES[name]);
    name = a;
    args = [...rest, ...args];
  }
  const cmd = COMMANDS.find((c) => c.name === name) ?? COMMANDS.find((c) => c.name === name.toLowerCase());
  if (cmd) return cmd.run(args, ctx, stdin);
  const close = COMMANDS.filter((c) => c.group !== 'hidden')
    .map((c) => ({ c: c.name, d: lev(name.toLowerCase(), c.name) }))
    .sort((a, b) => a.d - b.d)[0];
  return [
    err(`zsh: command not found: ${name}`),
    ...(close && close.d <= 2
      ? [{ t: 'chips' as const, label: 'Did you mean', items: [{ label: [close.c, ...args].join(' '), run: [close.c, ...args].join(' ') }] }]
      : [{ t: 'text' as const, text: 'Type help to see what works.', tone: 'muted' as const }]),
  ];
}

export function run(line: string, ctx: Ctx): Block[] {
  const out: Block[] = [];
  const parts = expand(line, ctx).split(/(&&|;)/);
  let skip = false;
  for (let i = 0; i < parts.length; i += 2) {
    const segment = parts[i].trim();
    const joiner = parts[i - 1];
    if (joiner === ';') skip = false;
    if (!segment || skip) continue;
    const stages = segment.split('|').map((s) => s.trim()).filter(Boolean);
    let blocks: Block[] = [];
    for (let s = 0; s < stages.length; s++) {
      blocks = runOne(stages[s], ctx, s === 0 ? undefined : toLines(blocks));
      if (failed(blocks)) break;
    }
    out.push(...blocks);
    if (parts[i + 1] === '&&' && failed(blocks)) skip = true;
  }
  return out;
}

export function complete(line: string, cwd: string): string[] {
  const endsWithSpace = /\s$/.test(line);
  const lastStage = line.split(/\||&&|;/).pop() ?? '';
  const before = line.slice(0, line.length - lastStage.length);
  const lead = lastStage.match(/^\s*/)?.[0] ?? '';
  const parts = tokenize(lastStage);
  if (!parts.length) return [];
  if (parts.length === 1 && !endsWithSpace) {
    const q = parts[0];
    return [...COMMANDS.filter((c) => c.group !== 'hidden').map((c) => c.name), ...Object.keys(ALIASES)]
      .filter((c) => c.startsWith(q) && c !== q)
      .map((c) => `${before}${lead}${c}`);
  }
  const cmd = COMMANDS.find((c) => c.name === parts[0]) ?? (ALIASES[parts[0]] ? COMMANDS.find((c) => c.name === tokenize(ALIASES[parts[0]])[0]) : undefined);
  if (!cmd) return [];
  const head = `${before}${lastStage.slice(0, lastStage.length - (endsWithSpace ? 0 : parts[parts.length - 1].length))}`;
  const typed = endsWithSpace ? '' : parts[parts.length - 1];
  if (cmd.paths) {
    const slash = typed.lastIndexOf('/');
    const dirPart = slash >= 0 ? typed.slice(0, slash + 1) : '';
    const namePart = typed.slice(slash + 1);
    const node = lookup(fs(), resolve(cwd, dirPart || '.'));
    if (node?.kind !== 'dir') return [];
    return node.children
      .filter((c) => c.name.startsWith(namePart) && (namePart.startsWith('.') || !c.name.startsWith('.')))
      .filter((c) => cmd.name !== 'cd' || c.kind === 'dir')
      .map((c: FsNode) => `${head}${dirPart}${c.name}${c.kind === 'dir' ? '/' : ''}`)
      .filter((s) => s !== line);
  }
  if (cmd.args) {
    const argTyped = parts.slice(1).join(' ') + (endsWithSpace && parts.length > 1 ? ' ' : '');
    return cmd
      .args()
      .filter((a) => a.startsWith(argTyped) && a !== argTyped.trim())
      .map((a) => `${before}${lead}${parts[0]} ${a}`);
  }
  return [];
}

export const homeFor = (pathname: string) => dirForPage(fs(), pathname);
export const pageOf = (path: string) => pageFor(fs(), path);
export { HOME, display };
export type { FsFile };

export const STARTERS = ['ls', 'cat README.md', 'neofetch', 'git log', 'tree ~/projects', 'grep payments', 'ls ~/projects | grep -c md', 'cd projects'];
