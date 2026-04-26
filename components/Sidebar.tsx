'use client';

import { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Route, TreeDeciduous, Sparkles, Users, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import Logo from './Logo';
import { employee } from '@/data/employee';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Inicio', icon: Home, href: '/dashboard' },
  { id: 'trail', label: 'Minha Trilha', icon: Route, href: '/trail' },
  { id: 'tree', label: 'Minha Arvore', icon: TreeDeciduous, href: '/tree' },
  { id: 'insights', label: 'Decisoes', icon: Sparkles, href: '/insights' },
];

function NavItem({
  item,
  isActive,
  isExpanded,
}: {
  item: typeof NAV_ITEMS[0];
  isActive: boolean;
  isExpanded: boolean;
}) {
  const Icon = item.icon;

  return (
    <Link
      href={item.href}
      className={`relative flex items-center h-11 rounded-xl transition-all duration-200 ${
        isExpanded ? 'px-3 gap-3' : 'justify-center'
      } ${
        isActive
          ? 'bg-grove-sage/[0.12]'
          : 'hover:bg-grove-sage/[0.06]'
      }`}
    >
      <Icon
        size={20}
        strokeWidth={1.5}
        className={`flex-shrink-0 transition-colors duration-200 ${
          isActive ? 'text-grove-sage' : 'text-grove-sage/35'
        }`}
      />
      <AnimatePresence>
        {isExpanded && (
          <motion.span
            initial={{ opacity: 0, width: 0 }}
            animate={{ opacity: 1, width: 'auto' }}
            exit={{ opacity: 0, width: 0 }}
            transition={{ duration: 0.15, delay: 0.1 }}
            className={`text-[13px] whitespace-nowrap overflow-hidden ${
              isActive ? 'text-grove-offwhite font-medium' : 'text-grove-sage/60'
            }`}
          >
            {item.label}
          </motion.span>
        )}
      </AnimatePresence>
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={false}
      animate={{ width: isExpanded ? 220 : 72 }}
      transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
      className="flex-shrink-0 flex flex-col py-4 border-r"
      style={{
        background: '#0f1f15',
        borderColor: 'rgba(168,197,160,0.07)',
      }}
    >
      <div className={`flex items-center mb-6 ${isExpanded ? 'px-4 justify-between' : 'justify-center'}`}>
        <Logo size={28} showWord={isExpanded} />
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className={`p-1.5 rounded-lg hover:bg-grove-sage/[0.08] transition-colors ${
            isExpanded ? '' : 'absolute left-[72px] -translate-x-1/2 bg-[#0f1f15] border border-grove-sage/10 z-10 hidden'
          }`}
          style={{ display: isExpanded ? 'flex' : 'none' }}
        >
          {isExpanded ? (
            <ChevronLeft size={16} className="text-grove-sage/50" />
          ) : (
            <ChevronRight size={16} className="text-grove-sage/50" />
          )}
        </button>
      </div>

      {!isExpanded && (
        <button
          onClick={() => setIsExpanded(true)}
          className="mx-auto mb-4 p-1.5 rounded-lg hover:bg-grove-sage/[0.08] transition-colors"
        >
          <ChevronRight size={16} className="text-grove-sage/40" />
        </button>
      )}

      <nav className={`flex flex-col gap-1.5 flex-1 ${isExpanded ? 'px-3' : 'px-3'}`}>
        {NAV_ITEMS.map(item => {
          const isActive = pathname === item.href || (item.href === '/dashboard' && pathname === '/');
          return (
            <NavItem
              key={item.id}
              item={item}
              isActive={isActive}
              isExpanded={isExpanded}
            />
          );
        })}

        <div className="h-px bg-grove-sage/[0.07] my-2" />

        <Link
          href="/mentor"
          className={`relative flex items-center h-11 rounded-xl transition-all duration-200 ${
            isExpanded ? 'px-3 gap-3' : 'justify-center'
          } ${
            pathname === '/mentor'
              ? 'bg-grove-sage/[0.12]'
              : 'hover:bg-grove-sage/[0.06]'
          }`}
        >
          <Users
            size={20}
            strokeWidth={1.5}
            className={`flex-shrink-0 transition-colors duration-200 ${
              pathname === '/mentor' ? 'text-grove-sage' : 'text-grove-sage/35'
            }`}
          />
          <AnimatePresence>
            {isExpanded && (
              <motion.span
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15, delay: 0.1 }}
                className={`text-[13px] whitespace-nowrap overflow-hidden ${
                  pathname === '/mentor' ? 'text-grove-offwhite font-medium' : 'text-grove-sage/60'
                }`}
              >
                Visao do Mentor
              </motion.span>
            )}
          </AnimatePresence>
        </Link>
      </nav>

      <div className={`mt-auto pt-4 ${isExpanded ? 'px-3' : 'px-3'}`}>
        <div
          className={`flex items-center rounded-xl transition-all ${
            isExpanded ? 'gap-3 p-2' : 'justify-center'
          }`}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-semibold text-grove-sage flex-shrink-0"
            style={{ background: '#1e4a38' }}
          >
            {employee.initials}
          </div>
          <AnimatePresence>
            {isExpanded && (
              <motion.div
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.15, delay: 0.1 }}
                className="overflow-hidden"
              >
                <div className="text-[13px] font-medium text-grove-offwhite whitespace-nowrap">
                  {employee.name}
                </div>
                <div className="text-[11px] text-grove-sage/45 whitespace-nowrap">
                  {employee.role}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
}
