'use client';
import { useEffect, useRef, useState, useCallback } from 'react';
import { personal, socials } from '@/lib/data';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

const WELCOME: TerminalLine[] = [
  {
    type: 'system',
    content: '╔══════════════════════════════════════════════════╗',
  },
  {
    type: 'system',
    content: '║        AYOOLA.DEV - Portfolio Terminal v1.0      ║',
  },
  {
    type: 'system',
    content: '╚══════════════════════════════════════════════════╝',
  },
  { type: 'output', content: '' },
  {
    type: 'output',
    content: "Welcome. Type 'help' to see available commands.",
  },
  { type: 'output', content: '' },
];

const COMMANDS = [
  'help',
  'whoami',
  'ls',
  'cd',
  'skills',
  'open',
  'hire',
  'clear',
  'history',
  'echo',
  'date',
];

function runCommand(cmd: string, history: string[]): TerminalLine[] {
  const parts = cmd.trim().split(' ');
  const base = parts[0].toLowerCase();
  const args = parts.slice(1);

  switch (base) {
    case 'help':
      return [
        { type: 'output', content: '' },
        { type: 'output', content: '  whoami          Personal info' },
        { type: 'output', content: '  ls              List sections' },
        {
          type: 'output',
          content: '  cd [section]    Navigate (about / stack / work / home)',
        },
        { type: 'output', content: '  skills          Tech stack overview' },
        {
          type: 'output',
          content: '  open [target]   Open github / linkedin / email',
        },
        { type: 'output', content: '  hire            Availability info' },
        { type: 'output', content: '  history         Command history' },
        { type: 'output', content: '  date            Current date/time' },
        { type: 'output', content: '  clear           Clear terminal' },
        { type: 'output', content: '' },
      ];

    case 'whoami':
      return [
        { type: 'output', content: '' },
        { type: 'output', content: `  Name     : ${personal.name}` },
        { type: 'output', content: `  Title    : ${personal.title}` },
        { type: 'output', content: `  Location : ${personal.location}` },
        { type: 'output', content: `  Email    : ${personal.email}` },
        { type: 'output', content: `  GitHub   : github.com/creedtech` },
        { type: 'output', content: '' },
      ];

    case 'ls':
      return [
        { type: 'output', content: '' },
        {
          type: 'output',
          content: '  home/   about/   work/   stack/   contact/',
        },
        { type: 'output', content: '' },
      ];

    case 'cd': {
      const t = args[0]?.toLowerCase();
      const routes: Record<string, string> = {
        about: '/about',
        stack: '/stack',
        work: '/#work',
        home: '/',
        contact: '/contact',
      };
      if (!t) return [{ type: 'error', content: 'cd: missing argument' }];
      if (routes[t]) {
        setTimeout(() => {
          window.location.href = routes[t];
        }, 400);
        return [{ type: 'output', content: `Navigating to /${t}...` }];
      }
      return [{ type: 'error', content: `cd: no such section '${t}'` }];
    }

    case 'skills':
      return [
        { type: 'output', content: '' },
        {
          type: 'output',
          content:
            '  Frontend  : React, Next.js, TypeScript, Redux, Tailwind, GSAP, Three.js',
        },
        {
          type: 'output',
          content:
            '  Backend   : Node.js, Express, Python, GraphQL, WebSockets',
        },
        {
          type: 'output',
          content: '  Database  : PostgreSQL, MongoDB, Redis, Firebase',
        },
        { type: 'output', content: '  Mobile    : Flutter, React Native' },
        { type: 'output', content: '  Cloud     : AWS, Docker, Vercel, CI/CD' },
        {
          type: 'output',
          content: '  Payment   : Stripe, Flutterwave, Paystack, PayPal',
        },
        { type: 'output', content: '' },
      ];

    case 'open': {
      const t = args[0]?.toLowerCase();
      if (t === 'github') {
        setTimeout(
          () => window.open('https://github.com/creedtech', '_blank'),
          200,
        );
        return [{ type: 'output', content: 'Opening GitHub...' }];
      }
      if (t === 'linkedin') {
        const li = socials.find((s) => s.icon === 'linkedin');
        setTimeout(() => window.open(li?.href || '#', '_blank'), 200);
        return [{ type: 'output', content: 'Opening LinkedIn...' }];
      }
      if (t === 'email') {
        setTimeout(() => window.open(`mailto:${personal.email}`), 200);
        return [
          {
            type: 'output',
            content: `Composing email to ${personal.email}...`,
          },
        ];
      }
      return [
        {
          type: 'error',
          content: `open: unknown target '${t}'. Try: github, linkedin, email`,
        },
      ];
    }

    case 'hire':
      return [
        { type: 'output', content: '' },
        { type: 'output', content: '  Currently open to:' },
        {
          type: 'output',
          content: '    ▸ Software Developer / Senior Frontend roles',
        },
        { type: 'output', content: '    ▸ Freelance & contract projects' },
        {
          type: 'output',
          content: '    ▸ Technical consulting & design systems',
        },
        { type: 'output', content: '' },
        { type: 'output', content: `  Email: ${personal.email}` },
        { type: 'output', content: '  Location: London, UK (open to remote)' },
        { type: 'output', content: '' },
      ];

    case 'clear':
      return [{ type: 'system', content: '__CLEAR__' }];

    case 'history':
      if (!history.length)
        return [{ type: 'output', content: '  No history yet.' }];
      return [
        { type: 'output', content: '' },
        ...history.map((c, i) => ({
          type: 'output' as const,
          content: `  ${String(i + 1).padStart(3)} ${c}`,
        })),
        { type: 'output', content: '' },
      ];

    case 'echo':
      return [{ type: 'output', content: args.join(' ') }];

    case 'date':
      return [
        {
          type: 'output',
          content: `  ${new Date().toLocaleString('en-GB', { dateStyle: 'full', timeStyle: 'medium' })}`,
        },
      ];

    case '':
      return [];

    default:
      return [{ type: 'error', content: `command not found: ${base}` }];
  }
}

