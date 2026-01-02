import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  style?: React.CSSProperties;
}

export const Card = ({ children, className = '', hover = false, style }: CardProps) => {
  return (
    <div
      className={`
        card relative bg-white/95 backdrop-blur border border-gray-200 rounded-xl p-6 shadow-sm
        ${hover ? 'hover:shadow-md hover:border-blue-500/30 transition-all duration-300 hover:-translate-y-1' : ''}
        ${className}
      `}
      style={style}
    >
      {children}
      <style jsx>{`
        .card::before {
          content: "";
          position: absolute;
          inset: -1px;
          border-radius: 0.75rem;
          pointer-events: none;
          opacity: 0;
          background: radial-gradient(500px 200px at 20% 10%, rgba(59,130,246,0.12), transparent 60%),
            radial-gradient(400px 160px at 80% 90%, rgba(124,58,237,0.12), transparent 60%);
          transition: opacity 300ms ease;
          filter: saturate(110%);
        }
        .card:hover::before {
          opacity: 1;
        }
      `}</style>
    </div>
  );
};
