import { Colleague } from "@/lib/types";

export const colleagues: Colleague[] = [
  {
    name: "Lucas Guerra",
    initials: "LG",
    role: "Desenvolvedor Backend",
    day: 12,
    growth: 52,
    lastActive: "Hoje, 13h30",
    status: "on_track",
    answers: [
      {
        q: "O que acontece após o merge na main?",
        a: "Deploy automático para staging, depois 15min de monitoramento no Datadog.",
        eval: "Compreensão forte do fluxo de deploy.",
        score: 92
      },
      {
        q: "Quando é necessária aprovação do Tech Lead?",
        a: "Quando PRs tocam a camada de dados ou alteram migrations.",
        eval: "Correto. Também se aplica a serviços de autenticação.",
        score: 85
      },
    ]
  },
  {
    name: "Mariana Alves",
    initials: "MA",
    role: "Desenvolvedora Frontend",
    day: 8,
    growth: 38,
    lastActive: "Hoje, 11h12",
    status: "on_track",
    answers: [
      {
        q: "Qual framework CSS o CITi usa?",
        a: "Tailwind CSS com design tokens customizados no config.",
        eval: "Resposta precisa.",
        score: 95
      },
    ]
  },
  {
    name: "Rafael Martins",
    initials: "RM",
    role: "Engenheiro DevOps",
    day: 17,
    growth: 64,
    lastActive: "Hoje, 09h30",
    status: "needs_attention",
    answers: []
  },
  {
    name: "Beatriz Lima",
    initials: "BL",
    role: "Engenheira de QA",
    day: 4,
    growth: 18,
    lastActive: "Hoje, 16h20",
    status: "on_track",
    answers: []
  },
  {
    name: "João Ricardo",
    initials: "JR",
    role: "Product Manager",
    day: 11,
    growth: 44,
    lastActive: "Hoje, 14h30",
    status: "needs_attention",
    answers: []
  },
  {
    name: "Fernanda Souza",
    initials: "FS",
    role: "Engenheira de Dados",
    day: 3,
    growth: 12,
    lastActive: "Ontem, 18h",
    status: "stuck",
    answers: []
  },
  {
    name: "Thiago Mendes",
    initials: "TM",
    role: "Desenvolvedor Full-stack",
    day: 14,
    growth: 58,
    lastActive: "Ontem, 15h",
    status: "on_track",
    answers: []
  },
];
