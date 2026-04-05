'use client';

import React from 'react';
import { Card } from '../ui/Card';
import { ArrowUpRight, ArrowDownRight, TrendingUp } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  trend: string;
  trendUp?: boolean;
  description?: string;
  icon?: React.ReactNode;
  delay?: number;
  color?: 'blue' | 'indigo' | 'emerald' | 'amber' | 'rose' | 'primary';
}

export const StatsCard = ({ 
  title, 
  value, 
  trend, 
  trendUp, 
  description, 
  icon, 
  delay = 0,
  color = 'primary'
}: StatsCardProps) => {
  const colorMap = {
    primary: 'text-primary bg-primary/10 border-primary/20',
    blue: 'text-blue-600 bg-blue-500/10 border-blue-500/20',
    indigo: 'text-indigo-600 bg-indigo-500/10 border-indigo-500/20',
    emerald: 'text-emerald-600 bg-emerald-500/10 border-emerald-500/20',
    amber: 'text-amber-600 bg-amber-500/10 border-amber-500/20',
    rose: 'text-rose-600 bg-rose-500/10 border-rose-500/20',
  };

  const selectedColor = colorMap[color] || colorMap.primary;

  return (
    <Card 
      className="p-8 border-border/40 card-hover group relative overflow-hidden animate-in fade-in slide-in-from-bottom-8 fill-mode-backwards rounded-3xl bg-card shadow-xl"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-2xl -mr-16 -mt-16 group-hover:scale-150 transition-transform duration-700" />
      
      <div className="flex justify-between items-start mb-6 relative z-10">
        <div className={`p-3.5 rounded-2xl ${selectedColor} shadow-sm group-hover:scale-110 group-hover:rotate-3 transition-all duration-500`}>
          {icon || <TrendingUp size={22} />}
        </div>
        
        {trend && (
          <div className={`flex items-center gap-1 text-[10px] font-black px-3 py-1.5 rounded-xl uppercase tracking-widest ${
            trendUp === true
              ? 'bg-emerald-500/10 text-emerald-600 border border-emerald-500/20' 
              : trendUp === false
                ? 'bg-rose-500/10 text-rose-600 border border-rose-500/20'
                : 'bg-muted text-muted-foreground border border-border/50'
          }`}>
            {trendUp === true && <ArrowUpRight size={12} />}
            {trendUp === false && <ArrowDownRight size={12} />}
            {trend}
          </div>
        )}
      </div>

      <div className="space-y-1 relative z-10">
        <h3 className="text-[10px] font-black text-muted-foreground uppercase tracking-[0.2em] mb-1">{title}</h3>
        <div className="flex items-baseline gap-2">
            <p className="text-4xl font-black text-foreground tracking-tighter">{value}</p>
            {description && (
                <span className="text-xs font-bold text-muted-foreground/60 uppercase tracking-widest">{description}</span>
            )}
        </div>
      </div>
    </Card>
  );
};
