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
          <div className="min-h-screen bg-background flex text-foreground">
            <Sidebar 
              isOpen={sidebarOpen} 
              isMobileOpen={mobileOpen} 
              onCloseMobile={() => setMobileOpen(false)} 
            />
 
            <div 
              className={`
                flex-1 flex flex-col transition-all duration-500 ease-[cubic-bezier(0.4,0,0.2,1)]
                ${sidebarOpen ? 'md:ml-64' : 'md:ml-20'}
              `}
            >
              <AppHeader 
                onToggleSidebar={() => setSidebarOpen(!sidebarOpen)} 
                onToggleMobile={() => setMobileOpen(!mobileOpen)}
              />
 
              <main className="flex-1 p-6 md:p-10 overflow-x-hidden relative">
                <div className="max-w-[1600px] mx-auto relative z-10">
                  {children}
                </div>
                
                {/* Subtle background decoration */}
                <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none -z-0">
                    <div className="absolute top-[-10%] right-[-5%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-[120px]" />
                    <div className="absolute bottom-[-5%] left-[-5%] w-[30%] h-[30%] bg-indigo-500/5 rounded-full blur-[100px]" />
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
