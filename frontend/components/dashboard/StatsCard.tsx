import React from 'react';
import { Card } from '../ui/Card';

interface StatsCardProps {
  title: string;
  value: string;
  trend: string;
  trendUp?: boolean;
  description?: string;
  icon?: React.ReactNode;
  delay?: number;
}

export const StatsCard = ({ title, value, trend, trendUp, description, icon, delay = 0 }: StatsCardProps) => {
  return (
    <Card 
      className="flex flex-col gap-3 hover:border-blue-300 transition-all duration-300 hover:shadow-md animate-in fade-in slide-in-from-bottom-4 fill-mode-backwards"
      style={{ animationDelay: `${delay}ms` }}
    >
      <div className="flex items-center justify-between">
        <span className="text-sm text-gray-500 font-medium">{title}</span>
        {icon && <div className="text-gray-400">{icon}</div>}
      </div>
      <div className="flex items-end justify-between">
        <div className="flex flex-col">
            <span className="text-3xl font-bold text-gray-900 tracking-tight">{value}</span>
            {description && <span className="text-xs text-gray-400 mt-1">{description}</span>}
        </div>
        
        <span className={`text-xs font-semibold px-2.5 py-1 rounded-full flex items-center gap-1 ${
          trendUp === true
            ? 'bg-green-50 text-green-700 border border-green-100' 
            : trendUp === false
              ? 'bg-red-50 text-red-700 border border-red-100'
              : 'bg-gray-100 text-gray-600'
        }`}>
          {trendUp === true && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
            </svg>
          )}
          {trendUp === false && (
            <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6" />
            </svg>
          )}
          {trend}
        </span>
      </div>
    </Card>
  );
};
