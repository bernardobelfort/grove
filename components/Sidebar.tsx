'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { Home, Route, TreeDeciduous, Sparkles, Users, Settings, HelpCircle, LogOut, User, ChevronRight, Bell, Shield, Palette } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { employee } from '@/data/employee';

const NAV_ITEMS = [
  { id: 'dashboard', label: 'Inicio', icon: Home, href: '/dashboard' },
  { id: 'trail', label: 'Minha Trilha', icon: Route, href: '/trail' },
  { id: 'tree', label: 'Minha Arvore', icon: TreeDeciduous, href: '/tree' },
  { id: 'insights', label: 'Decisoes', icon: Sparkles, href: '/insights' },
];

const MIN_WIDTH = 90;
const MAX_WIDTH = 280;
const COLLAPSED_THRESHOLD = 120;

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
      className={`group relative flex items-center h-11 rounded-xl transition-all duration-200 ${
        isExpanded ? 'px-3.5 gap-3' : 'justify-center mx-1'
      } ${
        isActive
          ? 'bg-gradient-to-r from-grove-sage/15 to-grove-sage/5'
          : 'hover:bg-white/[0.04]'
      }`}
    >
      {isActive && (
        <motion.div
          layoutId="activeIndicator"
          className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-grove-sage"
          transition={{ type: 'spring', stiffness: 300, damping: 30 }}
        />
      )}
      <Icon
        size={19}
        strokeWidth={isActive ? 2 : 1.5}
        className={`flex-shrink-0 transition-all duration-200 ${
          isActive ? 'text-grove-sage' : 'text-grove-text-muted group-hover:text-grove-text/70'
        }`}
      />
      {isExpanded && (
        <motion.span
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.15, delay: 0.05 }}
          className={`text-[13px] whitespace-nowrap ${
            isActive ? 'text-grove-offwhite font-medium' : 'text-grove-text/60 group-hover:text-grove-text/80'
          }`}
        >
          {item.label}
        </motion.span>
      )}
      {!isExpanded && (
        <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-[#1a2f26] border border-grove-sage/20 text-[11px] text-grove-text whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
          {item.label}
        </div>
      )}
    </Link>
  );
}

