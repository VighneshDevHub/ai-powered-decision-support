'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';
import { 
  Bell, 
  Menu, 
  PanelLeftClose, 
  PanelLeftOpen, 
  Search,
  Zap,
  CheckCircle2,
  Clock,
  Sparkles,
  Sun,
  Moon
} from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
}

export default function AppHeader({ onToggleSidebar, onToggleMobile }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) {
        setNotifOpen(false);
      }
    };
    document.addEventListener('click', handler);
    return () => document.removeEventListener('click', handler);
  }, []);

  return (
    <header className="h-20 bg-background/60 backdrop-blur-xl border-b border-border sticky top-0 z-30 px-6 md:px-10 flex items-center justify-between transition-all duration-500">
      <div className="flex items-center gap-6">
        {/* Mobile Toggle */}
        <button 
          onClick={onToggleMobile}
          className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-all md:hidden border border-border/50 shadow-sm"
        >
          <Menu size={22} />
        </button>

        {/* Desktop Toggle */}
        <button 
          onClick={onToggleSidebar}
          className="hidden md:flex p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-all border border-border/50 shadow-sm group"
        >
          <PanelLeftClose size={22} className="group-hover:scale-110 transition-transform" />
        </button>

        {/* Search Bar - Aesthetic Only */}
        <div className="hidden lg:flex items-center gap-3 px-4 py-2.5 bg-muted/50 border border-border rounded-xl w-80 text-muted-foreground group focus-within:ring-4 focus-within:ring-primary/10 focus-within:border-primary transition-all">
            <Search size={18} className="group-focus-within:text-primary transition-colors" />
            <input 
                type="text" 
                placeholder="Search analytics & datasets..." 
                className="bg-transparent border-none outline-none text-sm font-medium placeholder:text-muted-foreground/60 w-full"
            />
            <div className="px-1.5 py-0.5 rounded bg-muted border border-border text-[10px] font-black">⌘K</div>
        </div>
      </div>

      <div className="flex items-center gap-6">
        <div className="hidden sm:flex items-center gap-2.5 text-xs font-bold text-muted-foreground bg-emerald-500/5 border border-emerald-500/10 px-4 py-2 rounded-full">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
            <span className="uppercase tracking-widest">Neural Link Active</span>
        </div>

        <div className="relative flex items-center gap-5 pl-6 border-l border-border">
            {/* Theme Toggle */}
            <button 
              onClick={toggleTheme}
              className="p-2.5 rounded-xl hover:bg-muted text-muted-foreground transition-all border border-border/50 shadow-sm group"
              title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
            >
              {isDarkMode ? (
                <Sun size={20} className="group-hover:rotate-90 transition-transform duration-500" />
              ) : (
                <Moon size={20} className="group-hover:-rotate-12 transition-transform duration-500" />
              )}
            </button>

            <button 
              onClick={() => setNotifOpen(!notifOpen)} 
              className={`relative p-2.5 rounded-xl transition-all duration-300 ${notifOpen ? 'bg-primary/10 text-primary shadow-inner' : 'hover:bg-muted text-muted-foreground border border-border/50'}`}
            >
              <Bell size={22} className={notifOpen ? 'scale-110' : ''} />
              <span className="absolute top-2.5 right-2.5 w-2 h-2 rounded-full bg-primary ring-4 ring-background" />
            </button>

            {notifOpen && (
              <div 
                ref={notifRef} 
                className="absolute top-[calc(100%+12px)] right-0 w-96 bg-card dark:bg-slate-900 border border-border rounded-[2rem] shadow-2xl p-8 z-50 animate-in fade-in slide-in-from-top-4 duration-300"
              >
                <div className="flex items-center justify-between mb-8">
                  <h3 className="text-xs font-black uppercase tracking-[0.2em] text-foreground">Intelligence Alerts</h3>
                  <button className="text-[10px] font-black uppercase tracking-widest text-primary hover:opacity-80 transition-opacity">Clear All</button>
                </div>
                <div className="space-y-4">
                  {[
                    { title: 'Dataset Synchronized', time: '2m ago', icon: CheckCircle2, color: 'emerald', desc: 'Financial registry successfully ingested.' },
                    { title: 'Neural Analysis Ready', time: '10m ago', icon: Sparkles, color: 'primary', desc: 'Cross-dataset correlations identified.' },
                    { title: 'System Heartbeat OK', time: '30m ago', icon: Zap, color: 'amber', desc: 'Neural link latency: 12ms.' }
                  ].map((n, i) => (
                    <div key={i} className="flex items-start gap-5 p-5 rounded-2xl hover:bg-muted transition-all group cursor-pointer border border-transparent hover:border-border">
                      <div className={`p-2.5 rounded-xl bg-${n.color}-500/10 text-${n.color}-500 shadow-sm`}>
                        <n.icon size={20} />
                      </div>
                      <div className="flex-1 space-y-1">
                        <p className="text-sm font-black text-foreground group-hover:text-primary transition-colors">{n.title}</p>
                        <p className="text-[11px] text-muted-foreground font-medium leading-relaxed">{n.desc}</p>
                        <div className="flex items-center gap-1.5 pt-1 text-[9px] font-black text-muted-foreground/60 uppercase tracking-widest">
                            <Clock size={10} />
                            {n.time}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <SignedIn>
              <div className="hidden md:flex items-center gap-4 group cursor-pointer">
                <div className="text-right">
                  <p className="text-sm font-black text-foreground tracking-tight">{user?.fullName ?? 'User'}</p>
                  <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60">Neural ID: {user?.id.slice(0, 8)}</p>
                </div>
                <div className="p-1 rounded-2xl border-2 border-primary/10 group-hover:border-primary/30 transition-all duration-500">
                    <UserButton
                      userProfileUrl="/dashboard/profile"
                      appearance={{
                        elements: {
                          userButtonAvatarBox: "w-10 h-10 rounded-xl",
                          userButtonPopoverFooter: "hidden",
                        },
                      }}
                    />
                </div>
              </div>
            </SignedIn>
        </div>
      </div>
    </header>
  );
}
