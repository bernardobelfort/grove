'use client';

import Image from 'next/image';

interface LogoProps {
  size?: number;
  showWord?: boolean;
}

export default function Logo({ size = 28, showWord = false }: LogoProps) {
  const height = size;
  const logoWidth = showWord ? size * 4 : size * 1.2;

  return (
    <div className="flex items-center justify-center">
      <Image
        src="/logo.png"
        alt="Grove"
        width={logoWidth}
        height={height}
        className="object-contain"
        style={{
          filter: 'brightness(1.1) contrast(1.05)',
          maxHeight: height,
          width: 'auto',
        }}
        priority
      />
    </div>
  );
}
