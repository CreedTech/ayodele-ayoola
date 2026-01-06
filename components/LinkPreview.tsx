"use client";
import { useEffect, useRef, useState } from "react";

interface PreviewState {
  visible: boolean;
  x: number;
  y: number;
  href: string;
  domain: string;
  imgSrc: string;
}

const INITIAL: PreviewState = { visible: false, x: 0, y: 0, href: "", domain: "", imgSrc: "" };
const CARD_W = 280;
const CARD_MARGIN = 12;

function clampX(x: number) {
  const half = CARD_W / 2 + CARD_MARGIN;
  return Math.min(Math.max(x, half), window.innerWidth - half);
}

function getDomain(href: string) {
  try { return new URL(href).hostname.replace("www.", ""); }
  catch { return href; }
}

function getMicrolinkSrc(url: string) {
  const params = new URLSearchParams({
    url,
    screenshot: "true",
    meta: "false",
    embed: "screenshot.url",
    colorScheme: "dark",
    "viewport.isMobile": "true",
    "viewport.deviceScaleFactor": "1",
    "viewport.width": "600",
    "viewport.height": "375",
  });
  return `https://api.microlink.io/?${params}`;
}

export default function LinkPreview() {
  const [state, setState] = useState<PreviewState>(INITIAL);
  const [imgLoaded, setImgLoaded] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isExternal = (href: string) => {
      try { return new URL(href).origin !== window.location.origin; }
      catch { return false; }
    };

    const onEnter = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      const href = anchor.href;
      if (!href || !isExternal(href)) return;
      const rect = anchor.getBoundingClientRect();
      setImgLoaded(false);
      setState({
        visible: true,
        x: clampX(rect.left + rect.width / 2),
        y: rect.top - 12,
        href,
        domain: getDomain(href),
        imgSrc: getMicrolinkSrc(href),
      });
    };

    const onMove = (e: Event) => {
      const anchor = e.currentTarget as HTMLAnchorElement;
      if (!anchor.href || !isExternal(anchor.href)) return;
      const me = e as MouseEvent;
      setState(prev => ({ ...prev, x: clampX(me.clientX), y: me.clientY - 150 }));
    };

    const onLeave = () => setState(INITIAL);

    const attached = new WeakSet<Element>();
    const attach = () => {
      document.querySelectorAll("a[href]").forEach(anchor => {
        if (attached.has(anchor)) return;
        const href = (anchor as HTMLAnchorElement).href;
        if (!isExternal(href)) return;
        anchor.addEventListener("mouseenter", onEnter);
        anchor.addEventListener("mousemove", onMove);
        anchor.addEventListener("mouseleave", onLeave);
        attached.add(anchor);
      });
    };

    attach();
    const observer = new MutationObserver(attach);
    observer.observe(document.body, { childList: true, subtree: true });
    return () => {
      observer.disconnect();
      document.querySelectorAll("a[href]").forEach(a => {
        a.removeEventListener("mouseenter", onEnter);
        a.removeEventListener("mousemove", onMove);
        a.removeEventListener("mouseleave", onLeave);
      });
    };
  }, []);

  return (
    <div
      ref={cardRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        left: state.x,
        top: state.y,
        transform: `translate(-50%, -100%) scale(${state.visible ? 1 : 0.9})`,
        opacity: state.visible ? 1 : 0,
        pointerEvents: "none",
        zIndex: 9400,
        width: 280,
        background: "#141414",
        border: "1px solid var(--border)",
        borderRadius: 12,
        boxShadow: "0 24px 60px rgba(0,0,0,0.7)",
        overflow: "hidden",
        transition: "opacity 0.2s ease, transform 0.1s ease",
        transformOrigin: "50% 100%",
      }}
    >
      {/* Browser chrome */}
      <div style={{ background: "#1a1a1a", borderBottom: "1px solid var(--border)", padding: "9px 12px", display: "flex", alignItems: "center", gap: 8 }}>
        <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#ff5f57" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#febc2e" }} />
          <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#28c840" }} />
        </div>
        <div style={{ flex: 1, background: "rgba(255,255,255,0.06)", borderRadius: 4, padding: "3px 8px", fontSize: 10, color: "rgba(255,255,255,0.35)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap", fontFamily: "'SF Mono', monospace" }}>
          {state.domain}
        </div>
      </div>

      {/* Screenshot */}
      <div style={{ position: "relative", width: "100%", height: 160, background: "#0d0d0d", overflow: "hidden" }}>
        {state.imgSrc && (
          <>
            {!imgLoaded && (
              <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ width: 20, height: 20, border: "2px solid var(--border)", borderTopColor: "var(--accent)", borderRadius: "50%", animation: "spin 0.8s linear infinite" }} />
              </div>
            )}
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={state.imgSrc}
              alt={state.domain}
              onLoad={() => setImgLoaded(true)}
              style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top", opacity: imgLoaded ? 1 : 0, transition: "opacity 0.12s ease" }}
            />
          </>
        )}
      </div>

      {/* Footer */}
      <div style={{ padding: "8px 12px", display: "flex", alignItems: "center", gap: 6, fontSize: 11, color: "var(--accent)", letterSpacing: ".04em" }}>
        <svg width="10" height="10" viewBox="0 0 13 13" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round">
          <path d="M1 12L12 1M12 1H1M12 1V12" />
        </svg>
        {state.domain}
      </div>

      <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
    </div>
  );
}
