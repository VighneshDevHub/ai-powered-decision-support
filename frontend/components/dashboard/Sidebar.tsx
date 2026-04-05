'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Sparkles, 
  BarChart2, 
  TrendingUp, 
  UserCircle,
  UploadCloud,
  Home,
  ChevronLeft,
  ChevronRight,
  LogOut,
  Settings
} from 'lucide-react';

interface SidebarProps {
  isOpen: boolean;
  isMobileOpen: boolean;
  onCloseMobile: () => void;
}

const menuItems = [
  { name: 'Welcome', href: '/dashboard/welcome', icon: Home },
  { name: 'Upload Data', href: '/dashboard/upload', icon: UploadCloud },
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'Insights & Data', href: '/dashboard/insights', icon: BarChart2 },
  { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: Sparkles },
  { name: 'Predictions', href: '/dashboard/predictions', icon: TrendingUp },
  { name: 'Profile', href: '/dashboard/profile', icon: UserCircle },
];

export const Sidebar = ({ isOpen, isMobileOpen, onCloseMobile }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-slate-950/40 z-40 md:hidden backdrop-blur-md transition-opacity duration-300"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-background/80 backdrop-blur-xl border-r border-border transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isOpen ? 'md:w-64' : 'md:w-20'}
          w-64 flex flex-col
        `}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center px-6 mb-4">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center shadow-lg shadow-primary/25 group-hover:rotate-6 transition-all duration-300">
                <Sparkles className="text-primary-foreground w-6 h-6" />
            </div>
            <span className={`text-xl font-bold tracking-tight text-foreground transition-all duration-500 ${!isOpen ? 'md:opacity-0 md:w-0' : 'opacity-100'}`}>
              Intellexa<span className="text-primary">.ai</span>
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 space-y-1.5 overflow-y-auto custom-scrollbar">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            const Icon = item.icon;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onCloseMobile()}
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-300 group relative
                  ${isActive 
                    ? 'bg-primary/10 text-primary shadow-[inset_0px_0px_12px_rgba(59,130,246,0.1)]' 
                    : 'text-muted-foreground hover:bg-muted hover:text-foreground'
                  }
                  ${!isOpen ? 'md:justify-center' : ''}
                `}
              >
                <div className={`transition-transform duration-300 ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  <Icon size={22} strokeWidth={isActive ? 2.5 : 2} />
                </div>
                
                <span className={`font-medium transition-all duration-500 whitespace-nowrap ${!isOpen ? 'md:opacity-0 md:w-0 overflow-hidden' : 'opacity-100'}`}>
                  {item.name}
                </span>

                {/* Active Indicator */}
                {isActive && isOpen && (
                    <div className="absolute right-2 w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                )}

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="hidden md:group-hover:block absolute left-full ml-4 px-3 py-1.5 bg-foreground text-background text-xs font-bold rounded-lg shadow-xl whitespace-nowrap z-[100] animate-in fade-in zoom-in-95 duration-200">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Footer Navigation */}
        <div className="p-4 border-t border-border mt-auto">
             <div className={`flex flex-col gap-1 ${!isOpen ? 'items-center' : ''}`}>
                <button className={`flex items-center gap-3 px-3 py-3 rounded-xl text-muted-foreground hover:bg-muted hover:text-foreground transition-all w-full group ${!isOpen ? 'justify-center' : ''}`}>
                    <Settings size={20} className="group-hover:rotate-45 transition-transform duration-500" />
                    <span className={`text-sm font-medium transition-all duration-500 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>Settings</span>
                </button>
                <button className={`flex items-center gap-3 px-3 py-3 rounded-xl text-destructive/70 hover:bg-destructive/10 hover:text-destructive transition-all w-full group ${!isOpen ? 'justify-center' : ''}`}>
                    <LogOut size={20} />
                    <span className={`text-sm font-medium transition-all duration-500 ${!isOpen ? 'opacity-0 w-0' : 'opacity-100'}`}>Logout</span>
                </button>
             </div>
        </div>
      </aside>
    </>
  );
};
