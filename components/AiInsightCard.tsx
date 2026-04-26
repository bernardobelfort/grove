'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { AIInsight } from '@/lib/types';
import { PlusCircle, MinusCircle, ArrowUpDown, SlidersHorizontal, Unlock } from 'lucide-react';

interface AiInsightCardProps {
  insight: AIInsight;
  onUndo?: () => void;
}

const typeConfig = {
  added: { icon: PlusCircle, color: '#A8C5A0' },
  reordered: { icon: ArrowUpDown, color: '#7EB8D4' },
  unlocked: { icon: Unlock, color: '#D4A843' },
  removed: { icon: MinusCircle, color: '#E6A850' },
  adjusted: { icon: SlidersHorizontal, color: '#9B8AC4' },
};

export default function AiInsightCard({ insight, onUndo }: AiInsightCardProps) {
  const [undone, setUndone] = useState(false);
  const config = typeConfig[insight.type];
  const Icon = config.icon;

  const handleUndo = () => {
    setUndone(true);
    onUndo?.();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: undone ? 0.5 : 1, y: 0 }}
      className={`p-3.5 bg-grove-card-hover border border-grove-border rounded-xl flex gap-3.5 relative transition-opacity ${
        undone ? 'opacity-50' : ''
      }`}
    >
      <div
        className="w-8 h-8 rounded-lg flex items-center justify-center flex-shrink-0"
        style={{
          background: `${config.color}15`,
          border: `1px solid ${config.color}30`,
        }}
      >
        <Icon size={16} style={{ color: config.color }} strokeWidth={1.8} />
      </div>
      <div className="flex-1 min-w-0">
        <div className="flex justify-between items-start gap-2.5">
          <div className={`text-[12px] font-medium tracking-tight leading-tight ${undone ? 'line-through' : ''}`}>
            {insight.action}
          </div>
          <div className="text-[9.5px] text-grove-text-muted flex-shrink-0">{insight.timestamp}</div>
        </div>
        <div className="text-[11px] mt-1 font-medium" style={{ color: config.color }}>
          {insight.subject}
        </div>
        <div className="text-[10.5px] text-grove-text/65 mt-2 leading-relaxed">{insight.reason}</div>
        <div className="flex items-center gap-3 mt-2.5">
          <div className="text-[9px] text-grove-text-muted/70">
            {insight.impact}
          </div>
          <div className="flex-1" />
          {insight.undoable && !undone && (
            <button
              onClick={handleUndo}
              className="text-[10px] text-grove-text-muted hover:text-grove-text transition-colors"
            >
              Desfazer
            </button>
          )}
        </div>
      </div>
    </motion.div>
  );
}
