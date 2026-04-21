"use client";
import { useEffect, useRef } from "react";

export default function LinkHoverCursor() {
  const circleRef = useRef<HTMLDivElement>(null);
  const visible   = useRef(false);
  const pos       = useRef({ x: 0, y: 0 });
  const current   = useRef({ x: 0, y: 0 });
  const rafId     = useRef<number | null>(null);

  useEffect(() => {
    const circle = circleRef.current;
    if (!circle) return;

    const lerp = (a: number, b: number, t: number) => a + (b - a) * t;
    const SIZE = 64;

    const animate = () => {
      current.current.x = lerp(current.current.x, pos.current.x, 0.55);
      current.current.y = lerp(current.current.y, pos.current.y, 0.55);
      circle.style.transform = `translate(${current.current.x - SIZE / 2}px, ${current.current.y - SIZE / 2}px) scale(${visible.current ? 1 : 0})`;
      rafId.current = requestAnimationFrame(animate);
    };
    rafId.current = requestAnimationFrame(animate);

    const onMouseMove = (e: MouseEvent) => {
      pos.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMouseMove);

    const isExternalLink = (el: HTMLElement) => {
      if (el.tagName !== "A") return false;
      const href = (el as HTMLAnchorElement).href;
      try {
        const url = new URL(href);
        if (url.protocol !== "http:" && url.protocol !== "https:") return false;
        return url.origin !== window.location.origin;
      }
      catch { return false; }
    };

    const hasOwnBackground = (el: HTMLElement) => {
      const bg = getComputedStyle(el).backgroundColor;
      return bg !== "rgba(0, 0, 0, 0)" && bg !== "transparent";
    };

    const showCursor = (e: Event) => {
      const el = e.currentTarget as HTMLElement;
      if (isExternalLink(el)) {
        visible.current = true;
        circle.style.opacity = "1";
      }
      if (!hasOwnBackground(el)) {
        el.style.transition = "font-weight 0.1s ease, color 0.1s ease";
        el.style.fontWeight = "700";
        el.style.color = "var(--text)";
      }
    };

    const hideCursor = (e: Event) => {
      visible.current = false;
      circle.style.opacity = "0";
      const el = e.currentTarget as HTMLElement;
      el.style.fontWeight = "";
      el.style.color = "";
    };

    const add    = (el: Element) => { el.addEventListener("mouseenter", showCursor); el.addEventListener("mouseleave", hideCursor); };
    const remove = (el: Element) => { el.removeEventListener("mouseenter", showCursor); el.removeEventListener("mouseleave", hideCursor); };

    const attach = () => document.querySelectorAll("a, button").forEach(el => { remove(el); add(el); });
    attach();

    let pending = false;
    const observer = new MutationObserver(() => {
      if (pending) return;
      pending = true;
      requestAnimationFrame(() => { attach(); pending = false; });
    });
    observer.observe(document.body, { childList: true, subtree: true });

    return () => {
      if (rafId.current !== null) cancelAnimationFrame(rafId.current);
      window.removeEventListener("mousemove", onMouseMove);
      observer.disconnect();
      document.querySelectorAll("a, button").forEach(remove);
    };
  }, []);

  return (
    <div
      ref={circleRef}
      aria-hidden="true"
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 64,
        height: 64,
        borderRadius: "50%",
        background: "var(--accent)",
        mixBlendMode: "difference",
        pointerEvents: "none",
        zIndex: 9990,
        opacity: 0,
        transform: "translate(-32px, -32px) scale(0)",
        transition: "opacity 0.1s ease, transform 0.1s ease",
        willChange: "transform",
      }}
    />
  );
}
