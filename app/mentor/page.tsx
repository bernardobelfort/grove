'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, TrendingUp, Users, AlertCircle, CheckCircle2, Search, Filter } from 'lucide-react';
import StatCard from '@/components/StatCard';
import MiniTree from '@/components/MiniTree';
import StageTree from '@/components/StageTree';
import { colleagues } from '@/data/colleagues';
import { getStageFromProgress } from '@/data/skillTree';
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

const STATUS_BG: Record<string, string> = {
  'on_track': 'rgba(168,197,160,0.1)',
  'needs_attention': 'rgba(230,168,80,0.1)',
  'stuck': 'rgba(196,112,112,0.1)',
};

function ColleagueTreePanel({ colleague }: { colleague: Colleague }) {
  const stage = getStageFromProgress(colleague.growth);

  return (
    <div className="w-full h-full flex items-center justify-center p-2">
      <div className="w-full h-full max-w-[120px] max-h-[100px]">
        <StageTree stage={stage} current />
      </div>
    </div>
  );
}

export default function MentorPage() {
  const [selectedColleague, setSelectedColleague] = useState<Colleague | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const filteredColleagues = colleagues.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         c.role.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = !statusFilter || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const stats = {
    total: colleagues.length,
    avgProgress: Math.round(colleagues.reduce((acc, c) => acc + c.growth, 0) / colleagues.length),
    needsAttention: colleagues.filter(c => c.status === 'needs_attention' || c.status === 'stuck').length,
    completed: colleagues.filter(c => c.growth >= 80).length,
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex overflow-hidden relative"
    >
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="px-6 py-4 border-b border-grove-border flex justify-between items-center">
          <div>
            <div className="text-[20px] font-semibold tracking-tight">Painel de Onboarding</div>
            <div className="text-[11px] text-grove-text-muted mt-0.5">
              Acompanhe o progresso e apoie seu time
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative">
              <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-grove-text-muted" />
              <input
                type="text"
                placeholder="Buscar colaborador..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="h-9 pl-9 pr-4 rounded-lg bg-white/[0.03] border border-grove-border text-[12px] text-grove-text placeholder:text-grove-text-muted focus:outline-none focus:border-grove-sage/30 w-56"
              />
            </div>
            <div className="flex items-center gap-1 p-1 rounded-lg bg-white/[0.02] border border-grove-border">
              <button
                onClick={() => setStatusFilter(null)}
                className={`px-3 py-1.5 rounded-md text-[10px] font-medium transition-all ${!statusFilter ? 'bg-grove-sage/15 text-grove-sage' : 'text-grove-text-muted hover:text-grove-text'}`}
              >
                Todos
              </button>
              <button
                onClick={() => setStatusFilter('on_track')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-medium transition-all ${statusFilter === 'on_track' ? 'bg-grove-sage/15 text-grove-sage' : 'text-grove-text-muted hover:text-grove-text'}`}
              >
                No ritmo
              </button>
              <button
                onClick={() => setStatusFilter('needs_attention')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-medium transition-all ${statusFilter === 'needs_attention' ? 'bg-[#E6A850]/15 text-[#E6A850]' : 'text-grove-text-muted hover:text-grove-text'}`}
              >
                Atencao
              </button>
              <button
                onClick={() => setStatusFilter('stuck')}
                className={`px-3 py-1.5 rounded-md text-[10px] font-medium transition-all ${statusFilter === 'stuck' ? 'bg-[#C47070]/15 text-[#C47070]' : 'text-grove-text-muted hover:text-grove-text'}`}
              >
                Travado
              </button>
            </div>
          </div>
        </div>

        <div className="p-5 pb-4 grid grid-cols-4 gap-4">
          <div className="bg-white/[0.02] border border-grove-border rounded-xl p-4 hover:border-grove-sage/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-grove-sage/10 flex items-center justify-center">
                <Users size={18} className="text-grove-sage" />
              </div>
              <div className="text-[10px] text-grove-text-muted font-medium">Em onboarding</div>
            </div>
            <div className="text-[28px] font-bold tracking-tight">{stats.total}</div>
            <div className="text-[10px] text-grove-sage mt-1">+3 esta semana</div>
          </div>

          <div className="bg-white/[0.02] border border-grove-border rounded-xl p-4 hover:border-grove-sage/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-grove-sage/10 flex items-center justify-center">
                <TrendingUp size={18} className="text-grove-sage" />
              </div>
              <div className="text-[10px] text-grove-text-muted font-medium">Progresso medio</div>
            </div>
            <div className="text-[28px] font-bold tracking-tight">{stats.avgProgress}%</div>
            <div className="text-[10px] text-grove-sage mt-1">+8% esta semana</div>
          </div>

          <div className="bg-white/[0.02] border border-grove-border rounded-xl p-4 hover:border-[#E6A850]/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-[#E6A850]/10 flex items-center justify-center">
                <AlertCircle size={18} className="text-[#E6A850]" />
              </div>
              <div className="text-[10px] text-grove-text-muted font-medium">Precisam atencao</div>
            </div>
            <div className="text-[28px] font-bold tracking-tight">{stats.needsAttention}</div>
            <div className="text-[10px] text-grove-sage mt-1">-2 vs anterior</div>
          </div>

          <div className="bg-white/[0.02] border border-grove-border rounded-xl p-4 hover:border-grove-gold/20 transition-colors">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-9 h-9 rounded-lg bg-grove-gold/10 flex items-center justify-center">
                <CheckCircle2 size={18} className="text-grove-gold" />
              </div>
              <div className="text-[10px] text-grove-text-muted font-medium">Quase concluindo</div>
            </div>
            <div className="text-[28px] font-bold tracking-tight">{stats.completed}</div>
            <div className="text-[10px] text-grove-sage mt-1">+2 esta semana</div>
          </div>
        </div>

        <div className="flex-1 px-5 pb-5 overflow-auto">
          <div className="bg-white/[0.015] border border-grove-border rounded-xl overflow-hidden">
            <table className="w-full border-collapse text-[12px]">
              <thead>
                <tr className="border-b border-grove-border bg-white/[0.02]">
                  {['Colaborador', 'Cargo', 'Dia', 'Arvore', 'Progresso', 'Ultima atividade', 'Status'].map((h, i) => (
                    <th key={i} className="text-left px-4 py-3 text-[10px] font-semibold text-grove-text-muted tracking-wide uppercase">
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filteredColleagues.map((m, i) => (
                  <tr
                    key={i}
                    onClick={() => setSelectedColleague(m)}
                    className={`border-b border-grove-border/50 cursor-pointer transition-all ${
                      selectedColleague?.name === m.name
                        ? 'bg-grove-sage/[0.06]'
                        : 'hover:bg-white/[0.02]'
                    }`}
                  >
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div
                          className="w-8 h-8 rounded-lg flex items-center justify-center text-[10px] font-bold"
                          style={{
                            background: 'linear-gradient(135deg, #2A5A48, #1A3C34)',
                            color: '#A8C5A0'
                          }}
                        >
                          {m.initials}
                        </div>
                        <span className="font-medium text-grove-text">{m.name}</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-grove-text-muted">{m.role}</td>
                    <td className="px-4 py-3.5">
                      <span className="text-grove-sage font-medium">{m.day}</span>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center">
                        <div className="w-8 h-10">
                          <MiniTree progress={m.growth} size={28} />
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3.5">
                      <div className="flex items-center gap-3">
                        <div className="flex-1 h-1.5 bg-white/[0.05] rounded-full overflow-hidden max-w-[80px]">
                          <div
                            className="h-full rounded-full transition-all"
                            style={{
                              width: `${m.growth}%`,
                              background: m.growth >= 70 ? '#D4A843' : '#A8C5A0'
                            }}
                          />
                        </div>
                        <span className="text-[11px] font-medium text-grove-text-muted w-8">{m.growth}%</span>
                      </div>
                    </td>
                    <td className="px-4 py-3.5 text-grove-text-muted text-[11px]">{m.lastActive}</td>
                    <td className="px-4 py-3.5">
                      <span
                        className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg text-[10px] font-medium"
                        style={{
                          color: STATUS_COLOR[m.status],
                          background: STATUS_BG[m.status],
                        }}
                      >
                        <span
                          className="w-1.5 h-1.5 rounded-full"
                          style={{ background: STATUS_COLOR[m.status] }}
                        />
                        {STATUS_LABEL[m.status]}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
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
              className="absolute inset-0 bg-black/40 backdrop-blur-sm z-10"
              onClick={() => setSelectedColleague(null)}
            />
            <motion.div
              initial={{ x: 380 }}
              animate={{ x: 0 }}
              exit={{ x: 380 }}
              transition={{ type: 'spring', damping: 28, stiffness: 220 }}
              className="absolute right-0 top-0 bottom-0 w-[380px] flex flex-col overflow-hidden z-20"
              style={{
                background: 'linear-gradient(180deg, #0c1a14 0%, #091210 100%)',
                borderLeft: '1px solid rgba(168,197,160,0.1)'
              }}
            >
              <div className="p-5 border-b border-white/[0.05] flex justify-between items-start">
                <div className="flex items-start gap-4">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-bold shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #2A5A48 0%, #1A3C34 100%)',
                      color: '#A8C5A0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                  >
                    {selectedColleague.initials}
                  </div>
                  <div>
                    <div className="text-[16px] font-semibold tracking-tight text-grove-text">{selectedColleague.name}</div>
                    <div className="text-[11px] text-grove-text-muted mt-0.5">{selectedColleague.role}</div>
                    <div className="flex items-center gap-2 mt-2">
                      <span
                        className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-[9px] font-medium"
                        style={{
                          color: STATUS_COLOR[selectedColleague.status],
                          background: STATUS_BG[selectedColleague.status],
                        }}
                      >
                        <span
                          className="w-1 h-1 rounded-full"
                          style={{ background: STATUS_COLOR[selectedColleague.status] }}
                        />
                        {STATUS_LABEL[selectedColleague.status]}
                      </span>
                      <span className="text-[10px] text-grove-text-dim">Dia {selectedColleague.day}</span>
                    </div>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedColleague(null)}
                  className="p-2 rounded-lg text-grove-text-muted hover:text-grove-text hover:bg-white/[0.05] transition-all"
                >
                  <X size={18} strokeWidth={1.8} />
                </button>
              </div>

              <div className="p-5 flex-1 overflow-auto">
                <div className="text-[10px] text-grove-text-muted tracking-wide mb-3 font-medium uppercase">Arvore de Crescimento</div>
                <div className="h-[180px] bg-white/[0.02] rounded-xl border border-white/[0.05] mb-5 flex items-center justify-center overflow-hidden">
                  <ColleagueTreePanel colleague={selectedColleague} />
                </div>

                <div className="flex items-center gap-3 mb-5">
                  <div className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-[9px] text-grove-text-muted mb-1">Progresso</div>
                    <div className="text-[18px] font-bold text-grove-sage">{selectedColleague.growth}%</div>
                  </div>
                  <div className="flex-1 p-3 rounded-xl bg-white/[0.02] border border-white/[0.05]">
                    <div className="text-[9px] text-grove-text-muted mb-1">Dia</div>
                    <div className="text-[18px] font-bold text-grove-gold">{selectedColleague.day}</div>
                  </div>
                </div>

                <div className="text-[10px] text-grove-text-muted tracking-wide mb-3 font-medium uppercase">Avaliacao da IA</div>
                <div className="rounded-xl p-4 mb-5 bg-grove-sage/[0.06] border border-grove-sage/15">
                  <div className="text-[11px] text-grove-sage font-medium mb-2">Forte desempenho</div>
                  <div className="text-[11px] leading-relaxed text-grove-text/80">
                    {selectedColleague.name.split(' ')[0]} conecta conceitos de forma madura. Sugiro acelerar o bloco de System Design baseado no ritmo atual.
                  </div>
                </div>

                {selectedColleague.answers.length > 0 && (
                  <>
                    <div className="text-[10px] text-grove-text-muted tracking-wide mb-3 font-medium uppercase">Checkpoints recentes</div>
                    <div className="space-y-3">
                      {selectedColleague.answers.map((answer, i) => (
                        <div key={i} className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-4">
                          <div className="text-[11px] font-medium mb-2 text-grove-text">{answer.q}</div>
                          <div className="text-[10px] leading-relaxed text-grove-text/60 mb-3 italic">&ldquo;{answer.a}&rdquo;</div>
                          <div className="flex justify-between items-center pt-2 border-t border-white/[0.03]">
                            <div className="text-[9px] text-grove-text-muted">{answer.eval}</div>
                            <div
                              className="text-[12px] font-bold px-2 py-0.5 rounded-md"
                              style={{
                                color: answer.score >= 90 ? '#D4A843' : answer.score >= 75 ? '#A8C5A0' : '#C47070',
                                background: answer.score >= 90 ? 'rgba(212,168,67,0.1)' : answer.score >= 75 ? 'rgba(168,197,160,0.1)' : 'rgba(196,112,112,0.1)'
                              }}
                            >
                              {answer.score}%
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </>
                )}

                {selectedColleague.answers.length === 0 && (
                  <div className="bg-white/[0.02] border border-white/[0.05] rounded-xl p-5 text-center">
                    <div className="text-[11px] text-grove-text-muted">
                      Nenhuma resposta de checkpoint ainda.
                    </div>
                  </div>
                )}
              </div>

              <div className="p-5 border-t border-white/[0.05]">
                <button className="w-full py-3 rounded-xl bg-grove-sage text-grove-charcoal text-[12px] font-semibold hover:bg-grove-sage/90 transition-colors shadow-lg">
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
