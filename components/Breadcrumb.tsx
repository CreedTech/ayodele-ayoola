'use client';

interface BreadcrumbItem {
  label: string;
  href?: string;
}

export default function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav
      aria-label="Breadcrumb"
      style={{
        padding: '14px 32px',
        fontSize: '11px',
        letterSpacing: '0.06em',
        color: 'var(--muted)',
        borderBottom: '1px solid var(--border)',
        background: 'transparent',
      }}
    >
      <ol
        style={{
          display: 'flex',
          gap: '6px',
          listStyle: 'none',
          margin: 0,
          padding: 0,
          alignItems: 'center',
        }}
        itemScope
        itemType="https://schema.org/BreadcrumbList"
      >
        {items.map((item, i) => (
          <li
            key={i}
            style={{ display: 'flex', alignItems: 'center', gap: '6px' }}
            itemProp="itemListElement"
            itemScope
            itemType="https://schema.org/ListItem"
          >
            {i > 0 && (
              <span aria-hidden="true" style={{ opacity: 0.35 }}>
                ›
              </span>
            )}
            {i < items.length - 1 && item.href ? (
              <a
                href={item.href}
                itemProp="item"
                style={{
                  color: 'var(--muted)',
                  textDecoration: 'none',
                  transition: 'color 0.2s',
                }}
                onMouseEnter={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'var(--text)')
                }
                onMouseLeave={(e) =>
                  ((e.target as HTMLAnchorElement).style.color = 'var(--muted)')
                }
              >
                <span itemProp="name">{item.label}</span>
              </a>
            ) : (
              <span
                itemProp="name"
                aria-current="page"
                style={{ color: 'var(--text)', opacity: 0.7 }}
              >
                {item.label}
              </span>
            )}
            <meta itemProp="position" content={String(i + 1)} />
          </li>
        ))}
      </ol>
    </nav>
  );
}
