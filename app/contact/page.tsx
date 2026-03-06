'use client';
import { useState } from 'react';
import { personal, socials } from '@/lib/data';

const icons: Record<string, string> = {
  github:
    'M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z',
  linkedin:
    'M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z',
  twitter:
    'M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.741l7.73-8.835L1.254 2.25H8.08l4.253 5.622zm-1.161 17.52h1.833L7.084 4.126H5.117z',
  devto:
    'M7.42 10.05c-.18-.16-.46-.23-.84-.23H6l.02 2.44.04 2.45.56-.02c.41 0 .63-.07.83-.26.24-.24.26-.36.26-2.2 0-1.91-.02-1.96-.29-2.18zM0 4.94v14.12h24V4.94H0zM8.56 15.3c-.44.58-1.06.77-2.53.77H4.71V8.53h1.4c1.67 0 2.16.18 2.6.9.27.43.29.6.32 2.57.05 2.23-.02 2.73-.47 3.3zm5.09-5.47h-2.47v1.77h1.52v1.28l-.72.04-.75.03v1.77l1.22.03 1.2.04v1.28h-1.6c-1.53 0-1.6-.01-1.87-.3l-.3-.28v-3.16c0-3.02.01-3.18.25-3.48.23-.31.25-.31 1.88-.31h1.65l-.01 1.3zm4.68 5.45c-.17.43-.64.79-1 .79-.18 0-.45-.15-.67-.39-.32-.32-.45-.63-.82-2.08l-.9-3.39-.45-1.67h.76c.4 0 .75.02.75.05 0 .06 1.16 4.54 1.26 4.83.04.15.32-.7.73-2.3l.59-2.54h.76c.42 0 .73.05.71.1-.02.06-.37 1.39-.77 2.95-.4 1.56-.75 2.88-.79 2.95z',
  email:
    'M20 4H4c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z',
};

type FormState = 'idle' | 'sending' | 'sent' | 'error';

