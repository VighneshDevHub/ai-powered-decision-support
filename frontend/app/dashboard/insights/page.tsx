'use client';

import React, { useState } from 'react';
import { useDashboard } from '@/context/DashboardContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { 
  BarChart2, 
  TrendingUp, 
  AlertTriangle, 
  Lightbulb, 
  ChevronRight, 
  FileText,
  Loader2,
  Calendar,
  Sparkles,
  ShieldCheck,
  Target,
  ArrowRight,
  Database,
  BrainCircuit,
  Download,
  Share2,
  CheckCircle2,
  LineChart as LineChartIcon,
  Activity
} from 'lucide-react';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import { 
  ResponsiveContainer, 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Cell 
} from 'recharts';
import { transformMetricsToChartData } from '@/lib/chartUtils';

export default function InsightsPage() {
  const { processedData, isLoading } = useDashboard();
  const [selectedDatasetIndex, setSelectedDatasetIndex] = useState(0);
  const [isExporting, setIsExporting] = useState(false);

  const exportToPDF = async () => {
    setIsExporting(true);
    const element = document.getElementById('insights-content');
    if (!element) return;

    try {
      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
        logging: false,
        backgroundColor: '#ffffff',
        onclone: (clonedDoc) => {
          const el = clonedDoc.getElementById('insights-content');
          if (el) {
            el.style.colorScheme = 'light';
            // Force replace any oklch/oklab colors if needed, but color-scheme should handle most
          }
        }
      });
      const imgData = canvas.toDataURL('image/png');
      const pdf = new jsPDF('p', 'mm', 'a4');
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;
      
      pdf.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
      pdf.save(`Neural-Insights-${new Date().toLocaleDateString()}.pdf`);
    } catch (error) {
      console.error('PDF Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const exportToCSV = () => {
    const datasets = processedData?.datasets || [];
    const currentDataset = datasets[selectedDatasetIndex];
    if (!currentDataset) return;

    const headers = ['Metric', 'Value', 'Status'];
    const rows = (currentDataset.metrics || []).map((m: any) => [
      m.metric, 
      m.data?.values?.[0] || 'N/A', 
      m.status || 'N/A'
    ]);

    const csvContent = [
      headers.join(','),
      ...rows.map(row => row.join(','))
    ].join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', `Neural-Metrics-${new Date().toLocaleDateString()}.csv`);
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping opacity-75"></div>
            <div className="relative bg-background p-4 rounded-2xl shadow-xl">
                <Loader2 className="w-12 h-12 animate-spin text-primary" />
            </div>
        </div>
        <p className="text-xl font-bold tracking-tight">Extracting Strategic Insights...</p>
      </div>
    );
  }

  const datasets = processedData?.datasets || [];
  
  if (datasets.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 rotate-3">
          <BarChart2 className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4 tracking-tight">No Insights Available</h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            Upload your first dataset to generate AI-powered insights, risk analysis, and strategic recommendations.
        </p>
        <Button onClick={() => window.location.href = '/dashboard/upload'} size="lg" className="h-14 px-8 font-bold rounded-xl shadow-xl shadow-primary/20">
          Upload Your Data
        </Button>
      </div>
    );
  }

  const currentDataset = datasets[selectedDatasetIndex];
  const chartData = transformMetricsToChartData(currentDataset.metrics);
  
  // Normalize AI confidence to 0-1 range
  const confidenceValue = (currentDataset.ai_confidence || 90) > 1 
    ? (currentDataset.ai_confidence || 90) / 100 
    : (currentDataset.ai_confidence || 0.9);

  return (
    <div className="space-y-10 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
            <BrainCircuit size={16} />
            Neural Insight Workspace
          </div>
          <h1 className="text-4xl font-black text-foreground tracking-tight">Dataset Intelligence</h1>
          <p className="text-lg text-muted-foreground">Granular metric breakdown and AI-driven trajectory modeling.</p>
        </div>
        <div className="flex gap-3">
          <Button
            variant="outline"
            onClick={exportToCSV}
            className="h-12 px-6 font-bold rounded-xl border-border/50 hover:bg-muted group transition-all"
          >
            <FileText size={18} className="mr-2 text-muted-foreground group-hover:text-primary transition-colors" />
            Export CSV
          </Button>
          <Button
            onClick={exportToPDF}
            disabled={isExporting}
            className="h-12 px-6 font-bold rounded-xl shadow-xl shadow-primary/20 group relative overflow-hidden"
          >
            {isExporting ? (
              <Loader2 size={18} className="animate-spin" />
            ) : (
              <>
                <Download size={18} className="mr-2 group-hover:translate-y-0.5 transition-transform" />
                Download PDF Report
              </>
            )}
          </Button>
        </div>
      </div>

      <div id="insights-content" className="space-y-10">
        {/* Dataset Selector */}
        <div className="flex items-center gap-4 overflow-x-auto pb-4 custom-scrollbar">
          <div className="flex items-center gap-2 shrink-0 mr-2">
            <Database size={16} className="text-muted-foreground" />
            <span className="text-[10px] font-black text-muted-foreground uppercase tracking-widest">Registry:</span>
          </div>
          {datasets.map((ds, idx) => (idx < 10 && (
            <button
              key={idx}
              onClick={() => setSelectedDatasetIndex(idx)}
              className={`px-6 py-3 rounded-2xl whitespace-nowrap text-sm font-bold transition-all border ${
                selectedDatasetIndex === idx
                  ? 'bg-primary text-primary-foreground border-primary shadow-xl shadow-primary/20 scale-105'
                  : 'bg-card text-muted-foreground border-border hover:border-primary/50 hover:text-foreground shadow-sm'
              }`}
            >
              {ds.nickname || ds.file_name}
            </button>
          )))}
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
          {/* Left Column: Visualizations & Core Metrics */}
          <div className="xl:col-span-8 space-y-8">
            {/* Main Chart */}
            <Card className="p-10 border-none shadow-2xl bg-card group relative overflow-hidden rounded-[2.5rem]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />

              <div className="flex items-center justify-between mb-10 relative z-10">
                <h3 className="font-black text-foreground flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-primary/10 flex items-center justify-center">
                    <TrendingUp className="text-primary" size={20} />
                  </div>
                  Metric Distribution Analysis
                </h3>
                <div className="flex items-center gap-2 px-3 py-1.5 bg-muted rounded-lg text-[10px] font-black text-muted-foreground uppercase tracking-widest">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary" /> Live Data
                </div>
              </div>

              <div className="h-[450px] w-full relative z-10">
                {chartData.length > 0 ? (
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={chartData} margin={{ top: 20, right: 30, left: 20, bottom: 20 }}>
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
                        cursor={{ fill: 'var(--muted)', opacity: 0.4 }}
                        contentStyle={{
                          borderRadius: '16px',
                          border: '1px solid var(--border)',
                          boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)',
                          backgroundColor: 'var(--card)',
                          padding: '12px'
                        }}
                        itemStyle={{ fontWeight: 'bold' }}
                      />
                      <Bar dataKey="value" radius={[10, 10, 0, 0]} barSize={45}>
                        {chartData.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={index % 2 === 0 ? 'var(--primary)' : 'var(--ring)'}
                            fillOpacity={0.8}
                            className="hover:fill-opacity-100 transition-all duration-300 cursor-pointer"
                          />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full text-muted-foreground space-y-4">
                    <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center italic text-xl font-black">?</div>
                    <p className="font-bold uppercase tracking-widest text-[10px]">No visualizable metrics detected</p>
                  </div>
                )}
              </div>
            </Card>

            {/* AI Insights List */}
            <div className="space-y-6">
              <h3 className="font-black text-foreground flex items-center gap-3 px-2 text-xl tracking-tight">
                <Sparkles className="text-primary animate-pulse" size={24} />
                Neural Insight Stream
              </h3>
              
              {/* Data Quality Analysis */}
              {currentDataset.quality_analysis && (
                <Card className="p-6 border-none shadow-xl bg-primary/5 rounded-3xl mb-8 overflow-hidden relative group">
                  <div className="absolute top-0 right-0 p-8 opacity-10 transition-transform group-hover:scale-110">
                    <ShieldCheck size={120} />
                  </div>
                  <div className="relative z-10">
                    <div className="flex items-center justify-between mb-6">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-primary/20 flex items-center justify-center">
                          <ShieldCheck className="text-primary" size={24} />
                        </div>
                        <div>
                          <h4 className="font-black text-foreground">Data Quality Assessment</h4>
                          <p className="text-xs text-muted-foreground uppercase tracking-widest font-bold">Reliability Index</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-3xl font-black text-primary">{currentDataset.quality_analysis.quality_score}%</div>
                        <div className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Score</div>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {currentDataset.quality_analysis.suggestions?.map((s: any, idx: number) => (
                        <div key={idx} className="p-4 rounded-2xl bg-background/50 border border-primary/10 hover:border-primary/30 transition-all">
                          <div className="flex items-start gap-3">
                            <CheckCircle2 size={16} className="text-primary mt-1 shrink-0" />
                            <div>
                              <p className="text-xs font-bold text-foreground mb-1">{s.issue}</p>
                              <p className="text-[11px] text-muted-foreground leading-relaxed">{s.recommendation}</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </Card>
              )}

              {/* Predictions */}
              {currentDataset.predictions && currentDataset.predictions.length > 0 && (
                <div className="space-y-4 mb-8">
                  <h3 className="font-black text-foreground flex items-center gap-3 px-2 text-xl tracking-tight">
                    <Activity className="text-primary" size={24} />
                    Predictive Trajectories
                  </h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {currentDataset.predictions.map((p: any, idx: number) => (
                      <Card key={idx} className="p-6 border border-border/40 shadow-xl bg-card hover:bg-muted/30 transition-all rounded-2xl group">
                        <div className="flex items-start justify-between mb-4">
                          <div className="space-y-1">
                            <span className="text-[10px] font-black text-primary uppercase tracking-widest">{p.target}</span>
                            <h4 className="font-bold text-foreground text-lg">{p.trend === 'up' ? 'Positive' : p.trend === 'down' ? 'Negative' : 'Stable'} Forecast</h4>
                          </div>
                          <div className={`p-2 rounded-xl ${p.trend === 'up' ? 'bg-emerald-500/10 text-emerald-500' : p.trend === 'down' ? 'bg-destructive/10 text-destructive' : 'bg-primary/10 text-primary'}`}>
                            {p.trend === 'up' ? <TrendingUp size={20} /> : p.trend === 'down' ? <AlertTriangle size={20} /> : <Activity size={20} />}
                          </div>
                        </div>
                        <p className="text-sm text-muted-foreground leading-relaxed mb-4">{p.reasoning}</p>
                        <div className="flex items-center justify-between pt-4 border-t border-border/50">
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Confidence:</span>
                            <span className={`text-[10px] font-black uppercase tracking-widest ${p.confidence === 'high' ? 'text-emerald-500' : p.confidence === 'medium' ? 'text-amber-500' : 'text-primary'}`}>{p.confidence}</span>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.isArray(currentDataset.insights) && currentDataset.insights.length > 0 ? (
                  currentDataset.insights.map((item: any, i) => {
                    const insightText = typeof item === 'string' ? item : (item.insight || 'No insight text');
                    const riskText = typeof item === 'object' ? item.risk : null;
                    const actionText = typeof item === 'object' ? item.action : null;

                    return (
                      <Card key={i} className="p-6 border border-border/40 shadow-xl bg-card/40 backdrop-blur-md hover:bg-card/60 transition-all group relative overflow-hidden rounded-2xl">
                        <div className="absolute top-0 left-0 w-1 h-full bg-primary opacity-20 group-hover:opacity-100 transition-opacity" />
                        <p className="text-sm font-bold text-foreground leading-relaxed mb-4">{insightText}</p>

                        <div className="space-y-3">
                          {riskText && (
                            <div className="flex gap-3 p-3 rounded-xl bg-destructive/5 border border-destructive/10">
                              <AlertTriangle className="text-destructive shrink-0" size={14} />
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-bold text-destructive uppercase tracking-widest">Neural Warning</span>
                                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{riskText}</p>
                              </div>
                            </div>
                          )}
                          {actionText && (
                            <div className="flex gap-3 p-3 rounded-xl bg-emerald-500/5 border border-emerald-500/10">
                              <Target className="text-emerald-600 shrink-0" size={14} />
                              <div className="space-y-0.5">
                                <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-widest">Optimized Path</span>
                                <p className="text-[11px] text-muted-foreground leading-relaxed font-medium">{actionText}</p>
                              </div>
                            </div>
                          )}
                        </div>
                      </Card>
                    );
                  })
                ) : (
                  <div className="md:col-span-2 p-16 text-center border-2 border-dashed border-border rounded-[2.5rem] bg-muted/20">
                    <p className="text-muted-foreground font-black uppercase tracking-widest text-xs italic opacity-60">Synchronizing neural insights for this registry...</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column: Confidence & Action Plan */}
          <div className="xl:col-span-4 space-y-8">
            {/* Confidence Score */}
            <Card className="p-8 bg-primary text-primary-foreground border-none shadow-xl relative overflow-hidden group rounded-3xl">
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl transition-transform duration-1000 group-hover:scale-150" />
              <h3 className="font-bold text-[10px] uppercase tracking-widest mb-8 opacity-80 flex items-center gap-2">
                <ShieldCheck size={16} />
                Model Integrity
              </h3>
              <div className="flex items-center justify-center mb-10">
                <div className="relative w-40 h-40 flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    <circle
                      cx="80" cy="80" r="70"
                      stroke="rgba(255,255,255,0.1)"
                      strokeWidth="10"
                      fill="transparent"
                    />
                    <circle
                      cx="80" cy="80" r="70"
                      stroke="white"
                      strokeWidth="10"
                      fill="transparent"
                      strokeDasharray={439.8}
                      strokeDashoffset={439.8 * (1 - confidenceValue)}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black tracking-tighter">{Math.round(confidenceValue * 100)}%</span>
                    <span className="text-[10px] uppercase font-bold tracking-widest opacity-60 mt-1">Confidence</span>
                  </div>
                </div>
              </div>
              <div className="p-4 rounded-xl bg-white/10 backdrop-blur-md border border-white/10 text-center">
                <p className="text-[10px] text-white/90 italic leading-relaxed font-medium">
                  "Integrity score derived from structural consistency and neural cross-referencing."
                </p>
              </div>
            </Card>

            {/* 30-Day Action Plan */}
            <Card className="p-8 border border-border/40 shadow-xl bg-card/40 backdrop-blur-md rounded-3xl">
              <h3 className="font-bold text-foreground mb-8 flex items-center gap-2 uppercase text-[10px] tracking-[0.2em]">
                <div className="w-8 h-8 rounded-lg bg-indigo-500/10 flex items-center justify-center">
                  <Calendar className="text-indigo-600" size={16} />
                </div>
                Strategic Protocol
              </h3>
              <div className="space-y-8 relative">
                <div className="absolute left-4 top-2 bottom-2 w-0.5 bg-border/40" />
                {currentDataset.action_plan_30_days?.map((item, i) => (
                  <div key={i} className="flex gap-6 group relative z-10">
                    <div className="flex-shrink-0 w-8 h-8 rounded-xl bg-card border-2 border-primary text-primary flex items-center justify-center font-bold text-xs group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300 shadow-sm">
                      {i + 1}
                    </div>
                    <div className="pt-1.5">
                      <p className="text-xs text-foreground/80 font-medium leading-relaxed">{item}</p>
                    </div>
                  </div>
                ))}
                {(!currentDataset.action_plan_30_days || currentDataset.action_plan_30_days.length === 0) && (
                  <div className="p-8 text-center border-2 border-dashed border-border/40 rounded-2xl bg-muted/20">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest opacity-60 italic">Mapping strategic trajectory...</p>
                  </div>
                )}
              </div>
            </Card>

            {/* Metadata */}
            <Card className="p-6 bg-muted/20 border border-border/40 rounded-2xl">
              <h3 className="font-bold text-foreground mb-6 flex items-center gap-2 uppercase text-[9px] tracking-widest">
                <FileText className="text-muted-foreground" size={14} />
                Registry Metadata
              </h3>
              <div className="space-y-4">
                {[
                  { label: 'Neural ID', value: currentDataset.nickname || 'N/A', icon: Database },
                  { label: 'File Hash', value: currentDataset.file_name, icon: FileText, truncate: true },
                  { label: 'Data Fidelity', value: `${Math.round((currentDataset.data_confidence || 0.85) * 100)}%`, icon: ShieldCheck }
                ].map((row, i) => (
                  <div key={i} className="flex justify-between items-center text-xs">
                    <div className="flex items-center gap-2 text-muted-foreground font-bold uppercase text-[9px] tracking-wider">
                      <row.icon size={12} />
                      {row.label}
                    </div>
                    <span className={`text-foreground/90 font-bold ${row.truncate ? 'truncate max-w-[120px]' : ''}`}>
                      {row.value}
                    </span>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
