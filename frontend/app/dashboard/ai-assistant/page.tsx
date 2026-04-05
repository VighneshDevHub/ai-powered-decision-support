'use client';

import React, { useState, useEffect, useRef } from 'react';
import { useUser } from '@clerk/nextjs';
import { useDashboard } from '@/context/DashboardContext';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { ScrollArea } from '@/components/ui/ScrollArea';
import { 
  Bot, 
  User, 
  Send, 
  Sparkles, 
  Loader2, 
  FileText,
  ChevronDown,
  Trash2,
  BrainCircuit,
  Lightbulb,
  Zap,
  History,
  Info,
  MessagesSquare,
  TrendingUp,
  AlertTriangle,
  Target,
  ArrowRight,
  Maximize2,
  Minimize2,
  Terminal,
  Database,
  ShieldCheck
} from 'lucide-react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import { 
  BarChart, 
  Bar, 
  LineChart, 
  Line, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer 
} from 'recharts';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function AIAssistantPage() {
  const { user } = useUser();
  const { documents, isLoading: isLoadingDocs } = useDashboard();
  
  const [selectedDocId, setSelectedDocId] = useState<string>('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isSending, setIsSending] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Set initial document
  useEffect(() => {
    if (documents.length > 0 && !selectedDocId) {
      setSelectedDocId(documents[0].documentId);
    }
  }, [documents, selectedDocId]);

  // Load chat history when document changes
  useEffect(() => {
    const loadHistory = async () => {
      if (!user || !selectedDocId) return;
      
      setIsLoadingHistory(true);
      try {
        const response = await fetch(`/api/chat/history?clerkUserId=${user.id}&documentId=${selectedDocId}`);
        if (response.ok) {
          const data = await response.json();
          setMessages(data.messages || []);
        }
      } catch (error) {
        console.error('Failed to load chat history:', error);
      } finally {
        setIsLoadingHistory(false);
      }
    };

    loadHistory();
  }, [user, selectedDocId]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!user || !selectedDocId || !input.trim() || isSending) return;

    const userMessage = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMessage }]);
    setIsSending(true);

    try {
      const response = await fetch('/api/chat/ask', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clerkUserId: user.id,
          documentId: selectedDocId,
          question: userMessage
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setMessages(prev => [...prev, { role: 'assistant', content: data.answer }]);
      } else {
        throw new Error('Failed to get response');
      }
    } catch (error) {
      console.error('Chat error:', error);
      setMessages(prev => [...prev, { role: 'assistant', content: "I'm sorry, I encountered an error processing your request. Please try again later." }]);
    } finally {
      setIsSending(false);
    }
  };

  const clearChat = async () => {
    setMessages([]);
  };

  const suggestions = [
    { text: "What are the main trends?", icon: TrendingUp },
    { text: "Summarize key risks.", icon: AlertTriangle },
    { text: "3 growth recommendations.", icon: Lightbulb },
    { text: "Overall performance sentiment?", icon: Zap }
  ];

  if (isLoadingDocs) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] space-y-6">
        <div className="relative">
            <div className="absolute inset-0 bg-primary/20 rounded-full animate-ping"></div>
            <div className="relative bg-background p-4 rounded-2xl shadow-xl">
                <BrainCircuit className="w-12 h-12 animate-pulse text-primary" />
            </div>
        </div>
        <p className="text-xl font-bold tracking-tight">Initializing Strategy AI...</p>
      </div>
    );
  }

  if (documents.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center h-[70vh] text-center max-w-lg mx-auto animate-in fade-in slide-in-from-bottom-8 duration-700">
        <div className="w-24 h-24 bg-primary/10 rounded-3xl flex items-center justify-center mb-8 shadow-2xl shadow-primary/20 rotate-3">
          <Bot className="w-12 h-12 text-primary" />
        </div>
        <h2 className="text-3xl font-black text-foreground mb-4 tracking-tight">AI Assistant Offline</h2>
        <p className="text-lg text-muted-foreground mb-10 leading-relaxed">
            I need data to provide strategic insights. Upload a dataset to begin our strategic conversation.
        </p>
        <Button onClick={() => window.location.href = '/dashboard/upload'} size="lg" className="h-14 px-8 font-bold rounded-xl shadow-xl shadow-primary/20">
          Upload Your First Dataset
        </Button>
      </div>
    );
  }

  const currentDoc = documents.find(d => d.documentId === selectedDocId);

  return (
    <div className={`flex flex-col gap-6 animate-in fade-in duration-700 max-w-[1600px] mx-auto pb-6 ${isFullScreen ? 'fixed inset-0 z-[100] bg-background p-6' : 'h-[calc(100vh-12rem)]'}`}>
      {/* Header Area */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pb-4 border-b border-border/50">
        <div className="flex items-center gap-4">
            <div className="bg-primary p-3 rounded-2xl text-primary-foreground shadow-2xl shadow-primary/30 rotate-3 transition-transform hover:rotate-0 cursor-default">
                <Terminal size={28} />
            </div>
            <div>
                <h1 className="text-2xl font-bold text-foreground tracking-tight flex items-center gap-2">
                    Neural Assistant
                    <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded-full uppercase tracking-widest font-bold">PRO</span>
                </h1>
                <div className="flex items-center gap-2 mt-0.5">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                    <p className="text-[10px] text-muted-foreground font-medium uppercase tracking-[0.15em]">
                        DATA LINK: {currentDoc?.nickname || 'ACTIVESET'}
                    </p>
                </div>
            </div>
        </div>

        <div className="flex items-center gap-3 w-full lg:w-auto">
            <div className="relative flex-1 lg:w-80 group">
                <select 
                    value={selectedDocId} 
                    onChange={(e) => setSelectedDocId(e.target.value)}
                    className="w-full pl-12 pr-10 py-3.5 bg-card border border-border/50 rounded-2xl text-[11px] font-black uppercase tracking-widest focus:ring-4 focus:ring-primary/10 focus:border-primary outline-none appearance-none transition-all shadow-sm cursor-pointer group-hover:border-primary/50"
                >
                    {documents.map(doc => (
                        <option key={doc.documentId} value={doc.documentId}>
                            {doc.nickname || doc.originalFileName}
                        </option>
                    ))}
                </select>
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary">
                    <Database size={18} />
                </div>
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none group-hover:text-primary transition-colors">
                    <ChevronDown size={18} />
                </div>
            </div>
            <div className="flex gap-2">
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => setIsFullScreen(!isFullScreen)}
                    className="h-12 w-12 rounded-2xl border-border/50 hover:bg-muted transition-all shadow-sm"
                >
                    {isFullScreen ? <Minimize2 size={20} /> : <Maximize2 size={20} />}
                </Button>
                <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={clearChat} 
                    className="h-12 w-12 rounded-2xl hover:bg-destructive/10 hover:text-destructive border-border/50 transition-all shadow-sm"
                >
                    <Trash2 size={20} />
                </Button>
            </div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="flex-1 flex flex-col lg:flex-row gap-8 min-h-0">
        {/* Chat Card */}
        <Card className="flex-1 flex flex-col overflow-hidden border-border/40 shadow-xl bg-card/40 backdrop-blur-md relative rounded-3xl border">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/[0.03] via-transparent to-transparent pointer-events-none" />
          
          <ScrollArea className="flex-1 p-6 lg:p-10">
            <div className="space-y-10 max-w-5xl mx-auto">
              {/* Empty State */}
              {messages.length === 0 && !isLoadingHistory && (
                <div className="py-16 text-center space-y-8 animate-in fade-in zoom-in-95 duration-700">
                    <div className="relative inline-block">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full animate-pulse scale-125"></div>
                        <div className="relative bg-gradient-to-br from-primary to-blue-600 w-24 h-24 rounded-3xl flex items-center justify-center mx-auto text-white shadow-xl shadow-primary/20">
                            <Sparkles size={48} className="animate-bounce-slow" />
                        </div>
                    </div>
                    <div className="space-y-3">
                        <h3 className="text-3xl font-bold text-foreground tracking-tight leading-tight">
                            Strategic AI <span className="text-primary">Operational</span>
                        </h3>
                        <p className="text-base text-muted-foreground leading-relaxed font-medium max-w-md mx-auto opacity-70">
                            Start a session by asking about your data or using a quick prompt.
                        </p>
                    </div>
                    <div className="pt-6 flex flex-wrap justify-center gap-3">
                        {suggestions.map((s, i) => (
                            <button 
                                key={i}
                                onClick={() => setInput(s.text)}
                                className="px-5 py-3 rounded-xl bg-muted/30 border border-border/50 hover:border-primary/50 hover:bg-primary/5 text-[11px] font-bold uppercase tracking-wider transition-all shadow-sm flex items-center gap-2.5 group"
                            >
                                <div className="p-1.5 bg-primary/10 rounded-lg text-primary group-hover:scale-105 transition-transform">
                                    <s.icon size={14} />
                                </div>
                                {s.text}
                            </button>
                        ))}
                    </div>
                </div>
              )}

              {/* Chat Messages */}
              {isLoadingHistory ? (
                <div className="flex flex-col items-center justify-center py-40 space-y-6">
                    <div className="w-16 h-16 rounded-full border-4 border-primary/10 border-t-primary animate-spin" />
                    <p className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.3em] animate-pulse">Syncing Neural Memory...</p>
                </div>
              ) : (
                <div className="space-y-8">
                    {messages.map((msg, i) => (
                    <div key={i} className={`flex gap-4 ${msg.role === 'assistant' ? 'items-start' : 'items-start flex-row-reverse'}`}>
                        <div className={`flex-shrink-0 w-10 h-10 rounded-xl flex items-center justify-center shadow-lg transition-all border border-border/50 ${
                        msg.role === 'assistant' ? 'bg-card text-primary' : 'bg-primary text-white'
                        }`}>
                        {msg.role === 'assistant' ? <BrainCircuit size={20} /> : <User size={20} />}
                        </div>
                        <div className={`max-w-[85%] rounded-2xl p-5 shadow-sm relative border ${
                        msg.role === 'assistant' 
                            ? 'bg-card/80 text-foreground border-border/60' 
                            : 'bg-primary text-white font-medium border-none'
                        }`}>
                        <div className="text-sm leading-relaxed max-w-none">
                            {msg.role === 'assistant' ? (
                                <ReactMarkdown 
                                      remarkPlugins={[remarkGfm]}
                                      components={{
                                         p: ({children}) => <p className="mb-4 last:mb-0">{children}</p>,
                                         strong: ({children}) => <strong className="font-bold text-primary">{children}</strong>,
                                         ul: ({children}) => <ul className="list-disc ml-6 mb-4 space-y-1">{children}</ul>,
                                         ol: ({children}) => <ol className="list-decimal ml-6 mb-4 space-y-1">{children}</ol>,
                                         li: ({children}) => <li className="mb-1">{children}</li>,
                                         code: ({node, inline, className, children, ...props}: any) => {
                                            const match = /language-(\w+)/.exec(className || '');
                                            const isChart = match && match[1] === 'chart-json';
                                            
                                            if (!inline && isChart) {
                                                try {
                                                    const chartData = JSON.parse(String(children).replace(/\n/g, ''));
                                                    return (
                                                        <div className="my-6 p-4 bg-muted/30 rounded-2xl border border-border/50 h-[300px] w-full animate-in fade-in zoom-in duration-500">
                                                            <div className="flex items-center justify-between mb-4">
                                                                <h4 className="text-[10px] font-black uppercase tracking-[0.2em] text-primary">{chartData.title || 'AI Analysis Chart'}</h4>
                                                                <div className="flex gap-1.5">
                                                                    <div className="w-2 h-2 rounded-full bg-primary/20" />
                                                                    <div className="w-2 h-2 rounded-full bg-primary/40" />
                                                                    <div className="w-2 h-2 rounded-full bg-primary" />
                                                                </div>
                                                            </div>
                                                            <ResponsiveContainer width="100%" height="100%">
                                                                {chartData.type === 'bar' ? (
                                                                    <BarChart data={chartData.data}>
                                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--primary), 0.1)" />
                                                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                                        <Tooltip 
                                                                            contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))', fontSize: '12px', fontWeight: 'bold'}}
                                                                            cursor={{fill: 'rgba(var(--primary), 0.05)'}}
                                                                        />
                                                                        <Bar dataKey="value" fill="hsl(var(--primary))" radius={[6, 6, 0, 0]} />
                                                                    </BarChart>
                                                                ) : chartData.type === 'line' ? (
                                                                    <LineChart data={chartData.data}>
                                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--primary), 0.1)" />
                                                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                                        <Tooltip 
                                                                            contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))', fontSize: '12px', fontWeight: 'bold'}}
                                                                        />
                                                                        <Line type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} dot={{r: 4, fill: 'hsl(var(--primary))'}} activeDot={{r: 6}} />
                                                                    </LineChart>
                                                                ) : (
                                                                    <AreaChart data={chartData.data}>
                                                                        <defs>
                                                                            <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
                                                                                <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                                                                                <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0}/>
                                                                            </linearGradient>
                                                                        </defs>
                                                                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(var(--primary), 0.1)" />
                                                                        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                                        <YAxis axisLine={false} tickLine={false} tick={{fontSize: 10, fontWeight: 'bold'}} />
                                                                        <Tooltip 
                                                                            contentStyle={{backgroundColor: 'hsl(var(--card))', borderRadius: '12px', border: '1px solid hsl(var(--border))', fontSize: '12px', fontWeight: 'bold'}}
                                                                        />
                                                                        <Area type="monotone" dataKey="value" stroke="hsl(var(--primary))" strokeWidth={3} fillOpacity={1} fill="url(#colorValue)" />
                                                                    </AreaChart>
                                                                )}
                                                            </ResponsiveContainer>
                                                        </div>
                                                    );
                                                } catch (e) {
                                                    return <code className={className} {...props}>{children}</code>;
                                                }
                                            }
                                            return <code className={className} {...props}>{children}</code>;
                                         }
                                     }}
                                 >
                                    {msg.content}
                                </ReactMarkdown>
                            ) : (
                                <div className="whitespace-pre-wrap">{msg.content}</div>
                            )}
                        </div>
                        </div>
                    </div>
                    ))}
                </div>
              )}

              {/* Loading State */}
              {isSending && (
                <div className="flex gap-4 items-start animate-in slide-in-from-bottom-2">
                  <div className="flex-shrink-0 w-10 h-10 rounded-xl bg-card border border-border/50 text-primary flex items-center justify-center shadow-lg">
                    <BrainCircuit size={20} className="animate-pulse" />
                  </div>
                  <div className="bg-card/80 border border-border/60 rounded-2xl px-6 py-4 flex items-center gap-3 shadow-sm">
                    <div className="flex gap-1">
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.3s]"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce [animation-delay:-0.15s]"></div>
                        <div className="w-1.5 h-1.5 bg-primary rounded-full animate-bounce"></div>
                    </div>
                    <span className="text-[10px] font-bold text-muted-foreground uppercase tracking-widest">Neural engine thinking...</span>
                  </div>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>
          </ScrollArea>

          {/* Input Area */}
          <div className="p-6 lg:p-8 bg-card/80 border-t border-border/40 relative z-10 backdrop-blur-xl">
            <div className="max-w-5xl mx-auto space-y-4">
                <div className="flex gap-3 relative">
                    <div className="flex-1 relative group">
                        <Input 
                            placeholder={`Ask about ${currentDoc?.nickname || 'dataset'}...`}
                            value={input}
                            onChange={(e) => setInput(e.target.value)}
                            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                            className="h-14 pl-12 pr-16 rounded-2xl border-border/50 bg-muted/20 focus:bg-background focus:ring-4 focus:ring-primary/5 focus:border-primary outline-none transition-all shadow-sm text-sm font-medium placeholder:text-muted-foreground/50"
                        />
                        <div className="absolute left-4 top-1/2 -translate-y-1/2 text-primary/40 group-focus-within:text-primary transition-colors">
                            <Terminal size={18} />
                        </div>
                    </div>
                    <button 
                        onClick={handleSend}
                        disabled={!input.trim() || isSending}
                        className="h-14 w-14 bg-primary text-white rounded-2xl flex items-center justify-center hover:scale-[1.02] active:scale-[0.98] disabled:opacity-50 transition-all shadow-lg shadow-primary/20 group"
                    >
                        <Send size={22} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </button>
                </div>
                <div className="flex items-center justify-center gap-8 text-[9px] font-bold text-muted-foreground/50 uppercase tracking-widest">
                    <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                        <History size={12} className="text-primary/60" /> Encrypted Session
                    </div>
                    <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                        <Target size={12} className="text-primary/60" /> Context Aware
                    </div>
                    <div className="flex items-center gap-2 hover:text-primary transition-colors cursor-default">
                        <ShieldCheck size={12} className="text-primary/60" /> Neural Protected
                    </div>
                </div>
            </div>
          </div>
        </Card>

        {/* Desktop Sidebar */}
        <div className="hidden lg:flex w-full lg:w-80 flex-col gap-6">
            <Card className="p-8 border-none shadow-xl bg-slate-900 text-white relative overflow-hidden group rounded-3xl">
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/20 rounded-full blur-[80px] -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-1000" />
                <h3 className="font-bold text-[10px] uppercase tracking-[0.2em] text-white/50 mb-6 flex items-center gap-2">
                    <Zap size={14} className="text-yellow-400 fill-yellow-400 animate-pulse" />
                    Quick Prompts
                </h3>
                <div className="space-y-3 relative z-10">
                    {suggestions.map((s, i) => (
                        <button 
                            key={i}
                            onClick={() => setInput(s.text)}
                            className="w-full text-left text-[11px] p-4 rounded-xl bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-slate-200 font-bold group leading-relaxed shadow-sm"
                        >
                            <span className="opacity-40 group-hover:opacity-100 transition-opacity mr-2 text-primary">/</span>
                            {s.text}
                        </button>
                    ))}
                </div>
            </Card>

            <Card className="p-8 border-border/40 shadow-xl flex-1 bg-card/40 backdrop-blur-md rounded-3xl border">
                <h3 className="font-bold text-foreground mb-8 flex items-center gap-2 uppercase text-[10px] tracking-[0.2em]">
                    <Lightbulb size={16} className="text-primary" />
                    Neural Core
                </h3>
                <div className="space-y-8">
                    {[
                        { title: 'Semantic Engine', desc: 'Deep correlation analysis across metadata.', icon: MessagesSquare },
                        { title: 'Stateful Memory', desc: 'Maintains context across query iterations.', icon: History },
                        { title: 'Logic Guard', desc: 'Real-time business rule enforcement.', icon: Info }
                    ].map((tip, i) => (
                        <div key={i} className="space-y-2 group">
                            <div className="flex items-center gap-2.5 text-primary">
                                <div className="p-1.5 bg-primary/10 rounded-lg group-hover:scale-105 transition-transform">
                                    <tip.icon size={16} />
                                </div>
                                <strong className="text-[10px] font-bold uppercase tracking-wider">{tip.title}</strong>
                            </div>
                            <p className="text-[11px] text-muted-foreground leading-relaxed font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                                {tip.desc}
                            </p>
                        </div>
                    ))}
                </div>
                <div className="mt-8 pt-8 border-t border-border/40">
                    <div className="bg-muted/30 p-4 rounded-2xl border border-border/40 relative overflow-hidden group">
                        <p className="relative z-10 text-[10px] font-medium text-muted-foreground leading-relaxed italic opacity-70">
                            "Optimal results require consistent identifiers and normalized data."
                        </p>
                    </div>
                </div>
            </Card>
        </div>
      </div>
    </div>
  );
}