export default function ContactPage() {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [status, setStatus] = useState<FormState>('idle');
  const [focused, setFocused] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('sending');
    await new Promise((r) => setTimeout(r, 1400));
    setStatus('sent');
  };

  const inputStyle = (name: string): React.CSSProperties => ({
    width: '100%',
    background:
      focused === name ? 'rgba(255,255,255,.04)' : 'rgba(255,255,255,.02)',
    border: `1px solid ${focused === name ? 'rgba(202,255,51,.4)' : 'var(--border)'}`,
    borderRadius: 10,
    padding: '14px 18px',
    fontSize: 14,
    color: 'var(--text)',
    outline: 'none',
    transition: 'border-color .25s, background .25s',
    fontFamily: 'inherit',
    resize: 'none' as const,
  });

  const contactItems = [
    {
      label: 'Email',
      value: personal.email,
      href: `mailto:${personal.email}`,
      icon: 'email',
    },
    {
      label: 'Location',
      value: personal.location,
      href: null,
      icon: null,
    },
    {
      label: 'Availability',
      value: 'Open to opportunities',
      href: null,
      icon: null,
      highlight: true,
    },
  ];

  return (
    <main
      className="pg"
      style={{
        minHeight: 'calc(100svh - 73px)',
        paddingTop: 80,
        paddingBottom: 100,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .ct-layout { grid-template-columns: 1fr !important; gap: 48px !important; }
          .ct-name-email { grid-template-columns: 1fr !important; }
        }
      `}</style>
      {/* Header */}
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr auto',
          gap: 48,
          alignItems: 'flex-end',
          marginBottom: 80,
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        <div>
          <span
            style={{
              fontSize: 11,
              letterSpacing: '.25em',
              textTransform: 'uppercase',
              color: 'var(--accent)',
              display: 'block',
              marginBottom: 20,
            }}
          >
            Contact
          </span>
          <h1
            className="font-display"
            style={{
              fontSize: 'clamp(48px,8vw,110px)',
              fontWeight: 700,
              lineHeight: 0.92,
              letterSpacing: '-.04em',
              marginBottom: 28,
            }}
          >
            Let&apos;s work
            <br />
            <span
              style={{
                WebkitTextStroke: '1.5px var(--text)',
                color: 'transparent',
              }}
            >
              together.
            </span>
          </h1>
          <p
            style={{
              fontSize: 16,
              lineHeight: 1.7,
              color: 'var(--muted)',
              maxWidth: 480,
            }}
          >
            Have a project in mind or looking to hire a Software Developer? Drop
            a message and I&apos;ll reply within 24 hours.
          </p>
        </div>
      </div>

      {/* Two-column layout */}
      <div
        className="ct-layout"
        style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1.4fr',
          gap: 80,
          alignItems: 'flex-start',
          maxWidth: 1100,
          margin: '0 auto',
        }}
      >
        {/* Left: contact info + socials */}
        <div>
          <div style={{ marginBottom: 48 }}>
            {contactItems.map((item) => (
              <div
                key={item.label}
                style={{
                  padding: '20px 0',
                  borderBottom: '1px solid var(--border)',
                  display: 'flex',
                  flexDirection: 'column',
                  gap: 6,
                }}
              >
                <span
                  style={{
                    fontSize: 10,
                    letterSpacing: '.2em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  {item.label}
                </span>
                {item.href ? (
                  <a
                    href={item.href}
                    style={{
                      fontSize: 15,
                      color: item.highlight ? 'var(--accent)' : 'var(--text)',
                      textDecoration: 'none',
                      transition: 'opacity .2s',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.opacity = '.7')}
                    onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                  >
                    {item.value}
                  </a>
                ) : (
                  <span
                    style={{
                      fontSize: 15,
                      color: item.highlight ? 'var(--accent)' : 'var(--text)',
                    }}
                  >
                    {item.value}
                  </span>
                )}
              </div>
            ))}
          </div>

          {/* Socials */}
          <div>
            <span
              style={{
                fontSize: 10,
                letterSpacing: '.2em',
                textTransform: 'uppercase',
                color: 'var(--muted)',
                display: 'block',
                marginBottom: 18,
              }}
            >
              Find me online
            </span>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                    fontSize: 13,
                    color: 'var(--muted)',
                    textDecoration: 'none',
                    transition: 'color .2s',
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.color = 'var(--text)')
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.color = 'var(--muted)')
                  }
                >
                  <svg
                    width="14"
                    height="14"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    style={{ flexShrink: 0 }}
                  >
                    <path d={icons[s.icon] ?? icons.github} />
                  </svg>
                  {s.label}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Right: form */}
        <div>
          {status === 'sent' ? (
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                minHeight: 400,
                textAlign: 'center',
                gap: 20,
              }}
            >
              <div
                style={{
                  width: 64,
                  height: 64,
                  borderRadius: '50%',
                  background: 'rgba(202,255,51,.12)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path
                    d="M5 12l5 5L20 7"
                    stroke="var(--accent)"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </div>
              <h3
                className="font-display"
                style={{
                  fontSize: 28,
                  fontWeight: 600,
                  letterSpacing: '-.02em',
                }}
              >
                Message sent!
              </h3>
              <p
                style={{
                  fontSize: 15,
                  color: 'var(--muted)',
                  maxWidth: 320,
                  lineHeight: 1.6,
                }}
              >
                Thanks for reaching out. I&apos;ll get back to you within 24
                hours.
              </p>
              <button
                onClick={() => {
                  setStatus('idle');
                  setForm({ name: '', email: '', subject: '', message: '' });
                }}
                style={{
                  marginTop: 8,
                  padding: '12px 28px',
                  borderRadius: 100,
                  border: '1px solid var(--border)',
                  background: 'transparent',
                  color: 'var(--muted)',
                  fontSize: 12,
                  letterSpacing: '.07em',
                  textTransform: 'uppercase',
                  cursor: 'pointer',
                  transition: 'color .2s, border-color .2s',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.color = 'var(--text)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,.25)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.color = 'var(--muted)';
                  e.currentTarget.style.borderColor = 'var(--border)';
                }}
              >
                Send another
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{ display: 'flex', flexDirection: 'column', gap: 20 }}
            >
              <div
                className="ct-name-email"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '1fr 1fr',
                  gap: 16,
                }}
              >
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  <label
                    style={{
                      fontSize: 11,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                    }}
                  >
                    Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Your name"
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    onFocus={() => setFocused('name')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('name')}
                  />
                </div>
                <div
                  style={{ display: 'flex', flexDirection: 'column', gap: 8 }}
                >
                  <label
                    style={{
                      fontSize: 11,
                      letterSpacing: '.12em',
                      textTransform: 'uppercase',
                      color: 'var(--muted)',
                    }}
                  >
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) =>
                      setForm({ ...form, email: e.target.value })
                    }
                    onFocus={() => setFocused('email')}
                    onBlur={() => setFocused(null)}
                    style={inputStyle('email')}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label
                  style={{
                    fontSize: 11,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  Subject *
                </label>
                <input
                  type="text"
                  required
                  placeholder="Project enquiry / Job opportunity / Collaboration"
                  value={form.subject}
                  onChange={(e) =>
                    setForm({ ...form, subject: e.target.value })
                  }
                  onFocus={() => setFocused('subject')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('subject')}
                />
              </div>

              <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                <label
                  style={{
                    fontSize: 11,
                    letterSpacing: '.12em',
                    textTransform: 'uppercase',
                    color: 'var(--muted)',
                  }}
                >
                  Message *
                </label>
                <textarea
                  required
                  rows={7}
                  placeholder="Tell me about your project, timeline, and budget..."
                  value={form.message}
                  onChange={(e) =>
                    setForm({ ...form, message: e.target.value })
                  }
                  onFocus={() => setFocused('message')}
                  onBlur={() => setFocused(null)}
                  style={inputStyle('message')}
                />
              </div>

              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  paddingTop: 4,
                }}
              >
                <span style={{ fontSize: 12, color: 'var(--muted)' }}>
                  * Required fields
                </span>
                <button
                  type="submit"
                  disabled={status === 'sending'}
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: 10,
                    padding: '15px 32px',
                    borderRadius: 100,
                    background:
                      status === 'sending'
                        ? 'rgba(202,255,51,.6)'
                        : 'var(--accent)',
                    color: '#000',
                    fontSize: 12,
                    fontWeight: 500,
                    letterSpacing: '.07em',
                    textTransform: 'uppercase',
                    border: 'none',
                    cursor: status === 'sending' ? 'not-allowed' : 'pointer',
                    transition: 'opacity .25s, background .25s',
                  }}
                  onMouseEnter={(e) => {
                    if (status !== 'sending')
                      e.currentTarget.style.opacity = '.85';
                  }}
                  onMouseLeave={(e) => (e.currentTarget.style.opacity = '1')}
                >
                  {status === 'sending' ? (
                    <>
                      Sending
                      <span style={{ display: 'inline-flex', gap: 3 }}>
                        {[0, 1, 2].map((i) => (
                          <span
                            key={i}
                            style={{
                              width: 4,
                              height: 4,
                              borderRadius: '50%',
                              background: '#000',
                              animation: `bounce 0.9s ease ${i * 0.15}s infinite`,
                            }}
                          />
                        ))}
                      </span>
                    </>
                  ) : (
                    <>
                      Send Message
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 13 13"
                        fill="none"
                      >
                        <path
                          d="M1 12L12 1M12 1H1M12 1V12"
                          stroke="currentColor"
                          strokeWidth="1.5"
                        />
                      </svg>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; }
          50% { opacity: .4; }
        }
        @keyframes bounce {
          0%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-4px); }
        }
        input::placeholder, textarea::placeholder { color: rgba(255,255,255,.2); }
        input, textarea { caret-color: var(--accent); }
      `}</style>
    </main>
  );
}
