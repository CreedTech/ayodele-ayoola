'use client';
import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { usePathname, useRouter } from 'next/navigation';
import { AnimatePresence, motion, useDragControls } from 'motion/react';
import TerminalOutput from '@/components/TerminalOutput';
import LocalTime from '@/components/LocalTime';
import { STARTERS, complete, isKnownCommand, run, tokenize, type Block, type Ctx } from '@/lib/terminal';

type Entry = { id: number; block: Block };

const HISTORY_KEY = 'ayoola-terminal-history';
const WELCOME: Block[] = [
  { t: 'text', text: 'ayoola os, interactive shell. Every command reads the real portfolio data.', tone: 'strong' },
  { t: 'chips', label: 'Try', items: STARTERS.map((s) => ({ label: s, run: s })) },
];

const loadHistory = (): string[] => {
  try {
    const raw = window.localStorage.getItem(HISTORY_KEY);
    return raw ? (JSON.parse(raw) as string[]).slice(-100) : [];
  } catch {
    return [];
  }
};

export default function Terminal() {
  const router = useRouter();
  const pathname = usePathname();
  const dragControls = useDragControls();
  const [open, setOpen] = useState(false);
  const [full, setFull] = useState(false);
  const [entries, setEntries] = useState<Entry[]>(() => WELCOME.map((block, i) => ({ id: i, block })));
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<string[]>(loadHistory);
  const [cursor, setCursor] = useState<number | null>(null);
  const [cycle, setCycle] = useState<{ base: string; i: number } | null>(null);
  const nextId = useRef(WELCOME.length);
  const inputRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLDivElement>(null);
  const constraintsRef = useRef<HTMLDivElement>(null);

  const push = useCallback((blocks: Block[]) => {
    setEntries((prev) => [...prev, ...blocks.map((block) => ({ id: nextId.current++, block }))]);
  }, []);

  const openUrl = useCallback(
    (url: string) => {
      if (url.startsWith('/') && !url.endsWith('.pdf')) router.push(url);
      else if (url.startsWith('mailto:') || url.startsWith('tel:')) window.location.href = url;
      else window.open(url, '_blank', 'noopener,noreferrer');
    },
    [router],
  );

  const copy = useCallback((text: string) => {
    navigator.clipboard?.writeText(text).catch(() => {});
  }, []);

  const execute = useCallback(
    (line: string) => {
      const trimmed = line.trim();
      const ctx: Ctx = {
        path: pathname,
        history,
        navigate: (p) => router.push(p),
        open: openUrl,
        copy,
        clear: () => setEntries([]),
        close: () => setOpen(false),
      };
      const echo: Block = { t: 'input', text: trimmed, path: pathname };
      if (!trimmed) {
        push([echo]);
        return;
      }
      const isClear = tokenize(trimmed)[0]?.toLowerCase() === 'clear';
      const out = run(trimmed, ctx);
      if (!isClear) push([echo, ...out]);
      setHistory((h) => {
        const next = h[h.length - 1] === trimmed ? h : [...h, trimmed].slice(-100);
        try {
          window.localStorage.setItem(HISTORY_KEY, JSON.stringify(next));
        } catch {}
        return next;
      });
      setInput('');
      setCursor(null);
      setCycle(null);
    },
    [copy, history, openUrl, pathname, push, router],
  );

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const typing = ['input', 'textarea'].includes((document.activeElement?.tagName ?? '').toLowerCase());
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === '`' && !typing) {
        e.preventDefault();
        setOpen((o) => !o);
      }
    };
    const onOpen = () => setOpen(true);
    window.addEventListener('keydown', onKey);
    window.addEventListener('open-terminal', onOpen);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('open-terminal', onOpen);
    };
  }, []);

  useEffect(() => {
    if (open) requestAnimationFrame(() => inputRef.current?.focus());
  }, [open]);

  useEffect(() => {
    const el = bodyRef.current;
    if (el) el.scrollTo({ top: el.scrollHeight });
  }, [entries]);

  const suggestions = useMemo(() => (input ? complete(input) : []), [input]);
  const ghost = suggestions[0]?.toLowerCase().startsWith(input.toLowerCase()) ? suggestions[0].slice(input.length) : '';
  const words = input.match(/^(\s*)(\S*)([\s\S]*)$/) ?? ['', '', '', ''];
  const known = isKnownCommand(words[2].toLowerCase());

  const onInputKey = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      execute(input);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      const base = cycle?.base ?? input;
      const options = complete(base);
      if (!options.length) return;
      const i = cycle ? (cycle.i + 1) % options.length : 0;
      const pick = options[i];
      setInput(options.length === 1 && !pick.includes(' ') ? `${pick} ` : pick);
      setCycle(options.length > 1 ? { base, i } : null);
    } else if (e.key === 'ArrowRight' && ghost && inputRef.current?.selectionStart === input.length) {
      e.preventDefault();
      setInput(input + ghost);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (!history.length) return;
      const next = cursor === null ? history.length - 1 : Math.max(0, cursor - 1);
      setCursor(next);
      setInput(history[next]);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (cursor === null) return;
      const next = cursor + 1;
      if (next >= history.length) {
        setCursor(null);
        setInput('');
      } else {
        setCursor(next);
        setInput(history[next]);
      }
    } else if (e.ctrlKey && e.key.toLowerCase() === 'l') {
      e.preventDefault();
      setEntries([]);
    } else if (e.ctrlKey && e.key.toLowerCase() === 'c') {
      e.preventDefault();
      push([{ t: 'input', text: `${input}^C`, path: pathname }]);
      setInput('');
    } else if (e.ctrlKey && e.key.toLowerCase() === 'u') {
      e.preventDefault();
      setInput('');
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  const handlers = useMemo(
    () => ({
      onRun: (cmd: string) => {
        execute(cmd);
        inputRef.current?.focus();
      },
      onOpen: openUrl,
      onCopy: (text: string) => {
        copy(text);
        push([{ t: 'text', text: `Copied ${text}`, tone: 'ok' }]);
      },
    }),
    [copy, execute, openUrl, push],
  );

  const path = pathname === '/' ? '~' : `~${pathname}`;

  return (
    <div ref={constraintsRef} className="tm-layer">
      <style>{TERMINAL_CSS}</style>
      <AnimatePresence>
        {open && (
          <motion.section
            key="terminal"
            role="dialog"
            aria-label="Terminal"
            className={`tm${full ? ' tm--full' : ''}`}
            drag={!full}
            dragListener={false}
            dragControls={dragControls}
            dragMomentum={false}
            dragConstraints={constraintsRef}
            dragElastic={0.04}
            initial={{ opacity: 0, scale: 0.96, y: 16, filter: 'blur(6px)' }}
            animate={{ opacity: 1, scale: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, scale: 0.97, y: 10, filter: 'blur(4px)' }}
            transition={{ type: 'spring', stiffness: 420, damping: 34 }}
            layout
          >
            <header className="tm-bar" onPointerDown={(e) => !full && dragControls.start(e)} onDoubleClick={() => setFull((f) => !f)}>
              <div className="tm-lights">
                <button type="button" aria-label="Close terminal" className="tm-light tm-light--close" onClick={() => setOpen(false)} />
                <button type="button" aria-label="Clear terminal" className="tm-light tm-light--min" onClick={() => setEntries([])} />
                <button type="button" aria-label={full ? 'Exit full screen' : 'Full screen'} className="tm-light tm-light--max" onClick={() => setFull((f) => !f)} />
              </div>
              <div className="tm-title">ayoola@london: {path}</div>
              <kbd className="tm-kbd">⌘K</kbd>
            </header>

            <div
              ref={bodyRef}
              className="tm-body"
              onMouseUp={() => {
                if (!window.getSelection()?.toString()) inputRef.current?.focus();
              }}
            >
              {entries.map((e) => (
                <motion.div key={e.id} initial={{ opacity: 0, y: 4 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.18 }}>
                  <TerminalOutput block={e.block} h={handlers} />
                </motion.div>
              ))}

              <div className="tm-line tm-inputline">
                <span className="tm-prompt">
                  ayoola@london <span className="tm-path">{path}</span> %
                </span>
                <div className="tm-field">
                  <div className="tm-mirror" aria-hidden="true">
                    <span>{words[1]}</span>
                    <span className={words[2] ? (known ? 'tm-cmd' : 'tm-cmd tm-cmd--bad') : ''}>{words[2]}</span>
                    <span className="tm-args">{words[3]}</span>
                    <span className="tm-ghost">{ghost}</span>
                  </div>
                  <input
                    ref={inputRef}
                    value={input}
                    onChange={(e) => {
                      setInput(e.target.value);
                      setCycle(null);
                      setCursor(null);
                    }}
                    onKeyDown={onInputKey}
                    spellCheck={false}
                    autoComplete="off"
                    autoCapitalize="off"
                    aria-label="Command"
                  />
                </div>
              </div>
              {suggestions.length > 1 && (
                <div className="tm-suggest" aria-live="polite">
                  {suggestions.slice(0, 12).map((s, i) => (
                    <button
                      key={s}
                      type="button"
                      className={`tm-chip${cycle && complete(cycle.base)[cycle.i] === s ? ' is-active' : ''}`}
                      onClick={() => {
                        setInput(s);
                        inputRef.current?.focus();
                      }}
                      style={{ ['--i' as string]: i }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>

            <footer className="tm-status">
              <span>{path}</span>
              <span>
                London <LocalTime />
              </span>
              <span className="tm-status__hint">Tab complete · ↑↓ history · Esc close</span>
            </footer>
          </motion.section>
        )}
      </AnimatePresence>
    </div>
  );
}

const TERMINAL_CSS = `
.tm-layer { position: fixed; inset: 12px; z-index: 9000; pointer-events: none; display: grid; place-items: center; }
.tm { pointer-events: auto; width: min(760px, 100%); height: min(520px, 100%); display: flex; flex-direction: column; border-radius: 16px; overflow: hidden; background: rgba(12,12,12,.94); backdrop-filter: blur(18px) saturate(140%); -webkit-backdrop-filter: blur(18px) saturate(140%); border: 1px solid rgba(255,255,255,.12); box-shadow: 0 40px 120px rgba(0,0,0,.65), 0 0 0 1px rgba(0,0,0,.6); color: #fff; font: 13.5px/1.6 ui-monospace, 'SF Mono', 'JetBrains Mono', Menlo, monospace; }
.tm--full { width: 100%; height: 100%; }
.tm-bar { position: relative; display: flex; align-items: center; gap: 12px; height: 40px; padding: 0 14px; border-bottom: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.03); cursor: grab; user-select: none; touch-action: none; }
.tm--full .tm-bar { cursor: default; }
.tm-bar:active { cursor: grabbing; }
.tm-lights { display: flex; gap: 8px; }
.tm-light { width: 12px; height: 12px; padding: 0; border: 0; border-radius: 50%; cursor: pointer; transition: transform .15s, filter .15s; }
.tm-light:hover { filter: brightness(1.15); transform: scale(1.12); }
.tm-light:active { transform: scale(.9); }
.tm-light--close { background: #ff5f57; }
.tm-light--min { background: #febc2e; }
.tm-light--max { background: #28c840; }
.tm-title { position: absolute; left: 50%; transform: translateX(-50%); font-size: 12.5px; color: #d4d4d8; white-space: nowrap; }
.tm-kbd { margin-left: auto; padding: 1px 6px; border: 1px solid rgba(255,255,255,.14); border-radius: 6px; font: inherit; font-size: 11.5px; color: #d4d4d8; }
.tm-body { flex: 1; overflow-y: auto; padding: 14px 18px 18px; overscroll-behavior: contain; scrollbar-width: thin; }
.tm-line { margin: 2px 0; white-space: pre-wrap; word-break: break-word; }
.tm-plain { color: #fff; }
.tm-strong { color: #fff; font-weight: 600; }
.tm-muted { color: #a1a1aa; }
.tm-error { color: #ff7b72; }
.tm-ok { color: #4ade80; }
.tm-prompt { color: #fff; font-weight: 600; white-space: nowrap; }
.tm-path { color: #a1a1aa; font-weight: 400; }
.tm-rerun { padding: 0; border: 0; background: none; color: #fff; font: inherit; cursor: pointer; text-align: left; }
.tm-rerun:hover { text-decoration: underline; text-underline-offset: 3px; }
.tm-inputline { display: flex; gap: 8px; align-items: baseline; margin-top: 6px; }
.tm-field { position: relative; flex: 1; min-width: 0; }
.tm-field input, .tm-mirror { font: inherit; letter-spacing: normal; padding: 0; margin: 0; border: 0; white-space: pre; }
.tm-field input { position: relative; width: 100%; background: transparent; color: transparent; caret-color: #fff; outline: none; }
.tm-mirror { position: absolute; inset: 0; pointer-events: none; overflow: hidden; color: #fff; }
.tm-cmd { color: #fff; font-weight: 700; }
.tm-cmd--bad { color: #ff7b72; font-weight: 400; }
.tm-args { color: #d4d4d8; }
.tm-ghost { color: #52525b; }
.tm-chips, .tm-suggest { display: flex; flex-wrap: wrap; align-items: center; gap: 6px; margin: 6px 0 10px; }
.tm-chip { padding: 2px 10px; border: 1px solid rgba(255,255,255,.14); border-radius: 8px; background: rgba(255,255,255,.04); color: #fff; font: inherit; font-size: 12.5px; cursor: pointer; transition: background .15s, border-color .15s, transform .15s; }
.tm-chip:hover, .tm-chip.is-active { background: rgba(255,255,255,.12); border-color: rgba(255,255,255,.3); }
.tm-chip:active { transform: scale(.95); }
.tm-link { padding: 0; border: 0; background: none; color: #fff; font: inherit; font-weight: 600; cursor: pointer; text-decoration: underline; text-decoration-thickness: 2px; text-underline-offset: 3px; text-decoration-color: rgba(255,255,255,.4); }
.tm-link:hover { text-decoration-color: #fff; }
.tm-icon { display: inline-grid; place-items: center; width: 22px; height: 22px; margin-left: 6px; padding: 0; border: 0; border-radius: 6px; background: none; color: #a1a1aa; cursor: pointer; vertical-align: -5px; }
.tm-icon:hover { background: rgba(255,255,255,.1); color: #fff; }
.tm-rows { margin: 6px 0 10px; display: grid; gap: 2px; }
.tm-rows > div { display: grid; grid-template-columns: 22ch 1fr; gap: 12px; }
.tm-rows--wide > div { grid-template-columns: 20ch 1fr; padding: 3px 0; }
.tm-rows dt { color: #a1a1aa; }
.tm-rows dd { margin: 0; color: #fff; }
.tm-list { list-style: none; margin: 6px 0 10px; padding: 0; }
.tm-list__row { display: grid; grid-template-columns: 22px minmax(0, 1fr) auto; grid-template-areas: "logo title meta" "logo sub meta"; column-gap: 12px; align-items: center; width: 100%; padding: 6px 8px; margin: 0 -8px; border: 0; border-radius: 10px; background: none; color: inherit; font: inherit; text-align: left; }
button.tm-list__row { cursor: pointer; transition: background .15s; }
button.tm-list__row:hover { background: rgba(255,255,255,.07); }
.tm-list__row > :first-child { grid-area: logo; }
.tm-list__title { grid-area: title; color: #fff; font-weight: 600; }
.tm-list__sub { grid-area: sub; color: #a1a1aa; font-size: 12.5px; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tm-list__meta { grid-area: meta; color: #a1a1aa; font-size: 12px; }
.tm-mark { background: rgba(255,255,255,.22); color: #fff; font-weight: 700; border-radius: 3px; padding: 0 2px; }
.tm-matches { list-style: none; margin: 6px 0 10px; padding: 0; display: grid; gap: 2px; }
.tm-matches button { display: grid; grid-template-columns: 20ch 1fr; gap: 12px; width: 100%; padding: 4px 8px; margin: 0 -8px; border: 0; border-radius: 8px; background: none; color: #d4d4d8; font: inherit; text-align: left; cursor: pointer; }
.tm-matches button:hover { background: rgba(255,255,255,.07); }
.tm-matches__src { color: #fff; font-weight: 600; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; }
.tm-git { list-style: none; margin: 6px 0 10px; padding: 0; display: grid; gap: 14px; }
.tm-git--oneline { gap: 2px; }
.tm-hash { color: #facc15; }
.tm-ref { color: #4ade80; font-weight: 600; }
.tm-git__msg { margin-top: 8px; padding-left: 4ch; color: #fff; font-weight: 600; }
.tm-git__body { padding-left: 4ch; color: #a1a1aa; }
.tm-bars { margin: 8px 0 12px; }
.tm-bars__axis { position: relative; height: 18px; margin: 0 20ch 0 24ch; color: #a1a1aa; font-size: 11.5px; }
.tm-bars__axis span { position: absolute; transform: translateX(-50%); }
.tm-bars__row { display: grid; grid-template-columns: 24ch 1fr 20ch; align-items: center; gap: 0; height: 22px; }
.tm-bars__label { color: #fff; overflow: hidden; text-overflow: ellipsis; white-space: nowrap; padding-right: 10px; }
.tm-bars__track { position: relative; height: 10px; border-radius: 3px; background: repeating-linear-gradient(90deg, rgba(255,255,255,.06) 0 1px, transparent 1px 6px); }
.tm-bars__bar { position: absolute; top: 0; bottom: 0; border-radius: 3px; background: repeating-linear-gradient(90deg, #fff 0 4px, transparent 4px 6px); transform-origin: left; }
.tm-bars__bar.is-current { background: repeating-linear-gradient(90deg, #4ade80 0 4px, transparent 4px 6px); }
.tm-bars__period { padding-left: 10px; color: #a1a1aa; font-size: 12px; white-space: nowrap; }
.tm-neo { display: grid; grid-template-columns: 132px 1fr; gap: 20px; align-items: start; margin: 8px 0 12px; }
.tm-neo__img { width: 132px; height: 132px; border-radius: 50%; }
.tm-neo__title { font-weight: 700; color: #fff; }
.tm-neo__rule { width: 13ch; height: 1px; margin: 4px 0 8px; background: rgba(255,255,255,.35); }
.tm-neo .tm-rows { margin: 0; }
.tm-neo .tm-rows > div { grid-template-columns: 12ch 1fr; }
.tm-neo .tm-rows dt { color: #fff; font-weight: 600; }
.tm-neo .tm-rows dd { color: #d4d4d8; }
.tm-neo__swatches { display: flex; margin-top: 12px; }
.tm-neo__swatches span { width: 22px; height: 12px; }
.tm-status { display: flex; gap: 16px; align-items: center; height: 30px; padding: 0 14px; border-top: 1px solid rgba(255,255,255,.08); background: rgba(255,255,255,.02); color: #a1a1aa; font-size: 11.5px; }
.tm-status__hint { margin-left: auto; }
@media (prefers-reduced-motion: no-preference) {
  .tm-bars__bar { animation: tm-grow .7s cubic-bezier(.2,.7,.2,1) backwards; animation-delay: calc(var(--i, 0) * 70ms); }
  .tm-suggest .tm-chip { animation: tm-pop .18s ease-out backwards; animation-delay: calc(var(--i, 0) * 18ms); }
}
@keyframes tm-grow { from { transform: scaleX(0); } }
@keyframes tm-pop { from { opacity: 0; transform: translateY(3px); } }
@media (max-width: 640px) {
  .tm-layer { inset: auto 0 0 0; height: 82svh; }
  .tm { width: 100%; height: 100%; border-radius: 16px 16px 0 0; font-size: 12.5px; }
  .tm-title, .tm-status__hint { display: none; }
  .tm-rows > div, .tm-matches button { grid-template-columns: 1fr; gap: 0; }
  .tm-bars__row { grid-template-columns: 12ch 1fr; }
  .tm-bars__period { display: none; }
  .tm-bars__axis { margin: 0 0 0 12ch; }
  .tm-neo { grid-template-columns: 1fr; }
}
`;
