'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X } from 'lucide-react';
import StatCard from '@/components/StatCard';
import MiniTree from '@/components/MiniTree';
import SkillTree from '@/components/SkillTree';
import { colleagues } from '@/data/colleagues';
import { Colleague } from '@/lib/types';

const STATUS_COLOR: Record<string, string> = {
  'on_track': '#A8C5A0',
  'needs_attention': '#E6A850',
  'stuck': '#C47070',
};

const STATUS_LABEL: Record<string, string> = {
  'on_track': 'No ritmo',
  'needs_attention': 'Precisa atencao',
  'stuck': 'Travado',
};

export default function MentorPage() {
  const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex overflow-hidden relative"
    >
      <div className={`flex-1 flex flex-col min-w-0 overflow-hidden transition-all duration-300`}>
        <div className="px-6 py-4 border-b border-grove-border flex justify-between items-center">
          <div>
            <div className="text-[18px] font-semibold tracking-tight">Painel de Onboarding</div>
            <div className="text-[11px] text-grove-text-muted mt-0.5">
              Visao em tempo real das jornadas do seu time
            </div>
          </div>
        </div>

        <div className="p-5 pb-4 grid grid-cols-4 gap-3">
          <StatCard value="23" label="Em onboarding" delta="+3 esta semana" />
          <StatCard value="62%" label="Progresso medio" delta="+8% esta semana" />
          <StatCard value="4" label="Precisam atencao" delta="-2 vs anterior" deltaColor="text-grove-sage" />
          <StatCard value="5" label="Concluidos" delta="+2 esta semana" />
        </div>

        <div className="flex-1 px-4 overflow-auto">
          <table className="w-full border-collapse text-[11px]">
            <thead>
              <tr className="border-b border-grove-border">
                {['Colaborador', 'Cargo', 'Dia', 'Arvore', 'Ultima atividade', 'Status'].map((h, i) => (
                  <th key={i} className="text-left px-3 py-2.5 text-[9.5px] font-medium text-grove-text-muted tracking-wide">
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {colleagues.map((m, i) => (
                <tr
                  key={i}
                  onClick={() => setSelectedColleague(m)}
                  className={`border-b border-grove-border cursor-pointer transition-colors ${
                    selectedColleague?.name === m.name ? 'bg-grove-sage/[0.04]' : 'hover:bg-white/[0.02]'
                  }`}
                >
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <div
                        className="w-6 h-6 rounded-lg flex items-center justify-center text-[9px] font-semibold text-grove-sage"
                        style={{ background: 'linear-gradient(135deg, #2A5A48, #1A3C34)' }}
                      >
                        {m.initials}
                      </div>
                      <span className="font-medium">{m.name}</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-grove-text-muted">{m.role}</td>
                  <td className="px-3 py-3">{m.day}</td>
                  <td className="px-3 py-3">
                    <div className="flex items-center gap-2.5">
                      <MiniTree progress={m.growth} size={24} />
                      <span className="text-grove-text-muted text-[10px]">{m.growth}%</span>
                    </div>
                  </td>
                  <td className="px-3 py-3 text-grove-text-muted">{m.lastActive}</td>
                  <td className="px-3 py-3">
                    <span
                      className="px-2.5 py-1 rounded-lg text-[10px] font-medium"
                      style={{
                        color: STATUS_COLOR[m.status],
                        background: `${STATUS_COLOR[m.status]}15`,
                        border: `1px solid ${STATUS_COLOR[m.status]}30`,
                      }}
                    >
                      {STATUS_LABEL[m.status]}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AnimatePresence>
        {selectedColleague && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="absolute inset-0 bg-black/30 z-10"
              onClick={() => setSelectedColleague(null)}
            />
            <motion.div
              initial={{ x: 320 }}
              animate={{ x: 0 }}
              exit={{ x: 320 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-[320px] bg-grove-panel border-l border-grove-border flex flex-col overflow-hidden z-20"
            >
              <div className="p-4 border-b border-grove-border flex justify-between items-start">
                <div>
                  <div className="text-[14px] font-semibold tracking-tight">{selectedColleague.name}</div>
                  <div className="text-[10.5px] text-grove-text-muted mt-0.5">{selectedColleague.role}</div>
                  <div className="text-[10.5px] mt-1" style={{ color: STATUS_COLOR[selectedColleague.status] }}>
                    Dia {selectedColleague.day} - {STATUS_LABEL[selectedColleague.status]}
                  </div>
                </div>
                <button
                  onClick={() => setSelectedColleague(null)}
                  className="p-1.5 text-grove-text-muted hover:text-grove-text transition-colors"
                >
                  <X size={16} strokeWidth={1.8} />
                </button>
              </div>

              <div className="p-4 flex-1 overflow-auto">
                <div className="text-[9.5px] text-grove-text-muted tracking-wide mb-2 font-medium">Arvore atual</div>
                <div className="h-[160px] bg-grove-sage/[0.04] rounded-xl border border-grove-border p-3 mb-4 flex items-center justify-center">
                  <div className="w-full h-full">
                    <SkillTree />
                  </div>
                </div>

                <div className="text-[9.5px] text-grove-text-muted tracking-wide mb-2 font-medium">Avaliacao</div>
                <div className="rounded-xl p-3 mb-4 bg-grove-sage/[0.06] border border-grove-sage/15">
                  <div className="text-[10px] text-grove-sage font-medium mb-1.5">Forte desempenho</div>
                  <div className="text-[10.5px] leading-relaxed text-grove-text/85">
                    {selectedColleague.name.split(' ')[0]} conecta conceitos de forma madura. Sugiro acelerar o bloco de System Design.
                  </div>
                </div>

                {selectedColleague.answers.length > 0 && (
                  <>
                    <div className="text-[9.5px] text-grove-text-muted tracking-wide mb-2 font-medium">Checkpoints recentes</div>
                    {selectedColleague.answers.map((answer, i) => (
                      <div key={i} className="bg-grove-card-hover border border-grove-border rounded-xl p-3 mb-2.5">
                        <div className="text-[10.5px] font-medium mb-1.5">{answer.q}</div>
                        <div className="text-[10px] leading-relaxed text-grove-text/70 mb-2 italic">&ldquo;{answer.a}&rdquo;</div>
                        <div className="flex justify-between items-center">
                          <div className="text-[9px] text-grove-text-muted">{answer.eval}</div>
                          <div
                            className="text-[11px] font-semibold"
                            style={{
                              color: answer.score >= 90 ? '#D4A843' : answer.score >= 75 ? '#A8C5A0' : '#C47070'
                            }}
                          >
                            {answer.score}%
                          </div>
                        </div>
                      </div>
                    ))}
                  </>
                )}

                {selectedColleague.answers.length === 0 && (
                  <div className="bg-grove-card-hover border border-grove-border rounded-xl p-3.5">
                    <div className="text-[10.5px] text-grove-text-muted text-center">
                      Nenhuma resposta de checkpoint ainda.
                    </div>
                  </div>
                )}
              </div>

              <div className="p-4 border-t border-grove-border">
                <button className="w-full py-2.5 rounded-xl bg-grove-sage text-grove-charcoal text-[11.5px] font-semibold hover:bg-grove-sage/90 transition-colors">
                  Enviar mensagem
                </button>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </motion.div>
  );
}
