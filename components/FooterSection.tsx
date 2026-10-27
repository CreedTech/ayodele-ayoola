import { personal } from '@/lib/data';

export default function FooterSection() {
  return (
    <footer
      className="meta"
      style={{
        marginTop: 96,
        padding: '24px 0 40px',
        borderTop: '1px solid var(--border)',
        display: 'flex',
        justifyContent: 'space-between',
        gap: 16,
        flexWrap: 'wrap',
      }}
    >
      <span>
        © {new Date().getFullYear()} {personal.name}
      </span>
      <span>London</span>
    </footer>
  );
}
