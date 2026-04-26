import { TrailStep } from "@/lib/types";

export const trailSteps: TrailStep[] = [
  { id: 1, title: "Boas-vindas ao CITi", time: "10 min", status: "completed", domain: "Cultura" },
  { id: 2, title: "Valores e cultura da empresa", time: "15 min", status: "completed", domain: "Cultura" },
  { id: 3, title: "Stack e ambiente de desenvolvimento", time: "20 min", status: "completed", domain: "Engenharia" },
  { id: 4, title: "Princípios de Arquitetura de Sistemas", time: "45 min", status: "in_progress", domain: "Engenharia", progress: 60 },
  { id: 5, title: "Padrões de código e boas práticas", time: "18 min", status: "locked", domain: "Engenharia" },
  { id: 6, title: "Design de banco de dados", time: "22 min", status: "locked", domain: "Engenharia", aiAdded: true },
  { id: 7, title: "DevOps e CI/CD", time: "25 min", status: "locked", domain: "Processos" },
  { id: 8, title: "Práticas de segurança", time: "20 min", status: "locked", domain: "Engenharia" },
];

export const currentStepContent = {
  title: "Princípios de Arquitetura de Sistemas",
  domain: "Engenharia",
  step: 4,
  totalSteps: 8,
  time: "45 min",
  intro: "Sistemas escaláveis nascem de decisões arquiteturais claras. Neste passo, você vai entender como pensamos modularidade, separação de responsabilidades e resiliência desde o primeiro commit.",
  aiReason: "Selecionei este conteúdo do Notion da empresa porque você demonstrou interesse em System Design no checkpoint anterior.",
  objectives: [
    "Entender a arquitetura de 3 camadas que adotamos",
    "Explorar as regras de dependência",
    "Ver exemplos práticos no código"
  ],
  checkpointQuestion: "Por que separação de responsabilidades importa em um sistema escalável?",
};
