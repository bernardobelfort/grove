'use client';

import { motion } from 'framer-motion';
import { ReactNode } from 'react';

interface StatCardProps {
  value: string | number;
  label: string;
  delta?: string;
  deltaColor?: string;
  icon?: ReactNode;
}

export default function StatCard({ value, label, delta, deltaColor = 'text-grove-sage', icon }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-white/[0.02] border border-grove-border rounded-xl p-4 transition-all hover:border-grove-sage/20 hover:shadow-lg hover:shadow-black/20"
    >
      {icon && (
        <div className="mb-3">{icon}</div>
      )}
      <div className="text-[28px] font-bold tracking-tight">{value}</div>
      <div className="text-[10px] text-grove-text-muted mt-1 font-medium">{label}</div>
      {delta && (
        <div className={`text-[10px] mt-2 ${deltaColor}`}>{delta}</div>
      )}
    </motion.div>
  );
}
