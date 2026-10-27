import {
  CV_PAGE_URL,
  CV_PDF_URL,
  education,
  experience,
  formatPeriod,
  openSource,
  personal,
  projects,
  slug,
  socials,
  stackCategories,
  story,
} from '@/lib/data';

export type FsFile = { kind: 'file'; name: string; content: string; binary?: boolean; href?: string; ref?: { type: 'project' | 'role'; key: string } };
export type FsDir = { kind: 'dir'; name: string; page?: string; children: FsNode[] };
export type FsNode = FsFile | FsDir;

export const HOME = '/home/ayoola';

const file = (name: string, content: string, extra: Partial<FsFile> = {}): FsFile => ({ kind: 'file', name, content, ...extra });
const dir = (name: string, children: FsNode[], page?: string): FsDir => ({ kind: 'dir', name, children, page });

export const ALIASES: Record<string, string> = {
  ll: 'ls -la',
  la: 'ls -a',
  l: 'ls',
  skills: 'stack',
  projects: 'ls ~/projects',
  work: 'ls ~/experience',
  resume: 'cv',
  '?': 'help',
  logout: 'exit',
  vi: 'vim',
};

export function buildFs(commandNames: string[]): FsDir {
  const home = dir(
    'ayoola',
    [
      file(
        'README.md',
        [`# ${personal.name}`, '', `${personal.title}, London.`, '', personal.summary, '', 'Start with: ls, cd projects, cat projects/onjeki.md, git log, neofetch'].join('\n'),
      ),
      file('.zshrc', ['export EDITOR=vim', 'export TZ=Europe/London', ...Object.entries(ALIASES).map(([k, v]) => `alias ${k}='${v}'`)].join('\n')),
      dir(
        'about',
        [
          file('story.md', ['# Story', '', ...story.flatMap((p) => [p, ''])].join('\n').trim()),
          file('education.md', ['# Education', '', ...education.map((e) => `- ${e.degree}${e.grade ? `, ${e.grade}` : ''}, ${e.school} (${e.year})`)].join('\n')),
        ],
        '/about',
      ),
      dir(
        'experience',
        experience.map((e) =>
          file(
            `${slug(e.company)}.md`,
            [`# ${e.role} at ${e.company}`, `${formatPeriod(e.start, e.end)} · ${e.location}`, '', ...e.highlights.map((h) => `- ${h}`), '', `Stack: ${e.stack.join(', ')}`].join('\n'),
            { ref: { type: 'role', key: slug(e.company) }, href: e.domain ? `https://${e.domain}` : undefined },
          ),
        ),
        '/#work',
      ),
      dir(
        'projects',
        projects.map((p) =>
          file(
            `${slug(p.title)}.md`,
            [`# ${p.title}`, [p.role, p.company, p.year].filter(Boolean).join(' · '), '', p.desc, '', `Tags: ${p.tags.join(', ')}`, ...(p.href ? [`Link: ${p.href}`] : [])].join('\n'),
            { ref: { type: 'project', key: slug(p.title) }, href: p.href || undefined },
          ),
        ),
        '/projects',
      ),
      dir(
        'open-source',
        openSource.map((o) =>
          file(`${slug(o.name)}.md`, [`# ${o.name}${o.stars ? ` (${o.stars} stars)` : ''}`, '', o.desc, ...(o.href ? ['', `Link: ${o.href}`] : [])].join('\n'), {
            href: o.href || undefined,
          }),
        ),
        '/#open-source',
      ),
      dir(
        'stack',
        stackCategories.map((c) => file(`${slug(c.label)}.txt`, c.skills.join('\n'))),
        '/stack',
      ),
      dir(
        'contact',
        [
          file('email.txt', personal.email, { href: `mailto:${personal.email}` }),
          file('phone.txt', personal.phoneDisplay, { href: `tel:${personal.phone}` }),
          file('links.txt', socials.map((s) => `${s.label}: ${s.href}`).join('\n')),
        ],
        '/contact',
      ),
      dir('cv', [file('cv.pdf', '', { binary: true, href: CV_PDF_URL })], CV_PAGE_URL),
    ],
    '/',
  );
  return dir('', [
    dir('bin', commandNames.map((n) => file(n, '', { binary: true }))),
    dir('etc', [file('hostname', 'london'), file('motd', 'Welcome to ayoola os. Every file here is built from the live portfolio data.')]),
    dir('home', [home]),
  ]);
}

export const display = (path: string) => (path === HOME ? '~' : path.startsWith(`${HOME}/`) ? `~${path.slice(HOME.length)}` : path || '/');

export function resolve(cwd: string, input: string | undefined, prev = cwd): string {
  if (!input || input === '~') return HOME;
  if (input === '-') return prev;
  let raw = input.startsWith('~') ? HOME + input.slice(1) : input.startsWith('/') ? input : `${cwd}/${input}`;
  raw = raw.replace(/\/+/g, '/');
  const out: string[] = [];
  for (const part of raw.split('/')) {
    if (!part || part === '.') continue;
    if (part === '..') out.pop();
    else out.push(part);
  }
  return `/${out.join('/')}`;
}

export function lookup(root: FsDir, path: string): FsNode | null {
  if (path === '/') return root;
  let node: FsNode = root;
  for (const part of path.split('/').filter(Boolean)) {
    if (node.kind !== 'dir') return null;
    const next: FsNode | undefined = node.children.find((c) => c.name === part);
    if (!next) return null;
    node = next;
  }
  return node;
}

