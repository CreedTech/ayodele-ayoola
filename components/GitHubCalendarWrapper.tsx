"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { GITHUB_USERNAME } from "@/lib/data";

const theme = {
  light: ["#1a1a1a", "#0d2d1a", "#145228", "#1a7a3c", "#22c55e"],
  dark:  ["#1a1a1a", "#0d2d1a", "#145228", "#1a7a3c", "#22c55e"],
};

const WEEKS = 53;
const LABEL_WIDTH = 30; // approximate space for day-of-week labels

function computeBlockParams(containerWidth: number) {
  // Reduce blockMargin on small screens to reclaim space
  const blockMargin = containerWidth < 500 ? 2 : containerWidth < 768 ? 3 : 4;
  const bs = Math.floor((containerWidth - LABEL_WIDTH) / WEEKS) - blockMargin;
  return {
    blockSize: Math.min(13, Math.max(3, bs)),
    blockMargin,
  };
}

interface Props { year?: number; }

export default function GitHubCalendarWrapper({ year }: Props) {
  const [Cal, setCal] = useState<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [blockParams, setBlockParams] = useState({ blockSize: 13, blockMargin: 4 });

  useEffect(() => {
    import("react-github-calendar").then(mod => {
      const Component = (mod as any).GitHubCalendar || (mod as any).default || mod;
      setCal(() => Component);
    });
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const update = (width: number) => setBlockParams(computeBlockParams(width));
    const ro = new ResizeObserver(entries => update(entries[0].contentRect.width));
    ro.observe(el);
    update(el.offsetWidth);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={wrapRef} style={{ width: "100%" }}>
      {!Cal ? (
        <div style={{ height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: ".08em" }}>Loading contributions…</span>
        </div>
      ) : (
        <Cal
          username={GITHUB_USERNAME}
          year={year}
          theme={theme}
          colorScheme="dark"
          fontSize={Math.max(9, blockParams.blockSize - 1)}
          blockSize={blockParams.blockSize}
          blockMargin={blockParams.blockMargin}
          style={{ color: "var(--muted)", display: "block", width: "100%" }}
        />
      )}
    </div>
  );
}
