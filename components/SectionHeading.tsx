export default function SectionHeading({
  children,
  aside,
}: {
  children: React.ReactNode;
  aside?: React.ReactNode;
}) {
  return (
    <div className="sec-head">
      <h2>{children}</h2>
      {aside && <div className="sec-head__aside">{aside}</div>}
    </div>
  );
}
