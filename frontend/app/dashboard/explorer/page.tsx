'use client';

import React, { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { 
  Search, 
  Filter, 
  ArrowUpDown, 
  Database, 
  FileText, 
  BrainCircuit,
  Download,
  Loader2,
  ChevronRight,
  TrendingUp,
  AlertTriangle,
  Info
} from 'lucide-react';

export default function DataExplorerPage() {
  const { processedData, isLoading } = useDashboard();
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState(0);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortConfig, setSortConfig] = useState<{ key: string; direction: 'asc' | 'desc' } | null>(null);

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-background p-4 rounded-2xl shadow-xl">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        </div>
        <p className="text-xl font-bold tracking-tight">Accessing Neural Data Registry...</p>
      </div>
    );
  }

  const datasets = processedData?.datasets || [];
  
  if (datasets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 rotate-3">
          <Database className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4 tracking-tight">Registry Empty</h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            No datasets found in your neural workspace. Upload data to begin exploration.
        </p>
        <Button onClick={() => window.location.href = '/dashboard/upload'} size="lg" className="h-14 px-8 font-bold rounded-xl shadow-xl shadow-primary/20">
          Upload Data
        </Button>
      </div>
    );
  }

  const currentDataset = datasets[selectedDatasetIndex];
  
  // Transform metrics into a flat array for the table
  let tableData = (currentDataset.metrics || []).map((m: any) => ({
    metric: m.metric,
    value: m.data?.values?.[0] || 'N/A',
    status: m.status || 'N/A',
    importance: m.importance || 0,
    type: m.type || 'N/A'
  }));

  // Filtering
  if (searchQuery) {
    tableData = tableData.filter(item => 
      item.metric.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.status.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }

  // Sorting
  if (sortConfig) {
    tableData.sort((a: any, b: any) => {
      if (a[sortConfig.key] < b[sortConfig.key]) return sortConfig.direction === 'asc' ? -1 : 1;
      if (a[sortConfig.key] > b[sortConfig.key]) return sortConfig.direction === 'asc' ? 1 : -1;
      return 0;
    });
  }

  const requestSort = (key: string) => {
    let direction: 'asc' | 'desc' = 'asc';
    if (sortConfig && sortConfig.key === key && sortConfig.direction === 'asc') {
      direction = 'desc';
    }
    setSortConfig({ key, direction });
  };

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-12">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <Database size={16} />
                Neural Data Explorer
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">Data Registry</h1>
            <p className="text-lg text-muted-foreground">High-performance exploration of processed neural metrics.</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center justify-between">
        <div className="flex items-center gap-4 overflow-x-auto pb-2 w-full md:w-auto">
            {datasets.map((ds, idx) => (
                <button
                    key={idx}
                    onClick={() => setSelectedDatasetIndex(idx)}
                    className={`px-5 py-2.5 rounded-xl whitespace-nowrap text-xs font-bold transition-all border ${
                        selectedDatasetIndex === idx 
                            ? 'bg-primary text-primary-foreground border-primary shadow-lg shadow-primary/20' 
                            : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground'
                    }`}
                >
                    {ds.nickname || ds.file_name}
                </button>
            ))}
        </div>
        
        <div className="relative w-full md:w-80 group">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground group-focus-within:text-primary transition-colors" size={18} />
            <Input 
                placeholder="Search metrics..." 
                className="pl-12 h-12 rounded-xl bg-card border-border/50 focus:ring-4 focus:ring-primary/5 focus:border-primary transition-all"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
            />
        </div>
      </div>

      {/* Table */}
      <Card className="border-none shadow-2xl bg-card overflow-hidden rounded-[2rem]">
        <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse">
                <thead>
                    <tr className="bg-muted/30 border-b border-border/50">
                        <th 
                            className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                            onClick={() => requestSort('metric')}
                        >
                            <div className="flex items-center gap-2">
                                Metric <ArrowUpDown size={12} />
                            </div>
                        </th>
                        <th 
                            className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                            onClick={() => requestSort('value')}
                        >
                            <div className="flex items-center gap-2">
                                Value <ArrowUpDown size={12} />
                            </div>
                        </th>
                        <th 
                            className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                            onClick={() => requestSort('status')}
                        >
                            <div className="flex items-center gap-2">
                                Status <ArrowUpDown size={12} />
                            </div>
                        </th>
                        <th 
                            className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground cursor-pointer hover:text-primary transition-colors"
                            onClick={() => requestSort('importance')}
                        >
                            <div className="flex items-center gap-2">
                                Importance <ArrowUpDown size={12} />
                            </div>
                        </th>
                        <th className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-muted-foreground">Type</th>
                    </tr>
                </thead>
                <tbody className="divide-y divide-border/30">
                    {tableData.map((item, i) => (
                        <tr key={i} className="hover:bg-muted/20 transition-colors group">
                            <td className="px-8 py-5 text-sm font-bold text-foreground">
                                <div className="flex items-center gap-3">
                                    <div className="w-8 h-8 rounded-lg bg-primary/5 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
                                        <TrendingUp size={14} />
                                    </div>
                                    {item.metric}
                                </div>
                            </td>
                            <td className="px-8 py-5 text-sm font-black text-primary">
                                {typeof item.value === 'number' ? item.value.toLocaleString() : item.value}
                            </td>
                            <td className="px-8 py-5">
                                <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider ${
                                    item.status === 'optimal' ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' :
                                    item.status === 'warning' ? 'bg-amber-500/10 text-amber-600 border border-amber-500/20' :
                                    'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                                }`}>
                                    {item.status}
                                </span>
                            </td>
                            <td className="px-8 py-5">
                                <div className="flex items-center gap-2">
                                    <div className="flex-1 h-1.5 w-24 bg-muted rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-primary rounded-full transition-all duration-1000" 
                                            style={{ width: `${(item.importance / 5) * 100}%` }}
                                        />
                                    </div>
                                    <span className="text-[10px] font-bold text-muted-foreground">{item.importance}/5</span>
                                </div>
                            </td>
                            <td className="px-8 py-5 text-[10px] font-black uppercase tracking-widest text-muted-foreground/60">
                                {item.type}
                            </td>
                        </tr>
                    ))}
                    {tableData.length === 0 && (
                        <tr>
                            <td colSpan={5} className="px-8 py-20 text-center">
                                <div className="flex flex-col items-center gap-3 opacity-40">
                                    <Search size={40} className="text-muted-foreground" />
                                    <p className="text-sm font-bold uppercase tracking-[0.2em]">No matching metrics found</p>
                                </div>
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
      </Card>
    </div>
  );
}
