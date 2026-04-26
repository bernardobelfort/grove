export type SkillStatus = 'mastered' | 'unlocked' | 'in_progress' | 'locked';

export interface Skill {
  id: string;
  name: string;
  status: SkillStatus;
  domain: 'engineering' | 'culture' | 'processes' | 'tools';
  x: number;
  y: number;
}

export interface TrailStep {
  id: number;
  title: string;
  time: string;
  status: 'completed' | 'in_progress' | 'locked';
  domain: string;
  progress?: number;
  aiAdded?: boolean;
}

export interface Employee {
  name: string;
  initials: string;
  role: string;
  area: string;
  company: string;
  day: number;
  streak: number;
  skillsUnlocked: number;
  skillsTotal: number;
  previousExperience: string[];
}

export interface Colleague {
  name: string;
  initials: string;
  role: string;
  day: number;
  growth: number;
  lastActive: string;
  status: 'on_track' | 'needs_attention' | 'stuck';
  answers: CheckpointAnswer[];
}

export interface CheckpointAnswer {
  q: string;
  a: string;
  eval: string;
  score: number;
}

export interface AIInsight {
  type: 'added' | 'reordered' | 'unlocked' | 'removed' | 'adjusted';
  action: string;
  subject: string;
  reason: string;
  timestamp: string;
  impact: string;
  undoable: boolean;
  confidence?: number;
}

export interface TreeBranch {
  domain: string;
  label: string;
  skills: { name: string; status: SkillStatus }[];
}
