import { Skill } from "@/lib/types";
import { TreeStage } from "@/components/SkillTree";

export const skills: Skill[] = [
  // Galho Engenharia (esquerda)
  { id: 'eng-1', name: 'Arquitetura Limpa', status: 'mastered', domain: 'engineering', x: 36, y: 78 },
  { id: 'eng-2', name: 'APIs REST', status: 'mastered', domain: 'engineering', x: 70, y: 48 },
  { id: 'eng-3', name: 'Git Workflow', status: 'unlocked', domain: 'engineering', x: 95, y: 108 },
  { id: 'eng-4', name: 'System Design', status: 'in_progress', domain: 'engineering', x: 128, y: 78 },
  { id: 'eng-5', name: 'Princípios SOLID', status: 'unlocked', domain: 'engineering', x: 54, y: 130 },

  // Galho Processos
  { id: 'proc-1', name: 'Code Review', status: 'unlocked', domain: 'processes', x: 156, y: 56 },
  { id: 'proc-2', name: 'Metodologia Ágil', status: 'locked', domain: 'processes', x: 180, y: 32 },
  { id: 'proc-3', name: 'Sprint Planning', status: 'unlocked', domain: 'processes', x: 176, y: 88 },

  // Galho Cultura (direita do centro)
  { id: 'cul-1', name: 'Valores da Empresa', status: 'mastered', domain: 'culture', x: 220, y: 32 },
  { id: 'cul-2', name: 'Comunicação', status: 'mastered', domain: 'culture', x: 244, y: 56 },
  { id: 'cul-3', name: 'Colaboração', status: 'mastered', domain: 'culture', x: 224, y: 88 },

  // Galho Ferramentas (direita)
  { id: 'tool-1', name: 'Notion', status: 'unlocked', domain: 'tools', x: 305, y: 108 },
  { id: 'tool-2', name: 'Linear', status: 'in_progress', domain: 'tools', x: 272, y: 78 },
  { id: 'tool-3', name: 'GitHub', status: 'mastered', domain: 'tools', x: 330, y: 48 },
  { id: 'tool-4', name: 'Datadog', status: 'locked', domain: 'tools', x: 364, y: 78 },
  { id: 'tool-5', name: 'Vercel', status: 'locked', domain: 'tools', x: 346, y: 130 },
];

export const treeStats = {
  engineering: { unlocked: 5, total: 12 },
  culture: { unlocked: 3, total: 7 },
  processes: { unlocked: 3, total: 8 },
  tools: { unlocked: 3, total: 7 },
};

export type GrowthStageInfo = {
  day: string;
  dayNumber: number;
  label: string;
  stage: TreeStage;
  description: string;
};

export const growthStages: GrowthStageInfo[] = [
  { day: 'Dia 1', dayNumber: 1, label: 'A Semente', stage: 'seed', description: 'O inicio da jornada' },
  { day: 'Dia 7', dayNumber: 7, label: 'O Broto', stage: 'sprout', description: 'Primeiros passos dados' },
  { day: 'Dia 14', dayNumber: 14, label: 'A Muda', stage: 'sapling', description: 'Criando raizes' },
  { day: 'Dia 25', dayNumber: 25, label: 'O Crescimento', stage: 'growing', description: 'Expandindo conhecimento' },
  { day: 'Dia 46', dayNumber: 46, label: 'A Maturidade', stage: 'mature', description: 'Experiencia consolidada' },
  { day: 'Dia 60+', dayNumber: 60, label: 'O Bosque', stage: 'grove', description: 'Referencia na equipe' },
];

export function getStageFromDay(day: number): TreeStage {
  if (day >= 60) return 'grove';
  if (day >= 46) return 'mature';
  if (day >= 25) return 'growing';
  if (day >= 14) return 'sapling';
  if (day >= 7) return 'sprout';
  return 'seed';
}

export function getStageIndex(day: number): number {
  if (day >= 60) return 5;
  if (day >= 46) return 4;
  if (day >= 25) return 3;
  if (day >= 14) return 2;
  if (day >= 7) return 1;
  return 0;
}
