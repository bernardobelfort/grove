'use client';

const SAGE = '#A8C5A0';
const GOLD = '#D4A843';
const BRANCH = '#3D5A4A';
const BRANCH_DIM = '#2A3D32';

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
  const scale = 0.4;
  const viewBox = "0 0 32 44";

  const renderStage = () => {
    switch (stage) {
      case 0:
        return (
          <g>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${78*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" />
            <circle cx={40*scale} cy={78*scale} r={4*scale} fill={SAGE} opacity="0.8" />
          </g>
        );
      case 1:
        return (
          <g>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${75*scale} Q ${30*scale} ${68*scale} ${22*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${75*scale} Q ${50*scale} ${68*scale} ${58*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <circle cx={40*scale} cy={65*scale} r={3.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={22*scale} cy={62*scale} r={3*scale} fill={SAGE} opacity="0.8" />
            <circle cx={58*scale} cy={62*scale} r={3*scale} fill={GOLD} opacity="0.9" />
          </g>
        );
      case 2:
        return (
          <g>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${55*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${78*scale} Q ${26*scale} ${70*scale} ${15*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${78*scale} Q ${54*scale} ${70*scale} ${65*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${65*scale} Q ${30*scale} ${58*scale} ${22*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${65*scale} Q ${50*scale} ${58*scale} ${58*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <circle cx={40*scale} cy={55*scale} r={3.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={15*scale} cy={62*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={65*scale} cy={62*scale} r={3*scale} fill={SAGE} opacity="0.8" />
            <circle cx={22*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.75" />
            <circle cx={58*scale} cy={50*scale} r={2.5*scale} fill={GOLD} opacity="0.9" />
          </g>
        );
      case 3:
        return (
          <g>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${45*scale}`} stroke={BRANCH} strokeWidth={3*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${82*scale} Q ${22*scale} ${74*scale} ${10*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${82*scale} Q ${58*scale} ${74*scale} ${70*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${68*scale} Q ${26*scale} ${60*scale} ${15*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${68*scale} Q ${54*scale} ${60*scale} ${65*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${32*scale} ${48*scale} ${25*scale} ${38*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${48*scale} ${48*scale} ${55*scale} ${38*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <circle cx={40*scale} cy={45*scale} r={3.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={10*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={70*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={15*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={65*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={25*scale} cy={38*scale} r={2.5*scale} fill={SAGE} opacity="0.75" />
            <circle cx={55*scale} cy={38*scale} r={2.5*scale} fill={SAGE} opacity="0.75" />
          </g>
        );
      case 4:
        return (
          <g>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${35*scale}`} stroke={BRANCH} strokeWidth={3*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${85*scale} Q ${18*scale} ${76*scale} ${8*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${85*scale} Q ${62*scale} ${76*scale} ${72*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${70*scale} Q ${22*scale} ${62*scale} ${12*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${70*scale} Q ${58*scale} ${62*scale} ${68*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${28*scale} ${46*scale} ${18*scale} ${35*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${52*scale} ${46*scale} ${62*scale} ${35*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${42*scale} Q ${34*scale} ${34*scale} ${28*scale} ${24*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${42*scale} Q ${46*scale} ${34*scale} ${52*scale} ${24*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <circle cx={40*scale} cy={35*scale} r={4*scale} fill={GOLD} opacity="0.95" />
            <circle cx={8*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={72*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={12*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={68*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={18*scale} cy={35*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={62*scale} cy={35*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={28*scale} cy={24*scale} r={2.5*scale} fill={SAGE} opacity="0.75" />
            <circle cx={52*scale} cy={24*scale} r={2.5*scale} fill={SAGE} opacity="0.75" />
          </g>
        );
      case 5:
        return (
          <g>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${25*scale}`} stroke={BRANCH} strokeWidth={3.5*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${88*scale} Q ${14*scale} ${78*scale} ${5*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${88*scale} Q ${66*scale} ${78*scale} ${75*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${72*scale} Q ${18*scale} ${62*scale} ${8*scale} ${48*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${72*scale} Q ${62*scale} ${62*scale} ${72*scale} ${48*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${24*scale} ${45*scale} ${14*scale} ${32*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${56*scale} ${45*scale} ${66*scale} ${32*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${40*scale} Q ${32*scale} ${30*scale} ${24*scale} ${18*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${40*scale} Q ${48*scale} ${30*scale} ${56*scale} ${18*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <circle cx={40*scale} cy={25*scale} r={5*scale} fill={GOLD} opacity="1" />
            <circle cx={5*scale} cy={65*scale} r={3.5*scale} fill={GOLD} opacity="0.95" />
            <circle cx={75*scale} cy={65*scale} r={3.5*scale} fill={GOLD} opacity="0.95" />
            <circle cx={8*scale} cy={48*scale} r={3*scale} fill={GOLD} opacity="0.9" />
            <circle cx={72*scale} cy={48*scale} r={3*scale} fill={GOLD} opacity="0.9" />
            <circle cx={14*scale} cy={32*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={66*scale} cy={32*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={24*scale} cy={18*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={56*scale} cy={18*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg width={size} height={size * 1.375} viewBox={viewBox} className="block">
      <ellipse cx={40*scale} cy={40} rx={6} ry={1.2} fill={SAGE} opacity="0.1" />
      {renderStage()}
    </svg>
  );
}
