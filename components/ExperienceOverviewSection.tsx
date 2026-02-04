'use client';
import Image from 'next/image';
import { experience } from '@/lib/data';

interface ExperienceOverviewSectionProps {
  id?: string;
  className?: string;
  style?: React.CSSProperties;
}

export default function ExperienceOverviewSection({
  id = 'work',
  className = 'pg',
  style,
}: ExperienceOverviewSectionProps) {
  return (
    <section
      id={id}
      className={className}
      style={{
        paddingTop: 100,
        ...style,
      }}
    >
      <style>{`
        @media (max-width: 768px) {
          .exp-overview__row {
            grid-template-columns: 1fr !important;
            gap: 10px !important;
          }
          .exp-overview__desc {
            display: none !important;
          }
        }
        @media (min-width: 769px) and (max-width: 1100px) {
          .exp-overview__row {
            grid-template-columns: 130px 1fr !important;
          }
          .exp-overview__desc {
            grid-column: 2 !important;
          }
        }
      `}</style>

      <div
        style={{
          fontSize: 11,
          letterSpacing: '.28em',
          textTransform: 'uppercase',
          color: 'var(--muted)',
          marginBottom: 48,
        }}
      >
        Experience
      </div>

      <div style={{ borderTop: '1px solid var(--border)' }}>
        {experience.map((exp) => (
          <div
            key={`${exp.company}-${exp.period}`}
            className="exp-overview__row"
            style={{
              display: 'grid',
              gridTemplateColumns: '160px 1fr 1fr',
              gap: 40,
              padding: '36px 0',
              borderBottom: '1px solid var(--border)',
              alignItems: 'start',
            }}
          >
            <div>
              <div
                style={{
                  fontSize: 11,
                  color: 'var(--muted)',
                  letterSpacing: '.06em',
                  lineHeight: 1.6,
                }}
              >
                {exp.period}
              </div>
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: 5,
                  marginTop: 10,
                  padding: '3px 10px',
                  borderRadius: 100,
                  border: '1px solid var(--border)',
                  fontSize: 10,
                  color: 'var(--muted)',
                  letterSpacing: '.07em',
                  textTransform: 'uppercase',
                }}
              >
                <span
                  style={{
                    width: 5,
                    height: 5,
                    borderRadius: '50%',
                    background: 'var(--accent)',
                    flexShrink: 0,
                  }}
                />
                {exp.location}
              </div>
            </div>

            <div>
              <div
                style={{
                  display: 'flex',
                  alignItems: 'flex-start',
                  gap: 14,
                }}
              >
                <div
                  style={{
                    width: 60,
                    height: 60,
                    borderRadius: 6,
                    border: '.5px solid var(--border)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    flexShrink: 0,
                    padding: exp.logoUrl ? 7 : 0,
                  }}
                >
                  {exp.logoUrl ? (
                    <Image
                      src={exp.logoUrl}
                      alt={`${exp.company} logo`}
                      width={32}
                      height={32}
                      style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'contain',
                      }}
                    />
                  ) : (
                    <span
                      style={{
                        color: '#fff',
                        fontSize: 13,
                        fontWeight: 700,
                        letterSpacing: '.04em',
                      }}
                    >
                      {exp.logo}
                    </span>
                  )}
                </div>

                <div>
                  <div
                    className="font-display"
                    style={{
                      fontSize: 'clamp(16px,1.8vw,24px)',
                      fontWeight: 500,
                      letterSpacing: '-.02em',
                      lineHeight: 1.2,
                    }}
                  >
                    {exp.role}
                  </div>

                  <div style={{ marginTop: 6 }}>
                    {exp.domain ? (
                      <a
                        href={`https://${exp.domain}`}
                        target="_blank"
                        rel="noreferrer"
                        aria-label={`Visit ${exp.company} website`}
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: 6,
                          fontSize: 13,
                          color: 'var(--accent)',
                          fontWeight: 500,
                          textDecoration: 'none',
                          width: 'fit-content',
                        }}
                      >
                        <span>{exp.company}</span>

                        <svg
                          style={{
                            color: 'currentColor',
                            flexShrink: 0,
                            transform: 'translateY(-1px)',
                          }}
                          width="12"
                          height="12"
                          viewBox="0 0 18 18"
                          fill="none"
                          aria-hidden="true"
                        >
                          <path
                            d="M1 17L17 1M17 1H1M17 1V17"
                            stroke="currentColor"
                            strokeWidth="1.8"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </a>
                    ) : (
                      <div
                        style={{
                          fontSize: 13,
                          color: 'var(--accent)',
                          fontWeight: 500,
                        }}
                      >
                        {exp.company}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <div
                style={{
                  display: 'flex',
                  flexWrap: 'wrap',
                  gap: 6,
                  marginTop: 14,
                  marginLeft: 56,
                }}
              >
                {exp.stack.map((skill) => (
                  <span
                    key={skill}
                    style={{
                      padding: '3px 9px',
                      background: 'var(--surface-2)',
                      border: '1px solid var(--border)',
                      borderRadius: 4,
                      fontSize: 10,
                      color: 'var(--muted)',
                      letterSpacing: '.04em',
                    }}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <p
              className="exp-overview__desc"
              style={{
                fontSize: 14,
                color: 'var(--muted)',
                lineHeight: 1.75,
              }}
            >
              {exp.desc}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
