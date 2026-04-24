"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState, useRef } from "react";
import { GITHUB_USERNAME } from "@/lib/data";

const theme = {
  light: ["#1a1a1a", "#1a3a00", "#2d6500", "#4a9e00", "#CAFF33"],
  dark:  ["#1a1a1a", "#1a3a00", "#2d6500", "#4a9e00", "#CAFF33"],
};

const BLOCK_MARGIN = 4;
const WEEKS = 53;
const DAY_LABEL_WIDTH = 28;

function computeBlockSize(containerWidth: number) {
  const bs = Math.floor((containerWidth - DAY_LABEL_WIDTH) / WEEKS) - BLOCK_MARGIN;
  return Math.min(13, Math.max(6, bs));
}

interface Props { year?: number; }

export default function GitHubCalendarWrapper({ year }: Props) {
  const [Cal, setCal] = useState<any>(null);
  const wrapRef = useRef<HTMLDivElement>(null);
  const [blockSize, setBlockSize] = useState(13);

  useEffect(() => {
    import("react-github-calendar").then(mod => {
      const Component = (mod as any).GitHubCalendar || (mod as any).default || mod;
      setCal(() => Component);
    });
  }, []);

  useEffect(() => {
    const el = wrapRef.current;
    if (!el) return;
    const ro = new ResizeObserver(entries => {
      setBlockSize(computeBlockSize(entries[0].contentRect.width));
    });
    ro.observe(el);
    setBlockSize(computeBlockSize(el.offsetWidth));
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
          fontSize={Math.max(9, blockSize - 2)}
          blockSize={blockSize}
          blockMargin={BLOCK_MARGIN}
          style={{ color: "var(--muted)", display: "block", width: "100%" }}
        />
      )}
    </div>
  );
}
