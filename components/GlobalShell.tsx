"use client";
import { useSyncExternalStore } from "react";
import Terminal       from "./Terminal";
import ShortcutsPanel from "./ShortcutsPanel";
import LinkPreview    from "./LinkPreview";

function useIsMounted() {
  return useSyncExternalStore(
    () => () => {},
    () => true,
    () => false,
  );
}

export default function GlobalShell() {
  const mounted = useIsMounted();
  if (!mounted) return null;
  return (
    <>
      <Terminal />
      <ShortcutsPanel />
      <LinkPreview />
    </>
  );
}