export default function Terminal() {
  const [open, setOpen] = useState(false);
  const [lines, setLines] = useState<TerminalLine[]>(WELCOME);
  const [input, setInput] = useState('');
  const [cmdHistory, setCmdHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [suggestion, setSuggestion] = useState('');
  // drag state - null means "centered via CSS"
  const [dragPos, setDragPos] = useState<{ x: number; y: number } | null>(null);
  const [dragging, setDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const outputRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll output on new lines
  useEffect(() => {
    const el = outputRef.current;
    if (el) el.scrollTop = el.scrollHeight;
  }, [lines]);

  // Focus input on open
  useEffect(() => {
    if (open) setTimeout(() => inputRef.current?.focus(), 30);
  }, [open]);

  // Global backtick toggle - use e.code for reliable detection across locales
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.code !== 'Backquote') return;
      const tag = (
        document.activeElement as HTMLElement
      )?.tagName?.toLowerCase();
      if (tag === 'input' || tag === 'textarea') return;
      e.preventDefault();
      setOpen((o) => {
        if (!o) setDragPos(null); // re-center on open
        return !o;
      });
    };
    const openHandler = () => {
      setDragPos(null);
      setOpen(true);
    };
    window.addEventListener('keydown', handler);
    window.addEventListener('open-terminal', openHandler);
    return () => {
      window.removeEventListener('keydown', handler);
      window.removeEventListener('open-terminal', openHandler);
    };
  }, []);

  // Tab suggestion
  const updateSuggestion = useCallback((val: string) => {
    const base = val.split(' ')[0].toLowerCase();
    if (!val) {
      setSuggestion('');
      return;
    }
    const match = COMMANDS.find((c) => c.startsWith(base) && c !== base);
    setSuggestion(match ? match.slice(base.length) : '');
  }, []);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const cmd = input.trim();
      const result = runCommand(cmd, cmdHistory);
      if (result.length === 1 && result[0].content === '__CLEAR__') {
        setLines(WELCOME);
      } else {
        setLines((prev) => [
          ...prev,
          { type: 'input', content: cmd },
          ...result,
        ]);
      }
      if (cmd) setCmdHistory((prev) => [...prev, cmd]);
      setInput('');
      setSuggestion('');
      setHistoryIndex(-1);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      const i = Math.min(historyIndex + 1, cmdHistory.length - 1);
      setHistoryIndex(i);
      const v = cmdHistory[cmdHistory.length - 1 - i] || '';
      setInput(v);
      updateSuggestion(v);
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      const i = Math.max(historyIndex - 1, -1);
      setHistoryIndex(i);
      const v = i === -1 ? '' : cmdHistory[cmdHistory.length - 1 - i] || '';
      setInput(v);
      updateSuggestion(v);
    } else if (e.key === 'Tab') {
      e.preventDefault();
      if (suggestion) {
        setInput(input + suggestion);
        setSuggestion('');
      }
    } else if (e.key === 'Escape') {
      setOpen(false);
    }
  };

  // Drag
  const onMouseDownHeader = (e: React.MouseEvent) => {
    const rect = (
      e.currentTarget.parentElement as HTMLElement
    ).getBoundingClientRect();
    setDragPos({ x: rect.left, y: rect.top });
    setDragging(true);
    dragOffset.current = { x: e.clientX - rect.left, y: e.clientY - rect.top };
  };

  useEffect(() => {
    if (!dragging) return;
    const onMove = (e: MouseEvent) => {
      setDragPos({
        x: Math.max(
          0,
          Math.min(window.innerWidth - 640, e.clientX - dragOffset.current.x),
        ),
        y: Math.max(
          0,
          Math.min(window.innerHeight - 440, e.clientY - dragOffset.current.y),
        ),
      });
    };
    const onUp = () => setDragging(false);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onUp);
    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseup', onUp);
    };
  }, [dragging]);

  const lineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'input':
        return 'var(--text)';
      case 'output':
        return '#4ade80';
      case 'error':
        return '#f87171';
      case 'system':
        return '#22c55e';
    }
  };

  if (!open) return null;

  const isCentered = dragPos === null;

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={() => setOpen(false)}
        style={{ position: 'fixed', inset: 0, zIndex: 7999 }}
      />

      {/* Centering wrapper (only when not dragged) */}
      {isCentered ? (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 8000,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            pointerEvents: 'none',
          }}
        >
          <TerminalWindow
            lines={lines}
            input={input}
            suggestion={suggestion}
            dragging={dragging}
            outputRef={outputRef}
            inputRef={inputRef}
            onMouseDownHeader={onMouseDownHeader}
            handleKeyDown={handleKeyDown}
            setInput={setInput}
            updateSuggestion={updateSuggestion}
            setOpen={setOpen}
            lineColor={lineColor}
          />
        </div>
      ) : (
        <div
          style={{
            position: 'fixed',
            left: dragPos.x,
            top: dragPos.y,
            zIndex: 8000,
          }}
        >
          <TerminalWindow
            lines={lines}
            input={input}
            suggestion={suggestion}
            dragging={dragging}
            outputRef={outputRef}
            inputRef={inputRef}
            onMouseDownHeader={onMouseDownHeader}
            handleKeyDown={handleKeyDown}
            setInput={setInput}
            updateSuggestion={updateSuggestion}
            setOpen={setOpen}
            lineColor={lineColor}
          />
        </div>
      )}
    </>
  );
}

