export default function PageTitle({ children, aside }: { children: React.ReactNode; aside?: React.ReactNode }) {
  return (
    <header className="page-title rise">
      <style>{`
        .page-title { display: flex; justify-content: space-between; align-items: flex-end; flex-wrap: wrap; gap: 12px 24px; padding-top: 24px; }
        .page-title h1 { font-family: var(--font-display); font-size: clamp(36px, 6vw, 56px); font-weight: 600; letter-spacing: -.035em; line-height: 1; }
        .page-title__aside { font-size: 15px; color: var(--muted); }
      `}</style>
      <h1>{children}</h1>
      {aside && <div className="page-title__aside">{aside}</div>}
    </header>
  );
}