export function pageFor(root: FsDir, path: string): string | undefined {
  let p = path;
  while (p.startsWith(HOME)) {
    const node = lookup(root, p);
    if (node?.kind === 'dir' && node.page) return node.page;
    p = resolve(p, '..');
    if (p === '/home') break;
  }
  return undefined;
}

export function dirForPage(root: FsDir, pathname: string): string | undefined {
  const home = lookup(root, HOME) as FsDir;
  if (pathname === '/') return HOME;
  const match = home.children.find((c) => c.kind === 'dir' && c.page === pathname);
  return match ? `${HOME}/${match.name}` : undefined;
}

export const sizeOf = (n: FsNode) => (n.kind === 'dir' ? 4096 : n.binary ? 38846 : new TextEncoder().encode(n.content).length);

export const globToRegExp = (glob: string) =>
  new RegExp(`^${glob.replace(/[.+^${}()|[\]\\]/g, '\\$&').replace(/\*/g, '.*').replace(/\?/g, '.')}$`, 'i');

export function walk(node: FsNode, path: string, visit: (n: FsNode, p: string, depth: number) => void, depth = 0) {
  visit(node, path, depth);
  if (node.kind === 'dir')
    node.children
      .filter((c) => !c.name.startsWith('.'))
      .forEach((c) => walk(c, path === '/' ? `/${c.name}` : `${path}/${c.name}`, visit, depth + 1));
}

export type FsOp =
  | { op: 'write'; path: string; content: string }
  | { op: 'mkdir'; path: string }
  | { op: 'rm'; path: string }
  | { op: 'mv'; from: string; to: string }
  | { op: 'cp'; from: string; to: string };

const JOURNAL_KEY = 'ayoola-terminal-fs';

export const isWritable = (path: string) => path === HOME || path.startsWith(`${HOME}/`) || path === '/tmp' || path.startsWith('/tmp/');

const parentOf = (path: string) => resolve(path, '..');
const baseOf = (path: string) => path.split('/').filter(Boolean).pop() ?? '';

const clone = (n: FsNode): FsNode => (n.kind === 'dir' ? { ...n, children: n.children.map(clone) } : { ...n });

export type FsError = string | null;

export function applyOp(root: FsDir, op: FsOp): FsError {
  const dirAt = (p: string) => {
    const d = lookup(root, p);
    return d?.kind === 'dir' ? d : null;
  };
  switch (op.op) {
    case 'write': {
      const parent = dirAt(parentOf(op.path));
      if (!parent) return 'No such file or directory';
      const existing = parent.children.find((c) => c.name === baseOf(op.path));
      if (existing?.kind === 'dir') return 'Is a directory';
      if (existing) {
        existing.content = op.content;
        existing.ref = undefined;
        existing.binary = false;
      } else parent.children.push({ kind: 'file', name: baseOf(op.path), content: op.content });
      return null;
    }
    case 'mkdir': {
      const parent = dirAt(parentOf(op.path));
      if (!parent) return 'No such file or directory';
      if (parent.children.some((c) => c.name === baseOf(op.path))) return 'File exists';
      parent.children.push({ kind: 'dir', name: baseOf(op.path), children: [] });
      return null;
    }
    case 'rm': {
      const parent = dirAt(parentOf(op.path));
      const i = parent?.children.findIndex((c) => c.name === baseOf(op.path)) ?? -1;
      if (!parent || i < 0) return 'No such file or directory';
      parent.children.splice(i, 1);
      return null;
    }
    case 'mv':
    case 'cp': {
      const src = lookup(root, op.from);
      if (!src) return 'No such file or directory';
      const targetDir = dirAt(op.to);
      const dest = targetDir ? `${op.to === '/' ? '' : op.to}/${src.name}` : op.to;
      const parent = dirAt(parentOf(dest));
      if (!parent) return 'No such file or directory';
      if (dest === op.from || dest.startsWith(`${op.from}/`)) return 'cannot move a folder into itself';
      const copy = clone(src);
      copy.name = baseOf(dest);
      const existing = parent.children.findIndex((c) => c.name === copy.name);
      if (existing >= 0) parent.children.splice(existing, 1);
      parent.children.push(copy);
      if (op.op === 'mv') {
        const srcParent = dirAt(parentOf(op.from))!;
        srcParent.children.splice(srcParent.children.indexOf(src), 1);
      }
      return null;
    }
  }
}

export function loadJournal(): FsOp[] {
  try {
    const raw = window.localStorage.getItem(JOURNAL_KEY);
    return raw ? (JSON.parse(raw) as FsOp[]) : [];
  } catch {
    return [];
  }
}

export function saveJournal(ops: FsOp[]) {
  try {
    window.localStorage.setItem(JOURNAL_KEY, JSON.stringify(ops.slice(-500)));
  } catch {}
}

export function createFs(commandNames: string[]) {
  const fresh = () => {
    const root = buildFs(commandNames);
    root.children.push({ kind: 'dir', name: 'tmp', children: [] });
    return root;
  };
  let root = fresh();
  let journal = typeof window === 'undefined' ? [] : loadJournal();
  journal = journal.filter((op) => applyOp(root, op) === null);
  return {
    get root() {
      return root;
    },
    apply(op: FsOp): FsError {
      const paths = op.op === 'mv' || op.op === 'cp' ? [op.to, ...(op.op === 'mv' ? [op.from] : [])] : [op.path];
      if (paths.some((p) => !isWritable(p))) return 'Permission denied';
      const error = applyOp(root, op);
      if (!error) {
        journal.push(op);
        saveJournal(journal);
      }
      return error;
    },
    reset() {
      root = fresh();
      journal = [];
      saveJournal(journal);
    },
    get changes() {
      return journal.length;
    },
  };
}
