import React from 'react';

// Decorative Indian motifs, drawn as inline SVG so they stay sharp and cost no requests.
// All are aria-hidden: they are ornament, not content.

// Toran: a marigold-and-mango-leaf garland hung over Indian doorways to welcome guests
export const Toran: React.FC<{ className?: string }> = ({ className = '' }) => (
  <div
    aria-hidden="true"
    className={`h-10 w-full bg-repeat-x pointer-events-none ${className}`}
    style={{
      backgroundSize: '64px 40px',
      backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
        `<svg xmlns='http://www.w3.org/2000/svg' width='64' height='40' viewBox='0 0 64 40'>
          <path d='M0 4 Q32 18 64 4' fill='none' stroke='#7c2d12' stroke-width='1.5'/>
          <path d='M32 11 q-5 9 0 20 q5 -11 0 -20z' fill='#3f6212'/>
          <circle cx='10' cy='8.5' r='5' fill='#f59e0b'/><circle cx='10' cy='8.5' r='2.4' fill='#ea580c'/>
          <circle cx='54' cy='8.5' r='5' fill='#f59e0b'/><circle cx='54' cy='8.5' r='2.4' fill='#ea580c'/>
          <circle cx='22' cy='12.5' r='4' fill='#fbbf24'/><circle cx='42' cy='12.5' r='4' fill='#fbbf24'/>
          <circle cx='32' cy='33' r='2.5' fill='#dc2626'/>
        </svg>`
      )}")`,
    }}
  />
);

// Mandala: a slowly turning ring of petals for section backgrounds
export const Mandala: React.FC<{ className?: string }> = ({ className = '' }) => (
  <svg aria-hidden="true" viewBox="0 0 200 200" className={`pointer-events-none ${className}`}>
    <g fill="none" stroke="currentColor" strokeWidth="0.8">
      <circle cx="100" cy="100" r="96" />
      <circle cx="100" cy="100" r="72" />
      <circle cx="100" cy="100" r="30" />
      <circle cx="100" cy="100" r="12" />
      {Array.from({ length: 16 }).map((_, i) => (
        <path key={`p${i}`} d="M100 28 C88 48 88 62 100 70 C112 62 112 48 100 28Z" transform={`rotate(${i * 22.5} 100 100)`} />
      ))}
      {Array.from({ length: 24 }).map((_, i) => (
        <circle key={`d${i}`} cx="100" cy="12" r="3" transform={`rotate(${i * 15} 100 100)`} />
      ))}
      {Array.from({ length: 8 }).map((_, i) => (
        <path key={`l${i}`} d="M100 70 L100 88" transform={`rotate(${i * 45} 100 100)`} />
      ))}
    </g>
  </svg>
);

// Block-print border: a strip like the edge of a hand-stamped Indian textile
export const BlockPrintBorder: React.FC<{ className?: string; tone?: 'light' | 'dark' }> = ({ className = '', tone = 'light' }) => {
  const ink = tone === 'light' ? '#b45309' : '#fbbf24';
  return (
    <div
      aria-hidden="true"
      className={`h-4 w-full bg-repeat-x pointer-events-none ${className}`}
      style={{
        backgroundSize: '32px 16px',
        backgroundImage: `url("data:image/svg+xml,${encodeURIComponent(
          `<svg xmlns='http://www.w3.org/2000/svg' width='32' height='16' viewBox='0 0 32 16'>
            <g fill='${ink}' fill-opacity='0.55'>
              <path d='M16 1 L22 8 L16 15 L10 8Z'/>
              <circle cx='2' cy='8' r='2'/><circle cx='30' cy='8' r='2'/>
            </g>
            <path d='M16 5 L19 8 L16 11 L13 8Z' fill='${tone === 'light' ? '#FFF7ED' : '#431407'}'/>
          </svg>`
        )}")`,
      }}
    />
  );
};
