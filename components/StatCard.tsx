'use client';

import { motion } from 'framer-motion';

interface StatCardProps {
  value: string | number;
  label: string;
  delta?: string;
  deltaColor?: string;
}

export default function StatCard({ value, label, delta, deltaColor = 'text-grove-text-muted' }: StatCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -2 }}
      className="bg-grove-card-hover border border-grove-border rounded-xl p-4 transition-shadow hover:shadow-lg hover:shadow-black/20"
    >
      <div className="text-[24px] font-bold tracking-tighter">{value}</div>
      <div className="text-[10.5px] text-grove-text-muted mt-0.5">{label}</div>
      {delta && (
        <div className={`text-[10px] mt-2 ${deltaColor}`}>{delta}</div>
      )}
    </motion.div>
  );
}
