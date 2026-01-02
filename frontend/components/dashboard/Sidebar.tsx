'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarProps {
  isOpen: boolean; // Desktop: expanded vs collapsed; Mobile: ignored (handled by mobileOpen)
  isMobileOpen: boolean; // Mobile: open vs closed
  onCloseMobile: () => void;
}

import { 
  LayoutDashboard, 
  Sparkles, 
  BarChart2, 
  TrendingUp, 
  UserCircle,
  UploadCloud,
  Home
} from 'lucide-react';

const menuItems = [
  { name: 'Welcome', href: '/dashboard/welcome', icon: <Home size={20} /> },
  { name: 'Upload Data', href: '/dashboard/upload', icon: <UploadCloud size={20} /> },
  { name: 'Overview', href: '/dashboard', icon: <LayoutDashboard size={20} /> },
  { name: 'Insights & Data', href: '/dashboard/insights', icon: <BarChart2 size={20} /> },
  { name: 'AI Assistant', href: '/dashboard/ai-assistant', icon: <Sparkles size={20} /> },
  { name: 'Predictions', href: '/dashboard/predictions', icon: <TrendingUp size={20} /> },
  { name: 'Profile', href: '/dashboard/profile', icon: <UserCircle size={20} /> },
];

export const Sidebar = ({ isOpen, isMobileOpen, onCloseMobile }: SidebarProps) => {
  const pathname = usePathname();

  return (
    <>
      {/* Mobile Overlay */}
      {isMobileOpen && (
        <div 
          className="fixed inset-0 bg-gray-900/50 z-40 md:hidden backdrop-blur-sm"
          onClick={onCloseMobile}
        />
      )}

      {/* Sidebar Container */}
      <aside 
        className={`
          fixed inset-y-0 left-0 z-50 bg-white border-r border-gray-200 transition-all duration-300 shadow-xl md:shadow-none
          ${isMobileOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'}
          ${isOpen ? 'md:w-64' : 'md:w-20'}
          w-64
        `}
      >
        {/* Logo Section */}
        <div className="h-20 flex items-center justify-center border-b border-gray-100">
          <Link href="/" className="flex items-center gap-2 group">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-violet-600 flex items-center justify-center shadow-lg shadow-blue-500/30 group-hover:scale-110 transition-transform">
                <span className="text-white font-bold text-lg">I</span>
            </div>
            <span className={`text-xl font-bold text-gray-900 transition-opacity duration-300 ${!isOpen ? 'md:hidden' : 'block'}`}>
              Intellexa
            </span>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="p-4 space-y-2 overflow-y-auto h-[calc(100vh-5rem)]">
          {menuItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={() => onCloseMobile()} // Close on mobile click
                className={`
                  flex items-center gap-3 px-3 py-3 rounded-xl transition-all duration-200 group relative
                  ${isActive 
                    ? 'bg-blue-50 text-blue-600 font-medium shadow-sm border border-blue-100' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
                  }
                  ${!isOpen ? 'md:justify-center' : ''}
                `}
              >
                <div className={`${isActive ? 'text-blue-600' : 'text-gray-400 group-hover:text-gray-600'}`}>
                  {item.icon}
                </div>
                
                <span className={`transition-opacity duration-300 whitespace-nowrap ${!isOpen ? 'md:hidden' : 'block'}`}>
                  {item.name}
                </span>

                {/* Tooltip for collapsed state */}
                {!isOpen && (
                  <div className="hidden md:group-hover:block absolute left-full ml-2 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg whitespace-nowrap z-50">
                    {item.name}
                  </div>
                )}
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
