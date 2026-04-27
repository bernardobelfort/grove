'use client';

import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import AiInsightCard from '@/components/AiInsightCard';
import { aiInsights } from '@/data/aiInsights';

export default function InsightsPage() {
  const [toast, setToast] = useState<string | null>(null);

  const handleUndo = (subject: string) => {
    setToast(`Acao desfeita. "${subject}" foi revertido.`);
    setTimeout(() => setToast(null), 3000);
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex flex-col overflow-hidden relative"
    >
      <AnimatePresence>
        {toast && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-4 left-1/2 -translate-x-1/2 z-50 px-4 py-2.5 bg-grove-sage/15 border border-grove-sage/30 rounded-lg text-[11px] text-grove-sage"
          >
            {toast}
          </motion.div>
        )}
      </AnimatePresence>

      <div className="px-6 py-5 border-b border-grove-border">
        <div className="flex justify-between items-center">
          <div>
            <div className="text-[20px] font-semibold tracking-tight">Decisoes da trilha</div>
            <div className="text-[11px] text-grove-text-muted mt-1">
              Cada mudanca na sua trilha e registrada aqui. Voce pode reverter qualquer uma.
            </div>
          </div>
          <select className="px-4 py-2.5 bg-white/[0.03] border border-grove-border rounded-xl text-[11px] text-grove-text-muted cursor-pointer hover:border-grove-sage/20 transition-colors focus:outline-none focus:border-grove-sage/30">
            <option>Todos os tipos</option>
            <option>Adicionados</option>
            <option>Removidos</option>
            <option>Reorganizados</option>
            <option>Desbloqueados</option>
            <option>Ajustados</option>
          </select>
        </div>
      </div>

      <div className="flex-1 p-6 flex flex-col gap-3 overflow-auto max-w-[750px]">
        {aiInsights.map((insight, i) => (
          <AiInsightCard
            key={i}
            insight={insight}
            onUndo={() => handleUndo(insight.subject)}
          />
        ))}
      </div>

      <div className="px-6 py-3 border-t border-grove-border flex justify-between items-center text-[10px] text-grove-text-muted">
        <span>Ultima atualizacao ha 2 horas</span>
        <span className="text-grove-sage/70 cursor-pointer hover:text-grove-sage transition-colors">
          Historico completo
        </span>
      </div>
    </motion.div>
  );
}
