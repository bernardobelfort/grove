'use client';

import { motion } from 'framer-motion';

const SAGE = '#A8C5A0';
const GOLD = '#D4A843';
const BRANCH = '#3D5A4A';
const BRANCH_DIM = '#2A3D32';

interface StageTreeProps {
  stage: 'seed' | 'sprout' | 'sapling' | 'growing' | 'mature' | 'grove';
  current?: boolean;
}

const stageMap: Record<string, number> = {
  seed: 0,
  sprout: 1,
  sapling: 2,
  growing: 3,
  mature: 4,
  grove: 5,
};

export default function StageTree({ stage, current = false }: StageTreeProps) {
  const stageIndex = stageMap[stage];
  const opacity = current ? 1 : 0.55;
  const scale = 1;

  const renderStage = () => {
    switch (stageIndex) {
      case 0:
        return (
          <g opacity={opacity}>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${78*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" />
            <circle cx={40*scale} cy={78*scale} r={4*scale} fill={SAGE} opacity="0.7" />
          </g>
        );
      case 1:
        return (
          <g opacity={opacity}>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${75*scale} Q ${30*scale} ${68*scale} ${22*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${75*scale} Q ${50*scale} ${68*scale} ${58*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <circle cx={40*scale} cy={65*scale} r={3.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={22*scale} cy={62*scale} r={3*scale} fill={SAGE} opacity="0.7" />
            <circle cx={58*scale} cy={62*scale} r={3*scale} fill={current ? GOLD : SAGE} opacity={current ? 0.9 : 0.7} />
          </g>
        );
      case 2:
        return (
          <g opacity={opacity}>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${55*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${78*scale} Q ${26*scale} ${70*scale} ${15*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${78*scale} Q ${54*scale} ${70*scale} ${65*scale} ${62*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${65*scale} Q ${30*scale} ${58*scale} ${22*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${65*scale} Q ${50*scale} ${58*scale} ${58*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <circle cx={40*scale} cy={55*scale} r={3.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={15*scale} cy={62*scale} r={3*scale} fill={GOLD} opacity="0.9" />
            <circle cx={65*scale} cy={62*scale} r={3*scale} fill={SAGE} opacity="0.7" />
            <circle cx={22*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.7" />
            <circle cx={58*scale} cy={50*scale} r={2.5*scale} fill={current ? GOLD : SAGE} opacity={current ? 0.9 : 0.7} />
            {current && <circle cx={58*scale} cy={50*scale} r={5*scale} fill={GOLD} opacity="0.15" />}
          </g>
        );
      case 3:
        return (
          <g opacity={opacity}>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${45*scale}`} stroke={BRANCH} strokeWidth={3*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${82*scale} Q ${22*scale} ${74*scale} ${10*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${82*scale} Q ${58*scale} ${74*scale} ${70*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${68*scale} Q ${26*scale} ${60*scale} ${15*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${68*scale} Q ${54*scale} ${60*scale} ${65*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${32*scale} ${48*scale} ${25*scale} ${38*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${48*scale} ${48*scale} ${55*scale} ${38*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${10*scale} ${65*scale} Q ${8*scale} ${72*scale} ${10*scale} ${80*scale}`} stroke={BRANCH_DIM} strokeWidth={1.2*scale} strokeLinecap="round" fill="none" opacity="0.5" />
            <path d={`M ${70*scale} ${65*scale} Q ${72*scale} ${72*scale} ${70*scale} ${80*scale}`} stroke={BRANCH_DIM} strokeWidth={1.2*scale} strokeLinecap="round" fill="none" opacity="0.5" />
            <circle cx={40*scale} cy={45*scale} r={3.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={10*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.9" />
            <circle cx={70*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.9" />
            <circle cx={15*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={65*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={25*scale} cy={38*scale} r={2.5*scale} fill={SAGE} opacity="0.7" />
            <circle cx={55*scale} cy={38*scale} r={2.5*scale} fill={SAGE} opacity="0.7" />
            <circle cx={10*scale} cy={80*scale} r={2*scale} fill={BRANCH_DIM} opacity="0.4" />
            <circle cx={70*scale} cy={80*scale} r={2*scale} fill={BRANCH_DIM} opacity="0.4" />
          </g>
        );
      case 4:
        return (
          <g opacity={opacity}>
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${35*scale}`} stroke={BRANCH} strokeWidth={3*scale} strokeLinecap="round" />
            <path d={`M ${40*scale} ${85*scale} Q ${18*scale} ${76*scale} ${8*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${85*scale} Q ${62*scale} ${76*scale} ${72*scale} ${65*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${70*scale} Q ${22*scale} ${62*scale} ${12*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${70*scale} Q ${58*scale} ${62*scale} ${68*scale} ${50*scale}`} stroke={BRANCH} strokeWidth={2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${28*scale} ${46*scale} ${18*scale} ${35*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${55*scale} Q ${52*scale} ${46*scale} ${62*scale} ${35*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${42*scale} Q ${34*scale} ${34*scale} ${28*scale} ${24*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${42*scale} Q ${46*scale} ${34*scale} ${52*scale} ${24*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${8*scale} ${65*scale} Q ${5*scale} ${74*scale} ${8*scale} ${82*scale}`} stroke={BRANCH_DIM} strokeWidth={1.2*scale} strokeLinecap="round" fill="none" opacity="0.5" />
            <path d={`M ${72*scale} ${65*scale} Q ${75*scale} ${74*scale} ${72*scale} ${82*scale}`} stroke={BRANCH_DIM} strokeWidth={1.2*scale} strokeLinecap="round" fill="none" opacity="0.5" />
            <circle cx={40*scale} cy={35*scale} r={4*scale} fill={GOLD} opacity="0.9" />
            <circle cx={8*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={72*scale} cy={65*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={12*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={68*scale} cy={50*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={18*scale} cy={35*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={62*scale} cy={35*scale} r={2.5*scale} fill={SAGE} opacity="0.8" />
            <circle cx={28*scale} cy={24*scale} r={2.5*scale} fill={SAGE} opacity="0.7" />
            <circle cx={52*scale} cy={24*scale} r={2.5*scale} fill={SAGE} opacity="0.7" />
            <circle cx={8*scale} cy={82*scale} r={2*scale} fill={BRANCH_DIM} opacity="0.4" />
            <circle cx={72*scale} cy={82*scale} r={2*scale} fill={BRANCH_DIM} opacity="0.4" />
          </g>
        );
      case 5:
        return (
          <g opacity={opacity}>
            {/* Tronco principal elegante */}
            <path d={`M ${40*scale} ${92*scale} L ${40*scale} ${22*scale}`} stroke={BRANCH} strokeWidth={3.5*scale} strokeLinecap="round" />

            {/* Galhos principais - nível base */}
            <path d={`M ${40*scale} ${82*scale} Q ${20*scale} ${72*scale} ${8*scale} ${60*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${82*scale} Q ${60*scale} ${72*scale} ${72*scale} ${60*scale}`} stroke={BRANCH} strokeWidth={2.5*scale} strokeLinecap="round" fill="none" />

            {/* Galhos nível 2 */}
            <path d={`M ${40*scale} ${68*scale} Q ${22*scale} ${58*scale} ${12*scale} ${45*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${68*scale} Q ${58*scale} ${58*scale} ${68*scale} ${45*scale}`} stroke={BRANCH} strokeWidth={2.2*scale} strokeLinecap="round" fill="none" />

            {/* Galhos nível 3 */}
            <path d={`M ${40*scale} ${52*scale} Q ${28*scale} ${42*scale} ${18*scale} ${30*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${52*scale} Q ${52*scale} ${42*scale} ${62*scale} ${30*scale}`} stroke={BRANCH} strokeWidth={1.8*scale} strokeLinecap="round" fill="none" />

            {/* Galhos do topo */}
            <path d={`M ${40*scale} ${38*scale} Q ${32*scale} ${28*scale} ${26*scale} ${18*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />
            <path d={`M ${40*scale} ${38*scale} Q ${48*scale} ${28*scale} ${54*scale} ${18*scale}`} stroke={BRANCH} strokeWidth={1.5*scale} strokeLinecap="round" fill="none" />

            {/* Frutos/nós dourados principais */}
            {current && <circle cx={40*scale} cy={20*scale} r={8*scale} fill={GOLD} opacity="0.12" />}
            <motion.circle
              cx={40*scale}
              cy={20*scale}
              r={4.5*scale}
              fill={GOLD}
              animate={current ? { opacity: [0.85, 1, 0.85] } : {}}
              transition={{ duration: 2, repeat: Infinity }}
            />

            {/* Frutos nos galhos */}
            <circle cx={8*scale} cy={60*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={72*scale} cy={60*scale} r={3*scale} fill={GOLD} opacity="0.95" />
            <circle cx={12*scale} cy={45*scale} r={2.8*scale} fill={GOLD} opacity="0.9" />
            <circle cx={68*scale} cy={45*scale} r={2.8*scale} fill={GOLD} opacity="0.9" />
            <circle cx={18*scale} cy={30*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={62*scale} cy={30*scale} r={2.5*scale} fill={SAGE} opacity="0.85" />
            <circle cx={26*scale} cy={18*scale} r={2.2*scale} fill={SAGE} opacity="0.8" />
            <circle cx={54*scale} cy={18*scale} r={2.2*scale} fill={SAGE} opacity="0.8" />
          </g>
        );
      default:
        return null;
    }
  };

  return (
    <svg viewBox="0 0 80 100" className="w-full h-full" preserveAspectRatio="xMidYMid meet">
      <ellipse cx={40*scale} cy={95} rx={12 * (current ? 1 : 0.7)} ry={2.5 * (current ? 1 : 0.7)} fill={SAGE} opacity={0.1 * opacity} />
      {renderStage()}
    </svg>
  );
}
