'use client';

import React, { useState } from 'react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { 
  UploadCloud, 
  FileText, 
  X, 
  CheckCircle2, 
  Loader2, 
  Link as LinkIcon,
  AlertCircle,
  Database,
  CloudLightning,
  ShieldCheck,
  Zap,
  ArrowRight,
  Info
} from 'lucide-react';
import { useUser } from '@clerk/nextjs';
import { useDashboard } from '@/context/DashboardContext';
import { useRouter } from 'next/navigation';

export default function UploadPage() {
  const { user } = useUser();
  const { refreshDocuments, refreshProcessedData } = useDashboard();
  const router = useRouter();
  
  const [file, setFile] = useState<File | null>(null);
  const [nickname, setNickname] = useState('');
  const [sheetUrl, setSheetUrl] = useState('');
  const [isUploading, setIsUploading] = useState(false);
  const [uploadType, setUploadType] = useState<'file' | 'google-sheet'>('file');
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0];
      const ext = selectedFile.name.split('.').pop()?.toLowerCase();
      
      if (ext === 'csv' || ext === 'xlsx') {
        setFile(selectedFile);
        setError(null);
        if (!nickname) {
          setNickname(selectedFile.name.split('.')[0]);
        }
      } else {
        setError('Only CSV and XLSX files are supported.');
        setFile(null);
      }
    }
  };

  const handleUpload = async () => {
    if (!user) return;
    
    setIsUploading(true);
    setError(null);
    setSuccess(false);

    try {
      if (uploadType === 'file') {
        if (!file) {
          setError('Please select a file first.');
          setIsUploading(false);
          return;
        }

        const formData = new FormData();
        formData.append('file', file);
        formData.append('clerkUserId', user.id);
        formData.append('nickname', nickname || file.name.split('.')[0]);

        const response = await fetch('/api/documents/upload', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Upload failed');
        }
      } else {
        if (!sheetUrl) {
          setError('Please enter a Google Sheet URL.');
          setIsUploading(false);
          return;
        }

        const response = await fetch('/api/documents/upload/google-sheet', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            clerkUserId: user.id,
            sheetUrl: sheetUrl,
            nickname: nickname || 'Google Sheet',
          }),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.detail || 'Processing Google Sheet failed');
        }
      }

      setSuccess(true);
      await Promise.all([refreshDocuments(), refreshProcessedData()]);
      
      // Clear form
      setFile(null);
      setNickname('');
      setSheetUrl('');
      
      // Redirect after success
      setTimeout(() => {
        router.push('/dashboard');
      }, 2000);

    } catch (err: any) {
      setError(err.message || 'An error occurred during upload.');
    } finally {
      setIsUploading(false);
    }
  };

  return (
    <div className="max-w-[1400px] mx-auto space-y-10 animate-in fade-in slide-in-from-bottom-8 duration-700 pb-12">
      {/* Header Section */}
      <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-border pb-8">
        <div className="space-y-2">
            <div className="flex items-center gap-2 text-primary font-bold text-sm uppercase tracking-widest">
                <CloudLightning size={16} />
                Strategic Data Ingestion
            </div>
            <h1 className="text-4xl font-black text-foreground tracking-tight">Feed the Neural Engine</h1>
            <p className="text-lg text-muted-foreground">Upload your business data to generate executive snapshots and AI-driven insights.</p>
        </div>
      </div>

      <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
        <div className="xl:col-span-8 space-y-8">
          <Card className="p-0 overflow-hidden border-none shadow-2xl bg-card group relative">
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-110" />
            
            <div className="flex border-b border-border relative z-10">
              <button 
                onClick={() => setUploadType('file')}
                className={`flex-1 py-6 text-sm font-black uppercase tracking-widest transition-all ${uploadType === 'file' ? 'bg-primary/10 text-primary border-b-4 border-primary' : 'bg-muted/50 text-muted-foreground hover:bg-muted/80'}`}
              >
                Local Dataset (CSV/XLSX)
              </button>
              <button 
                onClick={() => setUploadType('google-sheet')}
                className={`flex-1 py-6 text-sm font-black uppercase tracking-widest transition-all ${uploadType === 'google-sheet' ? 'bg-primary/10 text-primary border-b-4 border-primary' : 'bg-muted/50 text-muted-foreground hover:bg-muted/80'}`}
              >
                Google Cloud Sync
              </button>
            </div>

            <div className="p-10 relative z-10">
              {uploadType === 'file' ? (
                <div className="space-y-8">
                  {!file ? (
                    <div className="group border-2 border-dashed border-border rounded-[2.5rem] p-16 text-center hover:border-primary/50 hover:bg-primary/5 transition-all cursor-pointer relative overflow-hidden"
                         onClick={() => document.getElementById('file-upload')?.click()}>
                      <input 
                        id="file-upload" 
                        type="file" 
                        className="hidden" 
                        accept=".csv,.xlsx" 
                        onChange={handleFileChange}
                      />
                      <div className="bg-primary/10 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-500 shadow-xl shadow-primary/10">
                        <UploadCloud className="text-primary w-12 h-12" />
                      </div>
                      <h3 className="text-2xl font-black text-foreground mb-2 tracking-tight">Deploy Local Dataset</h3>
                      <p className="text-muted-foreground font-medium">CSV or Excel architecture (max 10MB payload)</p>
                    </div>
                  ) : (
                    <div className="bg-primary/5 rounded-[2rem] p-8 flex items-center justify-between border border-primary/20 animate-in zoom-in duration-300">
                      <div className="flex items-center gap-6">
                        <div className="bg-card p-4 rounded-2xl shadow-xl border border-border">
                          <FileText className="text-primary" size={32} />
                        </div>
                        <div>
                          <p className="text-xl font-black text-foreground tracking-tight">{file.name}</p>
                          <p className="text-sm font-bold text-muted-foreground uppercase tracking-widest">{(file.size / 1024).toFixed(1)} KB DATASET READY</p>
                        </div>
                      </div>
                      <button 
                        onClick={() => setFile(null)}
                        className="w-12 h-12 flex items-center justify-center bg-card hover:bg-destructive/10 hover:text-destructive rounded-xl border border-border text-muted-foreground transition-all shadow-sm"
                      >
                        <X size={24} />
                      </button>
                    </div>
                  )}

                  <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Dataset Registry Name</label>
                    <Input 
                      placeholder="e.g., Fiscal_Q1_Performance" 
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="h-16 rounded-2xl border-border bg-muted/30 px-6 font-bold text-lg focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>
              ) : (
                <div className="space-y-8">
                  <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Google Sheet Neural Link</label>
                    <div className="relative">
                      <div className="absolute left-6 top-1/2 -translate-y-1/2 text-primary">
                        <LinkIcon size={24} />
                      </div>
                      <Input 
                        placeholder="https://docs.google.com/spreadsheets/d/..." 
                        className="h-16 pl-16 pr-6 rounded-2xl border-border bg-muted/30 font-bold text-lg focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all"
                        value={sheetUrl}
                        onChange={(e) => setSheetUrl(e.target.value)}
                      />
                    </div>
                    <div className="flex items-center gap-2 ml-1 text-xs font-bold text-muted-foreground">
                        <Info size={14} className="text-primary" />
                        Ensure the sheet permissions are set to "Anyone with the link can view".
                    </div>
                  </div>

                  <div className="space-y-3">
                    <label className="text-xs font-black text-muted-foreground uppercase tracking-[0.2em] ml-1">Dataset Registry Name</label>
                    <Input 
                      placeholder="e.g., Cloud_Inventory_Sync" 
                      value={nickname}
                      onChange={(e) => setNickname(e.target.value)}
                      className="h-16 rounded-2xl border-border bg-muted/30 px-6 font-bold text-lg focus:bg-background focus:ring-4 focus:ring-primary/10 transition-all"
                    />
                  </div>
                </div>
              )}

              {error && (
                <div className="mt-8 p-6 bg-destructive/5 border border-destructive/20 rounded-2xl flex items-center gap-4 text-destructive animate-in slide-in-from-top-4 duration-300">
                  <AlertCircle size={24} />
                  <p className="text-sm font-bold tracking-tight uppercase tracking-widest">{error}</p>
                </div>
              )}

              {success && (
                <div className="mt-8 p-6 bg-emerald-500/5 border border-emerald-500/20 rounded-2xl flex items-center gap-4 text-emerald-600 animate-in slide-in-from-top-4 duration-300">
                  <CheckCircle2 size={24} />
                  <p className="text-sm font-bold tracking-tight uppercase tracking-widest">Dataset synchronized successfully! Redirecting to command center...</p>
                </div>
              )}

              <Button 
                className="w-full mt-10 h-18 text-xl font-black bg-primary hover:bg-primary/90 shadow-2xl shadow-primary/30 rounded-2xl disabled:opacity-50 transition-all hover:scale-[1.01] active:scale-[0.99] uppercase tracking-widest"
                onClick={handleUpload}
                disabled={isUploading || (!file && !sheetUrl)}
              >
                {isUploading ? (
                  <>
                    <Loader2 className="mr-3 h-6 w-6 animate-spin" />
                    Neural Processing Active...
                  </>
                ) : (
                  <>
                    Process Dataset
                    <ArrowRight className="ml-3 w-6 h-6" />
                  </>
                )}
              </Button>
            </div>
          </Card>
        </div>

        <div className="xl:col-span-4 space-y-8">
          <Card className="p-8 bg-gradient-to-br from-slate-900 to-primary text-white border-none shadow-2xl relative overflow-hidden group">
            <div className="absolute -top-12 -right-12 w-48 h-48 bg-white/10 rounded-full blur-2xl transition-transform duration-700 group-hover:scale-150" />
            <h3 className="font-black text-sm uppercase tracking-[0.2em] mb-8 opacity-80 flex items-center gap-2">
                <Zap size={16} className="text-yellow-400 fill-yellow-400" />
                Intelligence Protocol
            </h3>
            <ul className="space-y-6">
              {[
                  { title: 'Executive Summaries', desc: 'Instant extraction of high-level performance metrics.' },
                  { title: 'Risk Guard', desc: 'Neural detection of data anomalies and market threats.' },
                  { title: 'Natural Querying', desc: 'Ask complex strategic questions in plain business English.' }
              ].map((item, i) => (
                <li key={i} className="flex gap-4">
                    <div className="mt-1 bg-white/10 p-1.5 rounded-lg border border-white/10 h-fit">
                        <CheckCircle2 size={16} className="text-emerald-400" />
                    </div>
                    <div className="space-y-1">
                        <h4 className="font-bold text-white text-sm">{item.title}</h4>
                        <p className="text-xs text-white/60 leading-relaxed">{item.desc}</p>
                    </div>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-8 border-none shadow-xl bg-card">
            <h4 className="font-black text-foreground mb-6 flex items-center gap-3 uppercase text-xs tracking-widest">
              <ShieldCheck className="text-primary" size={18} />
              Structure Guidelines
            </h4>
            <div className="p-8 space-y-4">
                <div className="p-6 rounded-2xl bg-muted dark:bg-slate-800/50 border border-border">
                    <p className="text-sm text-muted-foreground dark:text-slate-300 leading-relaxed font-bold">
                        For optimal AI performance, ensure your dataset has descriptive headers in the first row. The neural engine performs cross-column correlation based on these identifiers.
                    </p>
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Max Load</span>
                        <p className="text-base font-black text-foreground mt-1">10MB</p>
                    </div>
                    <div className="p-4 rounded-2xl bg-primary/10 border border-primary/20 text-center">
                        <span className="text-[10px] font-black text-primary uppercase tracking-widest">Formats</span>
                        <p className="text-base font-black text-foreground mt-1">CSV/XLSX</p>
                    </div>
                </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}
