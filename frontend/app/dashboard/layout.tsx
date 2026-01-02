'use client';

import React, { useState } from 'react';
import { Sidebar } from '@/components/dashboard/Sidebar';
import AppHeader from '@/components/dashboard/AppHeader';
import { DashboardProvider } from '@/context/DashboardContext';
import { SignedIn, SignedOut, RedirectToSignIn } from '@clerk/nextjs';

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true); // Desktop collapse state
  const [mobileOpen, setMobileOpen] = useState(false); // Mobile drawer state

  return (
    <>
      <SignedIn>
        <DashboardProvider>
          <div className="min-h-screen bg-gray-50 flex">
            <Sidebar 
              isOpen={sidebarOpen} 
              isMobileOpen={mobileOpen} 
              onCloseMobile={() => setMobileOpen(false)} 
            />
 
            <div 
              className={`
                flex-1 flex flex-col transition-all duration-300 ease-in-out
                ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}
              `}
            >
              <AppHeader 
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
                onToggleMobile={() => setMobileOpen(!mobileOpen)}
              />
 
              <main className="flex-1 p-4 md:p-8 overflow-x-hidden">
                <div className="max-w-7xl mx-auto">
                  {children}
                </div>
              </main>
            </div>
          </div>
        </DashboardProvider>
      </SignedIn>
      <SignedOut>
        <RedirectToSignIn />
      </SignedOut>
    </>
  );
}
