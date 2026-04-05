'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { 
  Rocket, 
  UploadCloud, 
  BarChart2, 
  Bot, 
  TrendingUp, 
  ShieldCheck,
  ArrowRight,
  PlayCircle,
  Zap,
  Sparkles,
  BrainCircuit,
  Target,
  Activity,
  CloudLightning,
  Database
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';

export default function WelcomePage() {
  const { user } = useUser();

  return (
    <div className="space-y-12 max-w-[1400px] mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000 pb-12">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-primary via-primary to-indigo-900 rounded-[2.5rem] p-10 md:p-16 text-white shadow-2xl relative overflow-hidden group">
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-white/10 rounded-full blur-[120px] -mr-48 -mt-48 group-hover:scale-110 transition-transform duration-1000" />
        <div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-indigo-400/20 rounded-full blur-[100px] -ml-24 -mb-24" />
        
        <div className="relative z-10 max-w-3xl">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                <CloudLightning className="w-6 h-6 text-yellow-300 fill-yellow-300" />
            </div>
            <span className="text-xs font-black uppercase tracking-[0.3em] text-white/80">Neural Command Center v2.0</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6 tracking-tighter leading-tight">
            Welcome to the Future <br/>of Strategy, <span className="text-yellow-300 italic">{user?.firstName || 'User'}</span>
          </h1>
          <p className="text-blue-50 text-lg md:text-xl mb-10 leading-relaxed font-medium opacity-90 max-w-2xl">
            Intellexa has synchronized with your identity. You are now equipped with advanced neural reasoning to transform raw data into market-leading decisions.
          </p>
          
          <div className="flex flex-wrap gap-5">
            <Link href="/dashboard/upload">
              <Button className="bg-white text-primary hover:bg-blue-50 h-16 px-10 text-lg shadow-2xl shadow-primary/20 font-black rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                <UploadCloud className="mr-3 w-6 h-6" /> Deploy Data
              </Button>
            </Link>
            <Link href="/dashboard/ai-assistant">
              <Button variant="outline" className="bg-white/5 text-white border-white/20 hover:bg-white/10 h-16 px-10 text-lg backdrop-blur-md font-black rounded-2xl transition-all hover:scale-105 active:scale-95 uppercase tracking-widest">
                <Bot className="mr-3 w-6 h-6" /> Neural Link
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Strategic Onboarding */}
      <div className="space-y-8">
        <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                <PlayCircle className="text-primary" size={24} />
            </div>
            <h2 className="text-2xl font-black text-foreground tracking-tight uppercase text-xs tracking-widest">Operational Sequence</h2>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {[
            { 
                step: '01', 
                title: 'Data Ingestion', 
                desc: 'Upload CSV or Excel architectures. Our engine supports sales, customer, and financial registries.', 
                href: '/dashboard/upload', 
                linkText: 'Initialize Sync', 
                icon: Database,
                color: 'primary' 
            },
            { 
                step: '02', 
                title: 'Neural Analysis', 
                desc: 'Observe as AI detects cross-dataset correlations, hidden risks, and untapped growth vectors.', 
                href: '/dashboard', 
                linkText: 'View Signals', 
                icon: Activity,
                color: 'indigo-500' 
            },
            { 
                step: '03', 
                title: 'Strategic Query', 
                desc: 'Engage the Neural Assistant to simulate scenarios or extract deep granular performance metrics.', 
                href: '/dashboard/ai-assistant', 
                linkText: 'Start Session', 
                icon: BrainCircuit,
                color: 'emerald-500' 
            }
          ].map((item, i) => (
            <Card key={i} className="p-10 border-none shadow-2xl bg-card card-hover group relative overflow-hidden rounded-[2rem]">
              <div className="absolute top-0 right-0 p-6 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity">
                  <item.icon size={120} />
              </div>
              <div className={`text-sm font-black text-${item.color} mb-6 tracking-widest`}>{item.step}</div>
              <h3 className="font-black text-xl text-foreground mb-4 tracking-tight">{item.title}</h3>
              <p className="text-sm text-muted-foreground mb-8 leading-relaxed font-medium">
                {item.desc}
              </p>
              <Link href={item.href} className={`text-sm font-black text-primary hover:opacity-80 flex items-center gap-2 transition-all uppercase tracking-widest`}>
                {item.linkText} <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform" />
              </Link>
            </Card>
          ))}
        </div>
      </div>

      {/* Intelligence Capabilities */}
      <div className="pt-12 border-t border-border">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div className="space-y-6">
                <h3 className="text-3xl font-black text-foreground tracking-tight">System Capabilities</h3>
                <p className="text-muted-foreground text-lg leading-relaxed font-medium">
                    Intellexa is more than a dashboard. It's a high-performance reasoning engine designed for the next generation of business leaders.
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
                    {[
                        { icon: Zap, text: 'Real-time Scenario Simulation' },
                        { icon: ShieldCheck, text: 'Automated Risk Mitigation' },
                        { icon: Target, text: '30-Day Growth Protocols' },
                        { icon: Sparkles, text: 'Neural Trend Detection' }
                    ].map((feat, i) => (
                        <div key={i} className="flex items-center gap-3 p-4 rounded-2xl bg-muted/50 border border-border/50">
                            <feat.icon className="text-primary" size={18} />
                            <span className="text-xs font-bold text-foreground uppercase tracking-widest">{feat.text}</span>
                        </div>
                    ))}
                </div>
            </div>
            
            <Card className="p-10 border-none shadow-2xl bg-gradient-to-br from-slate-900 to-primary text-white rounded-[2.5rem] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16" />
                <h4 className="text-xl font-black mb-6 tracking-tight">Intelligence Briefing</h4>
                <div className="space-y-6">
                    <p className="text-sm text-blue-100 leading-relaxed font-medium opacity-80 italic">
                        "The neural engine has been optimized for high-dimensional data correlation. Your current subscription enables full executive reasoning capabilities across all synced registries."
                    </p>
                    <div className="pt-6 flex items-center gap-4 border-t border-white/10">
                        <div className="w-12 h-12 rounded-2xl bg-white/10 flex items-center justify-center">
                            <Rocket className="text-yellow-300" size={24} />
                        </div>
                        <div>
                            <p className="text-xs font-black uppercase tracking-widest text-white">System Status</p>
                            <p className="text-sm font-bold text-emerald-400 uppercase tracking-widest">Nominal / High Performance</p>
                        </div>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
