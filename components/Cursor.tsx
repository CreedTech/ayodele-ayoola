"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Cursor() {
  const dotRef  = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const dot  = dotRef.current!;
    const ring = ringRef.current!;
    let mx = 0, my = 0, rx = 0, ry = 0;

    const onMove = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      gsap.to(dot, { x: mx, y: my, duration: 0.08, ease: "none" });
    };
    document.addEventListener("mousemove", onMove);

    const tick = () => {
      rx += (mx - rx) * 0.10;
      ry += (my - ry) * 0.10;
      gsap.set(ring, { x: rx, y: ry });
      requestAnimationFrame(tick);
    };
    tick();

    const grow   = () => ring.classList.add("ring-grow");
    const shrink = () => ring.classList.remove("ring-grow");
    document.querySelectorAll("a,button,[data-cursor]").forEach(el => {
      el.addEventListener("mouseenter", grow);
      el.addEventListener("mouseleave", shrink);
    });

    return () => document.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <>
      <style>{`
        #c-dot {
          position:fixed; width:7px; height:7px;
          background:var(--accent); border-radius:50%;
          pointer-events:none; z-index:9999;
          transform:translate(-50%,-50%);
        }
        #c-ring {
          position:fixed; width:36px; height:36px;
          border:1px solid rgba(255,255,255,.22); border-radius:50%;
          pointer-events:none; z-index:9998;
          transform:translate(-50%,-50%);
          transition: width .12s ease, height .12s ease,
                      border-color .12s ease, background .12s ease;
        }
        #c-ring.ring-grow {
          width:60px; height:60px;
          border-color:var(--accent);
          background:var(--accent-dim);
        }
      `}</style>
      <div id="c-dot"  ref={dotRef}  />
      <div id="c-ring" ref={ringRef} />
    </>
  );
}
