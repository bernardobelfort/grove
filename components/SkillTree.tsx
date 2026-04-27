'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

const SAGE = '#A8C5A0';
const GOLD = '#D4A843';
const BRANCH = '#3D5A4A';
const BRANCH_DIM = '#2A3D32';

export type TreeStage = 'seed' | 'sprout' | 'sapling' | 'growing' | 'mature' | 'grove';

interface SkillDotProps {
  x: number;
  y: number;
  name: string;
  status: 'mastered' | 'unlocked' | 'in_progress' | 'locked';
  scale?: number;
}

function SkillDot({ x, y, name, status, scale = 1 }: SkillDotProps) {
  const [hover, setHover] = useState(false);

  const isMastered = status === 'mastered';
  const isUnlocked = status === 'unlocked';
  const isInProgress = status === 'in_progress';
  const isLocked = status === 'locked';

  const baseR = isMastered ? 6 : isUnlocked ? 5 : 4;
  const r = baseR * scale;

  return (
    <g
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{ cursor: 'pointer' }}
    >
      {isMastered && (
        <motion.circle
          cx={x}
          cy={y}
          r={12 * scale}
          fill={GOLD}
          opacity={0.15}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}
      {isInProgress && (
        <motion.circle
          cx={x}
          cy={y}
          r={10 * scale}
          fill={GOLD}
          opacity={0.12}
          animate={{ opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
      )}

      <circle
        cx={x}
        cy={y}
        r={r}
        fill={isMastered ? GOLD : isUnlocked ? SAGE : isInProgress ? 'none' : 'none'}
        stroke={isInProgress ? GOLD : isLocked ? BRANCH_DIM : 'none'}
        strokeWidth={(isInProgress ? 2 : isLocked ? 1.5 : 0) * scale}
        opacity={isLocked ? 0.4 : 1}
      />

      {isInProgress && (
        <circle cx={x} cy={y} r={2 * scale} fill={GOLD} />
      )}

      {hover && (
        <g>
          <rect
            x={x + 12}
            y={y - 10}
            width={name.length * 5.5 + 14}
            height={20}
            rx={6}
            fill="#0D1512"
            stroke="rgba(168,197,160,0.2)"
            strokeWidth="1"
          />
          <text
            x={x + 19}
            y={y + 4}
            fontSize="10"
            fill="#F4F2EC"
            fontFamily="system-ui, sans-serif"
            fontWeight="500"
          >
            {name}
          </text>
        </g>
      )}
    </g>
  );
}

function SeedTree() {
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full">
      <defs>
        <radialGradient id="groundGlow" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor={SAGE} stopOpacity="0.12" />
          <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="320" rx="60" ry="15" fill="url(#groundGlow)" />
      <ellipse cx="200" cy="320" rx="25" ry="6" fill={BRANCH_DIM} opacity="0.3" />

      <motion.path
        d="M 200 320 Q 200 310 200 300"
        stroke={BRANCH}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1, ease: "easeOut" }}
      />

      <motion.circle
        cx={200}
        cy={295}
        r={5}
        fill={SAGE}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.3 }}
      />

      <motion.g
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <SkillDot x={200} y={295} name="Primeiro Passo" status="mastered" scale={1.2} />
      </motion.g>
    </svg>
  );
}

function SproutTree() {
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full">
      <defs>
        <radialGradient id="groundGlow2" cx="50%" cy="100%" r="60%">
          <stop offset="0%" stopColor={SAGE} stopOpacity="0.1" />
          <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="320" rx="80" ry="18" fill="url(#groundGlow2)" />
      <ellipse cx="200" cy="320" rx="30" ry="7" fill={BRANCH_DIM} opacity="0.25" />

      <path d="M 200 320 Q 200 295 200 265" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />

      <path d="M 200 290 Q 180 280 165 275" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 200 290 Q 220 280 235 275" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      <path d="M 200 275 Q 190 265 180 260" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 200 275 Q 210 265 220 260" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <SkillDot x={165} y={275} name="Git Basico" status="mastered" />
      <SkillDot x={235} y={275} name="Ambiente Local" status="mastered" />
      <SkillDot x={200} y={260} name="Onboarding" status="in_progress" />
      <SkillDot x={180} y={260} name="Slack" status="unlocked" />
      <SkillDot x={220} y={260} name="Notion" status="unlocked" />
    </svg>
  );
}

