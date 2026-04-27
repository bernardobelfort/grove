'use client';

import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import { TrailStep } from '@/lib/types';

interface TrailTimelineProps {
  steps: TrailStep[];
  onStepClick?: (step: TrailStep) => void;
}

export default function TrailTimeline({ steps, onStepClick }: TrailTimelineProps) {
  return (
    <div className="flex flex-col gap-1.5">
      {steps.map((step, index) => {
        const isDone = step.status === 'completed';
        const isCurrent = step.status === 'in_progress';
        const isLocked = step.status === 'locked';

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.04 }}
            onClick={() => !isLocked && onStepClick?.(step)}
            className={`flex gap-3 px-3 py-3 rounded-xl cursor-pointer transition-all ${
              isCurrent
                ? 'bg-grove-gold/[0.08] border border-grove-gold/20'
                : isDone
                ? 'border border-transparent hover:bg-white/[0.02]'
                : 'border border-transparent opacity-50 hover:opacity-70'
            } ${isLocked ? 'cursor-not-allowed' : ''}`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {isDone ? (
                <div className="w-[16px] h-[16px] rounded-full bg-grove-sage flex items-center justify-center shadow-sm">
                  <Check size={9} strokeWidth={3} className="text-grove-charcoal" />
                </div>
              ) : isCurrent ? (
                <motion.div
                  className="w-[16px] h-[16px] rounded-full border-2 border-grove-gold bg-grove-gold/15 flex items-center justify-center"
                  animate={{ boxShadow: ['0 0 0 0 rgba(212,168,67,0)', '0 0 0 4px rgba(212,168,67,0.15)', '0 0 0 0 rgba(212,168,67,0)'] }}
                  transition={{ duration: 2, repeat: Infinity }}
                >
                  <div className="w-1.5 h-1.5 rounded-full bg-grove-gold" />
                </motion.div>
              ) : (
                <div className="w-[16px] h-[16px] rounded-full border border-white/10" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`text-[12px] leading-tight ${
                    isDone
                      ? 'text-grove-text-muted'
                      : isCurrent
                      ? 'text-grove-text font-medium'
                      : 'text-grove-text-dim'
                  }`}
                >
                  {step.title}
                </div>
                {step.aiAdded && (
                  <span className="text-[8px] text-grove-sage px-1.5 py-0.5 rounded-md bg-grove-sage/10 font-medium tracking-wide">
                    novo
                  </span>
                )}
              </div>
              <div className={`text-[10px] mt-1 ${isCurrent ? 'text-grove-gold' : 'text-grove-text-dim'}`}>
                {isDone ? 'Concluido' : isCurrent ? 'Em andamento' : `${step.time}`}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
