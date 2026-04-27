'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { ArrowRight, Flame, TreeDeciduous, Zap } from 'lucide-react';
import SkillTree from '@/components/SkillTree';
import { employee } from '@/data/employee';
import { getStageFromDay } from '@/data/skillTree';

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

export default function DashboardPage() {
  const today = new Date().toLocaleDateString('pt-BR', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
  });

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex flex-col"
    >
      <div className="px-6 py-5 flex justify-between items-center border-b border-grove-border">
        <div>
          <div className="text-[22px] font-semibold tracking-tight">
            {getGreeting()}, {employee.name.split(' ')[0]}
          </div>
          <div className="text-[11px] text-grove-text-muted mt-1 capitalize">
            {today}
          </div>
        </div>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-white/[0.02] border border-grove-border">
            <TreeDeciduous size={14} className="text-grove-sage" />
            <span className="text-[11px] text-grove-text-muted">Dia</span>
            <span className="text-[12px] font-semibold text-grove-sage">{employee.day}</span>
          </div>
          <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-grove-gold/[0.08] border border-grove-gold/20">
            <Flame size={14} className="text-grove-gold" />
            <span className="text-[12px] font-semibold text-grove-gold">{employee.streak}</span>
            <span className="text-[11px] text-grove-text-muted">dias</span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex flex-col p-6 min-h-0">
        <div className="flex justify-between items-end mb-3">
          <div>
            <div className="text-[14px] font-semibold tracking-tight">Sua arvore de crescimento</div>
            <div className="text-[11px] text-grove-text-muted mt-0.5">Cada ponto representa uma habilidade</div>
          </div>
        </div>

        <div className="flex-1 relative flex items-center justify-center min-h-0">
          <div className="w-full max-w-[520px] h-full max-h-[440px]">
            <SkillTree stage={getStageFromDay(employee.day)} />
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <Link href="/trail" className="flex-1">
            <motion.div
              whileHover={{ y: -2 }}
              className="p-4 bg-grove-card-hover border border-grove-border rounded-xl relative overflow-hidden cursor-pointer transition-shadow hover:shadow-lg hover:shadow-black/20"
            >
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-grove-gold to-grove-sage rounded-l-xl" />
              <div className="flex justify-between items-start pl-3">
                <div className="flex-1">
                  <div className="text-[10px] text-grove-sage tracking-wide font-medium mb-1">
                    Proximo passo recomendado
                  </div>
                  <div className="text-[14px] font-semibold tracking-tight">Arquitetura Limpa na pratica</div>
                  <div className="text-[11px] text-grove-text-muted mt-1 leading-relaxed">
                    Detectei alto engajamento com o tema. Este passo aprofunda principios que voce ja vem aplicando.
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-4">
                  <div className="text-[10px] text-grove-text-muted">Estimado</div>
                  <div className="text-[14px] text-grove-sage font-medium mt-0.5">45 min</div>
                </div>
              </div>
              <div className="h-1 bg-white/5 rounded-full mt-3 ml-3 overflow-hidden">
                <div className="w-[60%] h-full bg-gradient-to-r from-grove-sage to-grove-gold rounded-full" />
              </div>
            </motion.div>
          </Link>

          <Link
            href="/insights"
            className="flex items-center gap-2 px-5 py-4 rounded-xl border border-grove-border hover:border-grove-sage/30 hover:bg-grove-sage/[0.04] transition-all text-[12px] text-grove-sage font-medium"
          >
            Ver insights
            <ArrowRight size={14} strokeWidth={2} />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
