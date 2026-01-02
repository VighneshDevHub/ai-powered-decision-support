'use client';

import React, { useEffect, useRef, useState } from 'react';
import { SignedIn, UserButton, useUser } from '@clerk/nextjs';

interface HeaderProps {
  onToggleSidebar: () => void;
  onToggleMobile: () => void;
}

export default function AppHeader({ onToggleSidebar, onToggleMobile }: HeaderProps) {
  const [notifOpen, setNotifOpen] = useState(false);
  const notifRef = useRef<HTMLDivElement | null>(null);
  const { user } = useUser();

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
    <header className="h-20 bg-white/80 backdrop-blur-md border-b border-gray-200 sticky top-0 z-30 px-4 md:px-8 flex items-center justify-between transition-all duration-300">
      <div className="flex items-center gap-4">
        {/* Mobile Toggle */}
        <button 
          onClick={onToggleMobile}
          className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors md:hidden"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Desktop Toggle */}
        <button 
          onClick={onToggleSidebar}
          className="hidden md:block p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
        >
          <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
      </div>

      <div className="flex items-center gap-4">
        <div className="hidden sm:flex items-center gap-2 text-xs font-medium text-gray-500 bg-gray-50 border border-gray-100 px-3 py-1.5 rounded-full">
            <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_8px_rgba(34,197,94,0.5)]" />
            System Operational
        </div>
        <div className="relative flex items-center gap-3 pl-4 border-l border-gray-100">
            <button 
              onClick={() => setNotifOpen(!notifOpen)} 
              aria-haspopup="menu"
              aria-expanded={notifOpen}
              className="relative p-2 rounded-lg hover:bg-gray-100 text-gray-600 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
              <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-red-500" />
            </button>
            {notifOpen && (
              <div ref={notifRef} className="absolute top-10 right-0 w-80 bg-white border border-gray-200 rounded-xl shadow-lg p-3 z-50">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-semibold text-gray-900">Notifications</span>
                  <button className="text-xs text-blue-600 hover:underline">Mark all read</button>
                </div>
                <ul className="space-y-2">
                  {[
                    { title: 'Data upload complete', time: '2m ago' },
                    { title: 'Revenue trend updated', time: '10m ago' },
                    { title: 'AI recommendation available', time: '30m ago' }
                  ].map((n, i) => (
                    <li key={i} className="flex items-center justify-between px-2 py-2 rounded-lg hover:bg-gray-50">
                      <span className="text-sm text-gray-700">{n.title}</span>
                      <span className="text-xs text-gray-400">{n.time}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <SignedIn>
              <div className="hidden sm:flex items-center gap-3">
                <div className="text-right">
                  <p className="text-sm font-bold text-gray-900">{user?.fullName ?? 'User'}</p>
                  <p className="text-xs text-gray-500">{user?.primaryEmailAddress?.emailAddress ?? ''}</p>
                </div>
                <UserButton
                  userProfileUrl="/dashboard/profile"
                  appearance={{
                    elements: {
                      userButtonAvatarBox: "w-10 h-10",
                      userButtonPopoverFooter: "hidden",
                    },
                  }}
                />
              </div>
            </SignedIn>
        </div>
      </div>
    </header>
  );
}
