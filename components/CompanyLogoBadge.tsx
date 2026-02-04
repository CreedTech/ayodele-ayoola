interface CompanyLogoBadgeProps {
  company: string;
  logo: string;
  logoUrl: string;
  size?: number;
  imgPadding?: number;
  fallbackFontSize?: number;
}

export function CompanyLogoBadge({
  company,
  logo,
  logoUrl,
  size = 44,
  imgPadding,
  fallbackFontSize,
}: CompanyLogoBadgeProps) {
  const hasLogoUrl = Boolean(logoUrl);

  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: 8,
        background: "transparent",
        border: ".5px solid rgba(255,255,255,.08)",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexShrink: 0,
      }}
    >
      {hasLogoUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={logoUrl}
          alt={company}
          width={size}
          height={size}
          style={{
            width: "100%",
            height: "100%",
            objectFit: "contain",
            padding: imgPadding ?? Math.max(4, Math.round(size * 0.12)),
          }}
          onError={(e) => {
            e.currentTarget.style.display = "none";
            const fallback = e.currentTarget.nextElementSibling as HTMLElement | null;
            if (fallback) fallback.style.display = "flex";
          }}
        />
      ) : null}
      <div
        style={{
          display: hasLogoUrl ? "none" : "flex",
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
          fontSize: fallbackFontSize ?? Math.max(10, Math.round(size * 0.25)),
          fontWeight: 700,
          letterSpacing: ".05em",
          color: "var(--accent)",
        }}
      >
        {logo}
      </div>
    </div>
  );
}
