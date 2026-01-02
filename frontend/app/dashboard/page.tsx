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
  Database
} from 'lucide-react';
import { useDashboard } from '@/context/DashboardContext';
import { 
  LineChart, 
  Line, 
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

// Mock data for the chart since backend provides mostly text summaries currently
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
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-4">
        <div className="relative">
            <div className="absolute inset-0 bg-blue-100 rounded-full animate-ping opacity-75"></div>
            <Loader2 className="relative w-12 h-12 animate-spin text-blue-600" />
        </div>
        <p className="text-gray-500 font-medium animate-pulse">Loading your executive snapshot...</p>
      </div>
    );
  }

  // Empty State
  if (!documents || documents.length === 0) {
    return (
        <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-2xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-700">
            <div className="w-24 h-24 bg-blue-50 rounded-full flex items-center justify-center mb-8 shadow-lg shadow-blue-100 ring-8 ring-blue-50/50">
                <Upload className="w-10 h-10 text-blue-600" />
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">Welcome to Intellexa</h1>
            <p className="text-xl text-gray-500 mb-10 leading-relaxed">
                Your AI-powered decision support system is ready. <br/>
                Upload your first dataset to generate strategic insights, identify risks, and uncover opportunities.
            </p>
            
            <Link href="/dashboard/upload">
                <Button size="lg" className="bg-blue-600 hover:bg-blue-700 text-lg px-8 py-6 shadow-xl shadow-blue-500/30">
                    <span className="flex items-center gap-3">
                        Start Analysis
                        <ArrowRight className="w-5 h-5" />
                    </span>
                </Button>
            </Link>

            <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6 w-full text-left">
                <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-indigo-50 flex items-center justify-center mb-3">
                        <Lightbulb className="w-5 h-5 text-indigo-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Smart Insights</h3>
                    <p className="text-sm text-gray-500 mt-1">Automated analysis of your data patterns.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-amber-50 flex items-center justify-center mb-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Risk Detection</h3>
                    <p className="text-sm text-gray-500 mt-1">Early warning system for potential issues.</p>
                </div>
                <div className="p-4 rounded-xl bg-white border border-gray-100 shadow-sm">
                    <div className="w-10 h-10 rounded-lg bg-emerald-50 flex items-center justify-center mb-3">
                        <Target className="w-5 h-5 text-emerald-600" />
                    </div>
                    <h3 className="font-semibold text-gray-900">Action Plans</h3>
                    <p className="text-sm text-gray-500 mt-1">Data-driven recommendations for growth.</p>
                </div>
            </div>
        </div>
    );
  }

  const datasetCount = documents.length;
  // Type assertion since we know the structure but TypeScript might not
  const groupSummary = processedData?.group_summary as { 
    group_insights?: string[], 
    cross_dataset_risks?: string[], 
    recommended_focus_areas?: string[] 
  } | undefined;
  
  const insights = groupSummary?.group_insights || [];
  const risks = groupSummary?.cross_dataset_risks || [];
  const focusAreas = groupSummary?.recommended_focus_areas || [];

  // Get chart data from the latest dataset
  const latestDataset = processedData?.datasets?.[0];
  const realChartData = transformMetricsToChartData(latestDataset?.metrics);
  const isUsingRealData = realChartData.length > 0;
  const chartData = isUsingRealData ? realChartData : mockChartData;

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
            <h1 className="text-3xl font-bold text-gray-900 tracking-tight">Executive Snapshot</h1>
            <p className="text-gray-500 mt-1">High-level intelligence on business health and strategic direction.</p>
        </div>
        <div className="flex gap-3">
            <Link href="/dashboard/ai-assistant">
                <Button className="bg-blue-600 hover:bg-blue-700 shadow-lg shadow-blue-500/25">
                    <FileText size={16} className="mr-2" />
                    Ask AI Assistant
                </Button>
            </Link>
        </div>
      </div>

      {/* A. Executive Summary Card */}
      <Card className="p-6 bg-gradient-to-br from-indigo-900 to-blue-900 text-white border-none shadow-xl relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-white/10 rounded-full -mr-16 -mt-16 blur-3xl"></div>
        <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
                <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                    <SparklesIcon className="w-5 h-5 text-yellow-300" />
                </div>
                <h2 className="text-lg font-semibold text-blue-100">AI Executive Summary</h2>
            </div>
            <div className="space-y-2">
                {insights.slice(0, 2).map((insight, i) => (
                    <p key={i} className="text-lg md:text-xl font-medium leading-relaxed text-white/90">
                        {insight}
                    </p>
                ))}
                {insights.length === 0 && (
                    <p className="text-lg text-blue-200">
                        Upload more data to generate a comprehensive executive summary.
                    </p>
                )}
            </div>
        </div>
      </Card>

      {/* B. Key Metrics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <StatsCard 
            title="Total Datasets" 
            value={datasetCount.toString()} 
            icon={<Database size={20} />} 
            trend="+12%" 
            trendUp={true} 
            description="vs last month"
        />
        <StatsCard 
            title="AI Confidence" 
            value="92%" 
            icon={<ShieldCheck size={20} />} 
            trend="+5%" 
            trendUp={true}
            description="Model reliability" 
        />
        <StatsCard 
            title="Risks Identified" 
            value={risks.length.toString()} 
            icon={<AlertTriangle size={20} />} 
            trend={risks.length > 0 ? "High Priority" : "Low"} 
            trendUp={risks.length === 0}
            description="Requires attention" 
        />
        <StatsCard 
            title="Opportunities" 
            value={focusAreas.length.toString()} 
            icon={<Lightbulb size={20} />} 
            trend="Actionable" 
            trendUp={true}
            description="Growth signals" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* C. Risk & Opportunity Signals */}
        <Card className="lg:col-span-1 p-6 flex flex-col">
            <h3 className="font-bold text-gray-900 mb-6 flex items-center gap-2">
                <Activity className="text-blue-600" size={20} />
                Strategic Signals
            </h3>
            <div className="space-y-4 flex-1">
                {risks.slice(0, 3).map((risk, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-red-50 border border-red-100">
                        <div className="bg-red-100 p-1.5 rounded-md mt-0.5">
                            <AlertTriangle size={14} className="text-red-600" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Risk</span>
                            <p className="text-sm text-gray-700 mt-1">{risk}</p>
                        </div>
                    </div>
                ))}
                {focusAreas.slice(0, 2).map((area, i) => (
                    <div key={i} className="flex items-start gap-3 p-3 rounded-lg bg-emerald-50 border border-emerald-100">
                        <div className="bg-emerald-100 p-1.5 rounded-md mt-0.5">
                            <TrendingUp size={14} className="text-emerald-600" />
                        </div>
                        <div>
                            <span className="text-xs font-bold text-emerald-600 uppercase tracking-wide">Opportunity</span>
                            <p className="text-sm text-gray-700 mt-1">{area}</p>
                        </div>
                    </div>
                ))}
            </div>
            <div className="mt-6 pt-4 border-t border-gray-100">
                <Link href="/dashboard/predictions">
                    <Button variant="outline" className="w-full text-blue-600 border-blue-200 hover:bg-blue-50">
                        View All Predictions
                    </Button>
                </Link>
            </div>
        </Card>

        {/* C. Data Charts (Trend Analysis) */}
        <Card className="lg:col-span-2 p-6 flex flex-col">
            <div className="flex items-center justify-between mb-6">
                <h3 className="font-bold text-gray-900 flex items-center gap-2">
                    <TrendingUp className="text-blue-600" size={20} />
                    Performance Trends {isUsingRealData ? '' : '(Sample Data)'}
                </h3>
                <select className="text-sm border-gray-200 rounded-lg text-gray-500 focus:ring-blue-500 focus:border-blue-500">
                    <option>Revenue</option>
                    <option>Users</option>
                    <option>Engagement</option>
                </select>
            </div>
            
            <div className="h-64 w-full">
                <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={chartData}>
                        <defs>
                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                                <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <YAxis axisLine={false} tickLine={false} tick={{fill: '#94a3b8', fontSize: 12}} />
                        <Tooltip 
                            contentStyle={{borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'}} 
                            itemStyle={{color: '#1e293b'}}
                        />
                        <Area type="monotone" dataKey="value" stroke="#3b82f6" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                    </AreaChart>
                </ResponsiveContainer>
            </div>
            
            <div className="mt-4 flex items-center justify-between text-sm text-gray-500 bg-gray-50 p-3 rounded-lg">
                <span>Total Growth: <span className="text-emerald-600 font-bold">+12.4%</span></span>
                <span>Projected: <span className="text-blue-600 font-bold">$42.5k</span></span>
            </div>
        </Card>
      </div>

      {/* D. "What Should I Do?" CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 bg-indigo-50 rounded-2xl p-8 border border-indigo-100">
        <div className="flex flex-col justify-center">
            <h3 className="text-xl font-bold text-indigo-900 mb-2">Ready to dig deeper?</h3>
            <p className="text-indigo-700 mb-6">Explore the full analysis workspace or chat with your data to get specific answers.</p>
            <div className="flex gap-4">
                <Link href="/dashboard/insights">
                    <Button className="bg-indigo-600 hover:bg-indigo-700 text-white">
                        View Insights Workspace
                    </Button>
                </Link>
                <Link href="/dashboard/ai-assistant">
                    <Button variant="ghost" className="text-indigo-700 hover:bg-indigo-100">
                        Ask AI Assistant
                    </Button>
                </Link>
            </div>
        </div>
        <div className="hidden md:flex items-center justify-center opacity-80">
            <Target size={120} className="text-indigo-200" />
        </div>
      </div>
    </div>
  );
}

function SparklesIcon({ className }: { className?: string }) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className={className}>
            <path fillRule="evenodd" d="M9 4.5a.75.75 0 01.721.544l.813 2.846a3.75 3.75 0 002.576 2.576l2.846.813a.75.75 0 010 1.442l-2.846.813a3.75 3.75 0 00-2.576 2.576l-.813 2.846a.75.75 0 01-1.442 0l-.813-2.846a3.75 3.75 0 00-2.576-2.576l-2.846-.813a.75.75 0 010-1.442l2.846-.813a3.75 3.75 0 002.576-2.576l.813-2.846A.75.75 0 019 4.5zM9 15a.75.75 0 01.75.75v1.5h1.5a.75.75 0 010 1.5h-1.5v1.5a.75.75 0 01-1.5 0v-1.5h-1.5a.75.75 0 010-1.5h1.5v-1.5A.75.75 0 019 15z" clipRule="evenodd" />
        </svg>
    );
}