function SaplingTree() {
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full">
      <defs>
        <radialGradient id="groundGlow3" cx="50%" cy="90%" r="50%">
          <stop offset="0%" stopColor={SAGE} stopOpacity="0.08" />
          <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="320" rx="100" ry="25" fill="url(#groundGlow3)" />
      <ellipse cx="200" cy="320" rx="35" ry="8" fill={BRANCH_DIM} opacity="0.2" />

      <path d="M 200 320 Q 200 280 200 235" stroke={BRANCH} strokeWidth="5" strokeLinecap="round" fill="none" />

      <path d="M 200 295 Q 160 275 130 265" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 130 265 Q 110 255 95 250" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 130 265 Q 125 280 120 295" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

      <path d="M 200 295 Q 240 275 270 265" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 270 265 Q 290 255 305 250" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 270 265 Q 275 280 280 295" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

      <path d="M 200 265 Q 175 245 155 230" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 200 265 Q 225 245 245 230" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      <path d="M 200 250 Q 200 235 200 220" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <SkillDot x={95} y={250} name="Arquitetura Limpa" status="mastered" />
      <SkillDot x={130} y={265} name="APIs REST" status="mastered" />
      <SkillDot x={120} y={295} name="GraphQL" status="locked" />

      <SkillDot x={305} y={250} name="Valores da Empresa" status="mastered" />
      <SkillDot x={270} y={265} name="Comunicacao" status="mastered" />
      <SkillDot x={280} y={295} name="Feedback" status="unlocked" />

      <SkillDot x={155} y={230} name="Git Workflow" status="in_progress" />
      <SkillDot x={245} y={230} name="Colaboracao" status="mastered" />
      <SkillDot x={200} y={220} name="Deploy" status="unlocked" />
    </svg>
  );
}

function GrowingTree() {
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full">
      <defs>
        <radialGradient id="groundGlow4" cx="50%" cy="85%" r="50%">
          <stop offset="0%" stopColor={SAGE} stopOpacity="0.08" />
          <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="330" rx="140" ry="35" fill="url(#groundGlow4)" />
      <ellipse cx="200" cy="330" rx="40" ry="9" fill={BRANCH_DIM} opacity="0.2" />

      <path d="M 200 330 Q 200 280 200 210" stroke={BRANCH} strokeWidth="5" strokeLinecap="round" fill="none" />

      <path d="M 200 305 Q 145 280 100 260" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 100 260 Q 70 245 50 230" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 100 260 Q 85 275 75 295" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 75 295 Q 65 310 55 320" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      <path d="M 200 305 Q 255 280 300 260" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 300 260 Q 330 245 350 230" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 300 260 Q 315 275 325 295" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 325 295 Q 335 310 345 320" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      <path d="M 200 270 Q 160 245 130 220" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 130 220 Q 110 200 95 180" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      <path d="M 200 270 Q 240 245 270 220" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 270 220 Q 290 200 305 180" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      <path d="M 200 240 Q 180 210 165 180" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 200 240 Q 220 210 235 180" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 200 220 Q 200 195 200 170" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <SkillDot x={50} y={230} name="Arquitetura Limpa" status="mastered" />
      <SkillDot x={100} y={260} name="APIs REST" status="mastered" />
      <SkillDot x={75} y={295} name="GraphQL" status="unlocked" />
      <SkillDot x={55} y={320} name="WebSockets" status="locked" />

      <SkillDot x={350} y={230} name="Valores da Empresa" status="mastered" />
      <SkillDot x={300} y={260} name="Comunicacao" status="mastered" />
      <SkillDot x={325} y={295} name="Feedback" status="mastered" />
      <SkillDot x={345} y={320} name="Mentoria" status="unlocked" />

      <SkillDot x={95} y={180} name="System Design" status="in_progress" />
      <SkillDot x={130} y={220} name="Git Workflow" status="mastered" />

      <SkillDot x={305} y={180} name="Lideranca" status="unlocked" />
      <SkillDot x={270} y={220} name="Colaboracao" status="mastered" />

      <SkillDot x={165} y={180} name="Microservices" status="unlocked" />
      <SkillDot x={235} y={180} name="1:1s" status="unlocked" />
      <SkillDot x={200} y={170} name="CI/CD" status="mastered" />
    </svg>
  );
}

