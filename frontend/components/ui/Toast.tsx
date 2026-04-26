'use client';

import React, { useEffect } from 'react';
import { CheckCircle2, AlertTriangle, Loader2, ArrowRight } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, onClose, duration = 5000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [onClose, duration]);

  return (
    <div className="fixed bottom-8 right-8 z-50 animate-in slide-in-from-right-10 duration-300">
      <div className={`
        flex items-center gap-3 px-6 py-4 rounded-2xl shadow-2xl border backdrop-blur-md min-w-[300px]
        ${type === 'success' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-500' : 
          type === 'error' ? 'bg-destructive/10 border-destructive/20 text-destructive' : 
          'bg-primary/10 border-primary/20 text-primary'}
      `}>
        {type === 'success' ? <CheckCircle2 size={20} /> : 
         type === 'error' ? <AlertTriangle size={20} /> : 
         <Loader2 size={20} className="animate-spin" />}
        <p className="font-bold text-sm tracking-tight flex-1">{message}</p>
        <button 
          onClick={onClose}
          className="ml-4 hover:opacity-70 transition-opacity p-1"
        >
          <ArrowRight size={14} className="rotate-45" />
        </button>
      </div>
    </div>
  );
}
