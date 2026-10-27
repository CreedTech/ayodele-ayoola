"use client";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useModKey } from "@/lib/use-mod-key";

interface Shortcut {
  key: string;
  desc: string;
}

interface ShortcutGroup {
  label: string;
  items: Shortcut[];
}

const GO: Record<string, string> = { h: "/", a: "/about", p: "/projects", s: "/stack", v: "/cv", c: "/contact" };
const OPEN: Record<string, string> = { g: "https://github.com/creedtech", l: "https://linkedin.com/in/ayodele-ayoola" };

const shortcuts = (mod: string): ShortcutGroup[] => [
  {
    label: "Go to",
    items: [
      { key: "g h", desc: "Home" },
      { key: "g a", desc: "About" },
      { key: "g p", desc: "Projects" },
      { key: "g s", desc: "Stack" },
      { key: "g v", desc: "CV" },
      { key: "g c", desc: "Contact" },
    ],
  },
  {
    label: "Open",
    items: [
      { key: "o g", desc: "GitHub profile" },
      { key: "o l", desc: "LinkedIn profile" },
    ],
  },
  {
    label: "Terminal",
    items: [{ key: `${mod === "⌘" ? "⌘" : "Ctrl"} K`, desc: "Open or close the terminal" }],
  },
  {
    label: "General",
    items: [
      { key: "?", desc: "Open this shortcuts panel" },
      { key: "Esc", desc: "Close any overlay" },
    ],
  },
];

export default function ShortcutsPanel() {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const mod = useModKey();
  const leader = useRef<{ key: string; at: number } | null>(null);
  const SHORTCUTS = shortcuts(mod);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const el = document.activeElement as HTMLElement | null;
      const tag = el?.tagName?.toLowerCase();
      if (tag === "input" || tag === "textarea" || el?.isContentEditable || e.metaKey || e.ctrlKey || e.altKey) return;

      if (e.key === "?") {
        e.preventDefault();
        setOpen((o) => !o);
        return;
      }
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }

      const key = e.key.toLowerCase();
      const prev = leader.current;
      leader.current = null;
      if (prev && Date.now() - prev.at < 1200) {
        const map = prev.key === "g" ? GO : prev.key === "o" ? OPEN : null;
        const target = map?.[key];
        if (target) {
          e.preventDefault();
          setOpen(false);
          if (target.startsWith("http")) window.open(target, "_blank", "noopener,noreferrer");
          else router.push(target);
          return;
        }
      }
      if (key === "g" || key === "o") leader.current = { key, at: Date.now() };
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [router]);

  if (!open) return null;

  return (
    <div
      onClick={() => setOpen(false)}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 9500,
        background: "rgba(0,0,0,0.8)",
        backdropFilter: "blur(8px)",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        animation: "shortcutsFadeIn 0.18s ease",
      }}
    >
      <style>{`
        @keyframes shortcutsFadeIn {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes shortcutsSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }
      `}</style>

      <div
        onClick={e => e.stopPropagation()}
        style={{
          background: "var(--surface)",
          border: "1px solid var(--border)",
          borderRadius: 16,
          padding: 40,
          maxWidth: 480,
          width: "100%",
          position: "relative",
          animation: "shortcutsSlideUp 0.22s ease",
        }}
      >
        {/* Close button */}
        <button
          onClick={() => setOpen(false)}
          style={{
            position: "absolute",
            top: 20,
            right: 20,
            background: "transparent",
            border: "1px solid var(--border)",
            borderRadius: "50%",
            width: 32,
            height: 32,
            color: "var(--muted)",
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            fontSize: 14,
            transition: "border-color 0.2s, color 0.2s",
          }}
          onMouseEnter={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(255,255,255,0.25)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--text)";
          }}
          onMouseLeave={e => {
            (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border)";
            (e.currentTarget as HTMLButtonElement).style.color = "var(--muted)";
          }}
        >
          ✕
        </button>

        {/* Title */}
        <h2
          className="font-display"
          style={{
            fontSize: 24,
            fontWeight: 600,
            letterSpacing: "-0.03em",
            marginBottom: 32,
            color: "var(--text)",
          }}
        >
          Keyboard shortcuts
        </h2>

        {/* Groups */}
        <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
          {SHORTCUTS.map(group => (
            <div key={group.label}>
              <div
                style={{
                  fontSize: 13,
                  fontWeight: 500,
                  color: "var(--muted)",
                  marginBottom: 12,
                }}
              >
                {group.label}
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                {group.items.map(item => (
                  <div
                    key={item.key}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "8px 12px",
                      borderRadius: 8,
                      background: "rgba(255,255,255,0.03)",
                    }}
                  >
                    <span style={{ fontSize: 13, color: "var(--muted)" }}>{item.desc}</span>
                    <kbd
                      style={{
                        display: "inline-flex",
                        alignItems: "center",
                        justifyContent: "center",
                        minWidth: 28,
                        height: 24,
                        padding: "0 8px",
                        background: "var(--surface-2)",
                        border: "1px solid rgba(255,255,255,0.12)",
                        borderRadius: 6,
                        fontSize: 11,
                        fontFamily: "'SF Mono', 'Monaco', monospace",
                        color: "var(--accent)",
                        fontWeight: 600,
                        letterSpacing: ".03em",
                      }}
                    >
                      {item.key}
                    </kbd>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        <p style={{ fontSize: 11, color: "var(--muted)", marginTop: 28, textAlign: "center", letterSpacing: ".04em" }}>
          Press <strong style={{ color: "var(--text)" }}>?</strong> or <strong style={{ color: "var(--text)" }}>Esc</strong> to close
        </p>
      </div>
    </div>
  );
}
