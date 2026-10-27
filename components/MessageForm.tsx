'use client';
import { useState } from 'react';
import { HugeiconsIcon } from '@hugeicons/react';
import { Mail01Icon } from '@hugeicons/core-free-icons';
import { personal } from '@/lib/data';

export default function MessageForm() {
  const [form, setForm] = useState({ name: '', subject: '', message: '' });
  const [opened, setOpened] = useState(false);

  const set = (key: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
    setForm((f) => ({ ...f, [key]: e.target.value }));

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `${form.message}\n\n${form.name}`;
    window.location.href = `mailto:${personal.email}?subject=${encodeURIComponent(form.subject)}&body=${encodeURIComponent(body)}`;
    setOpened(true);
  };

  return (
    <form onSubmit={submit} className="msg-form">
      <style>{`
        .msg-form { display: grid; gap: 16px; }
        .msg-form__row { display: grid; grid-template-columns: 1fr 1fr; gap: 16px; }
        .msg-form label { display: grid; gap: 8px; font-size: 14px; color: var(--muted); }
        .msg-form input, .msg-form textarea { width: 100%; padding: 13px 16px; border: 1px solid rgba(255,255,255,.12); border-radius: 12px; background: rgba(255,255,255,.03); color: var(--text); font: inherit; font-size: 15px; outline: none; resize: vertical; transition: border-color .2s, background .2s; }
        .msg-form input:hover, .msg-form textarea:hover { border-color: rgba(255,255,255,.22); }
        .msg-form input:focus, .msg-form textarea:focus { border-color: rgba(255,255,255,.5); background: rgba(255,255,255,.05); }
        .msg-form__send { justify-self: start; display: inline-flex; align-items: center; gap: 8px; padding: 12px 20px; border: 0; border-radius: 12px; background: var(--text); color: #000; font: inherit; font-size: 15px; font-weight: 600; cursor: pointer; transition: transform .15s var(--ease-out), opacity .2s; }
        .msg-form__send:hover { opacity: .9; }
        .msg-form__send:active { transform: scale(.96); }
        .msg-form__note { font-size: 14px; color: var(--muted); }
        @media (max-width: 600px) { .msg-form__row { grid-template-columns: 1fr; } }
      `}</style>
      <div className="msg-form__row">
        <label>
          Name
          <input required value={form.name} onChange={set('name')} autoComplete="name" />
        </label>
        <label>
          Subject
          <input required value={form.subject} onChange={set('subject')} />
        </label>
      </div>
      <label>
        Message
        <textarea required rows={6} value={form.message} onChange={set('message')} />
      </label>
      <button type="submit" className="msg-form__send">
        <HugeiconsIcon icon={Mail01Icon} size={17} />
        Open in email app
      </button>
      {opened && (
        <p className="msg-form__note" aria-live="polite">
          Your email app should now have the message ready to send. If nothing opened, email {personal.email}.
        </p>
      )}
    </form>
  );
}