export default function Sidebar() {
  const pathname = usePathname();
  const [width, setWidth] = useState(220);
  const [isDragging, setIsDragging] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const sidebarRef = useRef<HTMLDivElement>(null);
  const userMenuRef = useRef<HTMLDivElement>(null);

  const isExpanded = width > COLLAPSED_THRESHOLD;

  const handleMouseDown = useCallback((e: React.MouseEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleMouseMove = useCallback((e: MouseEvent) => {
    if (!isDragging) return;
    const newWidth = e.clientX;
    setWidth(Math.max(MIN_WIDTH, Math.min(MAX_WIDTH, newWidth)));
  }, [isDragging]);

  const handleMouseUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);
    if (width < COLLAPSED_THRESHOLD) {
      setWidth(MIN_WIDTH);
    } else if (width < 160) {
      setWidth(200);
    }
  }, [isDragging, width]);

  useEffect(() => {
    if (isDragging) {
      window.addEventListener('mousemove', handleMouseMove);
      window.addEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = 'col-resize';
      document.body.style.userSelect = 'none';
    }
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      document.body.style.cursor = '';
      document.body.style.userSelect = '';
    };
  }, [isDragging, handleMouseMove, handleMouseUp]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target as Node)) {
        setUserMenuOpen(false);
      }
    };
    if (userMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [userMenuOpen]);

  return (
    <motion.div
      ref={sidebarRef}
      initial={false}
      animate={{ width }}
      transition={isDragging ? { duration: 0 } : { duration: 0.2, ease: [0.4, 0, 0.2, 1] }}
      className="relative flex-shrink-0 flex flex-col h-screen select-none"
      style={{
        background: 'linear-gradient(180deg, #0c1a14 0%, #091210 100%)',
      }}
    >
      <div
        className="absolute inset-y-0 -right-px w-[3px] cursor-col-resize z-30 group"
        onMouseDown={handleMouseDown}
      >
        <div className={`absolute inset-y-0 right-0 w-[1px] transition-colors ${isDragging ? 'bg-grove-sage/50' : 'bg-grove-sage/10 group-hover:bg-grove-sage/30'}`} />
        <div className={`absolute top-1/2 -translate-y-1/2 right-0 translate-x-1/2 w-3 h-8 rounded-full transition-all ${isDragging ? 'bg-grove-sage/30 scale-100' : 'bg-transparent scale-0 group-hover:scale-100 group-hover:bg-grove-sage/15'}`} />
      </div>

      <div className="h-[72px] border-b border-white/[0.04] flex items-center justify-center overflow-hidden">
        <AnimatePresence mode="wait">
          {isExpanded ? (
            <motion.div
              key="expanded"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.8 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="w-full h-full flex items-center pl-1"
            >
              <img
                src="/logo.png"
                alt="Grove"
                style={{ height: '120px', width: 'auto', marginTop: '10px', marginLeft: '-4px' }}
              />
            </motion.div>
          ) : (
            <motion.div
              key="collapsed"
              initial={{ opacity: 0, scale: 1.5 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.5 }}
              transition={{ duration: 0.2, ease: 'easeOut' }}
              className="flex items-center justify-center"
            >
              <img
                src="/logo-icon.png"
                alt="Grove"
                style={{ width: '85px', height: '85px', objectFit: 'contain' }}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <nav className={`flex flex-col gap-1 flex-1 pt-4 pb-3 ${isExpanded ? 'px-2.5' : 'px-1'}`}>
        <div className={`mb-2 ${isExpanded ? 'px-3' : 'px-2'}`}>
          {isExpanded && (
            <span className="text-[9px] font-semibold text-grove-text-dim uppercase tracking-[0.15em]">
              Menu
            </span>
          )}
        </div>

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

        <div className={`h-px bg-white/[0.04] my-3 ${isExpanded ? 'mx-3' : 'mx-2'}`} />

        <div className={`mb-2 ${isExpanded ? 'px-3' : 'px-2'}`}>
          {isExpanded && (
            <span className="text-[9px] font-semibold text-grove-text-dim uppercase tracking-[0.15em]">
              Mentor
            </span>
          )}
        </div>

        <Link
          href="/mentor"
          className={`group relative flex items-center h-11 rounded-xl transition-all duration-200 ${
            isExpanded ? 'px-3.5 gap-3' : 'justify-center mx-1'
          } ${
            pathname === '/mentor'
              ? 'bg-gradient-to-r from-grove-gold/15 to-grove-gold/5'
              : 'hover:bg-white/[0.04]'
          }`}
        >
          {pathname === '/mentor' && (
            <motion.div
              layoutId="mentorIndicator"
              className="absolute left-0 top-1/2 -translate-y-1/2 w-[3px] h-5 rounded-r-full bg-grove-gold"
              transition={{ type: 'spring', stiffness: 300, damping: 30 }}
            />
          )}
          <Users
            size={19}
            strokeWidth={pathname === '/mentor' ? 2 : 1.5}
            className={`flex-shrink-0 transition-all duration-200 ${
              pathname === '/mentor' ? 'text-grove-gold' : 'text-grove-text-muted group-hover:text-grove-text/70'
            }`}
          />
          {isExpanded && (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className={`text-[13px] whitespace-nowrap ${
                pathname === '/mentor' ? 'text-grove-offwhite font-medium' : 'text-grove-text/60 group-hover:text-grove-text/80'
              }`}
            >
              Visao do Mentor
            </motion.span>
          )}
          {!isExpanded && (
            <div className="absolute left-full ml-2 px-2.5 py-1.5 rounded-lg bg-[#1a2f26] border border-grove-gold/20 text-[11px] text-grove-text whitespace-nowrap opacity-0 group-hover:opacity-100 pointer-events-none transition-opacity z-50 shadow-lg">
              Visao do Mentor
            </div>
          )}
        </Link>

        <div className="flex-1" />

        <div className={`h-px bg-white/[0.04] my-2 ${isExpanded ? 'mx-3' : 'mx-2'}`} />

        <Link
          href="#"
          className={`group flex items-center h-9 rounded-lg transition-all duration-200 ${
            isExpanded ? 'px-3.5 gap-3' : 'justify-center mx-1'
          } hover:bg-white/[0.04]`}
        >
          <HelpCircle size={16} strokeWidth={1.5} className="text-grove-text-dim group-hover:text-grove-text-muted" />
          {isExpanded && <span className="text-[12px] text-grove-text-dim group-hover:text-grove-text-muted">Ajuda</span>}
        </Link>

        <Link
          href="#"
          className={`group flex items-center h-9 rounded-lg transition-all duration-200 ${
            isExpanded ? 'px-3.5 gap-3' : 'justify-center mx-1'
          } hover:bg-white/[0.04]`}
        >
          <Settings size={16} strokeWidth={1.5} className="text-grove-text-dim group-hover:text-grove-text-muted" />
          {isExpanded && <span className="text-[12px] text-grove-text-dim group-hover:text-grove-text-muted">Configuracoes</span>}
        </Link>
      </nav>

      <div className={`border-t border-white/[0.04] ${isExpanded ? 'p-3' : 'p-2'} relative`} ref={userMenuRef}>
        <div
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          className={`flex items-center rounded-xl transition-all cursor-pointer ${
            userMenuOpen ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'
          } ${isExpanded ? 'gap-3 p-2.5' : 'justify-center p-2'}`}
        >
          <div
            className="w-9 h-9 rounded-xl flex items-center justify-center text-[11px] font-bold flex-shrink-0 shadow-lg"
            style={{
              background: 'linear-gradient(135deg, #2A5A48 0%, #1A3C34 100%)',
              color: '#A8C5A0',
              boxShadow: '0 2px 8px rgba(0,0,0,0.3), inset 0 1px 0 rgba(255,255,255,0.05)'
            }}
          >
            {employee.initials}
          </div>
          {isExpanded && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.15, delay: 0.05 }}
              className="flex-1 min-w-0"
            >
              <div className="text-[13px] font-medium text-grove-offwhite truncate">
                {employee.name}
              </div>
              <div className="text-[10px] text-grove-text-dim truncate">
                {employee.role}
              </div>
            </motion.div>
          )}
          {isExpanded && (
            <ChevronRight
              size={14}
              className={`text-grove-text-dim transition-transform duration-200 ${userMenuOpen ? 'rotate-90' : ''}`}
            />
          )}
        </div>

        <AnimatePresence>
          {userMenuOpen && (
            <motion.div
              initial={{ opacity: 0, x: -10, scale: 0.95 }}
              animate={{ opacity: 1, x: 0, scale: 1 }}
              exit={{ opacity: 0, x: -10, scale: 0.95 }}
              transition={{ duration: 0.15, ease: 'easeOut' }}
              className="absolute left-full bottom-0 ml-2 w-[280px] rounded-2xl overflow-hidden z-50"
              style={{
                background: 'linear-gradient(180deg, #0f1f17 0%, #0a1610 100%)',
                border: '1px solid rgba(168,197,160,0.12)',
                boxShadow: '0 10px 40px rgba(0,0,0,0.5), 0 0 0 1px rgba(0,0,0,0.2)'
              }}
            >
              <div className="p-4 border-b border-white/[0.06]">
                <div className="flex items-center gap-3">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-[14px] font-bold shadow-lg"
                    style={{
                      background: 'linear-gradient(135deg, #2A5A48 0%, #1A3C34 100%)',
                      color: '#A8C5A0',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
                    }}
                  >
                    {employee.initials}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="text-[14px] font-semibold text-grove-offwhite truncate">
                      {employee.name}
                    </div>
                    <div className="text-[11px] text-grove-text-muted truncate">
                      {employee.role}
                    </div>
                    <div className="text-[10px] text-grove-sage mt-0.5">
                      Dia {employee.day} da jornada
                    </div>
                  </div>
                </div>
              </div>

              <div className="p-2">
                <div className="px-2 py-1.5 mb-1">
                  <span className="text-[9px] font-semibold text-grove-text-dim uppercase tracking-wider">Conta</span>
                </div>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.04] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-grove-sage/10 flex items-center justify-center">
                    <User size={15} className="text-grove-sage" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-grove-text group-hover:text-grove-offwhite transition-colors">Meu Perfil</div>
                    <div className="text-[10px] text-grove-text-dim">Ver e editar informacoes</div>
                  </div>
                  <ChevronRight size={14} className="text-grove-text-dim" />
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.04] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-grove-sage/10 flex items-center justify-center">
                    <Bell size={15} className="text-grove-sage" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-grove-text group-hover:text-grove-offwhite transition-colors">Notificacoes</div>
                    <div className="text-[10px] text-grove-text-dim">Gerenciar alertas</div>
                  </div>
                  <div className="w-5 h-5 rounded-full bg-grove-gold/20 flex items-center justify-center">
                    <span className="text-[9px] font-bold text-grove-gold">3</span>
                  </div>
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.04] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-grove-sage/10 flex items-center justify-center">
                    <Palette size={15} className="text-grove-sage" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-grove-text group-hover:text-grove-offwhite transition-colors">Aparencia</div>
                    <div className="text-[10px] text-grove-text-dim">Tema e preferencias</div>
                  </div>
                  <ChevronRight size={14} className="text-grove-text-dim" />
                </button>

                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-white/[0.04] transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-grove-sage/10 flex items-center justify-center">
                    <Shield size={15} className="text-grove-sage" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-grove-text group-hover:text-grove-offwhite transition-colors">Privacidade</div>
                    <div className="text-[10px] text-grove-text-dim">Seguranca e dados</div>
                  </div>
                  <ChevronRight size={14} className="text-grove-text-dim" />
                </button>
              </div>

              <div className="p-2 border-t border-white/[0.06]">
                <button className="w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left hover:bg-red-500/10 transition-colors group">
                  <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                    <LogOut size={15} className="text-red-400" />
                  </div>
                  <div className="flex-1">
                    <div className="text-[12px] font-medium text-red-400">Sair da conta</div>
                    <div className="text-[10px] text-grove-text-dim">Encerrar sessao</div>
                  </div>
                </button>
              </div>

              <div className="px-4 py-3 border-t border-white/[0.06] bg-white/[0.02]">
                <div className="text-[9px] text-grove-text-dim text-center">
                  Grove v1.0.0 · {employee.company}
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}
