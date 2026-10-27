'use client';
import { useSyncExternalStore } from 'react';

const isApple = () => /mac|iphone|ipad|ipod/i.test(navigator.platform || navigator.userAgent);

export function useModKey() {
  return useSyncExternalStore(
    () => () => {},
    () => (isApple() ? '⌘' : 'Ctrl'),
    () => '⌘',
  );
}
