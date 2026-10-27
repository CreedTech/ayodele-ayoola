'use client';
import { useEffect, useRef, useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Copy01Icon, Tick02Icon } from '@hugeicons/core-free-icons';

export default function CopyButton({ value, label }: { value: string; label: string }) {
  const [copied, setCopied] = useState(false);
  const timer = useRef<number | null>(null);

  useEffect(
    () => () => {
      if (timer.current) window.clearTimeout(timer.current);
    },
    [],
  );

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      if (timer.current) window.clearTimeout(timer.current);
      timer.current = window.setTimeout(() => setCopied(false), 1500);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="copy-btn"
      data-copied={copied}
      aria-label={copied ? `${label} copied` : `Copy ${label}`}
      title={copied ? 'Copied' : `Copy ${label}`}
    >
      <style>{`
        .copy-btn { position: relative; display: inline-grid; place-items: center; width: 28px; height: 28px; padding: 0; border: 1px solid transparent; border-radius: 8px; background: transparent; color: var(--muted); cursor: pointer; transition: color .2s, background .2s, border-color .2s, transform .15s var(--ease-out); }
        .copy-btn:hover { color: var(--text); background: rgba(255,255,255,.06); border-color: rgba(255,255,255,.1); }
        .copy-btn:active { transform: scale(.88); }
        .copy-btn[data-copied="true"] { color: var(--accent); background: var(--accent-dim); border-color: rgba(34,197,94,.35); }
        .copy-btn > * { grid-area: 1 / 1; transition: opacity .2s, transform .3s var(--ease-out); }
        .copy-btn__tick { opacity: 0; transform: scale(.4) rotate(-30deg); }
        .copy-btn[data-copied="true"] .copy-btn__copy { opacity: 0; transform: scale(.4); }
        .copy-btn[data-copied="true"] .copy-btn__tick { opacity: 1; transform: none; }
      `}</style>
      <HugeiconsIcon icon={Copy01Icon} size={15} className="copy-btn__copy" aria-hidden="true" />
      <HugeiconsIcon icon={Tick02Icon} size={15} className="copy-btn__tick" aria-hidden="true" />
      <span aria-live="polite" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
        {copied ? 'Copied' : ''}
      </span>
    </button>
  );
}
