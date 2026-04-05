import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
}

export const Input = ({ label, error, className = '', ...props }: InputProps) => {
  return (
    <div className="w-full">
      {label && (
        <label className="block text-sm font-medium text-foreground/80 mb-1.5 uppercase tracking-wider">
          {label}
        </label>
      )}
      <input
        className={`
          w-full px-4 py-2.5 bg-background/50 backdrop-blur border rounded-lg text-foreground placeholder:text-muted-foreground/50
          focus:outline-none focus:ring-2 focus:ring-primary/40 focus:border-primary transition-all
          focus:shadow-sm focus:shadow-primary/10
          ${error ? 'border-destructive focus:border-destructive' : 'border-border/50'}
          ${className}
        `}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-500">{error}</p>
      )}
    </div>
  );
};