function MatureTree() {
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full">
      <defs>
        <radialGradient id="centerGlow5" cx="50%" cy="85%" r="50%">
          <stop offset="0%" stopColor={SAGE} stopOpacity="0.08" />
          <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="320" rx="160" ry="50" fill="url(#centerGlow5)" />

      <path d="M 200 340 Q 200 280 200 200" stroke={BRANCH} strokeWidth="5" strokeLinecap="round" fill="none" />

      <path d="M 200 310 Q 130 280 80 250" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 80 250 Q 50 230 30 200" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 30 200 Q 20 180 15 155" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 80 250 Q 60 270 50 295" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 50 295 Q 40 310 35 325" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      <path d="M 200 310 Q 270 280 320 250" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 320 250 Q 350 230 370 200" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 370 200 Q 380 180 385 155" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 320 250 Q 340 270 350 295" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 350 295 Q 360 310 365 325" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />

      <path d="M 200 275 Q 145 240 105 200" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 105 200 Q 80 170 60 140" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 105 200 Q 90 220 80 245" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

      <path d="M 200 275 Q 255 240 295 200" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 295 200 Q 320 170 340 140" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 295 200 Q 310 220 320 245" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />

      <path d="M 200 240 Q 165 200 140 155" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 140 155 Q 125 130 115 100" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <path d="M 200 240 Q 235 200 260 155" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 260 155 Q 275 130 285 100" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <path d="M 200 215 Q 200 175 200 130" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 200 130 Q 200 105 200 80" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <path d="M 140 155 Q 120 155 100 160" stroke={BRANCH_DIM} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
      <path d="M 260 155 Q 280 155 300 160" stroke={BRANCH_DIM} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />

      <circle cx="200" cy="340" r="5" fill={BRANCH} />

      <SkillDot x={15} y={155} name="Arquitetura Limpa" status="mastered" />
      <SkillDot x={30} y={200} name="APIs REST" status="mastered" />
      <SkillDot x={50} y={295} name="GraphQL" status="mastered" />
      <SkillDot x={35} y={325} name="WebSockets" status="unlocked" />
      <SkillDot x={80} y={250} name="Microservices" status="mastered" />

      <SkillDot x={385} y={155} name="Valores" status="mastered" />
      <SkillDot x={370} y={200} name="Comunicacao" status="mastered" />
      <SkillDot x={350} y={295} name="Feedback" status="mastered" />
      <SkillDot x={365} y={325} name="Mentoria" status="mastered" />
      <SkillDot x={320} y={250} name="Lideranca" status="in_progress" />

      <SkillDot x={60} y={140} name="System Design" status="mastered" />
      <SkillDot x={105} y={200} name="Git Workflow" status="mastered" />
      <SkillDot x={80} y={245} name="Code Review" status="mastered" />

      <SkillDot x={340} y={140} name="Agile" status="mastered" />
      <SkillDot x={295} y={200} name="Colaboracao" status="mastered" />
      <SkillDot x={320} y={245} name="1:1s" status="mastered" />

      <SkillDot x={115} y={100} name="Docker" status="mastered" />
      <SkillDot x={140} y={155} name="Kubernetes" status="unlocked" />
      <SkillDot x={100} y={160} name="Terraform" status="locked" />

      <SkillDot x={285} y={100} name="Sprint Planning" status="mastered" />
      <SkillDot x={260} y={155} name="OKRs" status="unlocked" />
      <SkillDot x={300} y={160} name="Strategy" status="locked" />

      <SkillDot x={200} y={80} name="Staff Engineer" status="locked" />
      <SkillDot x={200} y={130} name="Tech Lead" status="unlocked" />
    </svg>
  );
}

