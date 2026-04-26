'use client';

interface LogoProps {
  size?: number;
  showWord?: boolean;
}

export default function Logo({ size = 28, showWord = false }: LogoProps) {
  const iconSize = showWord ? size : size;

  return (
    <div className="flex items-center" style={{ gap: size * 0.35 }}>
      <svg
        width={iconSize}
        height={iconSize * 1.125}
        viewBox="0 0 32 36"
        fill="none"
        className="flex-shrink-0"
      >
        <path
          d="M 16 2 C 16 2 4 10 4 20 C 4 27 9 32 16 34 C 16 34 16 26 16 20"
          fill="#A8C5A0"
          opacity="0.85"
        />
        <path
          d="M 16 5 C 16 5 26 12 26 21 C 26 28 22 32 16 34 C 16 34 16 26 16 20"
          fill="#1A3C34"
          opacity="0.9"
        />
        <path
          d="M 10 34 C 12 35 14 35.5 16 35.5 C 18 35.5 20 35 22 34"
          stroke="#A8C5A0"
          strokeWidth="1.2"
          strokeLinecap="round"
          fill="none"
          opacity="0.5"
        />
        <circle cx="16" cy="20" r="2.5" fill="#D4A843" opacity="0.9" />
        <circle cx="16" cy="20" r="4.5" fill="#D4A843" opacity="0.15" />
      </svg>
      {showWord && (
        <span
          className="font-serif font-semibold"
          style={{
            fontSize: size * 0.65,
            letterSpacing: '-0.02em',
            lineHeight: 1,
            color: '#e8e2d4',
          }}
        >
          grove
        </span>
      )}
    </div>
  );
}
