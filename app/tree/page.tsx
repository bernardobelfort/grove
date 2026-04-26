'use client';

import React, { useState, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import { ArrowLeft, X, CheckCircle2, Clock, Lock, Zap, BookOpen, Target, ChevronLeft, ChevronRight } from 'lucide-react';
import { employee } from '@/data/employee';
import { growthStages, getStageFromDay, getStageIndex } from '@/data/skillTree';
import { TreeStage } from '@/components/SkillTree';

const SAGE = '#A8C5A0';
const GOLD = '#D4A843';
const BRANCH = '#3D5A4A';
const BRANCH_DIM = '#2A3D32';

interface Skill {
  id: string;
  name: string;
  status: 'mastered' | 'unlocked' | 'in_progress' | 'locked';
  domain: string;
  x: number;
  y: number;
}

const skillDetails: Record<string, { description: string; duration: string; benefits: string[]; prerequisites: string[] }> = {
  'Arquitetura Limpa': {
    description: 'Domine os principios de Clean Architecture para criar sistemas modulares, testaveis e independentes de frameworks.',
    duration: '2-3 horas',
    benefits: ['Codigo mais testavel', 'Independencia de frameworks', 'Facilidade de manutencao'],
    prerequisites: ['Principios SOLID', 'Design Patterns basicos'],
  },
  'APIs REST': {
    description: 'Aprenda a projetar e implementar APIs RESTful seguindo as melhores praticas.',
    duration: '1-2 horas',
    benefits: ['APIs padronizadas', 'Melhor integracao', 'Documentacao clara'],
    prerequisites: ['HTTP basico', 'JSON'],
  },
  'Git Workflow': {
    description: 'Domine o fluxo de trabalho Git usado pela equipe.',
    duration: '1 hora',
    benefits: ['Colaboracao eficiente', 'Historico organizado', 'Menos conflitos'],
    prerequisites: ['Git basico'],
  },
  'System Design': {
    description: 'Aprenda a projetar sistemas escalaveis e resilientes.',
    duration: '4-6 horas',
    benefits: ['Visao sistemica', 'Decisoes informadas', 'Escalabilidade'],
    prerequisites: ['Arquitetura Limpa', 'APIs REST'],
  },
  'Valores da Empresa': {
    description: 'Conheca os valores fundamentais que guiam nossas decisoes.',
    duration: '30 min',
    benefits: ['Alinhamento cultural', 'Decisoes coerentes', 'Senso de pertencimento'],
    prerequisites: [],
  },
  'Comunicacao': {
    description: 'Desenvolva habilidades de comunicacao efetiva.',
    duration: '1 hora',
    benefits: ['Clareza nas ideias', 'Menos mal-entendidos', 'Colaboracao fluida'],
    prerequisites: ['Valores da Empresa'],
  },
  'Feedback': {
    description: 'Aprenda a cultura de feedback continuo.',
    duration: '45 min',
    benefits: ['Crescimento acelerado', 'Relacoes saudaveis', 'Melhoria continua'],
    prerequisites: ['Comunicacao'],
  },
  'Colaboracao': {
    description: 'Entenda como trabalhamos em equipe.',
    duration: '1 hora',
    benefits: ['Sinergia de equipe', 'Conhecimento compartilhado', 'Qualidade elevada'],
    prerequisites: ['Comunicacao', 'Feedback'],
  },
  'Deploy': {
    description: 'Entenda nosso processo de deploy e CI/CD.',
    duration: '1-2 horas',
    benefits: ['Deploys confiaveis', 'Rollback rapido', 'Menos downtime'],
    prerequisites: ['Git Workflow'],
  },
};

const domainColors: Record<string, string> = {
  engineering: '#4a8f60',
  culture: '#D4A843',
  processes: '#5b9bd5',
  tools: '#c47ada',
};

const domainNames: Record<string, string> = {
  engineering: 'Engenharia',
  culture: 'Cultura',
  processes: 'Processos',
  tools: 'Ferramentas',
};

function SkillDot({ skill, onClick, isActive }: { skill: Skill; onClick: () => void; isActive: boolean }) {
  const [hover, setHover] = useState(false);
  const { x, y, name, status } = skill;

  const isMastered = status === 'mastered';
  const isUnlocked = status === 'unlocked';
  const isInProgress = status === 'in_progress';
  const isLocked = status === 'locked';

  const r = isMastered ? 6 : isUnlocked ? 5 : 4;

  const tooltipWidth = name.length * 5.5 + 14;
  const tooltipX = x + tooltipWidth + 20 > 400 ? x - tooltipWidth - 8 : x + 12;

  return (
    <g
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      onClick={isActive ? onClick : undefined}
      style={{ cursor: isActive ? 'pointer' : 'default' }}
      opacity={isActive ? 1 : 0.15}
    >
      {isMastered && isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={12}
          fill={GOLD}
          opacity={0.15}
          animate={{ opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 2.5, repeat: Infinity }}
        />
      )}
      {isInProgress && isActive && (
        <motion.circle
          cx={x}
          cy={y}
          r={10}
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
        strokeWidth={isInProgress ? 2 : isLocked ? 1.5 : 0}
        opacity={isLocked && isActive ? 0.4 : 1}
      />

      {isInProgress && (
        <circle cx={x} cy={y} r={2} fill={GOLD} />
      )}

      {hover && isActive && (
        <g style={{ pointerEvents: 'none' }}>
          <rect
            x={tooltipX}
            y={y - 10}
            width={tooltipWidth}
            height={20}
            rx={6}
            fill="#0D1512"
            stroke="rgba(168,197,160,0.2)"
            strokeWidth="1"
          />
          <text
            x={tooltipX + 7}
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

function SkillModal({ skill, onClose }: { skill: Skill; onClose: () => void }) {
  const details = skillDetails[skill.name] || {
    description: 'Descricao em breve.',
    duration: '1 hora',
    benefits: ['Em desenvolvimento'],
    prerequisites: [],
  };

  const isMastered = skill.status === 'mastered';
  const isLocked = skill.status === 'locked';
  const isInProgress = skill.status === 'in_progress';

  const statusConfig = {
    mastered: { label: 'Dominada', color: GOLD, icon: CheckCircle2, bg: 'rgba(212,168,67,0.15)' },
    unlocked: { label: 'Desbloqueada', color: SAGE, icon: Zap, bg: 'rgba(168,197,160,0.15)' },
    in_progress: { label: 'Em Progresso', color: GOLD, icon: Clock, bg: 'rgba(212,168,67,0.15)' },
    locked: { label: 'Bloqueada', color: '#6B7280', icon: Lock, bg: 'rgba(107,114,128,0.15)' },
  };

  const config = statusConfig[skill.status];
  const StatusIcon = config.icon;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/70 backdrop-blur-md" />

      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.95, y: 20 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-[440px] rounded-2xl overflow-hidden"
        style={{ background: '#0C1A16' }}
      >
        <div className="h-1.5" style={{ background: `linear-gradient(90deg, ${domainColors[skill.domain]}, ${config.color})` }} />

        <div className="p-6">
          <div className="flex items-start justify-between mb-4">
            <div>
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: domainColors[skill.domain] }} />
                <span className="text-[10px] font-medium" style={{ color: domainColors[skill.domain] }}>{domainNames[skill.domain]}</span>
              </div>
              <h2 className="text-[20px] font-bold tracking-tight text-grove-text">{skill.name}</h2>
            </div>
            <button onClick={onClose} className="p-2 rounded-xl hover:bg-white/5 text-grove-text-muted hover:text-grove-text">
              <X size={18} />
            </button>
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-lg mb-4" style={{ background: config.bg }}>
            <StatusIcon size={13} style={{ color: config.color }} />
            <span className="text-[11px] font-medium" style={{ color: config.color }}>{config.label}</span>
          </div>

          <p className="text-[12px] leading-relaxed text-grove-text/80 mb-5">{details.description}</p>

          <div className="grid grid-cols-2 gap-3 mb-5">
            <div className="p-3 rounded-xl bg-white/[0.03] border border-grove-border">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Clock size={12} className="text-grove-sage" />
                <span className="text-[9px] text-grove-text-muted font-medium">Duracao</span>
              </div>
              <div className="text-[13px] font-semibold text-grove-text">{details.duration}</div>
            </div>
            <div className="p-3 rounded-xl bg-white/[0.03] border border-grove-border">
              <div className="flex items-center gap-1.5 mb-1.5">
                <Target size={12} className="text-grove-sage" />
                <span className="text-[9px] text-grove-text-muted font-medium">Beneficios</span>
              </div>
              <div className="text-[13px] font-semibold text-grove-text">{details.benefits.length}</div>
            </div>
          </div>

          <div className="mb-5">
            <div className="flex items-center gap-2 mb-2">
              <Zap size={12} className="text-grove-gold" />
              <span className="text-[10px] font-medium text-grove-text-muted">O que voce vai ganhar</span>
            </div>
            <div className="space-y-1.5">
              {details.benefits.map((benefit, i) => (
                <div key={i} className="flex items-center gap-2 p-2.5 rounded-lg bg-grove-gold/[0.06] border border-grove-gold/15">
                  <CheckCircle2 size={12} className="text-grove-gold flex-shrink-0" />
                  <span className="text-[11px] text-grove-text/90">{benefit}</span>
                </div>
              ))}
            </div>
          </div>

          {details.prerequisites.length > 0 && (
            <div className="mb-5">
              <div className="flex items-center gap-2 mb-2">
                <BookOpen size={12} className="text-grove-sage" />
                <span className="text-[10px] font-medium text-grove-text-muted">Pre-requisitos</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {details.prerequisites.map((prereq, i) => (
                  <span key={i} className="px-2.5 py-1 rounded-lg text-[10px] bg-grove-sage/10 text-grove-sage border border-grove-sage/20">
                    {prereq}
                  </span>
                ))}
              </div>
            </div>
          )}

          {!isMastered && !isLocked && (
            <button className="w-full py-3 rounded-xl font-semibold text-[12px]" style={{ background: isInProgress ? GOLD : SAGE, color: '#0A0A0A' }}>
              {isInProgress ? 'Continuar Aprendendo' : 'Comecar Agora'}
            </button>
          )}

          {isMastered && (
            <div className="flex items-center justify-center gap-2 py-2.5 text-grove-gold">
              <CheckCircle2 size={16} />
              <span className="text-[12px] font-medium">Voce ja domina esta habilidade!</span>
            </div>
          )}

          {isLocked && (
            <div className="flex items-center justify-center gap-2 py-2.5 text-grove-text-muted">
              <Lock size={14} />
              <span className="text-[11px]">Complete os pre-requisitos para desbloquear</span>
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}

const skillsByStage: Record<TreeStage, Skill[]> = {
  seed: [
    { id: '1', name: 'Primeiro Passo', status: 'in_progress', domain: 'culture', x: 200, y: 295 },
  ],
  sprout: [
    { id: '1', name: 'Git Basico', status: 'mastered', domain: 'engineering', x: 165, y: 275 },
    { id: '2', name: 'Ambiente Local', status: 'mastered', domain: 'tools', x: 235, y: 275 },
    { id: '3', name: 'Onboarding', status: 'in_progress', domain: 'culture', x: 200, y: 260 },
    { id: '4', name: 'Slack', status: 'unlocked', domain: 'tools', x: 180, y: 260 },
    { id: '5', name: 'Notion', status: 'unlocked', domain: 'tools', x: 220, y: 260 },
  ],
  sapling: [
    { id: '1', name: 'Arquitetura Limpa', status: 'mastered', domain: 'engineering', x: 95, y: 250 },
    { id: '2', name: 'APIs REST', status: 'mastered', domain: 'engineering', x: 130, y: 265 },
    { id: '3', name: 'GraphQL', status: 'locked', domain: 'engineering', x: 120, y: 295 },
    { id: '4', name: 'Valores da Empresa', status: 'mastered', domain: 'culture', x: 305, y: 250 },
    { id: '5', name: 'Comunicacao', status: 'mastered', domain: 'culture', x: 270, y: 265 },
    { id: '6', name: 'Feedback', status: 'unlocked', domain: 'culture', x: 280, y: 295 },
    { id: '7', name: 'Git Workflow', status: 'in_progress', domain: 'engineering', x: 155, y: 230 },
    { id: '8', name: 'Colaboracao', status: 'mastered', domain: 'culture', x: 245, y: 230 },
    { id: '9', name: 'Deploy', status: 'unlocked', domain: 'processes', x: 200, y: 220 },
  ],
  growing: [
    { id: '1', name: 'Arquitetura Limpa', status: 'mastered', domain: 'engineering', x: 50, y: 230 },
    { id: '2', name: 'APIs REST', status: 'mastered', domain: 'engineering', x: 100, y: 260 },
    { id: '3', name: 'GraphQL', status: 'unlocked', domain: 'engineering', x: 75, y: 295 },
    { id: '4', name: 'WebSockets', status: 'locked', domain: 'engineering', x: 55, y: 320 },
    { id: '5', name: 'Valores da Empresa', status: 'mastered', domain: 'culture', x: 350, y: 230 },
    { id: '6', name: 'Comunicacao', status: 'mastered', domain: 'culture', x: 300, y: 260 },
    { id: '7', name: 'Feedback', status: 'mastered', domain: 'culture', x: 325, y: 295 },
    { id: '8', name: 'Mentoria', status: 'unlocked', domain: 'culture', x: 345, y: 320 },
    { id: '9', name: 'System Design', status: 'in_progress', domain: 'engineering', x: 95, y: 180 },
    { id: '10', name: 'Git Workflow', status: 'mastered', domain: 'engineering', x: 130, y: 220 },
    { id: '11', name: 'Lideranca', status: 'unlocked', domain: 'culture', x: 305, y: 180 },
    { id: '12', name: 'Colaboracao', status: 'mastered', domain: 'culture', x: 270, y: 220 },
    { id: '13', name: 'Microservices', status: 'unlocked', domain: 'engineering', x: 165, y: 180 },
    { id: '14', name: '1:1s', status: 'unlocked', domain: 'culture', x: 235, y: 180 },
    { id: '15', name: 'CI/CD', status: 'mastered', domain: 'tools', x: 200, y: 170 },
  ],
  mature: [
    { id: '1', name: 'Arquitetura Limpa', status: 'mastered', domain: 'engineering', x: 15, y: 155 },
    { id: '2', name: 'APIs REST', status: 'mastered', domain: 'engineering', x: 30, y: 200 },
    { id: '3', name: 'GraphQL', status: 'mastered', domain: 'engineering', x: 50, y: 295 },
    { id: '4', name: 'WebSockets', status: 'unlocked', domain: 'engineering', x: 35, y: 325 },
    { id: '5', name: 'Microservices', status: 'mastered', domain: 'engineering', x: 80, y: 250 },
    { id: '6', name: 'Valores', status: 'mastered', domain: 'culture', x: 385, y: 155 },
    { id: '7', name: 'Comunicacao', status: 'mastered', domain: 'culture', x: 370, y: 200 },
    { id: '8', name: 'Feedback', status: 'mastered', domain: 'culture', x: 350, y: 295 },
    { id: '9', name: 'Mentoria', status: 'mastered', domain: 'culture', x: 365, y: 325 },
    { id: '10', name: 'Lideranca', status: 'in_progress', domain: 'culture', x: 320, y: 250 },
    { id: '11', name: 'System Design', status: 'mastered', domain: 'engineering', x: 60, y: 140 },
    { id: '12', name: 'Git Workflow', status: 'mastered', domain: 'engineering', x: 105, y: 200 },
    { id: '13', name: 'Code Review', status: 'mastered', domain: 'processes', x: 80, y: 245 },
    { id: '14', name: 'Agile', status: 'mastered', domain: 'processes', x: 340, y: 140 },
    { id: '15', name: 'Colaboracao', status: 'mastered', domain: 'culture', x: 295, y: 200 },
    { id: '16', name: '1:1s', status: 'mastered', domain: 'culture', x: 320, y: 245 },
    { id: '17', name: 'Docker', status: 'mastered', domain: 'tools', x: 115, y: 100 },
    { id: '18', name: 'Kubernetes', status: 'unlocked', domain: 'tools', x: 140, y: 155 },
    { id: '19', name: 'Terraform', status: 'locked', domain: 'tools', x: 100, y: 160 },
    { id: '20', name: 'Sprint Planning', status: 'mastered', domain: 'processes', x: 285, y: 100 },
    { id: '21', name: 'OKRs', status: 'unlocked', domain: 'processes', x: 260, y: 155 },
    { id: '22', name: 'Strategy', status: 'locked', domain: 'processes', x: 300, y: 160 },
    { id: '23', name: 'Staff Engineer', status: 'locked', domain: 'engineering', x: 200, y: 80 },
    { id: '24', name: 'Tech Lead', status: 'unlocked', domain: 'engineering', x: 200, y: 130 },
  ],
  grove: [
    { id: '1', name: 'Arquitetura Limpa', status: 'mastered', domain: 'engineering', x: -5, y: 160 },
    { id: '2', name: 'APIs REST', status: 'mastered', domain: 'engineering', x: 25, y: 220 },
    { id: '3', name: 'GraphQL', status: 'mastered', domain: 'engineering', x: 10, y: 290 },
    { id: '4', name: 'Microservices', status: 'mastered', domain: 'engineering', x: 60, y: 200 },
    { id: '5', name: 'Event Sourcing', status: 'mastered', domain: 'engineering', x: 45, y: 265 },
    { id: '6', name: 'CQRS', status: 'mastered', domain: 'engineering', x: 8, y: 345 },
    { id: '7', name: 'DDD', status: 'mastered', domain: 'engineering', x: 35, y: 130 },
    { id: '8', name: 'Valores', status: 'mastered', domain: 'culture', x: 405, y: 160 },
    { id: '9', name: 'Comunicacao', status: 'mastered', domain: 'culture', x: 375, y: 220 },
    { id: '10', name: 'Feedback', status: 'mastered', domain: 'culture', x: 390, y: 290 },
    { id: '11', name: 'Lideranca', status: 'mastered', domain: 'culture', x: 340, y: 200 },
    { id: '12', name: 'Mentoria', status: 'mastered', domain: 'culture', x: 355, y: 265 },
    { id: '13', name: 'Hiring', status: 'mastered', domain: 'culture', x: 392, y: 345 },
    { id: '14', name: 'Coaching', status: 'mastered', domain: 'culture', x: 365, y: 130 },
    { id: '15', name: 'System Design', status: 'mastered', domain: 'engineering', x: 50, y: 105 },
    { id: '16', name: 'Docker', status: 'mastered', domain: 'tools', x: 95, y: 165 },
    { id: '17', name: 'Kubernetes', status: 'mastered', domain: 'tools', x: 70, y: 210 },
    { id: '18', name: 'Terraform', status: 'mastered', domain: 'tools', x: 35, y: 60 },
    { id: '19', name: 'AWS', status: 'mastered', domain: 'tools', x: 5, y: 95 },
    { id: '20', name: 'Product Sense', status: 'mastered', domain: 'processes', x: 350, y: 105 },
    { id: '21', name: 'OKRs', status: 'mastered', domain: 'processes', x: 305, y: 165 },
    { id: '22', name: 'Strategy', status: 'mastered', domain: 'processes', x: 330, y: 210 },
    { id: '23', name: 'Roadmap', status: 'mastered', domain: 'processes', x: 365, y: 60 },
    { id: '24', name: 'Stakeholders', status: 'mastered', domain: 'processes', x: 395, y: 95 },
    { id: '25', name: 'CTO Track', status: 'in_progress', domain: 'engineering', x: 200, y: 25 },
    { id: '26', name: 'VP Engineering', status: 'mastered', domain: 'engineering', x: 200, y: 65 },
    { id: '27', name: 'Staff Engineer', status: 'mastered', domain: 'engineering', x: 200, y: 130 },
    { id: '28', name: 'Tech Lead', status: 'mastered', domain: 'engineering', x: 200, y: 230 },
    { id: '29', name: 'Distributed Systems', status: 'mastered', domain: 'engineering', x: 100, y: 80 },
    { id: '30', name: 'ML Ops', status: 'mastered', domain: 'tools', x: 85, y: 35 },
    { id: '31', name: 'Data Platform', status: 'mastered', domain: 'engineering', x: 300, y: 80 },
    { id: '32', name: 'Platform Eng', status: 'mastered', domain: 'engineering', x: 315, y: 35 },
    { id: '33', name: 'Architecture', status: 'mastered', domain: 'engineering', x: 130, y: 145 },
    { id: '34', name: 'Scale', status: 'mastered', domain: 'engineering', x: 270, y: 145 },
    { id: '35', name: 'Culture', status: 'mastered', domain: 'culture', x: 150, y: 95 },
    { id: '36', name: 'Vision', status: 'mastered', domain: 'culture', x: 250, y: 95 },
    { id: '37', name: 'Innovation', status: 'mastered', domain: 'processes', x: 135, y: 50 },
    { id: '38', name: 'Excellence', status: 'mastered', domain: 'processes', x: 265, y: 50 },
  ],
};

function TreeBranches({ stage, isActive }: { stage: TreeStage; isActive: boolean }) {
  const opacity = isActive ? 1 : 0.12;

  const renderBranches = () => {
    switch (stage) {
      case 'seed':
        return (
          <g opacity={opacity}>
            <defs>
              <radialGradient id="groundGlowSeed" cx="50%" cy="100%" r="60%">
                <stop offset="0%" stopColor={SAGE} stopOpacity="0.12" />
                <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="320" rx="60" ry="15" fill="url(#groundGlowSeed)" />
            <ellipse cx="200" cy="320" rx="25" ry="6" fill={BRANCH_DIM} opacity="0.3" />
            <path d="M 200 320 Q 200 310 200 300" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'sprout':
        return (
          <g opacity={opacity}>
            <defs>
              <radialGradient id="groundGlowSprout" cx="50%" cy="100%" r="60%">
                <stop offset="0%" stopColor={SAGE} stopOpacity="0.1" />
                <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="320" rx="80" ry="18" fill="url(#groundGlowSprout)" />
            <ellipse cx="200" cy="320" rx="30" ry="7" fill={BRANCH_DIM} opacity="0.25" />
            <path d="M 200 320 Q 200 295 200 265" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 200 290 Q 180 280 165 275" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 200 290 Q 220 280 235 275" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 200 275 Q 190 265 180 260" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 200 275 Q 210 265 220 260" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />
          </g>
        );

      case 'sapling':
        return (
          <g opacity={opacity}>
            <defs>
              <radialGradient id="groundGlowSapling" cx="50%" cy="90%" r="50%">
                <stop offset="0%" stopColor={SAGE} stopOpacity="0.08" />
                <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="320" rx="100" ry="25" fill="url(#groundGlowSapling)" />
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
          </g>
        );

      case 'growing':
        return (
          <g opacity={opacity}>
            <defs>
              <radialGradient id="groundGlowGrowing" cx="50%" cy="85%" r="50%">
                <stop offset="0%" stopColor={SAGE} stopOpacity="0.08" />
                <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="330" rx="140" ry="35" fill="url(#groundGlowGrowing)" />
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
          </g>
        );

      case 'mature':
        return (
          <g opacity={opacity}>
            <defs>
              <radialGradient id="groundGlowMature" cx="50%" cy="85%" r="50%">
                <stop offset="0%" stopColor={SAGE} stopOpacity="0.08" />
                <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
              </radialGradient>
            </defs>
            <ellipse cx="200" cy="320" rx="160" ry="50" fill="url(#groundGlowMature)" />
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
          </g>
        );

      case 'grove':
        return (
          <g opacity={opacity}>
            <defs>
              <radialGradient id="groveGlow1" cx="50%" cy="90%" r="70%">
                <stop offset="0%" stopColor={SAGE} stopOpacity="0.15" />
                <stop offset="50%" stopColor={SAGE} stopOpacity="0.05" />
                <stop offset="100%" stopColor={SAGE} stopOpacity="0" />
              </radialGradient>
              <radialGradient id="groveGlow2" cx="50%" cy="30%" r="50%">
                <stop offset="0%" stopColor={GOLD} stopOpacity="0.08" />
                <stop offset="100%" stopColor={GOLD} stopOpacity="0" />
              </radialGradient>
            </defs>

            <ellipse cx="200" cy="320" rx="195" ry="100" fill="url(#groveGlow1)" />
            <ellipse cx="200" cy="100" rx="120" ry="80" fill="url(#groveGlow2)" />

            <path d="M 200 350 Q 200 290 200 220" stroke={BRANCH} strokeWidth="6" strokeLinecap="round" fill="none" />

            <path d="M 200 320 Q 100 280 25 220" stroke={BRANCH} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 25 220 Q 5 195 -5 160" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 25 220 Q 15 250 10 290" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 10 290 Q 5 320 8 345" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
            <path d="M 25 220 Q 40 200 55 175" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 55 175 Q 45 155 35 130" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 320 Q 300 280 375 220" stroke={BRANCH} strokeWidth="4.5" strokeLinecap="round" fill="none" />
            <path d="M 375 220 Q 395 195 405 160" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 375 220 Q 385 250 390 290" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 390 290 Q 395 320 392 345" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.5" />
            <path d="M 375 220 Q 360 200 345 175" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 345 175 Q 355 155 365 130" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 290 Q 120 250 60 200" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 60 200 Q 35 175 20 140" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 60 200 Q 50 230 45 265" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 20 140 Q 10 120 5 95" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 290 Q 280 250 340 200" stroke={BRANCH} strokeWidth="4" strokeLinecap="round" fill="none" />
            <path d="M 340 200 Q 365 175 380 140" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 340 200 Q 350 230 355 265" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 380 140 Q 390 120 395 95" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 260 Q 140 215 95 165" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 95 165 Q 70 140 50 105" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 95 165 Q 80 185 70 210" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 50 105 Q 40 85 35 60" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 260 Q 260 215 305 165" stroke={BRANCH} strokeWidth="3.5" strokeLinecap="round" fill="none" />
            <path d="M 305 165 Q 330 140 350 105" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 305 165 Q 320 185 330 210" stroke={BRANCH_DIM} strokeWidth="2" strokeLinecap="round" fill="none" opacity="0.6" />
            <path d="M 350 105 Q 360 85 365 60" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 240 Q 160 195 130 145" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 130 145 Q 110 115 100 80" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 130 145 Q 110 150 90 160" stroke={BRANCH_DIM} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M 100 80 Q 90 60 85 35" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 240 Q 240 195 270 145" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 270 145 Q 290 115 300 80" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 270 145 Q 290 150 310 160" stroke={BRANCH_DIM} strokeWidth="1.5" strokeLinecap="round" fill="none" opacity="0.7" />
            <path d="M 300 80 Q 310 60 315 35" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 230 Q 200 180 200 130" stroke={BRANCH} strokeWidth="3" strokeLinecap="round" fill="none" />
            <path d="M 200 130 Q 200 100 200 65" stroke={BRANCH} strokeWidth="2.5" strokeLinecap="round" fill="none" />
            <path d="M 200 65 Q 200 45 200 25" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />

            <path d="M 200 160 Q 170 130 150 95" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 150 95 Q 140 75 135 50" stroke={BRANCH} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 200 160 Q 230 130 250 95" stroke={BRANCH} strokeWidth="2" strokeLinecap="round" fill="none" />
            <path d="M 250 95 Q 260 75 265 50" stroke={BRANCH} strokeWidth="1.5" strokeLinecap="round" fill="none" />

            <path d="M 200 130 Q 180 110 165 85" stroke={BRANCH} strokeWidth="1.5" strokeLinecap="round" fill="none" />
            <path d="M 200 130 Q 220 110 235 85" stroke={BRANCH} strokeWidth="1.5" strokeLinecap="round" fill="none" />

            <circle cx="200" cy="350" r="6" fill={BRANCH} />
          </g>
        );

      default:
        return null;
    }
  };

  return renderBranches();
}

function TreePreviewMini({ stage, isCurrent, isPast }: { stage: TreeStage; isCurrent: boolean; isPast: boolean }) {
  const color = isCurrent ? GOLD : isPast ? SAGE : BRANCH_DIM;
  const opacity = isCurrent || isPast ? 1 : 0.35;

  const paths: Record<TreeStage, React.ReactNode> = {
    seed: (
      <g opacity={opacity}>
        <path d="M 20 38 Q 20 34 20 28" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <circle cx={20} cy={26} r={3.5} fill={color} />
      </g>
    ),
    sprout: (
      <g opacity={opacity}>
        <path d="M 20 38 Q 20 30 20 20" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M 20 28 Q 14 24 9 22" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M 20 28 Q 26 24 31 22" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx={9} cy={22} r={2.5} fill={color} />
        <circle cx={31} cy={22} r={2.5} fill={color} />
        <circle cx={20} cy={18} r={2.5} fill={color} />
      </g>
    ),
    sapling: (
      <g opacity={opacity}>
        <path d="M 20 38 Q 20 28 20 14" stroke={color} strokeWidth={2.8} strokeLinecap="round" />
        <path d="M 20 32 Q 10 26 4 22" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="M 20 32 Q 30 26 36 22" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="M 20 22 Q 15 18 12 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M 20 22 Q 25 18 28 14" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={4} cy={22} r={2.5} fill={color} />
        <circle cx={36} cy={22} r={2.5} fill={color} />
        <circle cx={20} cy={12} r={2.5} fill={color} />
      </g>
    ),
    growing: (
      <g opacity={opacity}>
        <path d="M 20 38 Q 20 26 20 10" stroke={color} strokeWidth={3} strokeLinecap="round" />
        <path d="M 20 34 Q 8 26 2 20" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M 20 34 Q 32 26 38 20" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M 20 24 Q 12 18 7 12" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M 20 24 Q 28 18 33 12" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <circle cx={2} cy={20} r={2.5} fill={color} />
        <circle cx={38} cy={20} r={2.5} fill={color} />
        <circle cx={7} cy={12} r={2} fill={color} />
        <circle cx={33} cy={12} r={2} fill={color} />
        <circle cx={20} cy={8} r={2.5} fill={color} />
      </g>
    ),
    mature: (
      <g opacity={opacity}>
        <path d="M 20 38 Q 20 24 20 6" stroke={color} strokeWidth={3.2} strokeLinecap="round" />
        <path d="M 20 35 Q 6 26 1 18" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M 20 35 Q 34 26 39 18" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M 20 26 Q 10 18 5 10" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="M 20 26 Q 30 18 35 10" stroke={color} strokeWidth={2} strokeLinecap="round" />
        <path d="M 20 16 Q 16 12 14 7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M 20 16 Q 24 12 26 7" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={1} cy={18} r={2} fill={color} />
        <circle cx={39} cy={18} r={2} fill={color} />
        <circle cx={5} cy={10} r={1.8} fill={color} />
        <circle cx={35} cy={10} r={1.8} fill={color} />
        <circle cx={20} cy={5} r={2.5} fill={color} />
      </g>
    ),
    grove: (
      <g opacity={opacity}>
        <path d="M 20 40 Q 20 25 20 5" stroke={color} strokeWidth={4} strokeLinecap="round" />
        <path d="M 20 38 Q -2 24 -5 12" stroke={color} strokeWidth={3} strokeLinecap="round" />
        <path d="M 20 38 Q 42 24 45 12" stroke={color} strokeWidth={3} strokeLinecap="round" />
        <path d="M 20 32 Q 2 20 -2 8" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M 20 32 Q 38 20 42 8" stroke={color} strokeWidth={2.5} strokeLinecap="round" />
        <path d="M 20 26 Q 8 16 4 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M 20 26 Q 32 16 36 6" stroke={color} strokeWidth={2.2} strokeLinecap="round" />
        <path d="M 20 20 Q 12 12 9 4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M 20 20 Q 28 12 31 4" stroke={color} strokeWidth={1.8} strokeLinecap="round" />
        <path d="M 20 14 Q 16 9 14 3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <path d="M 20 14 Q 24 9 26 3" stroke={color} strokeWidth={1.5} strokeLinecap="round" />
        <circle cx={-5} cy={12} r={2} fill={color} />
        <circle cx={45} cy={12} r={2} fill={color} />
        <circle cx={-2} cy={8} r={1.8} fill={color} />
        <circle cx={42} cy={8} r={1.8} fill={color} />
        <circle cx={4} cy={6} r={1.6} fill={color} />
        <circle cx={36} cy={6} r={1.6} fill={color} />
        <circle cx={9} cy={4} r={1.5} fill={color} />
        <circle cx={31} cy={4} r={1.5} fill={color} />
        <circle cx={14} cy={3} r={1.3} fill={color} />
        <circle cx={26} cy={3} r={1.3} fill={color} />
        <circle cx={20} cy={2} r={2.5} fill={color} />
      </g>
    ),
  };

  return (
    <svg viewBox="0 0 40 42" className="w-full h-full">
      {paths[stage]}
    </svg>
  );
}

export default function TreePage() {
  const userStage = getStageFromDay(employee.day);
  const userStageIndex = getStageIndex(employee.day);
  const [viewingIndex, setViewingIndex] = useState(userStageIndex);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [sidebarWidth, setSidebarWidth] = useState(240);
  const [isDragging, setIsDragging] = useState(false);
  const dragRef = useRef<HTMLDivElement>(null);

  const viewingStage = growthStages[viewingIndex];
  const isActive = viewingIndex <= userStageIndex;
  const isCurrent = viewingIndex === userStageIndex;
  const isPast = viewingIndex < userStageIndex;

  const skills = skillsByStage[viewingStage.stage];

  const prev = () => viewingIndex > 0 && setViewingIndex(viewingIndex - 1);
  const next = () => viewingIndex < growthStages.length - 1 && setViewingIndex(viewingIndex + 1);

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newWidth = window.innerWidth - e.clientX;
    setSidebarWidth(Math.max(180, Math.min(400, newWidth)));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    setIsDragging(false);
  }, []);

  React.useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  const getLabel = () => {
    if (isCurrent) return 'Estagio Atual';
    if (isPast) return 'Concluido';
    return 'Bloqueado';
  };

  const getLabelColor = () => {
    if (isCurrent) return GOLD;
    if (isPast) return SAGE;
    return BRANCH_DIM;
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="h-screen flex flex-col overflow-hidden"
      style={{ background: '#071310' }}
    >
      <div className="absolute inset-0 pointer-events-none" style={{ background: `radial-gradient(ellipse at 50% 50%, ${isActive ? 'rgba(168,197,160,0.06)' : 'rgba(168,197,160,0.015)'} 0%, transparent 70%)` }} />

      <div className="px-6 py-4 flex items-center justify-between border-b border-grove-border relative z-10">
        <div className="flex items-center gap-4">
          <Link href="/dashboard" className="flex items-center gap-2 px-3 py-2 rounded-xl text-[13px] text-grove-sage/70 hover:text-grove-sage hover:bg-grove-sage/[0.08] transition-all">
            <ArrowLeft size={16} />
            <span>Voltar</span>
          </Link>
          <div className="h-5 w-px bg-grove-border" />
          <div>
            <div className="text-[16px] font-semibold tracking-tight">Minha Arvore</div>
            <div className="text-[11px] text-grove-text-muted">Explore sua jornada de crescimento</div>
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="text-right">
            <div className="text-[11px] text-grove-text-muted">Habilidades</div>
            <div className="text-[14px] font-semibold text-grove-sage">{employee.skillsUnlocked} / {employee.skillsTotal}</div>
          </div>
          <div className="h-8 w-px bg-grove-border" />
          <div className="text-right">
            <div className="text-[11px] text-grove-text-muted">Dia</div>
            <div className="text-[14px] font-semibold text-grove-gold">{employee.day}</div>
          </div>
        </div>
      </div>

      <div className="flex-1 flex min-h-0 relative z-10">
        <div className="flex-1 flex flex-col items-center justify-center p-4 relative">
          <motion.div key={viewingIndex} initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} className="absolute top-4 flex flex-col items-center z-20">
            <div className="text-[10px] font-medium tracking-wider uppercase mb-0.5" style={{ color: getLabelColor() }}>{getLabel()}</div>
            <div className="text-[24px] font-bold tracking-tight text-grove-text">{viewingStage.label}</div>
            <div className="text-[11px] text-grove-text-muted">{viewingStage.description}</div>
            {!isActive && (
              <div className="flex items-center gap-1.5 mt-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-grove-border">
                <Lock size={12} className="text-grove-text-muted" />
                <span className="text-[10px] text-grove-text-muted">Alcance o {viewingStage.day}</span>
              </div>
            )}
          </motion.div>

          <div className="flex items-center gap-3 w-full max-w-[560px] h-full max-h-[420px]">
            <button onClick={prev} disabled={viewingIndex === 0} className={`p-2.5 rounded-full transition-all ${viewingIndex === 0 ? 'opacity-20' : 'bg-grove-sage/10 hover:bg-grove-sage/20 text-grove-sage'}`}>
              <ChevronLeft size={22} />
            </button>

            <div className="flex-1 h-full relative">
              <AnimatePresence mode="wait">
                <motion.div
                  key={viewingIndex}
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.96 }}
                  transition={{ duration: 0.35 }}
                  className="w-full h-full"
                >
                  <svg viewBox="0 0 400 360" className="w-full h-full">
                    <TreeBranches stage={viewingStage.stage} isActive={isActive} />
                    {skills.map((skill) => (
                      <SkillDot key={skill.id} skill={skill} onClick={() => setSelectedSkill(skill)} isActive={isActive} />
                    ))}
                  </svg>
                </motion.div>
              </AnimatePresence>
            </div>

            <button onClick={next} disabled={viewingIndex === growthStages.length - 1} className={`p-2.5 rounded-full transition-all ${viewingIndex === growthStages.length - 1 ? 'opacity-20' : 'bg-grove-sage/10 hover:bg-grove-sage/20 text-grove-sage'}`}>
              <ChevronRight size={22} />
            </button>
          </div>

          <div className="absolute bottom-4 flex items-center gap-1.5">
            {growthStages.map((_, i) => (
              <button
                key={i}
                onClick={() => setViewingIndex(i)}
                className={`h-1.5 rounded-full transition-all ${i === viewingIndex ? 'w-5 bg-grove-gold' : i <= userStageIndex ? 'w-1.5 bg-grove-sage/50 hover:bg-grove-sage' : 'w-1.5 bg-grove-border'}`}
              />
            ))}
          </div>
        </div>

        <div ref={dragRef} className="relative border-l border-grove-border bg-black/30 flex flex-col" style={{ width: sidebarWidth }}>
          <div
            onMouseDown={handleMouseDown}
            className={`absolute left-0 top-0 bottom-0 w-1 cursor-col-resize hover:bg-grove-sage/30 transition-colors z-20 ${isDragging ? 'bg-grove-sage/40' : ''}`}
          />
          <div className="p-4 overflow-auto flex-1 flex flex-col">
          <div className="text-[10px] text-grove-text-muted tracking-wide font-medium mb-3">Jornada</div>

          <div className="space-y-1 flex-1">
            {growthStages.map((s, i) => {
              const curr = i === userStageIndex;
              const past = i < userStageIndex;
              const viewing = i === viewingIndex;

              return (
                <button
                  key={i}
                  onClick={() => setViewingIndex(i)}
                  className={`w-full flex items-center gap-2.5 p-2.5 rounded-xl text-left transition-all ${viewing ? 'bg-white/[0.06] border border-white/10' : curr ? 'bg-grove-gold/[0.06] border border-grove-gold/15' : past ? 'bg-grove-sage/[0.03] border border-transparent' : 'border border-transparent opacity-45 hover:opacity-65'}`}
                >
                  <div className="w-9 h-9 flex-shrink-0">
                    <TreePreviewMini stage={s.stage} isCurrent={curr} isPast={past} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className={`text-[9px] font-medium ${curr ? 'text-grove-gold' : past ? 'text-grove-sage' : 'text-grove-text-muted'}`}>{s.day}</div>
                    <div className={`text-[11px] font-medium truncate ${curr || past ? 'text-grove-text' : 'text-grove-text/50'}`}>{s.label}</div>
                  </div>
                  {past && <CheckCircle2 size={12} className="text-grove-sage flex-shrink-0" />}
                  {curr && <motion.div className="w-1.5 h-1.5 rounded-full bg-grove-gold" animate={{ scale: [1, 1.4, 1] }} transition={{ duration: 2, repeat: Infinity }} />}
                  {!past && !curr && <Lock size={10} className="text-grove-text-muted/40 flex-shrink-0" />}
                </button>
              );
            })}
          </div>

          <div className="mt-3 pt-3 border-t border-grove-border">
            <div className="text-[9px] text-grove-text-muted tracking-wide font-medium mb-2">Legenda</div>
            <div className="space-y-1.5">
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: GOLD }} />
                <span className="text-[9px] text-grove-text/70">Dominada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: SAGE }} />
                <span className="text-[9px] text-grove-text/70">Desbloqueada</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full border-[1.5px]" style={{ borderColor: GOLD }} />
                <span className="text-[9px] text-grove-text/70">Em progresso</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2.5 h-2.5 rounded-full" style={{ background: BRANCH_DIM, opacity: 0.5 }} />
                <span className="text-[9px] text-grove-text/70">Bloqueada</span>
              </div>
            </div>
          </div>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {selectedSkill && <SkillModal skill={selectedSkill} onClose={() => setSelectedSkill(null)} />}
      </AnimatePresence>
    </motion.div>
  );
}