function GroveTree() {
  return (
    <svg viewBox="0 0 400 360" className="w-full h-full">
      <defs>
        <radialGradient id="groveGlow1" cx="50%" cy="85%" r="60%">
          <stop offset="0%" stopColor={SAGE} stopOpacity="0.12" />
          <stop offset="60%" stopColor={SAGE} stopOpacity="0.04" />
          <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
        </radialGradient>
        <radialGradient id="groveGlow2" cx="50%" cy="20%" r="40%">
          <stop offset="0%" stopColor={GOLD} stopOpacity="0.1" />
          <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
        </radialGradient>
      </defs>

      <ellipse cx="200" cy="330" rx="150" ry="60" fill="url(#groveGlow1)" />
      <ellipse cx="200" cy="80" rx="100" ry="60" fill="url(#groveGlow2)" />

      {/* Tronco principal - elegante e centrado */}
      <path d="M 200 340 Q 200 280 200 180" stroke={BRANCH} strokeWidth="6" strokeLinecap="round" fill="none" />

      {/* Galhos principais - nível 1 (base) - simétricos e elegantes */}
      <path d="M 200 300 Q 140 270 90 240" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 90 240 Q 60 220 40 195" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 40 195 Q 25 175 20 150" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      <path d="M 200 300 Q 260 270 310 240" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
      <path d="M 310 240 Q 340 220 360 195" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 360 195 Q 375 175 380 150" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />

      {/* Galhos nível 2 - mais altos */}
      <path d="M 200 260 Q 150 230 110 195" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 110 195 Q 85 170 65 140" stroke={BRANCH} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M 65 140 Q 50 115 45 90" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <path d="M 200 260 Q 250 230 290 195" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
      <path d="M 290 195 Q 315 170 335 140" stroke={BRANCH} strokeWidth="2.8" strokeLinecap="round" fill="none" />
      <path d="M 335 140 Q 350 115 355 90" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Galhos nível 3 - copa */}
      <path d="M 200 220 Q 160 190 130 155" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 130 155 Q 110 130 95 100" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 95 100 Q 85 80 80 55" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      <path d="M 200 220 Q 240 190 270 155" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 270 155 Q 290 130 305 100" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 305 100 Q 315 80 320 55" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Galhos centrais - topo da árvore */}
      <path d="M 200 200 Q 200 160 200 120" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
      <path d="M 200 120 Q 200 90 200 55" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
      <path d="M 200 55 Q 200 40 200 25" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

      {/* Ramificações delicadas do topo */}
      <path d="M 200 140 Q 175 120 155 95" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 155 95 Q 145 80 140 60" stroke={BRANCH} strokeWidth="1.5" strokeLinecap="round" fill="none" />

      <path d="M 200 140 Q 225 120 245 95" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />
      <path d="M 245 95 Q 255 80 260 60" stroke={BRANCH} strokeWidth="1.5" strokeLinecap="round" fill="none" />

      {/* Sub-ramificações elegantes */}
      <path d="M 90 240 Q 75 255 60 270" stroke={BRANCH_DIM} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />
      <path d="M 310 240 Q 325 255 340 270" stroke={BRANCH_DIM} strokeWidth="1.8" strokeLinecap="round" fill="none" opacity="0.6" />

      <path d="M 110 195 Q 95 210 85 230" stroke={BRANCH_DIM} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />
      <path d="M 290 195 Q 305 210 315 230" stroke={BRANCH_DIM} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.5" />

      {/* Base/raiz */}
      <ellipse cx="200" cy="342" rx="12" ry="4" fill={BRANCH} opacity="0.4" />

      {/* Habilidades distribuídas harmonicamente */}
      {/* Lado esquerdo - Engenharia */}
      <SkillDot x={20} y={150} name="Arquitetura" status="mastered" />
      <SkillDot x={40} y={195} name="APIs REST" status="mastered" />
      <SkillDot x={60} y={270} name="GraphQL" status="mastered" />
      <SkillDot x={90} y={240} name="Microservices" status="mastered" />
      <SkillDot x={65} y={140} name="System Design" status="mastered" />
      <SkillDot x={45} y={90} name="DDD" status="mastered" />

      {/* Lado direito - Cultura */}
      <SkillDot x={380} y={150} name="Valores" status="mastered" />
      <SkillDot x={360} y={195} name="Comunicacao" status="mastered" />
      <SkillDot x={340} y={270} name="Feedback" status="mastered" />
      <SkillDot x={310} y={240} name="Lideranca" status="mastered" />
      <SkillDot x={335} y={140} name="Mentoria" status="mastered" />
      <SkillDot x={355} y={90} name="Coaching" status="mastered" />

      {/* Meio-esquerda - Processos */}
      <SkillDot x={110} y={195} name="Docker" status="mastered" />
      <SkillDot x={95} y={100} name="Kubernetes" status="mastered" />
      <SkillDot x={80} y={55} name="Terraform" status="mastered" />
      <SkillDot x={130} y={155} name="CI/CD" status="mastered" />

      {/* Meio-direita - Ferramentas */}
      <SkillDot x={290} y={195} name="OKRs" status="mastered" />
      <SkillDot x={305} y={100} name="Product" status="mastered" />
      <SkillDot x={320} y={55} name="Roadmap" status="mastered" />
      <SkillDot x={270} y={155} name="Strategy" status="mastered" />

      {/* Centro - Carreira */}
      <SkillDot x={200} y={25} name="CTO Track" status="in_progress" />
      <SkillDot x={200} y={55} name="VP Engineering" status="mastered" />
      <SkillDot x={200} y={120} name="Staff Engineer" status="mastered" />
      <SkillDot x={200} y={200} name="Tech Lead" status="mastered" />

      {/* Ramificações do topo */}
      <SkillDot x={155} y={95} name="Culture" status="mastered" />
      <SkillDot x={245} y={95} name="Vision" status="mastered" />
      <SkillDot x={140} y={60} name="Innovation" status="mastered" />
      <SkillDot x={260} y={60} name="Excellence" status="mastered" />

      {/* Sub-ramos */}
      <SkillDot x={85} y={230} name="AWS" status="mastered" />
      <SkillDot x={315} y={230} name="Stakeholders" status="mastered" />
    </svg>
  );
}

