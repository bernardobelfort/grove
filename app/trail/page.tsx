'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Play, CheckCircle2 } from 'lucide-react';
import TrailTimeline from '@/components/TrailTimeline';
import { trailSteps, currentStepContent } from '@/data/trail';

export default function TrailPage() {
  const [checkpointAnswer, setCheckpointAnswer] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = () => {
    if (checkpointAnswer.trim()) {
      setSubmitted(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.2 }}
      className="h-screen flex"
    >
      <div className="w-[260px] flex-shrink-0 border-r border-grove-border flex flex-col overflow-hidden" style={{ background: 'linear-gradient(180deg, #0c1a14 0%, #091210 100%)' }}>
        <div className="p-4 border-b border-white/[0.04]">
          <div className="text-[14px] font-semibold tracking-tight">Sua Trilha</div>
          <div className="text-[10px] text-grove-text-muted mt-1">Progresso de onboarding</div>
        </div>
        <div className="flex-1 overflow-auto p-4">
          <TrailTimeline steps={trailSteps} />
        </div>
      </div>

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <div className="flex-1 overflow-auto">
          <div className="max-w-[680px] mx-auto p-8">
            <div className="flex justify-between items-start mb-4">
              <div>
                <div className="text-[10px] text-grove-sage tracking-wide font-medium mb-1.5">
                  Passo {currentStepContent.step} de {currentStepContent.totalSteps}
                </div>
                <div className="text-[20px] font-bold tracking-tight">{currentStepContent.title}</div>
                <div className="flex gap-3 mt-2 text-[11px] text-grove-text-muted">
                  <span>{currentStepContent.time}</span>
                  <span className="text-grove-sage">{currentStepContent.domain}</span>
                </div>
              </div>
            </div>

            <div className="p-3 bg-grove-sage/[0.06] border border-grove-sage/20 rounded-lg text-[11px] text-grove-text/85 mb-4 leading-relaxed">
              {currentStepContent.aiReason}
            </div>

            <div className="text-[12.5px] leading-relaxed text-grove-text/80 mb-4">
              {currentStepContent.intro}
            </div>

            <div
              className="w-full rounded-xl overflow-hidden relative border border-grove-border mb-5"
              style={{
                aspectRatio: '16/7',
                background: 'radial-gradient(ellipse at 30% 50%, #1a3c34 0%, #0a0a0a 70%)',
              }}
            >
              <svg
                viewBox="0 0 400 175"
                className="absolute inset-0 w-full h-full"
                preserveAspectRatio="xMidYMid slice"
              >
                <rect width="400" height="175" fill="#0a1612" />
                <path d="M 0,130 Q 100,90 200,110 T 400,100 L 400,175 L 0,175 Z" fill="#A8C5A0" opacity="0.08" />
                <path d="M 0,150 Q 100,110 200,130 T 400,120 L 400,175 L 0,175 Z" fill="#A8C5A0" opacity="0.05" />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-11 h-11 rounded-full bg-white/95 flex items-center justify-center cursor-pointer hover:scale-105 transition-transform shadow-lg">
                  <Play size={14} className="text-[#0F0F0F] ml-0.5" fill="#0F0F0F" />
                </div>
              </div>
              <div className="absolute top-3 left-3.5 text-[10px] text-white/60 px-2.5 py-1 rounded-md bg-black/40">
                Reuniao arquitetural - 12:34
              </div>
            </div>

            <div>
              <div className="text-[12px] font-semibold mb-2">Neste passo voce vai:</div>
              {currentStepContent.objectives.map((obj, i) => (
                <div key={i} className="flex gap-2.5 text-[11.5px] text-grove-text/70 mb-1.5 leading-relaxed">
                  <span className="text-grove-sage mt-0.5">&#8226;</span>
                  {obj}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="p-5 border-t border-white/[0.05] flex-shrink-0" style={{ background: 'linear-gradient(180deg, rgba(12,26,20,0.5) 0%, #070b09 100%)' }}>
          <div className="max-w-[680px] mx-auto">
            <div className="text-[12px] font-semibold mb-2">Reflexao</div>
            <div className="text-[12px] text-grove-text/80 mb-3 leading-relaxed">
              {currentStepContent.checkpointQuestion}
            </div>
            {!submitted ? (
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Compartilhe seu raciocinio..."
                  value={checkpointAnswer}
                  onChange={(e) => setCheckpointAnswer(e.target.value)}
                  className="flex-1 px-4 py-3 bg-white/[0.03] border border-white/[0.08] rounded-xl text-grove-text text-[12px] placeholder:text-grove-text-dim focus:border-grove-sage/30 transition-colors"
                />
                <button
                  onClick={handleSubmit}
                  className="px-5 py-3 rounded-xl bg-grove-sage text-grove-charcoal text-[12px] font-semibold hover:bg-grove-sage/90 transition-colors shadow-lg"
                >
                  Enviar resposta
                </button>
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="flex items-center gap-3 p-4 bg-grove-sage/10 border border-grove-sage/20 rounded-xl"
              >
                <CheckCircle2 size={20} className="text-grove-sage flex-shrink-0" />
                <div>
                  <div className="text-[12px] text-grove-sage font-medium">Resposta enviada</div>
                  <div className="text-[10px] text-grove-text-muted mt-0.5">Sua resposta esta sendo analisada para otimizar os proximos passos.</div>
                </div>
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
