# Arvo — Plataforma de Onboarding Inteligente

> **"Conhecimento que cresce com quem fica."**

Arvo é uma plataforma web de onboarding guiado por IA que transforma o repasse de conhecimento organizacional em uma jornada personalizada para cada novo colaborador. Em vez de wikis estáticas e treinamentos repetitivos, cada pessoa recebe uma trilha única — construída a partir do que ela já sabe, do que o cargo exige, e do histórico de conhecimento da própria empresa.

Desenvolvido pela **Equipe 13** no PTC PS CITi 26.1 · Recife, Maio 2026.

---

## Sumário

- [Visão geral](#visão-geral)
- [O problema que resolve](#o-problema-que-resolve)
- [Funcionalidades](#funcionalidades)
  - [Dashboard do colaborador](#dashboard-do-colaborador)
  - [Minha Trilha](#minha-trilha)
  - [Minha Árvore](#minha-árvore)
  - [Decisões da Trilha](#decisões-da-trilha)
  - [Painel do Mentor](#painel-do-mentor)
- [Arquitetura de IA](#arquitetura-de-ia)
- [Como a IA toma decisões](#como-a-ia-toma-decisões)
- [Integrações](#integrações)
- [Estrutura de navegação](#estrutura-de-navegação)
- [Demo](#demo)
- [Equipe](#equipe)

---

## Visão geral

Arvo resolve um problema que toda empresa que cresce enfrenta: o **time-to-ramp** — o intervalo entre uma pessoa entrar e essa pessoa começar a entregar de verdade. Esse tempo varia de 3 a 6 semanas em equipes técnicas bem estruturadas e chega a 3 meses em empresas com processos espalhados e documentação desatualizada.

A plataforma funciona em três movimentos:

1. **Conecta** o conhecimento que a empresa já tem (Notion, Drive, Slack, GitHub)
2. **Gera** uma trilha de aprendizado personalizada para cada novo colaborador via IA
3. **Acompanha** o progresso em tempo real, permitindo que o gestor intervenha só onde importa

O resultado é visível: a árvore de habilidades de cada colaborador — que começa como semente e vai crescendo conforme ele avança.

---

## O problema que resolve

A maioria das empresas acredita que o problema do onboarding é falta de informação. Por isso investe em wikis, Notions, manuais e vídeos institucionais. O problema real é outro: **falta caminho**.

Um colaborador novo não sabe o que ele não sabe. Não sabe nem qual pergunta fazer. A Arvo resolve isso invertendo a lógica: em vez de esperar o colaborador encontrar o conteúdo, a plataforma vai até ele com a sequência certa, na hora certa, baseada no perfil específico de quem chegou.

---

## Funcionalidades

### Dashboard do colaborador

Página inicial personalizada com:

- **Saudação contextual** com nome, cargo e dia de onboarding atual (ex: "Bom dia, Lucas — Dia 12")
- **Resumo da árvore de habilidades** dividido por domínio: Engenharia, Cultura, Processos, Ferramentas — com progresso por categoria (ex: Engenharia 2/3, Ferramentas 2/2)
- **Próximo passo recomendado pela IA** com nome da atividade, tempo estimado e justificativa da recomendação (ex: *"Detectei alto engajamento com o tema. Este passo aprofunda princípios que você já vem aplicando."*)
- Acesso direto à trilha e aos insights

**Rota:** `/dashboard`

---

### Minha Trilha

Sequência completa de aprendizado do colaborador, organizada em passos progressivos com status individual:

| Status | Significado |
|---|---|
| Concluído | Passo finalizado e validado pela IA |
| Em andamento | Passo atual com conteúdo aberto |
| Tempo estimado | Próximos passos com duração prevista |
| Novo | Passos adicionados recentemente pela IA |

Cada passo em andamento exibe:

- **Conteúdo curado** extraído das ferramentas da empresa (com referência à fonte, ex: *"Selecionei este conteúdo do Notion da empresa porque você demonstrou interesse em System Design no checkpoint anterior"*)
- **Texto de introdução** contextualizado para o cargo e momento da trilha
- **Lista de objetivos** do passo (o que o colaborador vai aprender/fazer)
- **Reflexão final** — pergunta aberta avaliada pela IA que mede compreensão real, não memorização

**Rota:** `/trail`

---

### Minha Árvore

Representação visual do crescimento do colaborador ao longo do onboarding. Cada habilidade é um nó da árvore, com quatro estados possíveis:

| Estado | Visual | Significado |
|---|---|---|
| Dominada | Dourado | Habilidade validada e internalizada |
| Desbloqueada | Verde | Concluída, disponível para aprofundamento |
| Em progresso | Verde claro | Atualmente em andamento na trilha |
| Bloqueada | Translúcido | Ainda não acessível — depende de pré-requisitos |

A árvore atravessa **seis estágios visuais** conforme o colaborador avança:

| Dia | Estágio |
|---|---|
| Dia 1 | A Semente |
| Dia 7 | O Broto |
| Dia 14 | A Muda |
| Dia 25 | O Crescimento |
| Dia 46 | A Maturidade |
| Dia 60+ | O Bosque |

O colaborador atual (Lucas Guerra, Desenvolvedor Backend, Dia 12) está no estágio **O Broto**, com 14 de 67 habilidades desbloqueadas.

A árvore não é apenas visual — ela é o estado real do conhecimento do colaborador dentro da empresa.

**Rota:** `/tree`

---

### Decisões da Trilha

Log completo e auditável de todas as alterações feitas pela IA na trilha do colaborador. Cada decisão mostra:

- **O que mudou** (passo adicionado, removido, reorganizado, habilidade desbloqueada, profundidade ajustada)
- **Por que mudou** — a justificativa da IA baseada no comportamento observado
- **Quando ocorreu**
- **Botão de desfazer** — o colaborador pode reverter qualquer decisão

Exemplos reais de decisões registradas:

- *"Detectei alto engajamento no checkpoint de arquitetura. Você passou 23 minutos acima da média, então adicionei um aprofundamento."* → Trilha estendida em 1 passo
- *"Perfis com seu histórico se integram mais rápido quando cultura vem antes da stack técnica."* → Passos 5-7 reordenados
- *"Seu perfil indica 3 anos de experiência com Git. Pulei para otimizar seu tempo."* → Trilha encurtada em 25 min
- *"Suas fundações de Docker estão incompletas. Introduzir K8s agora seria construir em terreno instável."* → Módulo simplificado

Esse é o mecanismo central de **transparência radical** da plataforma: a IA nunca age como caixa-preta. Cada decisão é explicada, visível e reversível.

**Rota:** `/insights`

---

### Painel do Mentor

Visão consolidada para gestores acompanharem todos os colaboradores em onboarding simultaneamente.

**Métricas de cabeçalho:**

| Métrica | Valor atual |
|---|---|
| Em onboarding | 7 colaboradores (+3 esta semana) |
| Progresso médio | 41% (+8% esta semana) |
| Precisam atenção | 3 (-2 vs anterior) |
| Quase concluindo | 0 (+2 esta semana) |

**Tabela de colaboradores** com:
- Nome e cargo
- Dia de onboarding
- Estágio visual da árvore
- Percentual de progresso
- Última atividade registrada
- Status: No ritmo / Precisa atenção / Travado

Colaboradores com status **Travado** ou **Precisa atenção** ficam destacados para intervenção prioritária. O gestor só precisa agir onde a IA sinalizou — o resto segue sozinho.

**Filtros disponíveis:** Todos / No ritmo / Atenção / Travado

**Rota:** `/mentor`

---

## Arquitetura de IA

O sistema é construído sobre três camadas técnicas que trabalham juntas:

### RAG (Retrieval-Augmented Generation)

A IA não gera respostas do próprio conhecimento — ela primeiro busca trechos reais dentro da base de conhecimento da empresa (Notion, Drive, GitHub) e usa esses trechos como fundação para construir o conteúdo da trilha. Cada resposta carrega a fonte original. Isso elimina alucinação na raiz: a IA organiza e contextualiza, mas nunca inventa fato sem origem.

### Pinecone — Banco de dados vetorial

Todo o conteúdo das ferramentas integradas é transformado em vetores matemáticos e armazenado no Pinecone. Quando a IA precisa montar ou ajustar uma trilha, ela faz uma busca semântica (não por palavras-chave, mas por significado e contexto) e recupera os trechos mais relevantes para aquele colaborador, aquele cargo e aquele momento da jornada.

### Modelo de linguagem (LLM)

Com os trechos recuperados pelo Pinecone, o LLM:
- Escreve o conteúdo do passo de forma contextualizada para o cargo específico
- Formula a pergunta de reflexão adequada ao nível do colaborador
- Avalia as respostas abertas do colaborador e decide se o passo foi concluído
- Gera a justificativa em linguagem natural para cada decisão tomada na trilha

### Curadoria humana de fechamento

Antes de qualquer trilha gerada chegar ao colaborador, ela passa por revisão do gestor responsável. A IA propõe — o humano aprova, edita ou rejeita. Esse mecanismo funciona como última camada de confiabilidade, garantindo que erros não escalam para o colaborador.

---

## Como a IA toma decisões

A IA monitora continuamente o comportamento do colaborador na plataforma e ajusta a trilha de forma proativa, sem esperar que o colaborador peça. As variáveis observadas incluem:

- **Tempo gasto** em cada passo (acima ou abaixo da média para o cargo)
- **Qualidade das respostas** nas reflexões (profundidade, conexão com o tema, linguagem técnica)
- **Velocidade de progressão** por domínio (Engenharia, Cultura, Processos, Ferramentas)
- **Perfil declarado** no onboarding (cargo, experiências anteriores, tecnologias dominadas)
- **Padrões históricos** de colaboradores anteriores com perfil similar

A partir disso, a IA pode:
- Adicionar passos de aprofundamento quando detecta alto engajamento
- Remover passos redundantes quando o perfil indica conhecimento prévio
- Reorganizar a sequência quando dados históricos indicam ordem mais eficaz
- Simplificar módulos quando detecta lacunas de fundação
- Desbloquear habilidades na árvore quando valida domínio real pelo checkpoint

---

## Integrações

A plataforma se conecta às ferramentas que a empresa já usa, sem migração de conteúdo:

| Ferramenta | Integração | O que é usado |
|---|---|---|
| Notion | API pública | Documentação, processos, wikis internas |
| Google Drive | Google Workspace API | Apresentações, planilhas, docs institucionais |
| Slack | Webhooks | Contexto de conversas, histórico de decisões |
| GitHub | OAuth | Código, PRs, padrões técnicos, README de repos |

O conteúdo dessas fontes é indexado no Pinecone e atualizado automaticamente conforme os documentos originais mudam. Se uma fonte ficar desatualizada, a IA sinaliza para revisão antes de usar o trecho na trilha.

---

## Estrutura de navegação

```
/dashboard      → Página inicial do colaborador (resumo + próximo passo)
/trail          → Trilha completa com todos os passos e conteúdo atual
/tree           → Árvore de habilidades visual com estágios de crescimento
/insights       → Log de decisões da IA com opção de reverter cada uma
/mentor         → Painel do gestor com todos os colaboradores em onboarding
```

---

## Demo

Acesse o sistema em produção:

**[arvo-murex-six.vercel.app/dashboard](https://arvo-murex-six.vercel.app/dashboard)**

O demo está carregado com o perfil de **Lucas Guerra (Desenvolvedor Backend, Dia 12)** como colaborador logado, e exibe 7 colaboradores no painel do mentor com dados realistas de progresso.

---

## Equipe

Desenvolvido pela **Equipe 13** no Processo Seletivo CITi 26.1.

**Mentores:** Gabriel Mezzalira · Marcela Paranhos

---

*Arvo · Recife, Pernambuco · Maio 2026*
