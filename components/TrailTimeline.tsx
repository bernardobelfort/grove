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
    <div className="flex flex-col gap-1">
      {steps.map((step, index) => {
        const isDone = step.status === 'completed';
        const isCurrent = step.status === 'in_progress';
        const isLocked = step.status === 'locked';

        return (
          <motion.div
            key={step.id}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.05 }}
            onClick={() => !isLocked && onStepClick?.(step)}
            className={`flex gap-3 px-3 py-2.5 rounded-xl cursor-pointer transition-all ${
              isCurrent
                ? 'bg-grove-gold/10 border border-grove-gold/25'
                : 'border border-transparent hover:bg-white/[0.02]'
            } ${isLocked ? 'cursor-not-allowed' : ''}`}
          >
            <div className="mt-0.5 flex-shrink-0">
              {isDone ? (
                <div className="w-[14px] h-[14px] rounded-full bg-grove-sage flex items-center justify-center">
                  <Check size={8} strokeWidth={3} className="text-grove-charcoal" />
                </div>
              ) : isCurrent ? (
                <div className="w-[14px] h-[14px] rounded-full border-2 border-grove-gold bg-grove-gold/15 flex items-center justify-center">
                  <div className="w-1.5 h-1.5 rounded-full bg-grove-gold" />
                </div>
              ) : (
                <div className="w-[14px] h-[14px] rounded-full border border-white/15" />
              )}
            </div>
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <div
                  className={`text-[11.5px] leading-tight tracking-tight ${
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
                  <span className="text-[8px] text-grove-sage/70 px-1.5 py-0.5 rounded bg-grove-sage/10 tracking-wide">
                    novo
                  </span>
                )}
              </div>
              <div className={`text-[9.5px] mt-0.5 ${isCurrent ? 'text-grove-gold' : 'text-grove-text-dim'}`}>
                {isDone ? 'Concluido' : isCurrent ? 'Em andamento' : `${step.time}`}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
