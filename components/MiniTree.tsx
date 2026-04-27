'use client';

const SAGE = '#A8C5A0';
const GOLD = '#D4A843';
const BRANCH = '#3D5A4A';

interface MiniTreeProps {
  progress?: number;
  size?: number;
}

function getStage(progress: number): 0 | 1 | 2 | 3 | 4 | 5 {
  if (progress <= 15) return 0;
  if (progress <= 30) return 1;
  if (progress <= 45) return 2;
  if (progress <= 60) return 3;
  if (progress <= 80) return 4;
  return 5;
}

export default function MiniTree({ progress = 30, size = 32 }: MiniTreeProps) {
  const stage = getStage(progress);
  const height = size * 1.375;

  const renderStage = () => {
    switch (stage) {
      case 0:
        return (
          <g>
            <path d="M 16 28 L 16 22" stroke={BRANCH} strokeWidth={2} strokeLinecap="round" />
            <circle cx={16} cy={21} r={3} fill={SAGE} opacity="0.8" />
          </g>
        );
      case 1:
        return (
          <g>
            <path d="M 16 28 L 16 16" stroke={BRANCH} strokeWidth={2} strokeLinecap="round" />
            <path d="M 16 22 Q 11 19 8 17" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />
            <path d="M 16 22 Q 21 19 24 17" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />
            <circle cx={16} cy={15} r={2.5} fill={SAGE} opacity="0.85" />
            <circle cx={8} cy={17} r={2} fill={SAGE} opacity="0.8" />
            <circle cx={24} cy={17} r={2} fill={GOLD} opacity="0.9" />
          </g>
        );
      case 2:
        return (
          <g>
            <path d="M 16 28 L 16 12" stroke={BRANCH} strokeWidth={2} strokeLinecap="round" />
            <path d="M 16 24 Q 9 20 5 17" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />
            <path d="M 16 24 Q 23 20 27 17" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />
            <path d="M 16 18 Q 12 15 9 12" stroke={BRANCH} strokeWidth={1.2} strokeLinecap="round" fill="none" />
            <path d="M 16 18 Q 20 15 23 12" stroke={BRANCH} strokeWidth={1.2} strokeLinecap="round" fill="none" />
            <circle cx={16} cy={11} r={2.5} fill={SAGE} opacity="0.85" />
            <circle cx={5} cy={17} r={2} fill={GOLD} opacity="0.95" />
            <circle cx={27} cy={17} r={2} fill={SAGE} opacity="0.8" />
            <circle cx={9} cy={12} r={1.8} fill={SAGE} opacity="0.75" />
            <circle cx={23} cy={12} r={1.8} fill={GOLD} opacity="0.9" />
          </g>
        );
      case 3:
        return (
          <g>
            <path d="M 16 28 L 16 9" stroke={BRANCH} strokeWidth={2.2} strokeLinecap="round" />
            <path d="M 16 25 Q 8 21 4 17" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />
            <path d="M 16 25 Q 24 21 28 17" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />
            <path d="M 16 20 Q 10 16 6 12" stroke={BRANCH} strokeWidth={1.3} strokeLinecap="round" fill="none" />
            <path d="M 16 20 Q 22 16 26 12" stroke={BRANCH} strokeWidth={1.3} strokeLinecap="round" fill="none" />
            <path d="M 16 14 Q 13 11 10 8" stroke={BRANCH} strokeWidth={1.1} strokeLinecap="round" fill="none" />
            <path d="M 16 14 Q 19 11 22 8" stroke={BRANCH} strokeWidth={1.1} strokeLinecap="round" fill="none" />
            <circle cx={16} cy={8} r={2.5} fill={SAGE} opacity="0.85" />
            <circle cx={4} cy={17} r={2} fill={GOLD} opacity="0.95" />
            <circle cx={28} cy={17} r={2} fill={GOLD} opacity="0.95" />
            <circle cx={6} cy={12} r={1.8} fill={SAGE} opacity="0.85" />
            <circle cx={26} cy={12} r={1.8} fill={SAGE} opacity="0.85" />
            <circle cx={10} cy={8} r={1.6} fill={SAGE} opacity="0.75" />
            <circle cx={22} cy={8} r={1.6} fill={SAGE} opacity="0.75" />
          </g>
        );
      case 4:
        return (
          <g>
            <path d="M 16 28 L 16 6" stroke={BRANCH} strokeWidth={2.2} strokeLinecap="round" />
            <path d="M 16 26 Q 6 21 2 16" stroke={BRANCH} strokeWidth={1.6} strokeLinecap="round" fill="none" />
            <path d="M 16 26 Q 26 21 30 16" stroke={BRANCH} strokeWidth={1.6} strokeLinecap="round" fill="none" />
            <path d="M 16 21 Q 8 17 4 12" stroke={BRANCH} strokeWidth={1.4} strokeLinecap="round" fill="none" />
            <path d="M 16 21 Q 24 17 28 12" stroke={BRANCH} strokeWidth={1.4} strokeLinecap="round" fill="none" />
            <path d="M 16 15 Q 11 11 7 7" stroke={BRANCH} strokeWidth={1.2} strokeLinecap="round" fill="none" />
            <path d="M 16 15 Q 21 11 25 7" stroke={BRANCH} strokeWidth={1.2} strokeLinecap="round" fill="none" />
            <path d="M 16 10 Q 13 7 11 4" stroke={BRANCH} strokeWidth={1} strokeLinecap="round" fill="none" />
            <path d="M 16 10 Q 19 7 21 4" stroke={BRANCH} strokeWidth={1} strokeLinecap="round" fill="none" />
            <circle cx={16} cy={5} r={2.8} fill={GOLD} opacity="0.95" />
            <circle cx={2} cy={16} r={2} fill={GOLD} opacity="0.95" />
            <circle cx={30} cy={16} r={2} fill={GOLD} opacity="0.95" />
            <circle cx={4} cy={12} r={1.8} fill={SAGE} opacity="0.85" />
            <circle cx={28} cy={12} r={1.8} fill={SAGE} opacity="0.85" />
            <circle cx={7} cy={7} r={1.6} fill={SAGE} opacity="0.8" />
            <circle cx={25} cy={7} r={1.6} fill={SAGE} opacity="0.8" />
            <circle cx={11} cy={4} r={1.4} fill={SAGE} opacity="0.75" />
            <circle cx={21} cy={4} r={1.4} fill={SAGE} opacity="0.75" />
          </g>
        );
      case 5:
        return (
          <g>
            {/* Tronco elegante */}
            <path d="M 16 28 L 16 5" stroke={BRANCH} strokeWidth={2.5} strokeLinecap="round" />

            {/* Galhos principais - simétricos */}
            <path d="M 16 25 Q 6 20 2 15" stroke={BRANCH} strokeWidth={1.8} strokeLinecap="round" fill="none" />
            <path d="M 16 25 Q 26 20 30 15" stroke={BRANCH} strokeWidth={1.8} strokeLinecap="round" fill="none" />

            {/* Galhos nível 2 */}
            <path d="M 16 20 Q 8 15 4 10" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />
            <path d="M 16 20 Q 24 15 28 10" stroke={BRANCH} strokeWidth={1.5} strokeLinecap="round" fill="none" />

            {/* Galhos nível 3 */}
            <path d="M 16 14 Q 10 10 7 6" stroke={BRANCH} strokeWidth={1.3} strokeLinecap="round" fill="none" />
            <path d="M 16 14 Q 22 10 25 6" stroke={BRANCH} strokeWidth={1.3} strokeLinecap="round" fill="none" />

            {/* Galhos do topo */}
            <path d="M 16 9 Q 13 6 11 3" stroke={BRANCH} strokeWidth={1.1} strokeLinecap="round" fill="none" />
            <path d="M 16 9 Q 19 6 21 3" stroke={BRANCH} strokeWidth={1.1} strokeLinecap="round" fill="none" />

            {/* Frutos dourados */}
            <circle cx={16} cy={4} r={2.8} fill={GOLD} opacity="1" />
            <circle cx={2} cy={15} r={2} fill={GOLD} opacity="0.95" />
            <circle cx={30} cy={15} r={2} fill={GOLD} opacity="0.95" />
            <circle cx={4} cy={10} r={1.8} fill={GOLD} opacity="0.9" />
            <circle cx={28} cy={10} r={1.8} fill={GOLD} opacity="0.9" />
            <circle cx={7} cy={6} r={1.6} fill={SAGE} opacity="0.85" />
            <circle cx={25} cy={6} r={1.6} fill={SAGE} opacity="0.85" />
            <circle cx={11} cy={3} r={1.4} fill={SAGE} opacity="0.8" />
            <circle cx={21} cy={3} r={1.4} fill={SAGE} opacity="0.8" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg width={size} height={height} viewBox="0 0 32 32" className="block overflow-visible">
      <ellipse cx={16} cy={30} rx={5} ry={1} fill={SAGE} opacity="0.1" />
      {renderStage()}
    </svg>
  );
}
