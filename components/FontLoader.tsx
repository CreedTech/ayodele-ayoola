'use client';
import { useEffect } from 'react';

const FONT_URL =
  'https://api.fontshare.com/v2/css?f[]=clash-display@400,500,600,700&display=swap';

export default function FontLoader() {
  useEffect(() => {
    if (document.querySelector(`link[href="${FONT_URL}"]`)) return;
    const link = document.createElement('link');
    link.rel = 'stylesheet';
    link.href = FONT_URL;
    document.head.appendChild(link);
  }, []);
  return null;
}
