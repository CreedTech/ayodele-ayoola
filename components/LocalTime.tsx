'use client';
import { useEffect, useState } from 'react';

const format = () =>
  new Intl.DateTimeFormat('en-GB', {
    timeZone: 'Europe/London',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date());

export default function LocalTime() {
  const [time, setTime] = useState<string | null>(null);

  useEffect(() => {
    const tick = () => setTime(format());
    tick();
    const id = window.setInterval(tick, 15_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <time
      suppressHydrationWarning
      style={{
        fontVariantNumeric: 'tabular-nums',
        opacity: time ? 1 : 0,
        transition: 'opacity .4s',
      }}
    >
      {time ?? '00:00'}
    </time>
  );
}