interface TWProps {
  lines: TerminalLine[];
  input: string;
  suggestion: string;
  dragging: boolean;
  outputRef: React.RefObject<HTMLDivElement | null>;
  inputRef: React.RefObject<HTMLInputElement | null>;
  onMouseDownHeader: (e: React.MouseEvent) => void;
  handleKeyDown: (e: React.KeyboardEvent<HTMLInputElement>) => void;
  setInput: (v: string) => void;
  updateSuggestion: (v: string) => void;
  setOpen: (v: boolean) => void;
  lineColor: (t: TerminalLine['type']) => string;
}

function TerminalWindow({
  lines,
  input,
  suggestion,
  dragging,
  outputRef,
  inputRef,
  onMouseDownHeader,
  handleKeyDown,
  setInput,
  updateSuggestion,
  setOpen,
  lineColor,
}: TWProps) {
  return (
    <div
      style={{
        width: 'min(640px, calc(100vw - 24px))',
        height: 440,
        background: '#0a0a0a',
        border: '1px solid rgba(255,255,255,0.14)',
        borderRadius: 12,
        boxShadow: '0 40px 100px rgba(0,0,0,0.85)',
        display: 'flex',
        flexDirection: 'column',
        fontFamily: "'SF Mono','Monaco','Cascadia Code','Fira Code',monospace",
        fontSize: 13,
        animation: 'termFadeIn 0.15s ease',
        userSelect: dragging ? 'none' : 'auto',
        pointerEvents: 'auto',
      }}
    >
      <style>{`
          @keyframes termFadeIn {
            from { opacity: 0; transform: translateY(8px); }
            to   { opacity: 1; transform: translateY(0); }
          }
          .term-out::-webkit-scrollbar { width: 4px; }
          .term-out::-webkit-scrollbar-track { background: transparent; }
          .term-out::-webkit-scrollbar-thumb { background: rgba(255,255,255,.12); border-radius: 4px; }
        `}</style>

      {/* Title bar */}
      <div
        onMouseDown={onMouseDownHeader}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          padding: '10px 16px',
          background: '#111',
          borderBottom: '1px solid rgba(255,255,255,0.07)',
          borderRadius: '12px 12px 0 0',
          cursor: 'grab',
          flexShrink: 0,
        }}
      >
        <div style={{ display: 'flex', gap: 7, alignItems: 'center' }}>
          <button
            onClick={() => setOpen(false)}
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#ff5f57',
              border: 'none',
              cursor: 'pointer',
              padding: 0,
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#febc2e',
            }}
          />
          <div
            style={{
              width: 12,
              height: 12,
              borderRadius: '50%',
              background: '#28c840',
            }}
          />
        </div>
        <span
          style={{
            fontSize: 11,
            color: 'rgba(255,255,255,.3)',
            letterSpacing: '.06em',
          }}
        >
          ayoola@portfolio ~ bash
        </span>
        <span style={{ fontSize: 10, color: 'rgba(255,255,255,.2)' }}>
          ` to close
        </span>
      </div>

      {/* Output */}
      <div
        ref={outputRef}
        className="term-out"
        style={{
          flex: 1,
          overflowY: 'scroll',
          overscrollBehavior: 'contain',
          padding: '14px 16px 6px',
          display: 'flex',
          flexDirection: 'column',
          gap: 1,
        }}
      >
        {lines.map((line, i) => (
          <div
            key={i}
            style={{ display: 'flex', gap: 8, alignItems: 'flex-start' }}
          >
            {line.type === 'input' && (
              <span
                style={{
                  color: '#22c55e',
                  flexShrink: 0,
                  userSelect: 'none',
                  lineHeight: 1.6,
                }}
              >
                ~ $
              </span>
            )}
            <span
              style={{
                color: lineColor(line.type),
                whiteSpace: 'pre',
                lineHeight: 1.6,
              }}
            >
              {line.content}
            </span>
          </div>
        ))}
      </div>

      {/* Input row */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: 8,
          padding: '10px 16px 14px',
          borderTop: '1px solid rgba(255,255,255,.06)',
          flexShrink: 0,
        }}
      >
        <span
          style={{
            color: '#22c55e',
            flexShrink: 0,
            userSelect: 'none',
            lineHeight: 1,
          }}
        >
          ~ $
        </span>
        <div
          style={{
            position: 'relative',
            flex: 1,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => {
              setInput(e.target.value);
              updateSuggestion(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            style={{
              background: 'transparent',
              border: 'none',
              outline: 'none',
              color: 'var(--text)',
              fontFamily: 'inherit',
              fontSize: 'inherit',
              width: '100%',
              caretColor: '#22c55e',
            }}
            autoComplete="off"
            spellCheck={false}
            placeholder="type a command..."
          />
          {suggestion && (
            <span
              style={{
                position: 'absolute',
                left: `${input.length}ch`,
                color: 'rgba(255,255,255,.22)',
                pointerEvents: 'none',
                userSelect: 'none',
              }}
            >
              {suggestion}
            </span>
          )}
        </div>
      </div>
    </div>
  );
}
