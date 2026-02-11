"use client";
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react";
import { GITHUB_USERNAME } from "@/lib/data";

const theme = {
  light: ["#1a1a1a", "#1a3a00", "#2d6500", "#4a9e00", "#CAFF33"],
  dark:  ["#1a1a1a", "#1a3a00", "#2d6500", "#4a9e00", "#CAFF33"],
};

interface Props { year?: number; }

export default function GitHubCalendarWrapper({ year }: Props) {
  const [Cal, setCal] = useState<any>(null);

  useEffect(() => {
    import("react-github-calendar").then(mod => {
      const Component = (mod as any).GitHubCalendar || (mod as any).default || mod;
      setCal(() => Component);
    });
  }, []);

  if (!Cal) {
    return (
      <div style={{ height: 130, display: "flex", alignItems: "center", justifyContent: "center" }}>
        <span style={{ fontSize: 12, color: "var(--muted)", letterSpacing: ".08em" }}>Loading contributions…</span>
      </div>
    );
  }

  return (
    <Cal
      username={GITHUB_USERNAME}
      year={year}
      theme={theme}
      colorScheme="dark"
      fontSize={12}
      blockSize={13}
      blockMargin={4}
      style={{ color: "var(--muted)", display: "block" }}
    />
  );
}
