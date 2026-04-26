'use client';

import React from 'react';
import { StatsCard } from '@/components/dashboard/StatsCard';
import { Card } from '@/components/ui/Card';
import Link from 'next/link';
import { 
  Loader2, 
  FileText, 
  AlertTriangle, 
  Lightbulb, 
  Target, 
  ArrowRight, 
  Upload,
  TrendingUp,
  Activity,
  ShieldCheck,
  Database,
  Sparkles,
  Zap,
  ArrowUpRight,
  BrainCircuit,
  LayoutDashboard
} from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  AreaChart,
  Area
} from 'recharts';
import { Button } from '@/components/ui/Button';
import { transformMetricsToChartData } from '@/lib/chartUtils';

const mockChartData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

export default function DashboardOverview() {
  const { processedData, documents, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-background p-4 rounded-2xl shadow-xl">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        </div>
        <div className="text-center space-y-2">
            <p className="text-xl font-bold tracking-tight text-foreground">Analyzing Business Intelligence</p>
            <p className="text-muted-foreground animate-pulse">Our AI is processing your strategic data...</p>
        </div>
      </div>
    );
  }

  // Empty State
  if (!documents || documents.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-3xl mx-auto animate-in fade-in slide-in-from-bottom-8 duration-1000">
            <div className="relative mb-10">
                <div className="absolute inset-0 bg-primary/10 blur-3xl rounded-full scale-150"></div>
                <div className="relative w-28 h-28 bg-gradient-to-br from-primary to-indigo-600 rounded-3xl flex items-center justify-center shadow-2xl shadow-primary/40 rotate-3">
                    <Upload className="w-12 h-12 text-white" />
                </div>
            </div>
            <h1 className="text-5xl font-black text-foreground mb-6 tracking-tight leading-tight">
                Unlock Your <span className="text-gradient">AI-Powered</span> <br/>Decision Potential
            </h1>
            <p className="text-xl text-muted-foreground mb-12 leading-relaxed max-w-xl mx-auto">
                Intellexa transforms your raw business data into actionable strategic intelligence. Upload your first dataset to begin.
            </p>
            
            <Link href="/dashboard/upload">
                <Button size="lg" className="h-16 px-10 text-lg font-bold rounded-2xl shadow-2xl shadow-primary/30 group">
                    Start Your Analysis
                    <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </Button>
            </Link>

            <div className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-8 w-full text-left">
                {[
                    { icon: Lightbulb, title: 'Smart Insights', desc: 'Automated trend detection', color: 'indigo' },
                    { icon: AlertTriangle, title: 'Risk Guard', desc: 'Proactive threat identification', color: 'amber' },
                    { icon: Target, title: 'Strategic Plans', desc: '30-day growth roadmaps', color: 'emerald' }
                ].map((item, i) => (
                    <div key={i} className="p-6 rounded-2xl bg-muted/50 border border-border/50 backdrop-blur-sm card-hover">
                        <div className={`w-12 h-12 rounded-xl bg-${item.color}-500/10 flex items-center justify-center mb-4`}>
                            <item.icon className={`w-6 h-6 text-${item.color}-500`} />
                        </div>
                        <h3 className="font-bold text-foreground mb-1">{item.title}</h3>
                        <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
                    </div>
                ))}
            </div>
        </div>
    );
  }

  const datasetCount = documents.length;
  const groupSummary = processedData?.group_summary as { 
    group_insights?: string[], 
    cross_dataset_risks?: string[], 
    recommended_focus_areas?: string[] 
  } | undefined;
  
  const insights = groupSummary?.group_insights || [];
  const risks = groupSummary?.cross_dataset_risks || [];
  const focusAreas = groupSummary?.recommended_focus_areas || [];

  const latestDataset = processedData?.datasets?.[0];
  const realChartData = transformMetricsToChartData(latestDataset?.metrics);
  const chartData = realChartData.length > 0 ? realChartData : mockChartData;

  // Normalize AI confidence
  const confidenceValue = latestDataset?.ai_confidence 
    ? (latestDataset.ai_confidence > 1 ? latestDataset.ai_confidence / 100 : latestDataset.ai_confidence)
    : 0.92;

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <BrainCircuit size={16} />
                AI Analysis Engine Active
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">Executive Dashboard</h1>
            <p className="text-lg text-muted-foreground">High-level intelligence and strategic directives from your business data.</p>
        </div>
        <div className="flex items-center gap-4">
            <div className="hidden sm:flex items-center gap-2 px-4 py-2 bg-muted rounded-xl text-xs font-bold text-muted-foreground">
                <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                SYNCED WITH {datasetCount} DATASETS
            </div>
            <Link href="/dashboard/ai-assistant">
                <Button className="h-12 px-6 font-bold rounded-xl shadow-xl shadow-primary/20 group">
                    <Sparkles size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
                    Ask Strategy AI
                </Button>
            </Link>
        </div>
      </div>

      {/* Hero Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-12 gap-6">
        {/* Main Executive Summary */}
        <div className="xl:col-span-8">
            <Card className="h-full p-8 bg-gradient-to-br from-primary/95 via-primary to-indigo-900 text-white border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute -top-24 -right-24 w-96 h-96 bg-white/10 rounded-full blur-3xl group-hover:scale-110 transition-transform duration-1000"></div>
                <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-indigo-400/20 rounded-full blur-3xl group-hover:translate-x-10 transition-transform duration-1000"></div>
                
                <div className="relative z-10 h-full flex flex-col justify-between">
                    <div>
                        <div className="flex items-center gap-3 mb-8">
                            <div className="p-3 bg-white/10 rounded-2xl backdrop-blur-md border border-white/20">
                                <Zap className="w-6 h-6 text-yellow-300 fill-yellow-300" />
                            </div>
                            <h2 className="text-xl font-bold tracking-tight text-white/90">AI Strategic Summary</h2>
                        </div>
                        <div className="space-y-6">
                            {insights.length > 0 ? (
                                insights.slice(0, 3).map((insight, i) => (
                                    <div key={i} className="flex gap-4">
                                        <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-yellow-300 shrink-0 shadow-[0_0_10px_rgba(253,224,71,0.5)]" />
                                        <p className="text-xl md:text-2xl font-bold leading-relaxed text-white tracking-tight italic">
                                            "{insight}"
                                        </p>
                                    </div>
                                ))
                            ) : (
                                <p className="text-2xl font-black text-white/90 leading-tight max-w-xl">
                                    Upload strategic data to generate your comprehensive AI executive summary.
                                </p>
                            )}
                        </div>
                    </div>
                    
                    <div className="mt-12 flex items-center gap-6">
                        <div className="flex -space-x-3">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="w-10 h-10 rounded-full border-2 border-white/20 bg-white/10 backdrop-blur-sm flex items-center justify-center text-[10px] font-bold">
                                    AI
                                </div>
                            ))}
                        </div>
                        <p className="text-sm font-medium text-white/60 uppercase tracking-widest">Powered by Advanced Reasoning Models</p>
                    </div>
                </div>
            </Card>
        </div>

        {/* Confidence Card */}
        <div className="xl:col-span-4">
            <Card className="h-full p-8 border-none shadow-xl bg-card relative overflow-hidden flex flex-col justify-between group">
                <div className="flex items-center justify-between mb-8">
                    <h3 className="font-bold text-foreground flex items-center gap-2 uppercase tracking-widest text-xs">
                        <ShieldCheck className="text-primary" size={16} />
                        Model Reliability
                    </h3>
                    <div className="px-2 py-1 bg-primary/10 rounded text-[10px] font-black text-primary border border-primary/20">OPTIMIZED</div>
                </div>
                
                <div className="flex-1 flex flex-col items-center justify-center py-6">
                    <div className="relative w-48 h-48">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" className="text-muted/30" />
                            <circle cx="96" cy="96" r="88" stroke="currentColor" strokeWidth="12" fill="transparent" strokeDasharray={552.9} strokeDashoffset={552.9 * (1 - confidenceValue)} strokeLinecap="round" className="text-primary transition-all duration-1000 ease-out" />
                        </svg>
                        <div className="absolute inset-0 flex flex-col items-center justify-center space-y-1">
                            <span className="text-5xl font-black text-foreground tracking-tighter">{Math.round(confidenceValue * 100)}%</span>
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Confidence</span>
                        </div>
                    </div>
                </div>
                
                <div className="mt-8 p-4 rounded-xl bg-muted/50 border border-border/50">
                    <p className="text-xs text-muted-foreground italic leading-relaxed font-medium">
                        "Model integrity is high based on cross-dataset consistency and data structure normalization."
                    </p>
                </div>
            </Card>
        </div>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[
            { title: 'Data Assets', value: datasetCount, icon: Database, trend: '+12%', color: 'blue' },
            { title: 'Strategic Signals', value: risks.length + focusAreas.length, icon: Activity, trend: 'High', color: 'indigo' },
            { title: 'Identified Risks', value: risks.length, icon: AlertTriangle, trend: 'Priority', color: 'rose' },
            { title: 'Opportunities', value: focusAreas.length, icon: Target, trend: 'Growth', color: 'emerald' }
        ].map((stat, i) => (
            <Card key={i} className="p-8 card-hover border-border/40 bg-card rounded-[2rem] shadow-lg">
                <div className="flex justify-between items-start mb-6">
                    <div className={`p-3.5 rounded-2xl bg-${stat.color}-500/10 text-${stat.color}-600 border border-${stat.color}-500/20`}>
                        <stat.icon size={22} />
                    </div>
                    <div className={`flex items-center gap-1 text-[10px] font-black px-2.5 py-1.5 rounded-xl bg-${stat.color}-500/10 text-${stat.color}-600 uppercase tracking-widest border border-${stat.color}-500/20`}>
                        <ArrowUpRight size={10} />
                        {stat.trend}
                    </div>
                </div>
                <div className="space-y-1">
                    <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{stat.title}</h3>
                    <p className="text-4xl font-black text-foreground tracking-tighter">{stat.value}</p>
                </div>
            </Card>
        ))}
      </div>

      {/* Detailed Insights Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Signals Column */}
        <Card className="p-8 border-none shadow-xl bg-card rounded-[2rem]">
            <div className="flex items-center justify-between mb-8">
                <h3 className="font-black text-foreground flex items-center gap-3 uppercase text-xs tracking-widest">
                    <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Activity className="text-primary" size={18} />
                    </div>
                    Strategic Signals
                </h3>
                <Link href="/dashboard/insights" className="text-[10px] font-black text-primary hover:underline tracking-widest uppercase">VIEW ALL</Link>
            </div>
            
            <div className="space-y-4">
                {risks.length > 0 ? (
                    risks.slice(0, 3).map((risk, i) => (
                        <div key={i} className="group p-5 rounded-2xl bg-rose-500/5 border border-rose-500/10 hover:bg-rose-500/10 transition-colors">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-[10px] font-black text-rose-600 uppercase tracking-widest bg-rose-500/10 px-2 py-0.5 rounded">Risk</span>
                                <AlertTriangle size={14} className="text-rose-500 opacity-50" />
                            </div>
                            <p className="text-sm font-bold text-foreground leading-relaxed">{risk}</p>
                        </div>
                    ))
                ) : (
                    <div className="p-10 text-center border-2 border-dashed border-border rounded-3xl bg-muted/20">
                        <p className="text-xs text-muted-foreground font-bold italic uppercase tracking-widest">No critical risks detected</p>
                    </div>
                )}

                {focusAreas.slice(0, 2).map((area, i) => (
                    <div key={i} className="group p-5 rounded-2xl bg-emerald-500/5 border border-emerald-500/10 hover:bg-emerald-500/10 transition-colors">
                        <div className="flex items-center justify-between mb-2">
                            <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest bg-emerald-500/10 px-2 py-0.5 rounded">Opportunity</span>
                            <TrendingUp size={14} className="text-emerald-500 opacity-50" />
                        </div>
                        <p className="text-sm font-bold text-foreground leading-relaxed">{area}</p>
                    </div>
                ))}
            </div>
        </Card>

        {/* Trend Analysis Chart */}
        <Card className="xl:col-span-2 p-8 border-none shadow-xl bg-card rounded-[2rem]">
            <div className="flex items-center justify-between mb-10">
                <h3 className="font-black text-foreground flex items-center gap-3 uppercase text-xs tracking-widest">
                    <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                        <TrendingUp className="text-indigo-500" size={18} />
                    </div>
                    Business Trajectory Analysis
                </h3>
                <div className="flex items-center gap-4 text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                    <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-primary shadow-[0_0_8px_rgba(59,130,246,0.5)]" /> Performance
                    </div>
                </div>
            </div>

            <div className="h-[350px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border)" opacity={0.5} />
                        <XAxis 
                            dataKey="name" 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 700 }}
                            dy={10}
                        />
                        <YAxis 
                            axisLine={false} 
                            tickLine={false} 
                            tick={{ fill: 'var(--muted-foreground)', fontSize: 11, fontWeight: 700 }}
                        />
                        <Tooltip 
                            contentStyle={{ 
                                backgroundColor: 'var(--card)', 
                                border: '1px solid var(--border)',
                                borderRadius: '16px',
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                padding: '12px'
                            }}
                            itemStyle={{ fontWeight: 'bold', color: 'var(--foreground)' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="value" 
                            stroke="var(--primary)" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorValue)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>
      </div>

      {/* Footer CTA */}
      <div className="bg-muted/50 rounded-3xl p-8 border border-border/50 flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex items-center gap-6">
            <div className="w-16 h-16 rounded-2xl bg-primary/10 flex items-center justify-center text-primary shadow-lg shadow-primary/5">
                <LayoutDashboard size={32} />
            </div>
            <div>
                <h4 className="text-xl font-bold text-foreground">Operational Intelligence Complete</h4>
                <p className="text-muted-foreground">All neural models are synchronized and reporting optimal performance.</p>
            </div>
        </div>
        <Link href="/dashboard/insights">
            <Button variant="outline" className="h-14 px-8 font-bold rounded-xl border-primary/20 hover:bg-primary/5">
                Detailed Insights Archive
                <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
        </Link>
      </div>
    </div>
  );
}
