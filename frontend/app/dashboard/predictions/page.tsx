'use client';

import React from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  TrendingUp, 
  Target, 
  Zap, 
  Loader2, 
  BarChart2, 
  Calendar,
  AlertCircle,
  Sparkles,
  ArrowUpRight,
  BrainCircuit,
  ShieldCheck,
  ChevronRight,
  ArrowRight
} from 'lucide-react';
import { 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  AreaChart, 
  Area 
} from 'recharts';

export default function PredictionsPage() {
  const { processedData, isLoading } = useDashboard();

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-background p-4 rounded-2xl shadow-xl">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        </div>
        <p className="text-xl font-bold tracking-tight">Generating Predictive Models...</p>
      </div>
    );
  }

  const datasets = processedData?.datasets || [];
  
  if (datasets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 rotate-3">
          <TrendingUp className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4 tracking-tight">No Predictive Data</h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Our forecasting engine requires historical data. Upload your first dataset to enable AI-powered trajectory modeling.
        </p>
        <Button onClick={() => window.location.href = '/dashboard/upload'} size="lg" className="h-14 px-8 font-bold rounded-xl shadow-xl shadow-primary/20">
          Upload Strategic Data
        </Button>
      </div>
    );
  }

  // Mock prediction data
  const predictionData = [
    { name: 'Month 1', actual: 4000, predicted: 4000 },
    { name: 'Month 2', actual: 3000, predicted: 3100 },
    { name: 'Month 3', actual: 2000, predicted: 2200 },
    { name: 'Month 4', actual: 2780, predicted: 2800 },
    { name: 'Month 5', actual: 1890, predicted: 2100 },
    { name: 'Month 6', actual: 2390, predicted: 2500 },
    { name: 'Forecast 1', predicted: 3000 },
    { name: 'Forecast 2', predicted: 3400 },
    { name: 'Forecast 3', predicted: 3800 },
  ];

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <BrainCircuit size={16} />
                Neural Forecasting Engine Active
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">Predictive Analytics</h1>
            <p className="text-lg text-muted-foreground">AI-driven forecasting and future trend analysis based on historical patterns.</p>
        </div>
        <div className="flex gap-3">
            <Button className="h-12 px-6 font-bold rounded-xl shadow-xl shadow-primary/20 group">
                <Sparkles size={18} className="mr-2 group-hover:rotate-12 transition-transform" />
                Run New Forecast
            </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        {/* Forecast Chart */}
        <Card className="xl:col-span-8 p-6 border border-border/40 shadow-xl bg-card/40 backdrop-blur-md group relative overflow-hidden rounded-3xl">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
            
            <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="font-bold text-foreground flex items-center gap-2.5">
                    <div className="w-9 h-9 rounded-lg bg-primary/10 flex items-center justify-center">
                        <Target className="text-primary" size={18} />
                    </div>
                    Growth Trajectory Forecast
                </h3>
                <div className="flex items-center gap-6 relative z-10">
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-primary rounded-full shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">Historical</span>
                    </div>
                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 bg-indigo-400 rounded-full border-2 border-indigo-400 border-dashed" />
                        <span className="text-[9px] font-bold text-muted-foreground uppercase tracking-widest">AI Predicted</span>
                    </div>
                </div>
            </div>
            
            <div className="h-[450px] w-full relative z-10">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={predictionData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
                        <defs>
                            <linearGradient id="colorActual" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="var(--primary)" stopOpacity={0}/>
                            </linearGradient>
                            <linearGradient id="colorPredicted" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#818cf8" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#818cf8" stopOpacity={0}/>
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
                                borderRadius: '16px', 
                                border: '1px solid var(--border)', 
                                boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                                backgroundColor: 'var(--card)',
                                padding: '12px'
                            }}
                            itemStyle={{ fontWeight: 'bold' }}
                        />
                        <Area 
                            type="monotone" 
                            dataKey="actual" 
                            stroke="var(--primary)" 
                            strokeWidth={4}
                            fillOpacity={1} 
                            fill="url(#colorActual)" 
                        />
                        <Area 
                            type="monotone" 
                            dataKey="predicted" 
                            stroke="#818cf8" 
                            strokeWidth={4}
                            strokeDasharray="8 8"
                            fillOpacity={1} 
                            fill="url(#colorPredicted)" 
                        />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
        </Card>

        {/* Prediction Insights */}
        <div className="xl:col-span-4 space-y-8">
            <Card className="p-8 bg-gradient-to-br from-slate-900 to-primary text-white border-none shadow-2xl relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
                <h3 className="font-black text-xs uppercase tracking-[0.2em] mb-8 opacity-80 flex items-center gap-2">
                    <Zap className="text-yellow-400 fill-yellow-400" size={16} />
                    Neural Summary
                </h3>
                <div className="space-y-6">
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <p className="text-[10px] font-black opacity-60 mb-2 uppercase tracking-widest">Projected Growth</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black">+14.2%</span>
                            <ArrowUpRight className="text-emerald-400 mb-1" size={24} />
                        </div>
                        <p className="text-xs text-blue-100 mt-2 font-medium italic">Next 90 days optimized estimate</p>
                    </div>
                    <div className="bg-white/10 p-6 rounded-2xl border border-white/10 backdrop-blur-md">
                        <p className="text-[10px] font-black opacity-60 mb-2 uppercase tracking-widest">Model Confidence</p>
                        <div className="flex items-end gap-2">
                            <span className="text-4xl font-black">88%</span>
                            <ShieldCheck className="text-blue-300 mb-1" size={24} />
                        </div>
                        <p className="text-xs text-blue-100 mt-2 font-medium italic">Based on historical variance analysis</p>
                    </div>
                </div>
            </Card>

            <Card className="p-8 border-none shadow-xl bg-card">
                <h3 className="font-black text-foreground mb-8 flex items-center gap-3 uppercase text-xs tracking-widest">
                    <AlertCircle className="text-amber-500" size={18} />
                    Forecast Signals
                </h3>
                <div className="space-y-4">
                    <div className="flex gap-4 p-4 rounded-2xl bg-amber-500/5 border border-amber-500/10 group hover:bg-amber-500/10 transition-colors">
                        <div className="mt-1 bg-amber-500/10 p-1.5 rounded-lg h-fit shrink-0">
                            <AlertCircle size={14} className="text-amber-600" />
                        </div>
                        <p className="text-xs text-foreground leading-relaxed font-bold">Variance in month 3-5 may slightly affect prediction ceiling.</p>
                    </div>
                    <div className="flex gap-4 p-4 rounded-2xl bg-primary/5 border border-primary/10 group hover:bg-primary/10 transition-colors">
                        <div className="mt-1 bg-primary/10 p-1.5 rounded-lg h-fit shrink-0">
                            <Calendar size={14} className="text-primary" />
                        </div>
                        <p className="text-xs text-foreground leading-relaxed font-bold">Seasonal trends from last fiscal year are being normalized.</p>
                    </div>
                </div>
            </Card>
        </div>
      </div>

      {/* Recommended Scenarios */}
      <div className="space-y-8">
        <h2 className="text-2xl font-black text-foreground tracking-tight">Strategic Scenarios</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
                { title: 'Conservative', growth: '+5%', desc: 'Minimal risk approach focusing on core retention and operational efficiency.' },
                { title: 'Balanced', growth: '+12%', desc: 'Optimal mix of efficiency gains and targeted new market growth.' },
                { title: 'Aggressive', growth: '+25%', desc: 'High-reward strategy with increased marketing spend and rapid expansion.' }
            ].map((scenario, i) => (
                <Card key={i} className="p-6 border border-border/40 shadow-xl bg-card/40 backdrop-blur-md group hover:bg-card/60 transition-all rounded-2xl">
                    <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:rotate-6 transition-transform duration-500">
                        <TrendingUp size={24} />
                    </div>
                    <h3 className="font-bold text-lg text-foreground mb-1 tracking-tight">{scenario.title}</h3>
                    <p className="text-2xl font-black text-primary mb-3 tracking-tighter">{scenario.growth}</p>
                    <p className="text-xs text-muted-foreground leading-relaxed mb-6 font-medium">{scenario.desc}</p>
                    <Button 
                        variant="outline" 
                        className="w-full h-11 rounded-xl border-border/50 text-xs font-bold hover:bg-primary/5 hover:text-primary transition-all group"
                        onClick={() => alert(`Strategic Scenario '${scenario.title}' has been selected for simulation. Neural modeling in progress...`)}
                    >
                        Deploy Strategy
                        <ArrowRight className="ml-2 w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                    </Button>
                </Card>
            ))}
        </div>
      </div>
    </div>
  );
}