interface SkillTreeProps {
  className?: string;
  stage?: TreeStage;
}

export default function SkillTree({ className = '', stage = 'sapling' }: SkillTreeProps) {
  const renderTree = () => {
    switch (stage) {
      case 'seed':
        return <SeedTree />;
      case 'sprout':
        return <SproutTree />;
      case 'sapling':
        return <SaplingTree />;
      case 'growing':
        return <GrowingTree />;
      case 'mature':
        return <MatureTree />;
      case 'grove':
        return <GroveTree />;
      default:
        return <SaplingTree />;
    }
  };

  const getStats = () => {
    switch (stage) {
      case 'seed':
        return { eng: '0/1', cul: '0/0', proc: '0/0', tool: '0/0' };
      case 'sprout':
        return { eng: '2/3', cul: '0/1', proc: '1/2', tool: '2/2' };
      case 'sapling':
        return { eng: '3/5', cul: '3/4', proc: '1/2', tool: '1/2' };
      case 'growing':
        return { eng: '5/8', cul: '5/6', proc: '2/3', tool: '2/3' };
      case 'mature':
        return { eng: '8/12', cul: '7/8', proc: '4/5', tool: '3/4' };
      case 'grove':
        return { eng: '12/12', cul: '8/8', proc: '5/5', tool: '4/4' };
      default:
        return { eng: '3/5', cul: '3/4', proc: '1/2', tool: '1/2' };
    }
  };

  const stats = getStats();

  return (
    <div className={`w-full h-full flex flex-col ${className}`}>
      <div className="flex-1">
        {renderTree()}
      </div>

      <div
        className="mx-auto mt-2 px-5 py-3 rounded-xl flex items-center gap-6"
        style={{
          background: 'rgba(168,197,160,0.05)',
          border: '1px solid rgba(168,197,160,0.1)'
        }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#4a8f60' }} />
          <span className="text-[11px] text-grove-sage/80">Engenharia</span>
          <span className="text-[11px] font-medium text-grove-sage ml-1">{stats.eng}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#D4A843' }} />
          <span className="text-[11px] text-grove-sage/80">Cultura</span>
          <span className="text-[11px] font-medium text-grove-sage ml-1">{stats.cul}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#5b9bd5' }} />
          <span className="text-[11px] text-grove-sage/80">Processos</span>
          <span className="text-[11px] font-medium text-grove-sage ml-1">{stats.proc}</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full" style={{ background: '#c47ada' }} />
          <span className="text-[11px] text-grove-sage/80">Ferramentas</span>
          <span className="text-[11px] font-medium text-grove-sage ml-1">{stats.tool}</span>
        </div>
      </div>
    </div>
  );
}

export { SeedTree, SproutTree, SaplingTree, GrowingTree, MatureTree, GroveTree };
