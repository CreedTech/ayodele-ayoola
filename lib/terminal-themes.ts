export type TerminalTheme = {
  bg: string;
  fg: string;
  muted: string;
  dim: string;
  accent: string;
  hash: string;
  error: string;
  border: string;
  chrome: string;
  mark: string;
};

export const THEMES: Record<string, TerminalTheme> = {
  default: { bg: 'rgba(12,12,12,.94)', fg: '#ffffff', muted: '#a1a1aa', dim: '#52525b', accent: '#4ade80', hash: '#facc15', error: '#ff7b72', border: 'rgba(255,255,255,.12)', chrome: 'rgba(255,255,255,.03)', mark: 'rgba(255,255,255,.22)' },
  matrix: { bg: 'rgba(0,10,2,.96)', fg: '#3dff74', muted: '#1fa347', dim: '#0f5a26', accent: '#a8ffbe', hash: '#c8ffd4', error: '#ff6b6b', border: 'rgba(61,255,116,.2)', chrome: 'rgba(61,255,116,.05)', mark: 'rgba(61,255,116,.25)' },
  amber: { bg: 'rgba(18,11,2,.96)', fg: '#ffb000', muted: '#b37a00', dim: '#5c3f00', accent: '#ffd27a', hash: '#ffe0a3', error: '#ff6b4a', border: 'rgba(255,176,0,.22)', chrome: 'rgba(255,176,0,.05)', mark: 'rgba(255,176,0,.25)' },
  dracula: { bg: 'rgba(40,42,54,.97)', fg: '#f8f8f2', muted: '#8b93c4', dim: '#4b5070', accent: '#50fa7b', hash: '#f1fa8c', error: '#ff5555', border: 'rgba(189,147,249,.25)', chrome: 'rgba(189,147,249,.06)', mark: 'rgba(189,147,249,.3)' },
  nord: { bg: 'rgba(46,52,64,.97)', fg: '#eceff4', muted: '#81a1c1', dim: '#4c566a', accent: '#a3be8c', hash: '#ebcb8b', error: '#bf616a', border: 'rgba(136,192,208,.22)', chrome: 'rgba(136,192,208,.06)', mark: 'rgba(136,192,208,.28)' },
  solarized: { bg: 'rgba(0,43,54,.97)', fg: '#eee8d5', muted: '#93a1a1', dim: '#586e75', accent: '#859900', hash: '#b58900', error: '#dc322f', border: 'rgba(147,161,161,.22)', chrome: 'rgba(147,161,161,.06)', mark: 'rgba(181,137,0,.3)' },
  paper: { bg: 'rgba(250,250,249,.97)', fg: '#18181b', muted: '#71717a', dim: '#a1a1aa', accent: '#15803d', hash: '#a16207', error: '#dc2626', border: 'rgba(0,0,0,.14)', chrome: 'rgba(0,0,0,.03)', mark: 'rgba(0,0,0,.12)' },
};

export const themeVars = (t: TerminalTheme): Record<string, string> => ({
  '--tm-bg': t.bg,
  '--tm-fg': t.fg,
  '--tm-muted': t.muted,
  '--tm-dim': t.dim,
  '--tm-accent': t.accent,
  '--tm-hash': t.hash,
  '--tm-error': t.error,
  '--tm-border': t.border,
  '--tm-chrome': t.chrome,
  '--tm-mark': t.mark,
});
