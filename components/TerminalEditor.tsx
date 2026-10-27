'use client';
import { useEffect, useLayoutEffect, useRef, useState } from 'react';

type Props = {
  mode: 'nano' | 'vim';
  name: string;
  initial: string;
  isNew: boolean;
  onSave: (text: string) => string | null;
  onExit: (message?: string) => void;
};

type VimMode = 'normal' | 'insert' | 'command';

const lineStart = (t: string, i: number) => t.lastIndexOf('\n', i - 1) + 1;
const lineEnd = (t: string, i: number) => {
  const e = t.indexOf('\n', i);
  return e < 0 ? t.length : e;
};

export default function TerminalEditor({ mode, name, initial, isNew, onSave, onExit }: Props) {
  const [text, setText] = useState(initial);
  const [saved, setSaved] = useState(initial);
  const [status, setStatus] = useState(isNew ? '[ New File ]' : `[ Read ${initial.split('\n').length} lines ]`);
  const [askSave, setAskSave] = useState(false);
  const [vim, setVim] = useState<VimMode>('normal');
  const [command, setCommand] = useState('');
  const [pending, setPending] = useState('');
  const [yank, setYank] = useState('');
  const [caret, setCaret] = useState(0);
  const undo = useRef<string[]>([]);
  const area = useRef<HTMLTextAreaElement>(null);
  const cmdRef = useRef<HTMLInputElement>(null);
  const pendingCaret = useRef<number | null>(null);

  useLayoutEffect(() => {
    const el = area.current;
    if (el && pendingCaret.current !== null) {
      el.setSelectionRange(pendingCaret.current, pendingCaret.current);
      pendingCaret.current = null;
    }
  });
  const modified = text !== saved;

  useEffect(() => {
    area.current?.focus();
    area.current?.setSelectionRange(0, 0);
  }, []);

  useEffect(() => {
    if (vim === 'command') cmdRef.current?.focus();
    else area.current?.focus();
  }, [vim]);

  const write = (): boolean => {
    const error = onSave(text);
    if (error) {
      setStatus(`[ Error writing ${name}: ${error} ]`);
      return false;
    }
    setSaved(text);
    setStatus(`[ Wrote ${text.split('\n').length} lines ]`);
    return true;
  };

  const place = (i: number, length = text.length) => {
    const el = area.current;
    if (!el) return;
    const pos = Math.max(0, Math.min(i, length));
    el.setSelectionRange(pos, pos);
    pendingCaret.current = pos;
    setCaret(pos);
  };

  const change = (next: string, pos: number) => {
    undo.current.push(text);
    setText(next);
    place(pos, next.length);
  };

  const nanoKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (askSave) {
      e.preventDefault();
      const k = e.key.toLowerCase();
      if (k === 'y') {
        if (write()) onExit(`Saved ${name}`);
      } else if (k === 'n') onExit();
      else if (k === 'escape' || (e.ctrlKey && k === 'c')) {
        setAskSave(false);
        setStatus('[ Cancelled ]');
      }
      return;
    }
    if (!e.ctrlKey) return;
    const k = e.key.toLowerCase();
    const el = e.currentTarget;
    if (k === 'o' || k === 's') {
      e.preventDefault();
      write();
    } else if (k === 'x') {
      e.preventDefault();
      if (modified) {
        setAskSave(true);
        setStatus('Save modified buffer?');
      } else onExit();
    } else if (k === 'k') {
      e.preventDefault();
      const s = lineStart(text, el.selectionStart);
      const end = Math.min(text.length, lineEnd(text, el.selectionStart) + 1);
      setYank(text.slice(s, end));
      change(text.slice(0, s) + text.slice(end), s);
    } else if (k === 'u') {
      e.preventDefault();
      const s = lineStart(text, el.selectionStart);
      change(text.slice(0, s) + yank + text.slice(s), s + yank.length);
    }
  };

  const runCommand = (raw: string) => {
    const c = raw.trim();
    setCommand('');
    setVim('normal');
    if (c === 'w') write();
    else if (c === 'q') {
      if (modified) setStatus('E37: No write since last change (add ! to override)');
      else onExit();
    } else if (c === 'q!') onExit();
    else if (c === 'wq' || c === 'x') {
      if (write()) onExit(`Saved ${name}`);
    } else if (/^\d+$/.test(c)) {
      const n = Number(c) - 1;
      const starts = [0, ...[...text.matchAll(/\n/g)].map((m) => (m.index ?? 0) + 1)];
      place(starts[Math.min(n, starts.length - 1)] ?? 0);
    } else setStatus(`E492: Not an editor command: ${c}`);
  };

  const vimKey = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    if (vim === 'insert') {
      if (e.key === 'Escape' || (e.ctrlKey && e.key === '[')) {
        e.preventDefault();
        setVim('normal');
        setStatus('');
        place(Math.max(lineStart(text, el.selectionStart), el.selectionStart - 1));
      }
      return;
    }
    if (e.metaKey || e.ctrlKey) return;
    e.preventDefault();
    const i = el.selectionStart;
    const s = lineStart(text, i);
    const end = lineEnd(text, i);
    const k = e.key;
    const combo = pending + k;
    setPending('');
    const toInsert = (pos: number) => {
      setVim('insert');
      setStatus('-- INSERT --');
      place(pos);
    };
    switch (combo) {
      case 'i':
        return toInsert(i);
      case 'a':
        return toInsert(Math.min(i + 1, end));
      case 'I':
        return toInsert(s);
      case 'A':
        return toInsert(end);
      case 'o':
        change(`${text.slice(0, end)}\n${text.slice(end)}`, end + 1);
        setVim('insert');
        return setStatus('-- INSERT --');
      case 'O':
        change(`${text.slice(0, s)}\n${text.slice(s)}`, s);
        setVim('insert');
        return setStatus('-- INSERT --');
      case 'h':
      case 'ArrowLeft':
        return place(Math.max(s, i - 1));
      case 'l':
      case 'ArrowRight':
        return place(Math.min(Math.max(s, end - 1), i + 1));
      case 'j':
      case 'ArrowDown': {
        if (end >= text.length) return;
        const ns = end + 1;
        return place(Math.min(ns + (i - s), lineEnd(text, ns)));
      }
      case 'k':
      case 'ArrowUp': {
        if (s === 0) return;
        const ps = lineStart(text, s - 1);
        return place(Math.min(ps + (i - s), s - 1));
      }
      case '0':
        return place(s);
      case '$':
        return place(Math.max(s, end - 1));
      case 'w': {
        const m = /\s\S/.exec(text.slice(i));
        return place(m ? i + m.index + 1 : text.length);
      }
      case 'b': {
        const before = text.slice(0, i).replace(/\S+\s*$/, '');
        return place(before.length);
      }
      case 'G':
        return place(lineStart(text, text.length));
      case 'gg':
        return place(0);
      case 'x':
        if (i < end) change(text.slice(0, i) + text.slice(i + 1), i);
        return;
      case 'dd': {
        const cut = Math.min(text.length, end + 1);
        setYank(text.slice(s, cut));
        return change(text.slice(0, s) + text.slice(cut), s);
      }
      case 'yy':
        setYank(text.slice(s, Math.min(text.length, end + 1)));
        return setStatus('1 line yanked');
      case 'p': {
        const at = Math.min(text.length, end + 1);
        const chunk = yank.endsWith('\n') || at === text.length ? yank : `${yank}\n`;
        return change(text.slice(0, at) + (at === text.length && !text.endsWith('\n') ? '\n' : '') + chunk, at);
      }
      case 'u': {
        const prev = undo.current.pop();
        if (prev !== undefined) {
          setText(prev);
          setStatus('1 change undone');
        } else setStatus('Already at oldest change');
        return;
      }
      case ':':
        setVim('command');
        return setStatus('');
      case 'g':
      case 'd':
      case 'y':
        return setPending(k);
      case 'Escape':
        return setStatus('');
    }
  };

  const line = text.slice(0, caret).split('\n').length;
  const col = caret - lineStart(text, caret) + 1;

  return (
    <div className={`tm-ed tm-ed--${mode}`}>
      {mode === 'nano' && (
        <div className="tm-ed__head">
          <span>GNU nano 7.2</span>
          <span>{name}</span>
          <span>{modified ? 'Modified' : ''}</span>
        </div>
      )}
      <textarea
        ref={area}
        className={`tm-ed__area${mode === 'vim' && vim !== 'insert' ? ' is-normal' : ''}`}
        value={text}
        spellCheck={false}
        onChange={(e) => {
          if (mode === 'vim' && vim !== 'insert') return;
          setText(e.target.value);
          setCaret(e.target.selectionStart);
        }}
        onSelect={(e) => setCaret(e.currentTarget.selectionStart)}
        onKeyDown={mode === 'nano' ? nanoKey : vimKey}
        aria-label={`Editing ${name}`}
      />
      {mode === 'nano' ? (
        <>
          <div className="tm-ed__status">{status}</div>
          <div className="tm-ed__keys">
            {askSave ? (
              <>
                <button type="button" onClick={() => write() && onExit(`Saved ${name}`)}><b>Y</b> Yes</button>
                <button type="button" onClick={() => onExit()}><b>N</b> No</button>
                <button type="button" onClick={() => setAskSave(false)}><b>^C</b> Cancel</button>
              </>
            ) : (
              <>
                <button type="button" onClick={() => write()}><b>^O</b> Write Out</button>
                <button type="button" onClick={() => (modified ? (setAskSave(true), setStatus('Save modified buffer?')) : onExit())}><b>^X</b> Exit</button>
                <span><b>^K</b> Cut</span>
                <span><b>^U</b> Paste</span>
              </>
            )}
          </div>
        </>
      ) : (
        <div className="tm-ed__vimbar">
          {vim === 'command' ? (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                runCommand(command);
              }}
            >
              :
              <input
                ref={cmdRef}
                value={command}
                onChange={(e) => setCommand(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setCommand('');
                    setVim('normal');
                  }
                }}
                aria-label="vim command"
              />
            </form>
          ) : (
            <span className={status.startsWith('E') ? 'tm-error' : ''}>{status || `"${name}"${isNew && !modified ? ' [New]' : ''}${modified ? ' [+]' : ''}`}</span>
          )}
          <span className="tm-ed__pos">
            {line},{col}
          </span>
        </div>
      )}
    </div>
  );
}
