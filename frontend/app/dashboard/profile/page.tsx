'use client';

import React from 'react';
import { useUser, SignOutButton } from '@clerk/nextjs';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  UserCircle, 
  Mail, 
  ShieldCheck, 
  LogOut, 
  Settings, 
  CreditCard, 
  Bell, 
  ChevronRight,
  Database,
  LayoutDashboard,
  Shield,
  Zap,
  Fingerprint,
  Activity,
  ArrowUpRight,
  CloudLightning
} from 'lucide-react';
import Link from 'next/link';
import { useDashboard } from '@/context/DashboardContext';

export default function ProfilePage() {
  const { user, isLoaded } = useUser();
  const { documents } = useDashboard();

  if (!isLoaded) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-background p-4 rounded-2xl shadow-xl">
                <CloudLightning className="w-12 h-12 animate-pulse text-primary" />
            </div>
        </div>
        <p className="text-xl font-bold tracking-tight">Syncing User Profile...</p>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 rotate-3">
          <UserCircle className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4 tracking-tight">Identity Required</h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Please sign in to access your strategic workspace, manage datasets, and view AI analysis.
        </p>
        <Link href="/auth">
          <Button size="lg" className="h-14 px-10 font-bold rounded-xl shadow-xl shadow-primary/20">Sign In</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <Fingerprint size={16} />
                Identity & Preferences
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">Account Intelligence</h1>
            <p className="text-lg text-muted-foreground">Manage your profile, security protocols, and platform environment.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Left Column: User Info Card */}
        <div className="xl:col-span-4 space-y-8">
          <Card className="p-10 border-none shadow-2xl bg-card text-center relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
            
            <div className="relative inline-block mb-8">
                <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse"></div>
                <div className="relative w-32 h-32 rounded-[2.5rem] bg-muted flex items-center justify-center border-4 border-background shadow-2xl overflow-hidden group-hover:rotate-3 transition-transform duration-500">
                    {user.imageUrl ? (
                        <img src={user.imageUrl} alt={user.fullName || 'User'} className="w-full h-full object-cover" />
                    ) : (
                        <UserCircle className="w-20 h-20 text-primary" />
                    )}
                </div>
                <div className="absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-xl border-4 border-background shadow-lg flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                </div>
            </div>

            <div className="space-y-1 mb-10">
                <h2 className="text-2xl font-black text-foreground tracking-tight">{user.fullName}</h2>
                <div className="flex items-center justify-center gap-2 text-muted-foreground font-bold text-xs uppercase tracking-widest">
                    <Mail size={12} className="text-primary" />
                    {user.primaryEmailAddress?.emailAddress}
                </div>
            </div>
            
            <div className="pt-8 border-t border-border flex flex-col gap-4">
                <SignOutButton>
                    <Button variant="outline" className="w-full h-14 rounded-2xl border-destructive/20 text-destructive font-black uppercase tracking-widest hover:bg-destructive/5 hover:border-destructive/30 transition-all flex items-center justify-center gap-3">
                        <LogOut size={18} />
                        Terminate Session
                    </Button>
                </SignOutButton>
            </div>
          </Card>

          <Card className="p-8 border-none shadow-xl bg-gradient-to-br from-slate-900 to-primary text-white relative overflow-hidden group">
            <div className="absolute -bottom-12 -left-12 w-48 h-48 bg-white/10 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150" />
            <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-8 opacity-80 flex items-center gap-2">
                <Shield size={16} className="text-blue-300" />
                Security Protocol
            </h3>
            <div className="space-y-6">
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Status</span>
                    <span className="font-black text-emerald-400 flex items-center gap-1.5 text-xs">
                        <ShieldCheck size={14} /> ENCRYPTED
                    </span>
                </div>
                <div className="flex items-center justify-between p-4 rounded-2xl bg-white/10 border border-white/10 backdrop-blur-md">
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-60">Tier</span>
                    <span className="font-black text-blue-300 flex items-center gap-1.5 text-xs">
                        <Zap size={14} className="fill-blue-300" /> EXECUTIVE PRO
                    </span>
                </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Settings & Stats */}
        <div className="xl:col-span-8 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="p-8 border-none shadow-xl bg-card card-hover group">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-primary/10 w-14 h-14 rounded-2xl flex items-center justify-center text-primary group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500 shadow-lg shadow-primary/5">
                        <Database size={28} />
                    </div>
                    <div className="px-3 py-1 bg-primary/10 rounded-lg text-[10px] font-black text-primary uppercase tracking-widest">REGISTRY</div>
                </div>
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Synchronized Datasets</h3>
                <div className="flex items-end gap-2">
                    <p className="text-4xl font-black text-foreground tracking-tighter">{documents.length}</p>
                    <ArrowUpRight className="text-primary mb-1.5" size={20} />
                </div>
            </Card>
            <Card className="p-8 border-none shadow-xl bg-card card-hover group">
                <div className="flex justify-between items-start mb-6">
                    <div className="bg-indigo-500/10 w-14 h-14 rounded-2xl flex items-center justify-center text-indigo-500 group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-500 shadow-lg shadow-indigo-500/5">
                        <Activity size={28} />
                    </div>
                    <div className="px-3 py-1 bg-indigo-500/10 rounded-lg text-[10px] font-black text-indigo-500 uppercase tracking-widest">ENGAGEMENT</div>
                </div>
                <h3 className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">Active AI Sessions</h3>
                <div className="flex items-end gap-2">
                    <p className="text-4xl font-black text-foreground tracking-tighter">12</p>
                    <ArrowUpRight className="text-indigo-500 mb-1.5" size={20} />
                </div>
            </Card>
          </div>

          <Card className="p-0 border-none shadow-2xl bg-card overflow-hidden">
            <div className="p-8 border-b border-border bg-muted/30">
                <h3 className="font-black text-foreground uppercase tracking-widest text-sm flex items-center gap-3">
                    <Settings size={18} className="text-primary" />
                    Neural Workspace Settings
                </h3>
            </div>
            <div className="divide-y divide-border">
                {[
                    { title: 'Identity & Biometrics', desc: 'Manage your primary identification and security keys.', icon: <UserCircle size={22} />, color: 'primary' },
                    { title: 'Intelligence Notifications', desc: 'Configure AI signal and risk alert frequencies.', icon: <Bell size={22} />, color: 'indigo-500' },
                    { title: 'Neural Subscription', desc: 'Manage your high-performance computing tier.', icon: <CreditCard size={22} />, color: 'emerald-500' },
                    { title: 'System Environment', desc: 'Customize dashboard themes and neural workspace API hooks.', icon: <Settings size={22} />, color: 'slate-500' }
                ].map((item, i) => (
                    <button key={i} className="w-full p-8 flex items-center justify-between hover:bg-muted/50 transition-all group text-left">
                        <div className="flex items-center gap-6">
                            <div className={`text-${item.color} bg-muted p-4 rounded-2xl group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-sm`}>
                                {item.icon}
                            </div>
                            <div className="space-y-1">
                                <span className="font-black text-foreground text-lg tracking-tight block">{item.title}</span>
                                <p className="text-sm text-muted-foreground font-medium leading-relaxed">{item.desc}</p>
                            </div>
                        </div>
                        <div className="w-10 h-10 rounded-xl bg-muted flex items-center justify-center text-muted-foreground group-hover:bg-primary group-hover:text-white transition-all duration-300">
                            <ChevronRight size={20} className="group-hover:translate-x-0.5 transition-transform" />
                        </div>
                    </button>
                ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
